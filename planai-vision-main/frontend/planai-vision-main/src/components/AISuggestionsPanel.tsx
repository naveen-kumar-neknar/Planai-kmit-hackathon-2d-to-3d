import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Maximize, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AISuggestionsPanel = () => {
  const { toast } = useToast();

  const suggestions = [
    { icon: Sparkles, label: "Add Windows", color: "from-primary to-accent" },
    { icon: Palette, label: "Recolor Walls", color: "from-accent to-secondary" },
    { icon: Maximize, label: "Optimize Layout", color: "from-secondary to-primary" },
    { icon: Lightbulb, label: "Smart Lighting", color: "from-primary to-secondary" },
  ];

  const handleSuggestion = (label: string) => {
    toast({
      title: "AI Processing",
      description: `Applying: ${label}...`,
    });
  };

  return (
    <div className="glass rounded-3xl p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-accent animate-pulse" />
        AI Suggestions
      </h2>

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              onClick={() => handleSuggestion(suggestion.label)}
              className={`w-full justify-start gap-3 h-14 bg-gradient-to-r ${suggestion.color} hover:opacity-90 transition-all btn-magnetic`}
            >
              <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center">
                <suggestion.icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{suggestion.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-primary/20">
        <p className="text-sm text-muted-foreground text-center">
          AI-powered suggestions based on your design
        </p>
      </div>
    </div>
  );
};

export default AISuggestionsPanel;
