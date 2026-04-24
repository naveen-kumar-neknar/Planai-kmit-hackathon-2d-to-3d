import { motion } from "framer-motion";
import { Upload, Brain, Eye, Download } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload",
      description: "Drag & drop your 2D blueprints in PNG, JPG, or SVG format",
      color: "from-primary to-accent",
    },
    {
      icon: Brain,
      title: "Analyze",
      description: "AI interprets your design structure and architectural elements",
      color: "from-accent to-secondary",
    },
    {
      icon: Eye,
      title: "Visualize",
      description: "Watch as your 2D plans transform into interactive 3D models",
      color: "from-secondary to-primary",
    },
    {
      icon: Download,
      title: "Export",
      description: "Download your 3D model in various formats for any platform",
      color: "from-primary to-accent",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            How <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Plan AI</span> Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your architectural blueprints into stunning 3D visualizations in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-30" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className="glass rounded-3xl p-8 hover-scale group cursor-pointer h-full">
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-lg animate-pulse-glow">
                  {index + 1}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:shadow-lg`}
                >
                  <step.icon className="w-10 h-10 text-foreground" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 glass rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Powered by Advanced AI
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Our state-of-the-art machine learning models analyze architectural patterns, 
            spatial relationships, and design intent to create accurate and beautiful 3D representations 
            of your blueprints in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-primary font-semibold">Deep Learning</span>
            </div>
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-secondary font-semibold">Computer Vision</span>
            </div>
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-accent font-semibold">Neural Networks</span>
            </div>
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-primary font-semibold">3D Rendering</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
