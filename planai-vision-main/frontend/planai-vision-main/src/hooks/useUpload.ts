// src/hooks/useUpload.ts
import { useState } from "react";
import { processPlan } from "../integration/backend";
// ⬆ adjust the relative path if needed

export const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [maskUrl, setMaskUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const res = await processPlan(file);

      const BASE = "http://localhost:8000";

      setModelUrl(`${BASE}${res.model_url}`);
      setMaskUrl(`${BASE}${res.mask_url}`);

      return res;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error uploading file");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    upload,
    loading,
    modelUrl,
    maskUrl,
    error,
  };
};
