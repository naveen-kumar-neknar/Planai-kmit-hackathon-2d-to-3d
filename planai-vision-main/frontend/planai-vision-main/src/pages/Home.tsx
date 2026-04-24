// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Play, Sparkles, Zap, Box } from "lucide-react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
// import heroImage from "@/assets/hero-3d.jpg";

// const AnimatedSphere = () => {
//   return (
//     <Float speed={2} rotationIntensity={1} floatIntensity={2}>
//       <Sphere args={[1, 100, 200]} scale={2.5}>
//         <MeshDistortMaterial
//           color="#8B5CF6"
//           attach="material"
//           distort={0.5}
//           speed={2}
//           roughness={0.2}
//           metalness={0.8}
//         />
//       </Sphere>
//     </Float>
//   );
// };

// const Home = () => {
//   const features = [
//     {
//       icon: Zap,
//       title: "AI-Powered 3D",
//       description: "Transform blueprints into stunning 3D models instantly",
//     },
//     {
//       icon: Sparkles,
//       title: "Real-Time Visualization",
//       description: "See your designs come to life in real-time",
//     },
//     {
//       icon: Box,
//       title: "Creative Design Flow",
//       description: "Intuitive tools for seamless creative workflow",
//     },
//   ];

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
//         {/* Background gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        
//         {/* Animated background */}
//         <div className="absolute inset-0 opacity-30">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
//           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
//         </div>

//         <div className="container mx-auto px-4 lg:px-8 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="text-left space-y-8"
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="inline-block"
//               >
//                 <div className="glass px-4 py-2 rounded-full inline-flex items-center gap-2 animate-pulse-glow">
//                   <Sparkles className="w-4 h-4 text-secondary" />
//                   <span className="text-sm font-medium">Next-Gen 3D Visualization</span>
//                 </div>
//               </motion.div>

//               <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
//                 <span className="block">Transform</span>
//                 <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
//                   2D Blueprints
//                 </span>
//                 <span className="block">into 3D Reality</span>
//               </h1>

//               <p className="text-xl text-muted-foreground max-w-xl">
//                 Experience the power of AI-driven visualization. Turn your architectural plans into stunning interactive 3D models in seconds.
//               </p>

//               <div className="flex flex-wrap gap-4">
//                 <Link to="/upload">
//                   <Button
//                     size="lg"
//                     className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all btn-magnetic text-lg px-8 py-6"
//                   >
//                     Try Now
//                     <Zap className="ml-2 w-5 h-5" />
//                   </Button>
//                 </Link>
//                 <Link to="/how-it-works">
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="glass border-primary/30 hover:border-primary/50 text-lg px-8 py-6"
//                   >
//                     <Play className="mr-2 w-5 h-5" />
//                     Explore
//                   </Button>
//                 </Link>
//               </div>

//               {/* Stats */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//                 className="flex gap-8 pt-4"
//               >
//                 <div>
//                   <div className="text-3xl font-bold text-primary">10K+</div>
//                   <div className="text-sm text-muted-foreground">Projects Created</div>
//                 </div>
//                 <div>
//                   <div className="text-3xl font-bold text-secondary">99%</div>
//                   <div className="text-sm text-muted-foreground">Accuracy Rate</div>
//                 </div>
//                 <div>
//                   <div className="text-3xl font-bold text-accent">2s</div>
//                   <div className="text-sm text-muted-foreground">Avg. Render Time</div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* Right - 3D Canvas */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="relative h-[500px] lg:h-[600px]"
//             >
//               <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
//                 <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//                   <ambientLight intensity={0.5} />
//                   <directionalLight position={[10, 10, 5]} intensity={1} />
//                   <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22D3EE" />
//                   <AnimatedSphere />
//                   <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
//                 </Canvas>
//               </div>
              
//               {/* Decorative elements */}
//               <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" />
//               <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-24 relative">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl lg:text-5xl font-bold mb-4">
//               <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                 Powerful Features
//               </span>
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Everything you need to bring your architectural visions to life
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="glass rounded-2xl p-8 hover-scale cursor-pointer group"
//               >
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
//                   <feature.icon className="w-8 h-8 text-primary-foreground" />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Zap, Box } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";

const AnimatedSphere = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#8B5CF6"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered 3D",
      description: "Transform blueprints into stunning 3D models instantly",
    },
    {
      icon: Sparkles,
      title: "Real-Time Visualization",
      description: "See your designs come to life in real-time",
    },
    {
      icon: Box,
      title: "Creative Design Flow",
      description: "Intuitive tools for seamless creative workflow",
    },
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <div className="glass px-4 py-2 rounded-full inline-flex items-center gap-2 animate-pulse-glow">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">Next-Gen 3D Visualization</span>
                </div>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block">Transform</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  2D Blueprints
                </span>
                <span className="block">into 3D Reality</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl">
                Experience the power of AI-driven visualization. Turn your architectural plans into stunning interactive 3D models in seconds.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/upload">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all btn-magnetic text-lg px-8 py-6"
                  >
                    Try Now
                    <Zap className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass border-primary/30 hover:border-primary/50 text-lg px-8 py-6"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    Explore
                  </Button>
                </Link>
              </div>

              {/* ⚠️ STATS REMOVED HERE — CLEAN CUT */}

            </motion.div>

            {/* Right - 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[500px] lg:h-[600px]"
            >
              <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22D3EE" />
                  <AnimatedSphere />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to bring your architectural visions to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 hover-scale cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
