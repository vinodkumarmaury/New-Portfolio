"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  FaLinkedinIn, 
  FaGithub, 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronUp
} from "react-icons/fa";
import { 
  SiCodechef, 
  SiCodeforces, 
  SiCodingninjas,
  SiGmail,
  SiLeetcode
} from "react-icons/si";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const checkScrollPosition = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Social links data with icons and URLs
  const socialLinks = [
    { name: "LinkedIn", icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/vinod-maurya/" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/vinodkumarmaury" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com/its_vinod_kr" },
    { name: "Facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/profile.php?id=100046770062491" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/im_vinod_maurya/" },
    { name: "CodeChef", icon: <SiCodechef />, url: "https://www.codechef.com/users/vinodmaurya" },
    { name: "CodeForces", icon: <SiCodeforces />, url: "https://codeforces.com/profile/vinod_kumar_maurya" },
    { name: "CodingNinjas", icon: <SiCodingninjas />, url: "https://www.codingninjas.com/studio/profile/Vinod_IITKGP" },
    { name: "Gmail", icon: <SiGmail />, url: "mailto:vinodmaurya0410@gmail.com" },
    { name: "LeetCode", icon: <SiLeetcode />, url: "https://leetcode.com/Vinod_Kumar_Maurya/" },
    { name: "Phone", icon: <FaPhoneAlt />, url: "tel:9305627067" }
  ];

  // Quick links data
  const quickLinks = [
    { name: "Home", url: "#" },
    { name: "About", url: "#about" },
    { name: "Skills", url: "#skills" },
    { name: "Education", url: "#education" },
    { name: "Experience", url: "#experience" },
    { name: "Projects", url: "#projects" },
    { name: "Contact", url: "#contact" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="footer-section relative">
      {/* Scroll to top button */}
      <motion.button
        className={`scroll-to-top ${showScrollTop ? 'visible' : 'hidden'}`}
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0.5,
          y: showScrollTop ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
        }}
        aria-label="Scroll to top"
      >
        <FaChevronUp />
      </motion.button>
      
      {/* Wave SVG divider */}
      <div className="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path 
            fill="currentColor" 
            fillOpacity="1" 
            d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,69.3C840,64,960,32,1080,26.7C1200,21,1320,43,1380,53.3L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
      
      {/* Main footer content */}
      <div className="footer-content bg-secondary pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* About column */}
            <div className="md:col-span-4">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="footer-logo mb-4">
                  <h2 className="text-2xl font-bold text-primary">Vinod Kumar Maurya</h2>
                </motion.div>
                <motion.p variants={itemVariants} className="text-muted-foreground mb-4">
                  Full Stack Developer and Mining Engineer passionate about creating efficient and 
                  innovative solutions that bridge technology and engineering.
                </motion.p>
                <motion.div variants={itemVariants} className="mt-4">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <FaEnvelope className="h-4 w-4" />
                    <a href="mailto:vinodmaurya0410@gmail.com" className="hover:text-primary transition-colors">
                      vinodmaurya0410@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground mt-2">
                    <FaPhoneAlt className="h-4 w-4" />
                    <a href="tel:9305627067" className="hover:text-primary transition-colors">
                      +91 9305627067
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Quick links column */}
            <div className="md:col-span-3 md:col-start-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                <motion.h3 variants={itemVariants} className="text-lg font-semibold mb-4">
                  Quick Links
                </motion.h3>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <motion.li key={index} variants={itemVariants}>
                      <Link 
                        href={link.url}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                      >
                        <span className="mr-2">›</span> {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            {/* Social links column */}
            <div className="md:col-span-3 md:col-start-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                <motion.h3 variants={itemVariants} className="text-lg font-semibold mb-4">
                  Connect With Me
                </motion.h3>
                <motion.div 
                  variants={itemVariants}
                  className="social-icons-grid"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="social-icon-container"
                      whileHover={{ 
                        scale: 1.15,
                        backgroundColor: "var(--primary)",
                        color: "white"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Copyright */}
          <motion.div 
            className="border-t border-border/40 pt-6 text-center text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p>© {currentYear} Vinod Kumar Maurya. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Designed & Built with 
              <motion.span 
                className="text-red-500 mx-1 inline-block"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ♥
              </motion.span> 
              in India
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}