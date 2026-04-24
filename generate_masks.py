import os
from xml.dom import minidom
from PIL import Image, ImageDraw
import random

# === CONFIG ===
svg_dir = r"C:\Users\VINEETH\OneDrive\Desktop\kmit pro\cubicasa5k\annotations"
out_dir = r"C:\Users\VINEETH\OneDrive\Desktop\kmit pro\cubicasa5k\masks"
os.makedirs(out_dir, exist_ok=True)

# === Function to convert SVG to color mask ===
def svg_to_mask(svg_path, output_path, size=(512, 512)):
    doc = minidom.parse(svg_path)
    polygons = doc.getElementsByTagName("polygon")

    # Create blank RGB mask image
    img = Image.new("RGB", size, "black")
    draw = ImageDraw.Draw(img)

    for poly in polygons:
        points = poly.getAttribute("points").strip().split()
        coords = []
        for p in points:
            # Handle polygons with 2D or 3D coordinates
            nums = p.split(',')
            if len(nums) >= 2:
                try:
                    x, y = float(nums[0]), float(nums[1])
                    coords.append((x, y))
                except ValueError:
                    continue

        # Assign each room a random color
        color = (
            random.randint(50, 255),
            random.randint(50, 255),
            random.randint(50, 255)
        )

        if len(coords) > 2:
            draw.polygon(coords, fill=color)

    img.save(output_path)
    doc.unlink()

# === Process all SVG files ===
count = 0
for file in os.listdir(svg_dir):
    if file.endswith(".svg"):
        svg_path = os.path.join(svg_dir, file)
        mask_path = os.path.join(out_dir, file.replace("_model.svg", "_mask.png"))
        svg_to_mask(svg_path, mask_path)
        count += 1

print(f"✅ Successfully generated {count} mask images in: {out_dir}")
