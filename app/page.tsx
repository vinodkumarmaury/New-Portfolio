"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Education from "@/app/components/education/education";
import Experience from "@/app/components/experience/experience";
import Contact from "@/app/components/contact/contact";
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";

export default function Home() {
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
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary">
          <div className="container px-4 mx-auto text-center">
            <div className="mb-8 relative inline-block">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                alt="Profile"
                width={150}
                height={150}
                className="rounded-full border-4 border-primary"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Vinod Kumar Maurya</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">Full Stack Developer</p>
            <div className="flex gap-4 justify-center mb-8">
              <Button asChild variant="outline" size="icon">
                <Link href="https://github.com/vinodkumarmaury" target="_blank">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="https://linkedin.com/in/yourprofile" target="_blank">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="mailto:your.email@example.com">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <Button className="mr-4">
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-background">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground mb-6">
                I am a passionate Full Stack Developer with expertise in building modern web applications.
                With a strong foundation in both frontend and backend technologies, I create efficient,
                scalable, and user-friendly solutions that solve real-world problems.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-secondary">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.map((skillGroup, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <Education />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-background">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-secondary rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.github} target="_blank">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={project.demo} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}