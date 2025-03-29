"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Briefcase, Calendar, MapPin, Rocket, Monitor } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      title: "Full-Stack Developer Intern",
      company: "Delishia Analytics",
      location: "Remote",
      period: "Feb 2025 - Present",
      description: "Analyzing social media trends to assess public sentiment related to political parties. Providing data-driven recommendations to optimize campaign strategies and enhance voter outreach. Assisting in the collection and interpretation of electoral data and contributing to the development of AI-powered data analytics tools.",
      skills: ["Web Development", "NextJS", "Tailwind", "TypeScript", "Data Analysis", "AI", "Social Media Analytics", "Political Research"],
      logo: "/images/delishia-logo.png",
      color: "#3B82F6" // Blue color scheme
    },
    {
      title: "Underground Mine Development Intern",
      company: "Central Mine Planning & Design Institute, Coal India Limited",
      location: "Ranchi",
      period: "May 2024 - June 2024",
      description: "Analyzed geological reports and site conditions to identify optimal mining methods. Investigated borehole lithologs and mineralization patterns. Designed a comprehensive mine extraction plan using AutoCAD and MINEX software. Conducted ventilation analysis with VentSIM.",
      skills: ["AutoCAD", "MINEX", "VentSIM", "Mine Planning", "Geological Analysis"],
      logo: "/images/cmpdi.jpg",
      color: "#10B981" // Green color scheme
    },
    {
      title: "Tech Team Member",
      company: "Technology Mining Engineering Society",
      location: "IIT Kharagpur",
      period: "Sep 2022 - Jan 2023",
      description: "Collaborated with the team to design and create visually appealing, user-friendly websites. Assisted in troubleshooting and resolving website bugs. Proactively implemented new features and improvements to enhance user experience.",
      skills: ["Web Development", "UI/UX", "Troubleshooting", "Team Collaboration"],
      logo: "/images/TMES.jpeg",
      color: "#8B5CF6" // Purple color scheme
    }
  ];

  const timelineBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rocketControls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    timelineBoxRefs.current = timelineBoxRefs.current.slice(0, experiences.length);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [experiences.length]);

  const checkVisibility = () => {
    const viewportHeight = window.innerHeight;
    let maxVisibleArea = 0;
    let mostVisibleIndex = 0;

    timelineBoxRefs.current.forEach((box, index) => {
      if (!box) return;

      const rect = box.getBoundingClientRect();
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleArea = visibleBottom > visibleTop ? visibleBottom - visibleTop : 0;

      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        mostVisibleIndex = index;
      }
    });

    if (maxVisibleArea > 0) {
      setActiveIndex(mostVisibleIndex);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(checkVisibility);
    };

    window.addEventListener("scroll", handleScroll);
    checkVisibility();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (timelineBoxRefs.current[activeIndex]) {
      const activeBox = timelineBoxRefs.current[activeIndex];
      if (activeBox) {
        const boxRect = activeBox.getBoundingClientRect();
        const boxCenterY = boxRect.top + boxRect.height / 2;
        const timelineRect = document.getElementById("exp-timeline-divider")?.getBoundingClientRect();

        if (timelineRect) {
          const timelineTop = timelineRect.top;
          const timelineHeight = timelineRect.height;
          const boxRelativePosition = boxCenterY - timelineTop;
          const percentPosition = (boxRelativePosition / timelineHeight) * 100;

          const constrainedPosition = Math.max(10, Math.min(90, percentPosition));

          rocketControls.start({
            top: `${constrainedPosition}%`,
            transition: { duration: 0.6, ease: "easeInOut" }
          });
        }
      }
    }
  }, [activeIndex, rocketControls]);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const mainControls = useAnimation();

  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
    }
  }, [inView, mainControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const scrollToExperience = (index: number) => {
    setActiveIndex(index);
    const box = timelineBoxRefs.current[index];
    if (box) {
      const offset = 150;
      const boxTop = box.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: boxTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="experience" className="experience-section py-24 relative bg-gradient-to-b from-background to-secondary/10">
      <div className="exp-bg-pattern absolute inset-0 opacity-5"></div>

      <div className="container px-4 mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="mr-2 text-primary">
              <Briefcase className="inline-block h-8 w-8 mb-1" />
            </span>
            Professional Experience
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            ></motion.span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">My professional journey and work experience</p>
        </motion.div>

        {isMobile && (
          <div className="mb-10 px-4">
            <div className="flex justify-center space-x-2 mb-5">
              {experiences.map((exp, idx) => (
                <motion.button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${activeIndex === idx ? "bg-primary scale-125" : "bg-muted"}`}
                  onClick={() => scrollToExperience(idx)}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        )}

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={mainControls} className="exp-timeline">
          <div id="exp-timeline-divider" className="exp-timeline-divider">
            <div className="exp-timeline-line"></div>

            <motion.div className="exp-timeline-traveller" animate={rocketControls} initial={{ top: "10%" }}>
              <motion.div
                className="traveller-icon-container"
                animate={{
                  rotate: [0, 10, -10, 0],
                  y: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <Rocket className="h-6 w-6 text-white transform -rotate-45" />
              </motion.div>
            </motion.div>

            {experiences.map((_, idx) => (
              <motion.div
                key={`dot-${idx}`}
                className={`timeline-dot ${activeIndex === idx ? "active" : ""}`}
                style={{
                  top: `${15 + (idx * 70) / experiences.length}%`,
                  backgroundColor: activeIndex === idx ? experiences[idx].color : undefined
                }}
                animate={
                  activeIndex === idx
                    ? {
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 0 rgba(var(--primary), 0.4)",
                          "0 0 0 8px rgba(var(--primary), 0.1)",
                          "0 0 0 rgba(var(--primary), 0.4)"
                        ]
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: activeIndex === idx ? Infinity : 0 }}
                onClick={() => scrollToExperience(idx)}
              />
            ))}
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              ref={(el) => (timelineBoxRefs.current[index] = el)}
              className={`exp-timeline-box ${index % 2 === 0 || isMobile ? "exp-left" : "exp-right"} ${
                activeIndex === index ? "active-exp-timeline-box" : ""
              }`}
              variants={itemVariants}
              onHoverStart={() => setHoverIndex(index)}
              onHoverEnd={() => setHoverIndex(null)}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="exp-timeline-container"
                style={{
                  borderColor: hoverIndex === index ? exp.color : undefined,
                  boxShadow: hoverIndex === index ? `0 10px 30px -15px ${exp.color}40` : undefined
                }}
              >
                <div className="exp-timeline-header" style={{ backgroundColor: `${exp.color}10` }}>
                  <div className="exp-timeline-logo">
                    <div className="logo-wrapper" style={{ borderColor: `${exp.color}40` }}>
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        width={70}
                        height={70}
                        className="exp-logo-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/70?text=Company";
                        }}
                      />
                    </div>
                  </div>

                  <div className="exp-header-content">
                    <h3 className="exp-designation" style={{ color: exp.color }}>
                      {exp.title}
                    </h3>
                    <h4 className="exp-company">{exp.company}</h4>

                    <div className="exp-meta">
                      <div className="exp-meta-item">
                        <MapPin className="exp-meta-icon" style={{ color: exp.color }} />
                        <span>{exp.location}</span>
                      </div>

                      <div className="exp-meta-item">
                        <Calendar className="exp-meta-icon" style={{ color: exp.color }} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="exp-timeline-body">
                  <p className="exp-description">{exp.description}</p>

                  <h5 className="exp-skills-heading">
                    <Monitor className="h-4 w-4 mr-1.5" style={{ color: exp.color }} />
                    Skills & Technologies
                  </h5>

                  <div className="exp-skills-container">
                    {exp.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="exp-skill"
                        style={{
                          backgroundColor: `${exp.color}15`,
                          color: exp.color,
                          borderColor: `${exp.color}30`
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * skillIndex }}
                        whileHover={{
                          backgroundColor: exp.color,
                          color: "white",
                          scale: 1.05
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="exp-active-indicator"
                  style={{ backgroundColor: exp.color }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    width: activeIndex === index ? "4px" : "0px"
                  }}
                  transition={{ duration: 0.3 }}
                />

                {hoverIndex === index && (
                  <motion.div
                    className="exp-shine"
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{ background: `linear-gradient(90deg, transparent, ${exp.color}20, transparent)` }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}