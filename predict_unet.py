import os
import sys
import torch
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

# ----------------- CONFIG -----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "data", "unet_floorplan_best.pth")

# CLI: python predict_unet.py <input_image> <output_mask>
IMAGE_PATH = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    BASE_DIR, "cubicasa5k", "images", "17_scaled.png"
)
OUT_MASK_PATH = sys.argv[2] if len(sys.argv) > 2 else os.path.join(
    BASE_DIR, "prediction_mask.png"
)

IMG_SIZE = (256, 256)  # must match what you used for training
NUM_CLASSES = 3        # wall, room, window  (update if you trained differently)
# ------------------------------------------


# ---- import your UNet from the training file ----
# Make sure train_unet.py defines: class UNet(nn.Module)
from train_unet import UNet


def load_model(device: torch.device):
    print("🔥 Using device:", device)
    model = UNet(n_channels=3, n_classes=NUM_CLASSES).to(device)
    state = torch.load(MODEL_PATH, map_location=device)
    model.load_state_dict(state)
    model.eval()
    print("✅ Model loaded from", MODEL_PATH)
    return model


def preprocess_image(path: str, device: torch.device) -> torch.Tensor:
    img = Image.open(path).convert("RGB")
    img_resized = img.resize(IMG_SIZE)

    arr = np.array(img_resized).astype("float32") / 255.0
    arr = np.transpose(arr, (2, 0, 1))        # HWC -> CHW
    tensor = torch.from_numpy(arr).unsqueeze(0).to(device)  # [1,3,H,W]
    return img, tensor


def postprocess_mask(pred: torch.Tensor) -> np.ndarray:
    """
    pred: [1, C, H, W] logits
    returns grayscale mask HxW with values in {0, 85, 170}
    """
    probs = torch.softmax(pred, dim=1)
    classes = probs.argmax(dim=1).squeeze(0).cpu().numpy().astype(np.uint8)
    mask = (classes * 85).astype(np.uint8)
    return mask


def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = load_model(device)

    print("🖼 Input image:", IMAGE_PATH)
    original_img, x = preprocess_image(IMAGE_PATH, device)

    with torch.no_grad():
        logits = model(x)

    mask = postprocess_mask(logits)
    mask_img = Image.fromarray(mask)
    mask_img.save(OUT_MASK_PATH)
    print("✅ Saved prediction mask to", OUT_MASK_PATH)

    # optional visualization for debugging (you can comment this out)
    fig, axs = plt.subplots(1, 2, figsize=(10, 5))
    axs[0].imshow(original_img)
    axs[0].set_title("🧱 Input Blueprint")
    axs[0].axis("off")

    axs[1].imshow(mask, cmap="viridis")
    axs[1].set_title("🎨 Predicted Floorplan Mask")
    axs[1].axis("off")

    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    main()
