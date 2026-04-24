// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Upload as UploadIcon, FileImage, Loader2, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import ThreeDViewer from "@/components/ThreeDViewer";
// import AISuggestionsPanel from "@/components/AISuggestionsPanel";

// const Upload = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadComplete, setUploadComplete] = useState(false);
//   const { toast } = useToast();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       if (selectedFile.type.startsWith("image/")) {
//         setFile(selectedFile);
//         simulateUpload(selectedFile);
//       } else {
//         toast({
//           title: "Invalid file type",
//           description: "Please upload an image file (PNG, JPG, or SVG)",
//           variant: "destructive",
//         });
//       }
//     }
//   };

//   const simulateUpload = (file: File) => {
//     setIsUploading(true);
//     setTimeout(() => {
//       setIsUploading(false);
//       setUploadComplete(true);
//       toast({
//         title: "Upload successful!",
//         description: `${file.name} has been processed`,
//       });
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen pt-32 pb-20">
//       <div className="container mx-auto px-4 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-5xl lg:text-6xl font-bold mb-6">
//             <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
//               Upload & Visualize
//             </span>
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             Upload your 2D blueprints and watch them transform into interactive 3D models
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Upload Panel */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="space-y-6"
//           >
//             <div className="glass rounded-3xl p-8">
//               <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//                 <UploadIcon className="w-6 h-6 text-primary" />
//                 Upload Blueprint
//               </h2>

//               {/* Drop Zone */}
//               <div className="relative">
//                 <input
//                   type="file"
//                   id="file-upload"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   className="block border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center cursor-pointer hover:border-primary/60 transition-colors group"
//                 >
//                   <div className="flex flex-col items-center gap-4">
//                     <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <FileImage className="w-10 h-10 text-primary" />
//                     </div>
//                     <div>
//                       <p className="text-lg font-semibold mb-2">
//                         Drag & drop your blueprint here
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         or click to browse files
//                       </p>
//                       <p className="text-xs text-muted-foreground mt-2">
//                         PNG, JPG, or SVG (max 10MB)
//                       </p>
//                     </div>
//                   </div>
//                 </label>
//               </div>

//               {/* File Preview */}
//               {file && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="mt-6 glass rounded-2xl p-4 border border-primary/30"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
//                       <FileImage className="w-6 h-6 text-primary" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium truncate">{file.name}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {(file.size / 1024 / 1024).toFixed(2)} MB
//                       </p>
//                     </div>
//                     {isUploading && (
//                       <Loader2 className="w-5 h-5 animate-spin text-primary" />
//                     )}
//                     {uploadComplete && (
//                       <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </div>

//             {/* AI Suggestions */}
//             {uploadComplete && <AISuggestionsPanel />}
//           </motion.div>

//           {/* 3D Viewer */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             <ThreeDViewer />
//           </motion.div>
//         </div>

//         {/* Action Buttons */}
//         {uploadComplete && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="flex flex-wrap justify-center gap-4 mt-12"
//           >
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-primary to-accent hover:opacity-90 btn-magnetic"
//             >
//               <Sparkles className="mr-2 w-5 h-5" />
//               Share Project
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="glass border-secondary/50 hover:border-secondary"
//             >
//               <UploadIcon className="mr-2 w-5 h-5" />
//               Download Model
//             </Button>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Upload;
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload as UploadIcon, FileImage, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { useUpload } from "@/hooks/useUpload";             // ⭐ REAL UPLOAD HOOK
import ThreeDViewer from "@/components/ThreeDViewer";
import AISuggestionsPanel from "@/components/AISuggestionsPanel";

const Upload = () => {
  const { upload, loading, modelUrl, maskUrl, error } = useUpload();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInput = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  // When user selects file:
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const selected = e.target.files[0];

    if (!selected.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload PNG, JPG, or SVG",
        variant: "destructive",
      });
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));

    handleUpload(selected); // ⭐ immediately send to backend
  };

  // Actual backend upload
  const handleUpload = async (f: File) => {
    try {
      await upload(f);

      toast({
        title: "Upload successful!",
        description: `${f.name} processed successfully.`,
      });
    } catch (err) {
      toast({
        title: "Upload failed",
        description: error || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Upload & Visualize
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your 2D blueprints and watch them transform into interactive 3D models
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT PANEL – UPLOAD */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <UploadIcon className="w-6 h-6 text-primary" />
                Upload Blueprint
              </h2>

              {/* DROPZONE */}
              <div className="relative">
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <label
                  onClick={() => fileInput.current?.click()}
                  className="block border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center cursor-pointer hover:border-primary/60 transition-colors group"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileImage className="w-10 h-10 text-primary" />
                    </div>

                    <div>
                      <p className="text-lg font-semibold mb-2">Drag & drop your blueprint here</p>
                      <p className="text-sm text-muted-foreground">or click to browse files</p>
                      <p className="text-xs text-muted-foreground mt-2">PNG, JPG, or SVG (max 10MB)</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* FILE CARD */}
              {file && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 glass rounded-2xl p-4 border border-primary/30"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <FileImage className="w-6 h-6 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    {loading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                    {!loading && modelUrl && <Sparkles className="w-5 h-5 text-secondary animate-pulse" />}
                  </div>

                  {/* IMAGE PREVIEW */}
                  {preview && (
                    <img
                      src={preview}
                      className="rounded-xl w-full max-h-72 object-contain border border-primary/20 shadow-lg"
                    />
                  )}
                </motion.div>
              )}

            </div>

            {/* AI Suggestions */}
            {modelUrl && <AISuggestionsPanel />}
          </motion.div>

          {/* RIGHT PANEL – 3D VIEWER */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ThreeDViewer modelUrl={modelUrl} maskUrl={maskUrl} />
          </motion.div>

        </div>

        {/* BUTTONS */}
        {modelUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 btn-magnetic"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Share Project
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="glass border-secondary/50 hover:border-secondary"
              onClick={() => window.open(modelUrl, "_blank")}
            >
              <UploadIcon className="mr-2 w-5 h-5" />
              Download Model
            </Button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Upload;
