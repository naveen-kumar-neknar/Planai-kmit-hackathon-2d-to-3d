// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { Rocket, Mail, Lock, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import Auth3DBackground from "@/components/Auth3DBackground";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast({
//         title: "Passwords don't match",
//         description: "Please make sure both passwords are the same",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false);
//       toast({
//         title: "Account created! 🎉",
//         description: "Welcome to Plan AI",
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
//           <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />

//           <div className="text-center mb-8">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center animate-glow-pulse shadow-xl">
//               <Rocket className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
//               Start Your Journey
//             </h1>
//             <p className="text-muted-foreground">Create your Plan AI account</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium mb-2">
//                 Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Your name"
//                   required
//                   className="glass border-primary/30 focus:border-primary h-12 pl-11"
//                 />
//               </div>
//             </div>

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

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   id="confirmPassword"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                   className="glass border-primary/30 focus:border-primary h-12 pl-11"
//                 />
//               </div>
//             </div>

//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full h-12 bg-gradient-to-r from-accent to-secondary hover:opacity-90 btn-magnetic"
//             >
//               {isLoading ? "Creating account..." : "Sign Up"}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-muted-foreground">
//               Already have an account?{" "}
//               <Link to="/login" className="text-accent hover:text-secondary transition-colors font-medium">
//                 Login
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { Rocket, Mail, Lock, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import Auth3DBackground from "@/components/Auth3DBackground";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast({
//         title: "Passwords don't match",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLoading(true);

//     setTimeout(() => {
//       // Save user info
//       localStorage.setItem("username", name);
//       localStorage.setItem("email", email);

//       // ⭐ FIX: notify navbar instantly
//       window.dispatchEvent(new Event("auth-changed"));

//       setIsLoading(false);
//       toast({ title: "Account Created!", description: "Please log in now." });

//       navigate("/login");
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
//           <h1 className="text-4xl font-bold text-center mb-6">Create Account</h1>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label>Name</label>
//               <Input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

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

//             <div>
//               <label>Confirm Password</label>
//               <Input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <Button className="w-full" type="submit">
//               {isLoading ? "Creating..." : "Sign Up"}
//             </Button>
//           </form>

//           <p className="mt-6 text-center text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-primary font-semibold">
//               Login
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Auth3DBackground from "@/components/Auth3DBackground";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("username", name);
      localStorage.setItem("email", email);

      window.dispatchEvent(new Event("auth-changed"));

      setIsLoading(false);
      toast({ title: "Account Created!", description: "Please log in now." });

      navigate("/login");
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
          {/* ⭐ Square Box Logo With Animated Light Inside */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            {/* Square box */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary opacity-20 blur-xl absolute"></div>

            {/* Animated glowing light layer */}
            <motion.div
              className="absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary opacity-40"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.07, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Static Icon (Does NOT move) */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent via-secondary to-primary shadow-xl flex items-center justify-center relative z-10">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Text */}
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Start Your Journey
          </h1>

          <p className="text-center text-muted-foreground mb-6 text-lg">
            Create your Plan AI account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label>Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="glass border-primary/40 focus:border-primary h-12"
              />
            </div>

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

            <div>
              <label>Confirm Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="glass border-primary/40 focus:border-primary h-12"
              />
            </div>

            <Button className="w-full h-12 text-lg bg-gradient-to-r from-accent to-primary hover:opacity-90 btn-magnetic" type="submit">
              {isLoading ? "Creating..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
