import os
import sys
import numpy as np
from PIL import Image
import trimesh
from trimesh.creation import box

# ----------------- CONFIG -----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MASK_PATH = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    BASE_DIR, "prediction_mask.png"
)
OUTPUT_MODEL = sys.argv[2] if len(sys.argv) > 2 else os.path.join(
    BASE_DIR, "floorplan_3d.glb"
)

SCALE = 0.05         # world units per pixel
WALL_HEIGHT = 2.8    # meters-ish
WALL_THICKNESS = 0.08
WINDOW_HEIGHT = 1.2
WINDOW_SILL_HEIGHT = 1.0
WINDOW_THICKNESS = 0.06

DOWNSAMPLE = 2       # skip pixels to keep mesh lighter (2 = every 2nd pixel)
# ------------------------------------------


def load_mask(path: str) -> np.ndarray:
    print("🔍 Loading mask:", path)
    img = Image.open(path)
    arr = np.array(img)

    if arr.ndim == 2:
        print("ℹ️ Mask is grayscale; converting to RGB-like array.")
        arr = np.stack([arr, arr, arr], axis=-1)

    h, w, _ = arr.shape
    print(f"🖼 Mask size: {w} x {h}")
    return arr


def classify_pixels(mask_rgb: np.ndarray) -> np.ndarray:
    # work with intensity
    intensity = mask_rgb.mean(axis=2).astype(np.float32)

    uniques = np.unique(intensity)
    print("🎨 Unique intensities in mask:", uniques)

    label_map = np.full_like(intensity, fill_value=-1, dtype=np.int8)

    # nearest to 0 -> wall
    label_map[np.abs(intensity - 0) < 20] = 0
    # nearest to 85 -> room/floor (we won't extrude)
    label_map[np.abs(intensity - 85) < 20] = 1
    # nearest to 170 -> window
    label_map[np.abs(intensity - 170) < 20] = 2

    print("🧱 Mapping intensities → labels:")
    print("  wall   ~= 0")
    print("  room   ~= 85")
    print("  window ~= 170")

    return label_map


def pixel_to_world(i: int, j: int, h: int, w: int):
    """
    Convert pixel (row i, col j) to a centered world-coordinate (x, y, z).
    Image origin is top-left; we put (0,0) at the center of the floor.
    """
    x = (j - w / 2) * SCALE
    z = (i - h / 2) * SCALE
    return x, z


def create_floor_plate(h: int, w: int) -> trimesh.Trimesh:
    width_world = w * SCALE
    depth_world = h * SCALE
    height = 0.1

    size = [width_world, height, depth_world]
    floor = box(extents=size)

    # move so that center is at (0, 0, 0) and top is at y = 0
    floor.apply_translation([0, -height / 2, 0])

    # light beige floor color
    color = np.array([230, 230, 230, 255], dtype=np.uint8)
    floor.visual.vertex_colors = np.tile(color, (floor.vertices.shape[0], 1))
    return floor


def create_wall_box(x: float, z: float) -> trimesh.Trimesh:
    size = [WALL_THICKNESS, WALL_HEIGHT, WALL_THICKNESS]
    m = box(extents=size)
    # center the box around (x, z); bottom at y=0
    m.apply_translation([x, WALL_HEIGHT / 2, z])

    # light gray
    color = np.array([180, 180, 180, 255], dtype=np.uint8)
    m.visual.vertex_colors = np.tile(color, (m.vertices.shape[0], 1))
    return m


def create_window_box(x: float, z: float) -> trimesh.Trimesh:
    size = [WINDOW_THICKNESS, WINDOW_HEIGHT, WINDOW_THICKNESS]
    m = box(extents=size)
    # place window above sill
    m.apply_translation([x, WINDOW_SILL_HEIGHT + WINDOW_HEIGHT / 2, z])

    # bluish
    color = np.array([120, 170, 255, 255], dtype=np.uint8)
    m.visual.vertex_colors = np.tile(color, (m.vertices.shape[0], 1))
    return m


def build_3d_from_mask(label_map: np.ndarray) -> trimesh.Scene:
    h, w = label_map.shape
    print(f"📐 Plan size (pixels): h={h}, w={w}")

    meshes = []

    # 1) floor plate
    floor = create_floor_plate(h, w)
    meshes.append(floor)

    # 2) iterate pixels for walls/windows
    for i in range(0, h, DOWNSAMPLE):
        for j in range(0, w, DOWNSAMPLE):
            label = label_map[i, j]
            if label == 0:  # wall
                x, z = pixel_to_world(i, j, h, w)
                meshes.append(create_wall_box(x, z))
            elif label == 2:  # window
                x, z = pixel_to_world(i, j, h, w)
                meshes.append(create_window_box(x, z))
            # label 1 = room (we keep it as floor only)

    print(f"🧩 Created {len(meshes)} mesh parts; merging...")
    merged = trimesh.util.concatenate(meshes)
    scene = trimesh.Scene(merged)
    return scene


def main():
    mask_rgb = load_mask(MASK_PATH)
    label_map = classify_pixels(mask_rgb)
    scene = build_3d_from_mask(label_map)

    print(f"💾 Exporting model to: {OUTPUT_MODEL}")
    scene.export(OUTPUT_MODEL)
    print("✅ 3D model saved!")


if __name__ == "__main__":
    main()
