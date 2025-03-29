"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GraduationCap, Calendar, MapPin, Award, ChevronRight } from "lucide-react";

export default function Education() {
  const education = [ 
    {
      degree: "M.Tech Dual Degree (5Y) - Mining Engineering",
      institution: "IIT Kharagpur",
      year: "2021 - 2026",
      location: "Kharagpur, West Bengal",
      description: "Pursuing integrated dual degree in Mining Engineering with focus on mine automation, planning and design. Current CGPA: 8.56/10.",
      logo: "/images/iit-kharagpur-logo.png",
      achievements: [
        "Dean's List for Academic Excellence",
        "Department Rank 3"
      ],
      color: "#8C52FF"
    },
    {
      degree: "Class XII (UP Board)",
      institution: "RamBahadur Singh Inter College Bahraich",
      year: "2019 - 2021",
      location: "Bahraich, Uttar Pradesh",
      description: "Completed higher secondary education with focus on Physics, Chemistry, and Mathematics. Achieved 70% marks.",
      logo: "/images/RBS.jpg",
      achievements: [
        "Science Exhibition Winner"
      ],
      color: "#1E90FF"
    },
    {
      degree: "Class X (CBSE)",
      institution: "Jawahar Navodaya Vidyalaya Kirtanpur Bahraich",
      year: "2017 - 2019",
      location: "Kirtanpur, Bahraich",
      description: "Completed secondary education with distinction. Scored 94.8% marks, developing strong foundation in mathematics and sciences.",
      logo: "/images/Jawahar_Navodaya_Vidyalaya_logo.png",
      achievements: [
        "School Topper",
        "State Mathematics Olympiad Finalist"
      ],
      color: "#FF6B6B"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  
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
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="education" className="py-24 bg-gradient-to-b from-background to-background/80 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="mr-2 text-primary">
              <GraduationCap className="inline-block h-8 w-8 mb-1" />
            </span>
            Education
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            ></motion.span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            My academic journey and qualifications
          </p>
        </motion.div>

        {/* Timeline tabs for navigation */}
        <div className="education-timeline-nav mb-12 flex justify-center">
          {education.map((edu, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 mx-2 rounded-full relative z-10 ${activeIndex === index ? 'active-timeline-tab' : 'timeline-tab'}`}
              style={{
                backgroundColor: activeIndex === index ? `${edu.color}20` : 'transparent',
                color: activeIndex === index ? edu.color : 'inherit',
                borderColor: edu.color
              }}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <span className="text-sm md:text-base font-medium">{edu.year.split(' - ')[0]}</span>
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 bg-current rounded-full" 
                initial={{ width: "0%" }}
                animate={{ width: activeIndex === index ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              className={`education-card-wrapper ${activeIndex === index ? 'block' : 'hidden'}`}
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: activeIndex === index ? 1 : 0,
                scale: activeIndex === index ? 1 : 0.95,
                transition: { duration: 0.5 }
              }}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:border-primary/30 transition-all duration-300">
                <div className="md:flex">
                  {/* Left section with logo */}
                  <div className="md:w-1/3 p-6 bg-muted/30 flex flex-col items-center justify-center border-r border-border">
                    <div className="mb-6 w-32 h-32 rounded-full bg-background flex items-center justify-center p-4 shadow-md">
                      <Image
                        src={edu.logo}
                        alt={edu.institution}
                        width={100}
                        height={100}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-2" style={{ color: edu.color }}>{edu.degree}</h3>
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {edu.year}
                    </div>
                  </div>
                  
                  {/* Right section with details */}
                  <div className="md:w-2/3 p-6">
                    <div className="mb-5 pb-4 border-b border-border">
                      <h4 className="text-xl font-semibold mb-2">{edu.institution}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1.5" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      {edu.description}
                    </p>
                    
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="achievements-section">
                        <h5 className="flex items-center text-base font-semibold mb-3">
                          <Award className="h-5 w-5 mr-2 text-primary" />
                          Key Achievements
                        </h5>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {edu.achievements.map((achievement, i) => (
                            <motion.li 
                              key={i}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + (i * 0.2) }}
                            >
                              <ChevronRight className="h-5 w-5 mt-0.5 mr-1.5" style={{ color: edu.color }} />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Experience progress bar */}
                    {index === 0 && (
                      <div className="mt-6 pt-4 border-t border-border">
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="font-medium">Program Progress</span>
                          <span className="text-primary">60% Complete</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full rounded-full"
                            style={{ backgroundColor: edu.color }}
                            initial={{ width: 0 }}
                            animate={{ width: "60%" }}
                            transition={{ delay: 0.5, duration: 1 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Education timeline dots for visual effect */}
        <div className="edu-timeline-dots flex justify-center mt-10">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              className="mx-2 cursor-pointer"
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: activeIndex === index ? edu.color : "#ccc",
                  boxShadow: activeIndex === index ? `0 0 0 3px ${edu.color}30` : "none"
                }}
                animate={{ 
                  scale: activeIndex === index ? [1, 1.2, 1] : 1
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: activeIndex === index ? Infinity : 0,
                  repeatType: "reverse" 
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}