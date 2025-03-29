"use client";

import { Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Experience() {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Company Name",
      period: "2023 - Present",
      description: "Working on full-stack web applications using modern technologies including React, Node.js, and cloud services."
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <Briefcase className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                  <p className="mt-2">{exp.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}