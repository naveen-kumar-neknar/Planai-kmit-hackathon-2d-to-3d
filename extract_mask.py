import cv2
import numpy as np
INPUT_IMAGE = "cubicasa5k/images/19_scaled.png"   # original 2D floorplan
OUTPUT_MASK = "prediction_mask.png"              # used by generate_3d_model.py
TARGET_SIZE = (256, 256)                         # (width, height)
# ------------------------


def main():
    print("🔍 Reading blueprint:", INPUT_IMAGE)
    img = cv2.imread(INPUT_IMAGE)
    if img is None:
        raise FileNotFoundError(f"Could not open {INPUT_IMAGE}")

    # 1) Grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 2) Slight blur to reduce noise
    gray_blur = cv2.GaussianBlur(gray, (5, 5), 0)

    # 3) Threshold: dark lines become foreground
    #    THRESH_BINARY_INV → dark lines -> 255, white background -> 0
    _, thresh = cv2.threshold(gray_blur, 200, 255, cv2.THRESH_BINARY_INV)

    # 4) Dilate to thicken walls
    kernel = np.ones((5, 5), np.uint8)
    dilated = cv2.dilate(thresh, kernel, iterations=2)

    # 5) Remove tiny noise via connected components
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(
        dilated, connectivity=8
    )

    clean = np.zeros_like(dilated)
    MIN_AREA = 100  # ignore very small blobs
    for i in range(1, num_labels):
        area = stats[i, cv2.CC_STAT_AREA]
        if area >= MIN_AREA:
            clean[labels == i] = 255

    # 6) Final mask:
    #    walls = 0 (black), floor = 255 (white)
    mask = np.full_like(clean, 255, dtype=np.uint8)  # start as all floor
    mask[clean > 0] = 0                              # walls where lines exist

    # 7) Resize to target resolution for 3D pipeline
    mask_resized = cv2.resize(mask, TARGET_SIZE, interpolation=cv2.INTER_NEAREST)

    # 8) Save
    cv2.imwrite(OUTPUT_MASK, mask_resized)
    print("✅ Saved mask as", OUTPUT_MASK)
    print("   Black = walls, White = floor")


if __name__ == "__main__":
    main()
