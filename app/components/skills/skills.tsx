"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Skill icons mapping
const skillIcons: Record<string, string> = {
  "HTML": "fab fa-html5",
  "CSS": "fab fa-css3-alt",
  "JavaScript": "fab fa-js",
  "Python": "fab fa-python",
  "C": "fas fa-code",
  "C++": "fas fa-code",
  "TypeScript": "fab fa-js",
  "React": "fab fa-react",
  "NextJS": "fab fa-react",
  "Node.js": "fab fa-node-js",
  "Express": "fab fa-node-js",
  "Bootstrap": "fab fa-bootstrap",
  "Tailwind CSS": "fab fa-css3",
  "Material UI": "fas fa-palette",
  "MongoDB": "fas fa-database",
  "SQL": "fas fa-database",
  "Firebase": "fas fa-fire",
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

// Define proficiency levels for skills
enum ProficiencyLevel {
  Expert = "Expert",
  Advanced = "Advanced",
  Intermediate = "Intermediate",
  Learning = "Learning"
}

// Map skills to proficiency levels based on percentages
const getSkillProficiency = (skill: string): ProficiencyLevel => {
  const baseProficiencies: Record<string, number> = {
    "HTML": 95,
    "CSS": 90,
    "JavaScript": 88,
    "C": 85,
    "C++": 85,
    "Python": 80,
    "TypeScript": 80,
    "React": 85,
    "NextJS": 82,
    "Tailwind CSS": 90,
    "Material UI": 80,
    "Bootstrap": 85,
    "Node.js": 85,
    "Express": 82,
    "MongoDB": 78,
    "SQL": 75,
    "Firebase": 80,
    "REST API": 85,
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

  const proficiency = baseProficiencies[skill] || 75;

  if (proficiency >= 90) return ProficiencyLevel.Expert;
  if (proficiency >= 80) return ProficiencyLevel.Advanced;
  if (proficiency >= 65) return ProficiencyLevel.Intermediate;
  return ProficiencyLevel.Learning;
};

// Color mapping for proficiency levels
const proficiencyColors: Record<ProficiencyLevel, { bg: string, text: string, border: string }> = {
  [ProficiencyLevel.Expert]: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800"
  },
  [ProficiencyLevel.Advanced]: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800"
  },
  [ProficiencyLevel.Intermediate]: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800"
  },
  [ProficiencyLevel.Learning]: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800"
  }
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

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      if (!activeCategory) {
        setActiveCategory(skillCategories[0].category);
      }
    } else {
      controls.start("hidden");
    }
  }, [controls, inView, activeCategory, skillCategories]);

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
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: i * 0.05,
        type: "spring",
        stiffness: 100
      }
    }),
  };

  const getSkillCounts = (category: string) => {
    const items = skillCategories.find(cat => cat.category === category)?.items || [];
    const counts = {
      [ProficiencyLevel.Expert]: 0,
      [ProficiencyLevel.Advanced]: 0,
      [ProficiencyLevel.Intermediate]: 0,
      [ProficiencyLevel.Learning]: 0,
    };

    items.forEach(skill => {
      const proficiency = getSkillProficiency(skill);
      counts[proficiency]++;
    });

    return counts;
  };

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-background/50 to-background">
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
          <div className="skill-tabs-container mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {skillCategories.map((category, idx) => (
                <motion.button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    activeCategory === category.category
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-card hover:bg-primary/10 text-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={categoryVariants}
                  custom={idx}
                >
                  <span className="flex items-center gap-2">
                    {category.category === "Programming Languages" ? (
                      <i className="fas fa-laptop-code"></i>
                    ) : category.category === "Frontend & Libraries" ? (
                      <i className="fas fa-code"></i>
                    ) : category.category === "Backend & Databases" ? (
                      <i className="fas fa-server"></i>
                    ) : category.category === "Tools & Development" ? (
                      <i className="fas fa-tools"></i>
                    ) : category.category === "Data Science" ? (
                      <i className="fas fa-chart-line"></i>
                    ) : (
                      <i className="fas fa-drafting-compass"></i>
                    )}
                    {category.category}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="skills-visualization max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {skillCategories
                .filter(category => category.category === activeCategory)
                .map((category) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <motion.div
                      className="mb-10 p-6 bg-card rounded-xl shadow-lg border border-border/40 relative overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30"></div>
                      <h3 className="text-lg font-medium mb-4">Proficiency Levels</h3>

                      <div className="flex flex-wrap items-center gap-3">
                        {Object.entries(getSkillCounts(category.category)).map(([level, count]) => (
                          count > 0 && (
                            <div
                              key={level}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${proficiencyColors[level as ProficiencyLevel].border} ${proficiencyColors[level as ProficiencyLevel].bg}`}
                            >
                              <span className={`font-medium ${proficiencyColors[level as ProficiencyLevel].text}`}>
                                {level}
                              </span>
                              <span className="text-sm bg-background/40 w-5 h-5 flex items-center justify-center rounded-full">
                                {count}
                              </span>
                            </div>
                          )
                        ))}
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {category.items.map((skill, idx) => {
                        const proficiency = getSkillProficiency(skill);
                        const colors = proficiencyColors[proficiency];

                        return (
                          <motion.div
                            key={skill}
                            variants={skillVariants}
                            custom={idx}
                            className={`skill-card group p-5 rounded-xl border shadow-sm transition-all duration-300 ${colors.border}`}
                            whileHover={{
                              y: -5,
                              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                              transition: { duration: 0.2 }
                            }}
                            onMouseEnter={() => setHoveredSkill(skill)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`skill-icon-container w-12 h-12 flex items-center justify-center rounded-lg ${colors.bg}`}>
                                <i className={`${skillIcons[skill] || "fas fa-code"} text-xl ${colors.text}`}></i>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-lg font-medium">{skill}</h3>
                                  <span className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                                    {proficiency}
                                  </span>
                                </div>

                                <motion.div
                                  className="skill-details mt-1"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{
                                    height: hoveredSkill === skill ? "auto" : 0,
                                    opacity: hoveredSkill === skill ? 1 : 0
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {getSkillDescription(skill)}
                                  </p>
                                </motion.div>
                              </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-dashed border-muted flex justify-between items-center">
                              <div className="flex gap-1">
                                {Array.from({ length: getSkillRating(skill) }).map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className={`w-1.5 h-6 rounded-full ${colors.bg}`}
                                    initial={{ height: 0 }}
                                    animate={{ height: 6 + i * 2 }}
                                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {getSkillExperience(skill)}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const getSkillExperience = (skill: string): string => {
  const experienceMap: Record<string, string> = {
    "HTML": "4+ years",
    "CSS": "4+ years",
    "JavaScript": "3+ years",
    "Python": "3+ years",
    "React": "2+ years",
    "NextJS": "1+ years",
  };

  return experienceMap[skill] || "Regularly used";
};

const getSkillRating = (skill: string): number => {
  const proficiency = getSkillProficiency(skill);

  switch (proficiency) {
    case ProficiencyLevel.Expert: return 5;
    case ProficiencyLevel.Advanced: return 4;
    case ProficiencyLevel.Intermediate: return 3;
    case ProficiencyLevel.Learning: return 2;
    default: return 3;
  }
};

const getSkillDescription = (skill: string): string => {
  const descriptions: Record<string, string> = {
    "HTML": "Semantic markup, SEO best practices, accessibility",
    "CSS": "Modern layouts, animations, responsive design",
    "JavaScript": "ES6+, DOM manipulation, async programming",
    "React": "Component architecture, hooks, state management",
    "NextJS": "SSR, file-based routing, API routes",
    "Node.js": "REST APIs, middleware, performance optimization",
    "MongoDB": "Schema design, aggregation, indexing",
    "Python": "Data analysis, automation, scripting",
    "Git": "Version control, branching strategies, collaboration",
  };

  return descriptions[skill] || `${skill} implementation and best practices`;
};