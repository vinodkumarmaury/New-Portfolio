"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiCodechef, SiCodeforces, SiLeetcode, SiGmail, SiCodingninjas } from "react-icons/si";
import { FaPhoneAlt, FaDownload } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";
import Skills from "@/app/components/skills/skills";
import Education from "@/app/components/education/education";
import Experience from "@/app/components/experience/experience";
import Contact from "@/app/components/contact/contact";
import Projects from "@/app/components/projects/projects";
import Achievements from "@/app/components/achievements/achievements";
import { useEffect, useState } from "react";

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: 500, height: 500 });
  const [isResumeHovered, setIsResumeHovered] = useState(false);

  useEffect(() => {
    // Only run on the client side
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with Next.js and Tailwind CSS",
      image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=2070&auto=format&fit=crop",
      github: "https://github.com/vinodkumarmaury/my-portfolio",
      demo: "https://vinod-kumar-maurya-portfolio.netlify.app/",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"]
    },
    // Add more projects here
  ];

  const skills = [
    { 
      category: "Frontend", 
      items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Material UI", "Bootstrap"] 
    },
    { 
      category: "Backend", 
      items: ["Node.js", "Express", "MongoDB", "SQL", "Firebase", "REST API"] 
    },
    { 
      category: "Tools & Others", 
      items: ["Git", "VS Code", "Postman", "Figma", "Redux", "TypeScript", "AWS"] 
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background"> 
        {/* Hero Section with improved animations */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary overflow-hidden">
          {/* Animated background elements */}
          <div className="hero-particles-container">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="hero-particle"
                initial={{
                  x: Math.random() * windowSize.width,
                  y: Math.random() * windowSize.height,
                  opacity: Math.random() * 0.5 + 0.1
                }}
                animate={{
                  x: Math.random() * windowSize.width,
                  y: Math.random() * windowSize.height,
                  opacity: Math.random() * 0.5 + 0.1
                }}
                transition={{
                  duration: Math.random() * 10 + 20,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
            ))}
          </div>

          <div className="hero-container relative z-10">
            <motion.div 
              className="hero-layout"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="hero-image-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Image 
                  src="/images/profile.jpg" 
                  alt="Vinod Kumar Maurya" 
                  width={300}
                  height={300}
                  className="hero-image"
                  priority
                />
              </motion.div>
              
              <motion.div 
                className="hero-content"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.h3 
                  className="hero-greeting"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Hello, I am
                </motion.h3>  
                <motion.h2 
                  className="hero-name"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Vinod Kumar Maurya 
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <h3 className="hero-typewriter">
                    <Typewriter        
                      options={{
                        strings: ['A Problem Solver', 'Loves Programming', "A Passionate Developer"],
                        autoStart: true,
                        loop: true,
                        delay: 40,
                        deleteSpeed: 40,
                      }}
                    />
                  </h3> 
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              id="name-social-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <ul className="hero-social-icons">
                {/* Your existing social links */}
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="https://www.linkedin.com/in/vinod-maurya/" target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="https://github.com/vinodkumarmaury" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github"></i>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="https://twitter.com/its_vinod_kr" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="https://www.facebook.com/profile.php?id=100046770062491" target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="https://www.instagram.com/im_vinod_maurya/" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="https://www.codechef.com/users/vinodmaurya" target="_blank" rel="noreferrer">
                    <i><SiCodechef /></i>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="https://codeforces.com/profile/vinod_kumar_maurya" target="_blank" rel="noreferrer">
                    <i><SiCodeforces/></i>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="https://www.codingninjas.com/studio/profile/Vinod_IITKGP" target="_blank" rel="noreferrer">
                    <i><SiCodingninjas/></i>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="mailto:vinodmaurya0410@gmail.com" target="_blank" rel="noreferrer">
                    <i><SiGmail/></i>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="https://leetcode.com/Vinod_Kumar_Maurya/" target="_blank" rel="noreferrer">
                    <i><SiLeetcode/></i>
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Link href="tel:9305627067" target="_blank" rel="noreferrer">
                    <i><FaPhoneAlt/></i>
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Professional About Me Section */}
        <section id="about" className="py-24 bg-background">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 relative about-heading">
                About Me
                <span className="about-heading-decoration"></span>
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl">
                Full Stack Developer with expertise in building modern, responsive web applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
              {/* Left Column - Personal Details */}
              <div className="md:col-span-4 space-y-6">
                <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border/40">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary p-6 relative">
                    <div className="about-card-pattern"></div>
                    <h3 className="text-xl font-semibold mb-3">
                      Personal Details
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <i className="fas fa-user"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">Name</h4>
                        <p className="text-muted-foreground">Vinod Kumar Maurya</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-muted-foreground">India</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-muted-foreground">vinodmaurya0410@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-muted-foreground">+91 9305627067</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Link 
                    href="https://drive.google.com/file/d/1ktC8iFLBrkRw3tH3J12rPjM5XR6-uGth/view?usp=sharing" 
                    target="_blank"
                    className="download-resume-btn"
                    onMouseEnter={() => setIsResumeHovered(true)}
                    onMouseLeave={() => setIsResumeHovered(false)}
                  >
                    <FaDownload className="mr-2" />
                    Download Resume
                  </Link>
                  
                  <AnimatePresence>
                    {isResumeHovered && (
                      <motion.div 
                        className="resume-preview"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1.9 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.8 }}
                      >
                        <motion.div 
                          className="resume-preview-inner"
                          initial={{ rotateY: 30 }}
                          animate={{ rotateY: 0, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image 
                            src="/images/resume.png" 
                            alt="Resume Preview" 
                            width={550} 
                            height={650} 
                            className="rounded-md shadow-xl"
                          />
                          <div className="resume-preview-overlay">
                            <span>Click to view full resume</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Right Column - Bio */}
              <div className="md:col-span-8 space-y-6">
                <div className="bg-card rounded-lg shadow-lg p-6 border border-border/40 bio-card">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <i className="fas fa-user-graduate mr-3 text-primary"></i>
                    Biography
                  </h3>
                  
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      I am a passionate Full Stack Developer with expertise in building modern web applications.
                      With a strong foundation in both frontend and backend technologies, I create efficient,
                      scalable, and user-friendly solutions that solve real-world problems.
                    </p>
                    
                    <p>
                      My journey in software development began with a fascination for creating interactive web experiences.
                      Over the years, I&apos;ve honed my skills across the entire development stack, from designing intuitive user
                      interfaces to architecting robust backend systems.
                    </p>
                    
                    <p>
                      I enjoy tackling complex challenges and continuously learning new technologies to stay at the
                      forefront of web development. When I&apos;m not coding, you can find me solving algorithmic problems
                      on platforms like LeetCode and CodeChef.
                    </p>
                  </div>
                </div>
                
                {/* Professional Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-code"></i>
                    </div>
                    <div className="stat-number">1000+</div>
                    <div className="stat-label">Problems Solved</div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-project-diagram"></i>
                    </div>
                    <div className="stat-number">10+</div>
                    <div className="stat-label">Projects Completed</div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-laptop-code"></i>
                    </div>
                    <div className="stat-number">3+</div>
                    <div className="stat-label">Years Coding Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <Skills />

        {/* Education Section */}
        <Education />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Achievements Section */}
        <Achievements />

        {/* Contact Section */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}