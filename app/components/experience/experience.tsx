"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function Experience() {
  const experiences = [
    {
      title: "Data Research Intern",
      company: "Delishia Analytics",
      location: "Remote",
      period: "Feb 2025 - Present",
      description: "Analyzing social media trends to assess public sentiment related to political parties. Providing data-driven recommendations to optimize campaign strategies and enhance voter outreach. Assisting in the collection and interpretation of electoral data and contributing to the development of AI-powered data analytics tools.",
      skills: ["Data Analysis", "AI", "Social Media Analytics", "Political Research"],
      logo: "/images/delishia-logo.png"
    },
    {
      title: "Underground Mine Development Intern",
      company: "Central Mine Planning & Design Institute, Coal India Limited",
      location: "Ranchi",
      period: "May 2024 - June 2024",
      description: "Analyzed geological reports and site conditions to identify optimal mining methods. Investigated borehole lithologs and mineralization patterns. Designed a comprehensive mine extraction plan using AutoCAD and MINEX software. Conducted ventilation analysis with VentSIM.",
      skills: ["AutoCAD", "MINEX", "VentSIM", "Mine Planning", "Geological Analysis"],
      logo: "/images/coal-india-logo.png"
    },
    {
      title: "Tech Team Member",
      company: "Technology Mining Engineering Society",
      location: "IIT Kharagpur",
      period: "Sep 2022 - Jan 2023",
      description: "Collaborated with the team to design and create visually appealing, user-friendly websites. Assisted in troubleshooting and resolving website bugs. Proactively implemented new features and improvements to enhance user experience.",
      skills: ["Web Development", "UI/UX", "Troubleshooting", "Team Collaboration"],
      logo: "/images/tmes-logo.png"
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="experience-section py-24">
      <div className="container px-4 mx-auto">
        <motion.h1 
          className="section-heading mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="heading-icon">
            <i className="fas fa-briefcase"></i>
          </span>
          <span> Experience </span>
        </motion.h1>

        <div ref={ref} className="exp-timeline">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className={`exp-timeline-box ${index % 2 === 0 ? 'exp-left' : 'exp-right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="exp-timeline-container">
                <div className="exp-timeline-logo">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/120x130?text=Company";
                    }}
                  />
                </div>
                <h3 className="exp-designation">{exp.title}</h3>
                <h4 className="exp-company">{exp.company} - {exp.location}</h4>
                <h5 className="exp-duration">{exp.period}</h5>
                <p className="exp-description textAlignJustify">{exp.description}</p>
                
                <div className="exp-skills-container">
                  {exp.skills.map((skill, skillIndex) => (
                    <motion.span 
                      key={skillIndex} 
                      className="exp-skill"
                      whileHover={{ scale: 1.05, backgroundColor: "#3498db", color: "white" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          <div id="exp-timeline-divider">
            <motion.div 
              className="exp-timeline-traveller"
              initial={{ top: "10%" }}
              animate={{ top: ["10%", "80%", "10%"] }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
            >
              <div>
                <i className="fas fa-rocket icon"></i>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}