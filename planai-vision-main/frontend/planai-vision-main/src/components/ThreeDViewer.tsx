import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

// Loader UI
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="glass px-4 py-2 rounded-xl text-white text-sm">
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

// Load GLB model dynamically
const Model = ({ url }: { url: string }) => {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} scale={1} />;
};

interface ViewerProps {
  modelUrl: string | null;
  maskUrl?: string | null;
}

const ThreeDViewer = ({ modelUrl, maskUrl }: ViewerProps) => {
  return (
    <div className="glass rounded-3xl p-8 h-full min-h-[600px]">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-secondary">3D</span> Live Preview
      </h2>

      <div className="relative h-[500px] rounded-2xl overflow-hidden border border-primary/20 bg-background">

        {!modelUrl ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Upload an image to generate the 3D model
          </div>
        ) : (
          <Canvas
            camera={{ position: [6, 4, 6], fov: 50 }}
            shadows
            gl={{ antialias: true }}
          >
            <Suspense fallback={<Loader />}>
              {/* Actual GLB Model */}
              <Model url={modelUrl} />

              {/* Environment lighting */}
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <Environment preset="city" />

              {/* Controls */}
              <OrbitControls
                enableZoom
                enablePan
                autoRotate
                autoRotateSpeed={0.7}
              />
            </Suspense>
          </Canvas>
        )}

        {/* Mask Preview as overlay (optional) */}
        {maskUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 bg-black/60 p-2 rounded-xl"
          >
            <img
              src={maskUrl}
              alt="Mask"
              className="w-32 h-32 object-contain rounded-md border border-white/10"
            />
          </motion.div>
        )}

        {/* Rotation + zoom instructions */}
        <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-full text-sm">
          <span className="text-muted-foreground">
            Click & drag to rotate • Scroll to zoom
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThreeDViewer;
