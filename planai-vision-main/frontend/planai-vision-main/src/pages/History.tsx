import { motion } from "framer-motion";

const History = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Project{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              History
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your generated 3D projects will appear here
          </p>
        </motion.div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24"
        >
          <div className="w-32 h-32 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
            <span className="text-6xl">📁</span>
          </div>

          <h3 className="text-3xl font-bold mb-2">No Projects Yet</h3>

          <p className="text-muted-foreground text-center max-w-lg">
            Once you upload blueprints and generate 3D visualizations, they will
            be saved here for quick access.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default History;
