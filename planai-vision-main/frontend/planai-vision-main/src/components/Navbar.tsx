// import { Link, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Menu, X, Zap } from "lucide-react";
// import { useState } from "react";
// import { Button } from "./ui/button";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "How It Works", path: "/how-it-works" },
//     { name: "Upload", path: "/upload" },
//     { name: "History", path: "/history" },
//     { name: "Feedback", path: "/feedback" },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/20"
//     >
//       <div className="container mx-auto px-4 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="relative">
//               <Zap className="w-8 h-8 text-primary animate-pulse-glow" />
//               <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
//               Plan AI
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`relative font-medium transition-colors ${
//                   isActive(link.path)
//                     ? "text-primary"
//                     : "text-muted-foreground hover:text-foreground"
//                 }`}
//               >
//                 {link.name}
//                 {isActive(link.path) && (
//                   <motion.div
//                     layoutId="navbar-indicator"
//                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
//                     transition={{ type: "spring", stiffness: 380, damping: 30 }}
//                   />
//                 )}
//               </Link>
//             ))}
//           </div>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link to="/login">
//               <Button variant="ghost" className="text-foreground">
//                 Login
//               </Button>
//             </Link>
//             <Link to="/signup">
//               <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity btn-magnetic">
//                 Get Started
//               </Button>
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-foreground p-2"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//           className="md:hidden glass border-t border-primary/20"
//         >
//           <div className="container mx-auto px-4 py-6 space-y-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsOpen(false)}
//                 className={`block py-2 font-medium ${
//                   isActive(link.path) ? "text-primary" : "text-muted-foreground"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <div className="flex flex-col gap-3 pt-4">
//               <Link to="/login" onClick={() => setIsOpen(false)}>
//                 <Button variant="outline" className="w-full">
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/signup" onClick={() => setIsOpen(false)}>
//                 <Button className="w-full bg-gradient-to-r from-primary to-secondary">
//                   Get Started
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// };

// // export default Navbar;
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Zap } from "lucide-react";
// import { useState, useEffect } from "react";
// import { Button } from "./ui/button";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [username, setUsername] = useState<string | null>(null);
//   const location = useLocation();

//   useEffect(() => {
//     const stored = localStorage.getItem("username");
//     const logged = localStorage.getItem("loggedIn");

//     if (logged === "true" && stored) {
//       setUsername(stored);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("loggedIn");
//     window.location.reload();
//   };

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "How It Works", path: "/how-it-works" },
//     { name: "Upload", path: "/upload" },
//     { name: "History", path: "/history" },
//     { name: "Feedback", path: "/feedback" },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 70 }}
//       className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/20"
//     >
//       <div className="container mx-auto px-4 lg:px-8">
//         <div className="flex items-center justify-between h-20">

//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <motion.div
//               initial={{ rotate: -10, scale: 0.9 }}
//               animate={{ rotate: 0, scale: 1 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="relative"
//             >
//               <Zap className="w-8 h-8 text-primary animate-pulse-glow" />
//               <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
//             </motion.div>

//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
//             >
//               Plan AI
//             </motion.span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`relative font-medium transition-colors ${
//                   isActive(link.path)
//                     ? "text-primary"
//                     : "text-muted-foreground hover:text-foreground"
//                 }`}
//               >
//                 {link.name}
//                 {isActive(link.path) && (
//                   <motion.div
//                     layoutId="navbar-indicator"
//                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
//                     transition={{ type: "spring", stiffness: 380, damping: 30 }}
//                   />
//                 )}
//               </Link>
//             ))}
//           </div>

//           {/* Auth Buttons (Animated) */}
//           <div className="hidden md:flex items-center gap-4">
//             <AnimatePresence mode="wait">

//               {/* If logged in */}
//               {username ? (
//                 <motion.div
//                   key="loggedIn"
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="flex items-center gap-3"
//                 >
//                   <span className="font-medium text-primary">{username}</span>
//                   <Button
//                     variant="outline"
//                     onClick={handleLogout}
//                     className="hover:bg-destructive hover:text-white transition-all"
//                   >
//                     Logout
//                   </Button>
//                 </motion.div>
//               ) : (
//                 /* If logged out */
//                 <motion.div
//                   key="loggedOut"
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="flex items-center gap-4"
//                 >
//                   <Link to="/login">
//                     <Button variant="ghost" className="text-foreground">
//                       Login
//                     </Button>
//                   </Link>

//                   <Link to="/signup">
//                     <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity btn-magnetic">
//                       Get Started
//                     </Button>
//                   </Link>
//                 </motion.div>
//               )}

//             </AnimatePresence>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-foreground p-2"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const location = useLocation();

  // ⭐ FIX: Listen for login/signup updates
  useEffect(() => {
    const updateAuth = () => {
      const stored = localStorage.getItem("username");
      const logged = localStorage.getItem("loggedIn");

      if (logged === "true" && stored) {
        setUsername(stored);
      } else {
        setUsername(null);
      }
    };

    // Run once on load
    updateAuth();

    // Listen for login/signup/logout changes
    window.addEventListener("auth-changed", updateAuth);

    return () => window.removeEventListener("auth-changed", updateAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    window.dispatchEvent(new Event("auth-changed"));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Upload", path: "/upload" },
    { name: "History", path: "/history" },
    { name: "Feedback", path: "/feedback" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/20"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <Zap className="w-8 h-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >
              Plan AI
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            <AnimatePresence mode="wait">
              {username ? (
                <motion.div
                  key="loggedIn"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3"
                >
                  <span className="font-medium text-primary">{username}</span>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="hover:bg-destructive hover:text-white transition-all"
                  >
                    Logout
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="loggedOut"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-4"
                >
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-primary to-secondary">
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
