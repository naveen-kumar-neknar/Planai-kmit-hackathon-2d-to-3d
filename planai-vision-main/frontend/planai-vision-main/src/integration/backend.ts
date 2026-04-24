// src/api/backend.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // <-- Change if deployed
});

// -----------------------------
// 1) Upload + Process (UNet + 3D)
// -----------------------------
export const processPlan = async (file: File) => {
  const form = new FormData();
  form.append("file", file);

  const res = await API.post("/api/process-plan", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // { id, model_url, mask_url }
};

// -----------------------------
// 2) Raw Upload (optional legacy flow)
// -----------------------------
export const uploadBlueprint = async (file: File) => {
  const form = new FormData();
  form.append("file", file);

  const res = await API.post("/ingest/blueprint", form);
  return res.data; // { asset_id, filename, mime }
};

// -----------------------------
// 3) Parse Layout (Hough + OCR)
// -----------------------------
export const parseLayout = async (asset_id: string, options = {}) => {
  const form = new FormData();
  form.append("asset_id", asset_id);
  form.append("options", JSON.stringify(options));

  const res = await API.post("/parse/layout", form);
  return res.data; // { layout_id, graph }
};

// -----------------------------
// 4) Fetch Layout Graph
// -----------------------------
export const getLayout = async (layout_id: string) => {
  const res = await API.get(`/layout/${layout_id}`);
  return res.data;
};

// -----------------------------
// 5) Edit Layout Graph
// -----------------------------
export const editLayout = async (layout_id: string, edit: any) => {
  const res = await API.patch(`/layout/${layout_id}`, edit);
  return res.data;
};

// -----------------------------
// 6) Generate 3D Model
// -----------------------------
export const generate3D = async (layout_id: string, options = {}) => {
  const form = new FormData();
  form.append("layout_id", layout_id);
  form.append("options", JSON.stringify(options));

  const res = await API.post("/generate/3d", form);
  return res.data; // { model_id, url }
};

// -----------------------------
// 7) Apply materials
// -----------------------------
export const applyMaterials = async (layout_id: string, material_set: string) => {
  const form = new FormData();
  form.append("layout_id", layout_id);
  form.append("material_set", material_set);

  const res = await API.post("/materials/apply", form);
  return res.data;
};

export default API;
