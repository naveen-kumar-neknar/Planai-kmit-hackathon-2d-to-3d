// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { Sparkles, Mail, Lock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import Auth3DBackground from "@/components/Auth3DBackground";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false);
//       toast({
//         title: "Welcome back!",
//         description: "You've successfully logged in",
//       });
//       navigate("/");
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 relative">
//       <Auth3DBackground />
//       <div className="w-full max-w-md">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden"
//         >
//           {/* Decorative gradient */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />

//           <div className="text-center mb-8">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center animate-glow-pulse shadow-xl">
//               <Sparkles className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
//               Welcome to Plan AI
//             </h1>
//             <p className="text-muted-foreground">Sign in to continue your journey</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium mb-2">
//                 Email
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your.email@example.com"
//                   required
//                   className="glass border-primary/30 focus:border-primary h-12 pl-11"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                   className="glass border-primary/30 focus:border-primary h-12 pl-11"
//                 />
//               </div>
//             </div>

//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 btn-magnetic"
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-muted-foreground">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-primary hover:text-accent transition-colors font-medium">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { Mail, Lock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import Auth3DBackground from "@/components/Auth3DBackground";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const savedEmail = localStorage.getItem("email");
//     const savedName = localStorage.getItem("username");

//     setTimeout(() => {
//       setIsLoading(false);

//       if (email !== savedEmail) {
//         toast({ title: "Email not found", variant: "destructive" });
//         return;
//       }

//       // Login Successful
//       localStorage.setItem("loggedIn", "true");

//       // ⭐ FIX: notify navbar immediately
//       window.dispatchEvent(new Event("auth-changed"));

//       toast({
//         title: `Welcome back, ${savedName}!`,
//         description: "Login successful.",
//       });

//       navigate("/");
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 relative">
//       <Auth3DBackground />

//       <div className="w-full max-w-md">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="glass rounded-3xl p-8 lg:p-12"
//         >
//           <h1 className="text-4xl font-bold text-center mb-6">Login</h1>

//           <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//               <label>Email</label>
//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label>Password</label>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <Button className="w-full" type="submit">
//               {isLoading ? "Logging in..." : "Login"}
//             </Button>
//           </form>

//           <p className="mt-6 text-center text-sm">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-primary font-semibold">
//               Sign up
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Auth3DBackground from "@/components/Auth3DBackground";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const savedEmail = localStorage.getItem("email");
    const savedName = localStorage.getItem("username");

    setTimeout(() => {
      setIsLoading(false);

      if (email !== savedEmail) {
        toast({ title: "Email not found", variant: "destructive" });
        return;
      }

      localStorage.setItem("loggedIn", "true");

      // Notify navbar immediately
      window.dispatchEvent(new Event("auth-changed"));

      toast({
        title: `Welcome back, ${savedName}!`,
        description: "Login successful.",
      });

      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 relative">
      <Auth3DBackground />

      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden"
        >
          {/* ⭐ Square Box Logo (same as signup) */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            {/* Outer blurred glow */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary opacity-20 blur-xl absolute"></div>

            {/* Animated lighting layer */}
            <motion.div
              className="absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary opacity-40"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Static Logo */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary shadow-xl flex items-center justify-center relative z-10">
              <Sparkles className="w-9 h-9 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Welcome to Plan AI
          </h1>

          <p className="text-center text-muted-foreground mb-8 text-lg">
            Sign in to continue your journey
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label>Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass border-primary/40 focus:border-primary h-12"
              />
            </div>

            <div>
              <label>Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass border-primary/40 focus:border-primary h-12"
              />
            </div>

            <Button
              className="w-full h-12 text-lg btn-magnetic bg-gradient-to-r from-primary to-accent hover:opacity-90"
              type="submit"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
