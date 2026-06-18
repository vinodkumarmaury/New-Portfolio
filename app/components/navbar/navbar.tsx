"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
 
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Track which section is currently in view
      const sections = ["about", "skills3d", "skills", "education", "experience", "projects", "shayari", "achievements", "appointment", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }) || "home";
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "3D Skills", href: "#skills3d" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Shayari", href: "#shayari" },
    { name: "Meet", href: "#appointment" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/70 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent uppercase tracking-[0.25em]">
              Vinod Kumar
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 rounded-md ${
                    activeSection === item.href.replace('#', '') || 
                    (activeSection === 'home' && item.href === '#') 
                      ? "text-cyan-300 font-medium" 
                      : "text-foreground/70 hover:text-foreground"
                  } transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(0,229,255,0.12)]`}
                >
                  {item.name}
                  {(activeSection === item.href.replace('#', '') || 
                    (activeSection === 'home' && item.href === '#')) && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <motion.div
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden border border-white/10 bg-white/5 backdrop-blur-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden glass-card rounded-b-2xl shadow-lg overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div 
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-4 py-2.5 text-base font-medium rounded-md ${
                        activeSection === item.href.replace('#', '') || 
                        (activeSection === 'home' && item.href === '#') 
                          ? "text-primary bg-primary/5" 
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      } transition-all duration-200 hover:translate-x-1`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}