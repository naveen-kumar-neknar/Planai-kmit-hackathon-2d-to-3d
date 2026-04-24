import os
import shutil

# === PATH CONFIG ===
source_root = r"C:\Users\VINEETH\OneDrive\Desktop\kmit pro\cubicasa5k\cubicasa5k\high_quality"
target_root = r"C:\Users\VINEETH\OneDrive\Desktop\kmit pro\cubicasa5k"

images_dir = os.path.join(target_root, "images")
annotations_dir = os.path.join(target_root, "annotations")
masks_dir = os.path.join(target_root, "masks")

# Create folders if not exist
os.makedirs(images_dir, exist_ok=True)
os.makedirs(annotations_dir, exist_ok=True)
os.makedirs(masks_dir, exist_ok=True)

count_img, count_svg = 0, 0

# === COPY IMAGES AND SVG ANNOTATIONS ===
for root, dirs, files in os.walk(source_root):
    for file in files:
        lower = file.lower()

        # Copy F1_scaled images
        if "f1_scaled" in lower and lower.endswith(".png"):
            src = os.path.join(root, file)
            dst = os.path.join(images_dir, f"{os.path.basename(root)}_scaled.png")
            shutil.copy2(src, dst)
            count_img += 1

        # Copy model.svg annotations
        elif "model" in lower and lower.endswith(".svg"):
            src = os.path.join(root, file)
            dst = os.path.join(annotations_dir, f"{os.path.basename(root)}_model.svg")
            shutil.copy2(src, dst)
            count_svg += 1

print("✅ Dataset preparation complete.")
print(f"Images copied: {count_img}")
print(f"SVG annotations copied: {count_svg}")
print(f"Images directory: {images_dir}")
print(f"Annotations directory: {annotations_dir}")
print(f"Masks directory (empty for now): {masks_dir}")
