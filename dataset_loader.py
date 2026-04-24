# dataset_loader.py
import os
import json
from PIL import Image
from typing import Dict

class CubiCasaDataset:
    """
    Simple dataset loader for the CubiCasa5k dataset.
    Reads floor plan images and their JSON annotations.
    """

    def __init__(self, root_dir: str):
        self.root = root_dir
        self.img_dir = os.path.join(root_dir, "images")
        self.ann_dir = os.path.join(root_dir, "annotations")

        if not os.path.exists(self.img_dir):
            raise FileNotFoundError(f"Missing folder: {self.img_dir}")
        if not os.path.exists(self.ann_dir):
            raise FileNotFoundError(f"Missing folder: {self.ann_dir}")

        # Collect all image filenames
        self.samples = [
            f for f in os.listdir(self.img_dir)
            if f.lower().endswith(('.png', '.jpg'))
        ]

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx: int) -> Dict:
        filename = self.samples[idx]
        image_path = os.path.join(self.img_dir, filename)
        json_path = os.path.join(
            self.ann_dir,
            filename.replace('.png', '.json').replace('.jpg', '.json')
        )

        # Load image and annotation
        img = Image.open(image_path).convert("RGB")
        with open(json_path, "r") as f:
            ann = json.load(f)

        return {"filename": filename, "image": img, "annotation": ann}

    def list_samples(self, limit=5):
        """Return a few filenames for inspection."""
        return self.samples[:limit]
