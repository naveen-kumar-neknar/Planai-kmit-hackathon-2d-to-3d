import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from PIL import Image
from tqdm import tqdm
import time

# === CONFIG ===
DATASET_PATH = r"C:\Users\VINEETH\OneDrive\Desktop\kmit pro\cubicasa5k"
IMAGE_DIR = os.path.join(DATASET_PATH, "images")
MASK_DIR = os.path.join(DATASET_PATH, "masks")
MODEL_SAVE_PATH = r"C:\Users\VINEETH\OneDrive\Desktop\kmit pro\data\unet_floorplan_best.pth"

IMG_SIZE = (128, 128)          # speed + clarity balance
EPOCHS = 30                    # your target
LR = 1e-3

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print(f"🔥 Using device: {DEVICE}")

# === Auto batch size detection ===
if torch.cuda.is_available():
    total_vram = torch.cuda.get_device_properties(0).total_memory / (1024**3)
    if total_vram >= 10:
        BATCH_SIZE = 8
    elif total_vram >= 6:
        BATCH_SIZE = 4
    else:
        BATCH_SIZE = 2
else:
    BATCH_SIZE = 2

print(f"⚙️ Batch Size: {BATCH_SIZE}")

# === Dataset Class ===
class FloorplanDataset(Dataset):
    def __init__(self, image_dir, mask_dir, transform=None, limit=800):
        self.image_dir = image_dir
        self.mask_dir = mask_dir
        self.images = [f for f in os.listdir(image_dir) if f.endswith('.png')][:limit]
        self.transform = transform

    def __len__(self):
        return len(self.images)

    def __getitem__(self, idx):
        img_name = self.images[idx]
        mask_name = img_name.replace("_scaled.png", "_mask.png")
        img_path = os.path.join(self.image_dir, img_name)
        mask_path = os.path.join(self.mask_dir, mask_name)

        image = Image.open(img_path).convert("RGB").resize(IMG_SIZE)
        mask = Image.open(mask_path).convert("RGB").resize(IMG_SIZE)

        image = transforms.ToTensor()(image)
        mask = transforms.ToTensor()(mask)
        return image, mask

# === Dice Loss ===
class DiceLoss(nn.Module):
    def __init__(self, smooth=1e-6):
        super(DiceLoss, self).__init__()
        self.smooth = smooth

    def forward(self, preds, targets):
        preds = preds.contiguous()
        targets = targets.contiguous()
        intersection = (preds * targets).sum(dim=2).sum(dim=2)
        loss = 1 - ((2. * intersection + self.smooth) /
                    (preds.sum(dim=2).sum(dim=2) + targets.sum(dim=2).sum(dim=2) + self.smooth))
        return loss.mean()

# === U-Net Model ===
class DoubleConv(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(DoubleConv, self).__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, 3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, 3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True)
        )

    def forward(self, x):
        return self.conv(x)

class UNet(nn.Module):
    def __init__(self, n_channels=3, n_classes=3):
        super(UNet, self).__init__()
        self.down1 = DoubleConv(n_channels, 64)
        self.pool1 = nn.MaxPool2d(2)
        self.down2 = DoubleConv(64, 128)
        self.pool2 = nn.MaxPool2d(2)
        self.down3 = DoubleConv(128, 256)
        self.pool3 = nn.MaxPool2d(2)
        self.bottom = DoubleConv(256, 512)
        self.up3 = nn.ConvTranspose2d(512, 256, 2, stride=2)
        self.conv3 = DoubleConv(512, 256)
        self.up2 = nn.ConvTranspose2d(256, 128, 2, stride=2)
        self.conv2 = DoubleConv(256, 128)
        self.up1 = nn.ConvTranspose2d(128, 64, 2, stride=2)
        self.conv1 = DoubleConv(128, 64)
        self.final = nn.Conv2d(64, n_classes, 1)

    def forward(self, x):
        c1 = self.down1(x)
        p1 = self.pool1(c1)
        c2 = self.down2(p1)
        p2 = self.pool2(c2)
        c3 = self.down3(p2)
        p3 = self.pool3(c3)
        b = self.bottom(p3)
        u3 = self.up3(b)
        c3 = self.conv3(torch.cat([u3, c3], dim=1))
        u2 = self.up2(c3)
        c2 = self.conv2(torch.cat([u2, c2], dim=1))
        u1 = self.up1(c2)
        c1 = self.conv1(torch.cat([u1, c1], dim=1))
        out = self.final(c1)
        return torch.sigmoid(out)

# === Training Function ===
def train_model():
    dataset = FloorplanDataset(IMAGE_DIR, MASK_DIR)
    dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=4, pin_memory=True)

    model = UNet().to(DEVICE)
    bce_loss = nn.BCEWithLogitsLoss()
    dice_loss = DiceLoss()
    optimizer = optim.Adam(model.parameters(), lr=LR)
    scaler = torch.cuda.amp.GradScaler()  # Mixed precision

    print(f"🚀 Training started on {DEVICE} for {EPOCHS} epochs with {len(dataset)} samples")

    start_time = time.time()
    for epoch in range(EPOCHS):
        model.train()
        running_loss = 0.0
        loop = tqdm(dataloader, desc=f"Epoch {epoch+1}/{EPOCHS}")

        for images, masks in loop:
            images, masks = images.to(DEVICE), masks.to(DEVICE)
            optimizer.zero_grad()

            with torch.cuda.amp.autocast():
                outputs = model(images)
                loss = bce_loss(outputs, masks) + dice_loss(outputs, masks)

            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()
            running_loss += loss.item()
            loop.set_postfix(loss=loss.item())

        avg_loss = running_loss / len(dataloader)
        print(f"✅ Epoch [{epoch+1}/{EPOCHS}] Loss: {avg_loss:.4f}")

    total_time = (time.time() - start_time) / 60
    torch.save(model.state_dict(), MODEL_SAVE_PATH)
    print(f"✅ Training completed in {total_time:.1f} mins. Model saved to: {MODEL_SAVE_PATH}")

if __name__ == "__main__":
    train_model()
