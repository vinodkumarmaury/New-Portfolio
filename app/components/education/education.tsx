"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function Education() {
  const education = [ 
    {
      degree: "M.Tech Dual Degree (5Y) - Mining Engineering",
      institution: "IIT Kharagpur",
      year: "2021 - 2026",
      description: "Pursuing integrated dual degree in Mining Engineering with focus on mine automation, planning and design. Current CGPA: 7.56/10.",
      logo: "https://kgpchronicle.iitkgp.ac.in/wp-content/uploads/2018/09/iitkgp_logo.png"
    },
    {
      degree: "Class XII (UP Board)",
      institution: "RamBahadur Singh Inter College Bahraich",
      year: "2019 - 2021",
      description: "Completed higher secondary education with focus on Physics, Chemistry, and Mathematics. Achieved 70% marks.",
      logo: "/images/up-board-logo.png"
    },
    {
      degree: "Class X (CBSE)",
      institution: "Jawahar Navodaya Vidyalaya Kirtanpur Bahraich",
      year: "2017 - 2019",
      description: "Completed secondary education with distinction. Scored 94.8% marks, developing strong foundation in mathematics and sciences.",
      logo: "/images/jnv-logo.png"
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="education-section py-24">
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="section-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="heading-icon">
            <i className="fas fa-graduation-cap"></i>
          </span>
          <span> Education </span>
        </motion.h2>

        <div ref={ref} className="timeline">
          {education.map((edu, index) => (
            <motion.div 
              key={index} 
              className={`timeline-box ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="timeline-container">
                <div className="timeline-logo">
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/120x130?text=School";
                    }}
                  />
                </div>
                <h3 className="experienceDesignation">{edu.degree}</h3>
                <h4 className="experienceCompanyName">{edu.institution}</h4>
                <h5 className="experienceDuration">{edu.year}</h5>
                <p className="experienceDescription textAlignJustify">{edu.description}</p>
              </div>
            </motion.div>
          ))}

          <div id="timeline-divider">
            <motion.div 
              className="timeline-traveller"
              initial={{ top: "10%" }}
              animate={{ top: ["10%", "80%", "10%"] }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
            >
              <div>
                <i className="fas fa-car-side icon"></i>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}