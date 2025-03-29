"use client";

import { School } from "lucide-react";
import { Card } from "@/components/ui/card";
import styles from "./education.module.css";

export default function Education() {
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Dr. Ram Manohar Lohia Avadh University",
      year: "2019 - 2023",
      description: "Studied core computer science subjects including Data Structures, Algorithms, Database Management, and Web Development. Participated in various coding competitions and technical workshops.",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"
    },
    {
      degree: "Intermediate (12th)",
      institution: "UP Board",
      year: "2017 - 2019",
      description: "Completed higher secondary education with focus on Physics, Chemistry, and Mathematics. Achieved excellent academic performance and participated in various extracurricular activities.",
      logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      degree: "High School (10th)",
      institution: "UP Board",
      year: "2015 - 2017",
      description: "Completed secondary education with distinction. Developed strong foundation in mathematics and science. Active participation in school activities and competitions.",
      logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="education" className="py-20 bg-[hsl(227,28%,13%)]">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2 text-white">
          <School className="h-8 w-8" />
          Education
        </h2>
        
        <div className={styles.timeline}>
          <div className={styles["timeline-divider"]}>
            <div className={styles["timeline-traveller"]}>
              <i className="fas fa-car-side"></i>
            </div>
          </div>
          
          {education.map((edu, index) => (
            <div key={index} className={styles["timeline-box"]}>
              <div className={styles["timeline-container"]}>
                <div className={styles["timeline-logo"]}>
                  <img src={edu.logo} alt={edu.institution} />
                </div>
                <h3 className="text-xl font-semibold text-[indianred]">{edu.degree}</h3>
                <p className="text-[gold] font-normal text-lg">{edu.institution}</p>
                <p className="text-[aliceblue] font-light">{edu.year}</p>
                <p className="mt-[60px] text-sm text-white font-bold leading-5 indent-4 text-justify">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}