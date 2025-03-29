"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Rock Mass Blasting Prediction System",
      description: "Created a machine-learning model using SVR, Random Forest, and XGBoost, achieving 85% prediction accuracy. Designed a NextJS frontend with FastAPI backend for real-time predictions and user-friendly experience. Optimized blasting operations through data-driven decision making, reducing costs by 10% and increasing efficiency.",
      image: "/images/projects/blasting.jpg",
      github: "https://github.com/vinodkumarmaury/rock-mass-blasting",
      demo: "https://rock-mass-blasting.vercel.app/",
      tech: ["NextJS", "FastAPI", "Machine Learning", "SVR", "Random Forest", "XGBoost"],
      date: "Dec 2024 - Jan 2025",
      supervisor: "Prof. Kaushik Dey | Mining Department IIT Kharagpur"
    },
    {
      title: "School Management System",
      description: "Engineered a robust and scalable system with ReactJS for seamless user interactions, increasing management efficiency by 30%. Integrated MongoDB and Express.JS frameworks for secure user authentication, enabling safe and efficient data handling processes. Implemented comprehensive grade tracking and attendance monitoring features, significantly reducing administrative workload by 15%.",
      image: "/images/projects/school.jpg",
      github: "https://github.com/vinodkumarmaury/school-management",
      demo: "https://school-management-system-vinod.vercel.app/",
      tech: ["ReactJS", "MongoDB", "Express.JS", "Node.js"],
      date: "Aug 2024 - Nov 2024",
      supervisor: "Self Project"
    },
    {
      title: "All-in-One Finance Website",
      description: "Built a finance platform using React.js, with features like calculators, transaction tracking, goal setting, and real-time stock market data via API. Integrated Supabase for secure data storage and dynamic charts for spending trends, category-wise distribution, and investment analysis. Enhanced UX with animations, responsive design and error handling, AI assistant with investment suggestions and resources for study.",
      image: "/images/projects/finance.jpg",
      github: "https://github.com/vinodkumarmaury/finance-website",
      demo: "https://finance-website-vinod.vercel.app/",
      tech: ["React.js", "Supabase", "API Integration", "Chart.js", "AI Assistant"],
      date: "Dec 2024 - Jan 2025",
      supervisor: "Self Project"
    },
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with Next.js and Tailwind CSS to showcase projects and skills.",
      image: "/images/projects/portfolio.jpg",
      github: "https://github.com/vinodkumarmaury/my-portfolio",
      demo: "https://vinod-kumar-maurya-portfolio.netlify.app/",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      date: "Feb 2025",
      supervisor: "Self Project"
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
        staggerChildren: 0.2,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative about-heading">
            Projects
            <span className="about-heading-decoration"></span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl">
            Showcasing my latest work and technical achievements
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={projectVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full project-card">
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-lg"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=2070&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <span className="bg-primary/90 text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                        {project.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.supervisor}</p>
                  </div>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="bg-secondary text-xs px-2 py-1 rounded-full text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}