"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Skill icons mapping
const skillIcons: Record<string, string> = {
  // Programming Languages
  "HTML": "fab fa-html5",
  "CSS": "fab fa-css3-alt",
  "JavaScript": "fab fa-js",
  "Python": "fab fa-python",
  "C": "fas fa-code",
  "C++": "fas fa-code",
  "TypeScript": "fab fa-js",
  
  // Frameworks & Libraries
  "React": "fab fa-react",
  "ReactJS": "fab fa-react",
  "NextJS": "fab fa-react",
  "Next.js": "fab fa-react",
  "Node.js": "fab fa-node-js",
  "Express": "fab fa-node-js",
  "Bootstrap": "fab fa-bootstrap",
  "Tailwind CSS": "fab fa-css3",
  "Material UI": "fas fa-palette",
  
  // Databases
  "MongoDB": "fas fa-database",
  "SQL": "fas fa-database",
  "Firebase": "fas fa-fire",
  
  // Tools & Others
  "Git": "fab fa-git-alt",
  "GitHub": "fab fa-github", 
  "VS Code": "fas fa-code",
  "Postman": "fas fa-paper-plane",
  "Figma": "fab fa-figma",
  "Redux": "fas fa-layer-group",
  "REST API": "fas fa-exchange-alt",
  "AWS": "fab fa-aws",
  "Numpy": "fab fa-python",
  "Pandas": "fab fa-python",
  "Matplotlib": "fas fa-chart-line",
  "MATLAB": "fas fa-calculator",
  "AutoCAD": "fas fa-drafting-compass",
  "Jupyter": "fas fa-book-open",
  "Computational Methods": "fas fa-calculator",
  "Probability and Statistics": "fas fa-chart-bar",
  "Linear Algebra": "fas fa-superscript",
  "Advanced Calculus": "fas fa-infinity",
  "Mine Automation & Robotics": "fas fa-robot",
  "Mine Instrumentation": "fas fa-microscope",
  "Mineral Economics": "fas fa-chart-line",
  "Mine Survey": "fas fa-map-marked",
  "Mine Planning & Design": "fas fa-drafting-compass"
};

// Get proficiency percentage for demo purposes
const getSkillProficiency = (skill: string): number => {
  const baseProficiencies: Record<string, number> = {
    // Programming Languages
    "HTML": 95,
    "CSS": 90,
    "JavaScript": 88,
    "C": 85,
    "C++": 85,
    "Python": 80,
    "TypeScript": 80,
    
    // Frontend
    "React": 85,
    "ReactJS": 85,
    "Next.js": 82,
    "NextJS": 82,
    "Tailwind CSS": 90,
    "Material UI": 80,
    "Bootstrap": 85,
    
    // Backend
    "Node.js": 85,
    "Express": 82,
    "MongoDB": 78,
    "SQL": 75,
    "Firebase": 80,
    "REST API": 85,
    
    // Tools & Others
    "Git": 90,
    "GitHub": 88,
    "VS Code": 95,
    "Postman": 85,
    "Figma": 75,
    "Redux": 80,
    "AWS": 70,
    "Numpy": 75,
    "Pandas": 75,
    "Matplotlib": 70,
    "MATLAB": 65,
    "AutoCAD": 70,
    "Jupyter": 85,
    
    // Core & Mathematics
    "Computational Methods": 80,
    "Probability and Statistics": 85,
    "Linear Algebra": 80,
    "Advanced Calculus": 75,
    "Mine Automation & Robotics": 85,
    "Mine Instrumentation": 80,
    "Mineral Economics": 75,
    "Mine Survey": 70,
    "Mine Planning & Design": 80
  };
  
  return baseProficiencies[skill] || 75; // Default 75% if not specified
};

export default function Skills() {
  const skillCategories = [
    { 
      category: "Programming Languages", 
      items: ["HTML", "CSS", "JavaScript", "C", "C++", "Python", "TypeScript"] 
    },
    { 
      category: "Frontend & Libraries", 
      items: ["React", "NextJS", "Tailwind CSS", "Material UI", "Bootstrap", "Redux"] 
    },
    { 
      category: "Backend & Databases", 
      items: ["Node.js", "Express", "MongoDB", "SQL", "Firebase", "REST API"] 
    },
    { 
      category: "Tools & Development", 
      items: ["Git", "GitHub", "VS Code", "Postman", "Figma", "AWS", "Jupyter"] 
    },
    {
      category: "Data Science",
      items: ["Numpy", "Pandas", "Matplotlib", "MATLAB"]
    },
    {
      category: "Mining Engineering",
      items: ["Mine Automation & Robotics", "Computational Methods", "Mineral Economics", "Mine Survey", "Mine Planning & Design"]
    }
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section id="skills" className="py-24 bg-background/50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative about-heading">
            Skills & Expertise
            <span className="about-heading-decoration"></span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl">
            My technical skills, tools and technologies I work with
          </p>
        </div>

        <motion.div 
          className="skills-container"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skillCategories.map((skillCategory, index) => (
              <motion.div
                key={skillCategory.category}
                className="skill-category-card"
                variants={categoryVariants}
                custom={index}
              >
                <div className="skill-category-header">
                  <h3 className="skill-category-title">
                    <span className="skill-category-icon">
                      {skillCategory.category === "Programming Languages" ? (
                        <i className="fas fa-laptop-code"></i>
                      ) : skillCategory.category === "Frontend & Libraries" ? (
                        <i className="fas fa-code"></i>
                      ) : skillCategory.category === "Backend & Databases" ? (
                        <i className="fas fa-server"></i>
                      ) : skillCategory.category === "Tools & Development" ? (
                        <i className="fas fa-tools"></i>
                      ) : skillCategory.category === "Data Science" ? (
                        <i className="fas fa-chart-line"></i>
                      ) : (
                        <i className="fas fa-drafting-compass"></i>
                      )}
                    </span>
                    {skillCategory.category}
                  </h3>
                </div>
                <div className="skill-items-container">
                  {skillCategory.items.map((skill, skillIndex) => {
                    const proficiency = getSkillProficiency(skill);
                    
                    return (
                      <motion.div
                        key={skill}
                        className="skill-item"
                        variants={skillVariants}
                        custom={skillIndex}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="skill-info">
                          <div className="skill-icon">
                            <i className={skillIcons[skill] || "fas fa-code"}></i>
                          </div>
                          <span className="skill-name">{skill}</span>
                        </div>
                        <div className="skill-bar-container">
                          <motion.div 
                            className="skill-bar"
                            initial={{ width: 0 }}
                            animate={{ width: `${proficiency}%` }}
                            transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                          ></motion.div>
                          <span className="skill-percentage">{proficiency}%</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}