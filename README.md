# 🏗️ PlanAI – 2D Floor Plan to 3D Visualization

### *KMIT Hackathon Project*

PlanAI is an AI-based application developed during the KMIT Hackathon that converts 2D floor plan images into 3D visual representations.

The project focuses on using computer vision and deep learning techniques to understand architectural layouts from images and generate structured outputs that can be visualized as 3D models.

---

## 🚀 Overview

Understanding 2D floor plans and visualizing them in 3D is a time-consuming task when done manually. PlanAI attempts to automate this process by combining image segmentation techniques with geometric processing.

The system processes a floor plan image, extracts structural information, and generates a corresponding 3D model that can be viewed in a web interface.

---

## ✨ Key Features

* AI-based segmentation of floor plan images
* Extraction of structural layout information (walls, rooms)
* Generation of 3D model files (.glb format)
* Basic 3D visualization in the browser
* Full-stack implementation with backend and frontend

---

## 🧩 Tech Stack

### 🔹 Backend

* Python
* Flask (API handling)
* PyTorch (for model training and inference)
* OpenCV (image processing)
* NumPy

### 🔹 Frontend

* React (Vite + TypeScript)
* Three.js (for 3D rendering)

---

## 🔄 Workflow

1. Input: 2D floor plan image
2. Image preprocessing using OpenCV
3. Segmentation using a trained U-Net model
4. Mask extraction and structural processing
5. Conversion of processed data into a 3D model (.glb)
6. Rendering of the model in the frontend

---

## 📁 Project Structure

```
planai-kmit-hackathon-2d-to-3d/
│
├── app.py                     # Backend API
├── train_unet.py              # Model training script
├── predict_unet.py            # Model inference
├── dataset_loader.py          # Dataset handling
├── extract_mask.py            # Mask processing
├── generate_3d_model.py       # 3D model generation
├── generate_masks.py          # Mask generation utilities
├── cubicasa5k/                # Dataset
├── cubicasa5k_coco/           # COCO annotations
├── data/                      # Generated 3D outputs (.glb)
├── frontend/                  # React frontend
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/planai-kmit-hackathon-2d-to-3d.git
cd planai-kmit-hackathon-2d-to-3d
```

---

### 2. Backend Setup

```bash
pip install -r requirements.txt
python app.py
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Usage

* Start backend server
* Start frontend
* Upload a floor plan image
* Wait for processing
* View generated 3D output

---

## 📊 Dataset

The project uses the **CubiCasa5K dataset**, which contains annotated floor plan images.

* Used for training and testing the segmentation model
* Includes corresponding mask and annotation files

---

## ⚠️ Limitations

* Accuracy depends on input image quality
* Complex or noisy floor plans may not generate perfect results
* 3D output is a simplified representation, not a fully detailed architectural model

---

## 🚧 Future Improvements

* Improve segmentation accuracy
* Support more complex layouts
* Optimize 3D model generation
* Add real-time processing
* Enhance UI/UX of frontend

---

## 🏆 Hackathon Details

* Event: KMIT Hackathon
* Project: PlanAI
* Category: AI / Computer Vision

---

## 👨‍💻 Contributors

* Naveen Kumar Neknar
* Team ProCoders

---

## 📜 License

This project is created for academic and demonstration purposes.
