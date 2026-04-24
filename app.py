import io
import os
import json
import uuid
import math
import shutil
import tempfile
from typing import List, Optional, Dict, Any

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field
from starlette.middleware.cors import CORSMiddleware

# Storage/DB
from sqlalchemy import Column, String, Integer, JSON as SAJSON, create_engine, DateTime, Text
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime

# CV / Geometry
import cv2
import numpy as np
import pytesseract
from PIL import Image
from shapely.geometry import LineString, Polygon, Point
from shapely.ops import polygonize, unary_union
import networkx as nx
import trimesh

import subprocess  # <-- for calling predict_unet.py & generate_3d_model.py

# ------------ paths / data dirs ------------
DATA_DIR = os.environ.get("DATA_DIR", "./data")
os.makedirs(DATA_DIR, exist_ok=True)

# for the UNet + Trimesh pipeline
UPLOAD_DIR = os.path.join(DATA_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ------------ DB setup ------------
Base = declarative_base()
engine = create_engine(f"sqlite:///{os.path.join(DATA_DIR, 'backend.db')}")
SessionLocal = sessionmaker(bind=engine)

class Asset(Base):
    __tablename__ = "assets"
    id = Column(String, primary_key=True)
    filename = Column(String)
    mime = Column(String)
    path = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Layout(Base):
    __tablename__ = "layouts"
    id = Column(String, primary_key=True)
    asset_id = Column(String)
    graph_json = Column(Text)  # serialized networkx to node-/edge- lists
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

class Model3D(Base):
    __tablename__ = "models3d"
    id = Column(String, primary_key=True)
    layout_id = Column(String)
    path = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# ------------ FastAPI ------------
app = FastAPI(title="2D→3D Design Intelligence API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

# ------------ Pydantic models ------------
class ParseOptions(BaseModel):
    binarize_threshold: Optional[int] = 200
    min_line_length_px: Optional[int] = 80
    max_line_gap_px: Optional[int] = 10
    wall_merge_tol_px: Optional[float] = 4.0
    scale_px_per_meter: Optional[float] = 100.0  # if no scale is detected
    enable_ocr: bool = True

class GraphEdit(BaseModel):
    op: str = Field(..., description="add_wall|remove_wall|move_wall|add_opening|remove_opening|set_room_label")
    payload: Dict[str, Any]

class Generate3DOptions(BaseModel):
    wall_height_m: float = 3.0
    wall_thickness_m: float = 0.2
    floor_thickness_m: float = 0.15
    export_format: str = "glb"  # glb or gltf
    material_set: Optional[str] = "default"

# ------------ Helpers ------------
def _save_upload(file: UploadFile) -> Asset:
    sid = str(uuid.uuid4())
    ext = os.path.splitext(file.filename)[1].lower() or ".bin"
    out_path = os.path.join(DATA_DIR, f"{sid}{ext}")
    with open(out_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    asset = Asset(id=sid, filename=file.filename, mime=file.content_type, path=out_path)
    db = SessionLocal()
    db.add(asset); db.commit(); db.refresh(asset); db.close()
    return asset

def _load_image_rgba(asset: Asset) -> np.ndarray:
    # If PDF/SVG/DXF support is needed, convert here (pdf2image/ezdxf), then rasterize to RGBA
    img = Image.open(asset.path).convert("RGBA")
    return np.array(img)

def _binarize(img: np.ndarray, thresh: int) -> np.ndarray:
    gray = cv2.cvtColor(img, cv2.COLOR_RGBA2GRAY)
    # adaptive can be used for noisy scans; start simple
    _, bw = cv2.threshold(gray, thresh, 255, cv2.THRESH_BINARY_INV)
    return bw

def _find_lines(bw: np.ndarray, min_len: int, max_gap: int) -> List[LineString]:
    # Probabilistic Hough → line segments
    linesP = cv2.HoughLinesP(bw, 1, np.pi/180, threshold=80,
                             minLineLength=min_len, maxLineGap=max_gap)
    segs = []
    if linesP is not None:
        for x1,y1,x2,y2 in linesP[:,0,:]:
            segs.append(LineString([(x1,y1),(x2,y2)]))
    return segs

def _merge_colinear(lines: List[LineString], tol: float) -> List[LineString]:
    # very lightweight merging: buffer+union+linemerge via polygonize trick
    if not lines: return []
    merged = unary_union([l.buffer(tol, cap_style=2) for l in lines])
    # extract centerlines
    outline = merged.boundary
    if outline.is_empty:
        return lines
    # polygonize boundaries back to lines; fallback
    res = []
    try:
        if outline.geom_type == "MultiLineString":
            for seg in outline:
                res.append(LineString(list(seg.coords)))
        elif outline.geom_type == "LineString":
            res.append(LineString(list(outline.coords)))
    except Exception:
        return lines
    return res if res else lines

def _vector_walls_to_polygons(lines: List[LineString], thickness: float) -> List[Polygon]:
    # Buffer each centerline by thickness/2 to get wall solids (2D)
    walls = [l.buffer(thickness/2.0, cap_style=2, join_style=2) for l in lines]
    return walls

def _ocr_text(img_rgba: np.ndarray) -> List[Dict[str, Any]]:
    rgb = cv2.cvtColor(img_rgba, cv2.COLOR_RGBA2RGB)
    data = pytesseract.image_to_data(rgb, output_type=pytesseract.Output.DICT)
    out = []
    for i in range(len(data["text"])):
        txt = data["text"][i].strip()
        if not txt: continue
        x,y,w,h = data["left"][i], data["top"][i], data["width"][i], data["height"][i]
        out.append({"text": txt, "bbox": [x,y,w,h]})
    return out

def _rooms_from_walls(wall_polys: List[Polygon]) -> List[Polygon]:
    # Rooms are polygonized from the negative space between walls (heuristic)
    if not wall_polys: return []
    merged = unary_union(wall_polys)
    # Create a mask area bounding box plus walls; then polygonize gaps
    # Practical trick: sample wall boundaries and polygonize
    bounds = merged.bounds
    # Extract linework from wall boundaries
    boundary = merged.boundary
    if boundary.is_empty:
        return []
    if boundary.geom_type == "MultiLineString":
        linework = list(boundary.geoms)
    else:
        linework = [boundary]
    polys = list(polygonize(linework))
    # Filter out tiny polygons (noise)
    polys = [p for p in polys if p.area > 1000]  # px^2 threshold
    return polys

def _graph_from_layout(rooms: List[Polygon], walls: List[Polygon],
                       scale_px_per_m: float, ocr: List[Dict[str,Any]]) -> nx.Graph:
    G = nx.Graph()
    # Add rooms as nodes
    for i, r in enumerate(rooms):
        area_m2 = (r.area / (scale_px_per_m**2))
        centroid = list(r.centroid.coords)[0]
        G.add_node(f"room_{i}", kind="room",
                   polygon=list(map(list, r.exterior.coords)), area_m2=area_m2,
                   centroid=[centroid[0], centroid[1]], label=None)
    # Add walls as nodes/edges
    for j, w in enumerate(walls):
        G.add_node(f"wall_{j}", kind="wall",
                   polygon=list(map(list, w.exterior.coords)))
    # Room adjacency (shared border ~ doorway candidate later)
    for i in range(len(rooms)):
        for j in range(i+1, len(rooms)):
            if rooms[i].touches(rooms[j]):
                G.add_edge(f"room_{i}", f"room_{j}", kind="adjacent")
    # Naive label assignment from OCR (closest text to room centroid)
    for n, data in G.nodes(data=True):
        if data.get("kind") != "room": continue
        cx, cy = data["centroid"]
        best = None; bestd = 1e12
        for t in ocr:
            x,y,w,h = t["bbox"]; tx, ty = x + w/2, y + h/2
            d = (tx - cx)**2 + (ty - cy)**2
            if d < bestd:
                bestd = d; best = t["text"]
        if best and len(best) < 32:
            data["label"] = best
    G.graph["scale_px_per_m"] = scale_px_per_m
    return G

def _serialize_graph(G: nx.Graph) -> str:
    data = {
        "nodes": [
            {"id": n, **attrs} for n, attrs in G.nodes(data=True)
        ],
        "edges": [
            {"u": u, "v": v, **attrs} for u, v, attrs in G.edges(data=True)
        ],
        "meta": G.graph
    }
    return json.dumps(data)

def _deserialize_graph(s: str) -> nx.Graph:
    raw = json.loads(s)
    G = nx.Graph()
    for node in raw["nodes"]:
        nid = node.pop("id")
        G.add_node(nid, **node)
    for e in raw["edges"]:
        u = e.pop("u"); v = e.pop("v")
        G.add_edge(u, v, **e)
    G.graph.update(raw.get("meta", {}))
    return G

def _rooms_from_graph(G: nx.Graph) -> List[Polygon]:
    rooms = []
    for n, d in G.nodes(data=True):
        if d.get("kind") == "room":
            rooms.append(Polygon(d["polygon"]))
    return rooms

def _export_glb(G: nx.Graph, opts: Generate3DOptions, out_path: str) -> str:
    """Extrude rooms/walls to 3D and export GLB."""
    scale = float(G.graph.get("scale_px_per_m", 100.0))
    wall_t = opts.wall_thickness_m
    wall_h = opts.wall_height_m
    floor_t = opts.floor_thickness_m

    # Build meshes
    meshes = []

    # Floors (rooms)
    for n, d in G.nodes(data=True):
        if d.get("kind") != "room": continue
        poly = Polygon(d["polygon"])
        # Floor slab
        floor_2d = poly.buffer(0)
        floor_shape = trimesh.path.polygons.resample_polygon(np.array(floor_2d.exterior.coords), 1.0)
        floor = trimesh.creation.extrude_polygon(Polygon(floor_shape), floor_t)
        # Raise floor slightly below 0 for z-flicker protection
        floor.apply_translation([0,0,-floor_t])
        meshes.append(floor)

        # Walls from polygon edges (outer ring)
        coords = list(poly.exterior.coords)
        for i in range(len(coords)-1):
            x1,y1 = coords[i]; x2,y2 = coords[i+1]
            dx, dy = x2-x1, y2-y1
            length = math.hypot(dx, dy)
            if length < 2: 
                continue
            # Wall center along edge; build as box then rotate
            wall = trimesh.creation.box(extents=[length, wall_t*scale, wall_h*scale])
            angle = math.atan2(dy, dx)
            wall.apply_translation([length/2, 0, wall_h*scale/2])
            R = trimesh.transformations.rotation_matrix(angle, [0,0,1])
            T = trimesh.transformations.translation_matrix([x1, y1, 0])
            wall.apply_transform(T @ R)
            meshes.append(wall)

    # Merge and scale from px to meters
    if not meshes:
        raise HTTPException(status_code=400, detail="No geometry found to export.")
    scene = trimesh.util.concatenate(meshes)

    # Convert from px units to meters (assuming px in X/Y, Z already scaled)
    S = trimesh.transformations.scale_matrix(1.0/scale, [0,0,0])
    scene.apply_transform(S)

    # Export GLB
    ext = os.path.splitext(out_path)[1].lower()
    if ext not in [".glb", ".gltf"]:
        out_path = out_path + (".glb" if opts.export_format == "glb" else ".gltf")
    with open(out_path, "wb") as f:
        f.write(scene.export(file_type="glb" if opts.export_format=="glb" else "gltf"))
    return out_path

# ------------ Existing Endpoints ------------

@app.post("/ingest/blueprint")
async def ingest_blueprint(file: UploadFile = File(...)):
    asset = _save_upload(file)
    return {"asset_id": asset.id, "filename": asset.filename, "mime": asset.mime}

@app.post("/parse/layout")
async def parse_layout(asset_id: str = Form(...), options: str = Form('{}')):
    opts = ParseOptions(**json.loads(options))
    db = SessionLocal()
    asset = db.query(Asset).filter_by(id=asset_id).first()
    db.close()
    if not asset:
        raise HTTPException(404, "Asset not found")

    img = _load_image_rgba(asset)
    bw = _binarize(img, opts.binarize_threshold)
    lines = _find_lines(bw, opts.min_line_length_px, opts.max_line_gap_px)
    lines = _merge_colinear(lines, opts.wall_merge_tol_px)

    # Convert lines to wall polygons in px; thickness derived from opts (px)
    wall_px_thickness = max(2.0, opts.wall_merge_tol_px * 2.0)
    wall_polys = _vector_walls_to_polygons(lines, wall_px_thickness)
    rooms = _rooms_from_walls(wall_polys)
    ocr = _ocr_text(img) if opts.enable_ocr else []

    G = _graph_from_layout(rooms, wall_polys, opts.scale_px_per_meter, ocr)
    graph_s = _serialize_graph(G)

    lid = str(uuid.uuid4())
    layout = Layout(id=lid, asset_id=asset_id, graph_json=graph_s,
                    created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    db = SessionLocal(); db.add(layout); db.commit(); db.close()
    return {"layout_id": lid, "graph": json.loads(graph_s)}

@app.get("/layout/{layout_id}")
async def get_layout(layout_id: str):
    db = SessionLocal()
    layout = db.query(Layout).filter_by(id=layout_id).first()
    db.close()
    if not layout: raise HTTPException(404, "Layout not found")
    return json.loads(layout.graph_json)

@app.patch("/layout/{layout_id}")
async def edit_layout(layout_id: str, edit: GraphEdit):
    db = SessionLocal()
    layout = db.query(Layout).filter_by(id=layout_id).first()
    if not layout:
        db.close(); raise HTTPException(404, "Layout not found")
    G = _deserialize_graph(layout.graph_json)

    op = edit.op
    P = edit.payload

    if op == "set_room_label":
        node_id = P["id"]; label = P["label"]
        if node_id in G.nodes and G.nodes[node_id].get("kind") == "room":
            G.nodes[node_id]["label"] = label
        else:
            db.close(); raise HTTPException(400, "Invalid room id")

    elif op == "add_wall":
        # payload: { "p1":[x,y], "p2":[x,y] }
        p1, p2 = P["p1"], P["p2"]
        wid = f"wall_{uuid.uuid4().hex[:6]}"
        seg = LineString([tuple(p1), tuple(p2)])
        wall_poly = seg.buffer(4.0, cap_style=2)
        G.add_node(wid, kind="wall", polygon=list(map(list, wall_poly.exterior.coords)))

    elif op == "move_wall":
        # payload: { "id":"wall_...", "dx":float, "dy":float }
        # NOTE: this references shapely.affinity in original; left as-is.
        wid = P["id"]; dx, dy = P["dx"], P["dy"]
        if wid in G.nodes and G.nodes[wid].get("kind") == "wall":
            poly = Polygon(G.nodes[wid]["polygon"])
            # If you want this to work, ensure shapely.affinity is imported properly.
            import shapely.affinity as shapely_affinity
            poly = shapely_affinity.translate(poly, xoff=dx, yoff=dy)
            G.nodes[wid]["polygon"] = list(map(list, poly.exterior.coords))
        else:
            db.close(); raise HTTPException(400, "Invalid wall id")

    elif op == "add_opening" or op == "remove_opening":
        # Placeholder: manage openings as edge attrs between rooms or wall attrs with intervals.
        pass

    elif op == "remove_wall":
        wid = P["id"]
        if wid in G.nodes and G.nodes[wid].get("kind") == "wall":
            G.remove_node(wid)
        else:
            db.close(); raise HTTPException(400, "Invalid wall id")
    else:
        db.close(); raise HTTPException(400, f"Unsupported op: {op}")

    layout.graph_json = _serialize_graph(G)
    layout.updated_at = datetime.utcnow()
    db.add(layout); db.commit(); db.close()
    return json.loads(layout.graph_json)

@app.post("/generate/3d")
async def generate_3d(layout_id: str = Form(...), options: str = Form('{}')):
    opts = Generate3DOptions(**json.loads(options))
    db = SessionLocal()
    layout = db.query(Layout).filter_by(id=layout_id).first()
    if not layout:
        db.close(); raise HTTPException(404, "Layout not found")
    G = _deserialize_graph(layout.graph_json)
    mid = str(uuid.uuid4())
    out_path = os.path.join(DATA_DIR, f"{mid}.{opts.export_format}")
    _export_glb(G, opts, out_path)
    model = Model3D(id=mid, layout_id=layout_id, path=out_path)
    db.add(model); db.commit(); db.close()
    return {"model_id": mid, "url": f"/models/{mid}.{opts.export_format}"}

@app.get("/models/{model_file}")
async def get_model(model_file: str):
    path = os.path.join(DATA_DIR, model_file)
    if not os.path.exists(path):
        raise HTTPException(404, "Model not found")
    media = "model/gltf-binary" if model_file.endswith(".glb") else "model/gltf+json"
    return FileResponse(path, media_type=media, filename=model_file)

@app.post("/materials/apply")
async def apply_materials(layout_id: str = Form(...), material_set: str = Form("default")):
    # Stub: in a real system, assign PBR textures per room label (kitchen -> tile, bedroom -> wood), then re-export.
    return {"status": "ok", "layout_id": layout_id, "applied": material_set}

# ------------ New UNet + 3D pipeline endpoint ------------

@app.post("/api/process-plan")
async def process_plan(file: UploadFile = File(...)):
    """
    End-to-end pipeline for your React Upload page:

    1. Save uploaded blueprint image to DATA_DIR/uploads.
    2. Run predict_unet.py -> mask.png
    3. Run generate_3d_model.py -> model.glb
    4. Return URLs the frontend can load.
    """
    # 1) Save uploaded image
    uid = str(uuid.uuid4())
    ext = os.path.splitext(file.filename)[1] or ".png"
    img_filename = f"{uid}{ext}"
    img_path = os.path.join(UPLOAD_DIR, img_filename)

    with open(img_path, "wb") as out:
        shutil.copyfileobj(file.file, out)

    # 2) Run UNet prediction -> mask
    mask_filename = f"{uid}_mask.png"
    mask_path = os.path.join(DATA_DIR, mask_filename)

    try:
        subprocess.run(
            ["python", "predict_unet.py", img_path, mask_path],
            check=True,
            cwd=os.path.dirname(os.path.abspath(__file__)),
        )
    except subprocess.CalledProcessError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error running predict_unet.py: {e}",
        )

    # 3) Run 3D generator -> glb
    model_filename = f"{uid}.glb"
    model_path = os.path.join(DATA_DIR, model_filename)

    try:
        subprocess.run(
            ["python", "generate_3d_model.py", mask_path, model_path],
            check=True,
            cwd=os.path.dirname(os.path.abspath(__file__)),
        )
    except subprocess.CalledProcessError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error running generate_3d_model.py: {e}",
        )

    # 4) Return URLs for frontend
    return {
        "id": uid,
        "model_url": f"/models/{model_filename}",
        "mask_url": f"/models/{mask_filename}",
    }

# ------------ Root ------------

@app.get("/")
async def root():
    return {"ok": True, "service": "2D→3D AI Backend", "version": "0.1.0"}
