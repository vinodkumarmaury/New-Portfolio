"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Trophy, Award, Code, Star } from "lucide-react";
import { SiCodechef, SiCodeforces, SiLeetcode, SiCodingninjas } from "react-icons/si";

export default function Achievements() {
  const competitions = [
    {
      title: "Luminous Techno-X Hackathon 2024",
      position: "Semifinalist",
      description: "Developed an innovative Solar Energy Management Platform leveraging smart scheduling, advanced machine learning predictions, and real-time insights to optimize energy usage, reduce costs, and maximize savings by 30%, improving overall efficiency and sustainability.",
      date: "October 2024",
      icon: <Trophy className="h-8 w-8" />
    }
  ];

  const codingProfiles = [
    {
      platform: "Coding Ninjas",
      rating: "2439",
      description: "Achieved a platform rating of 2439 after completing over 500 challenges across various difficulty levels.",
      icon: <SiCodingninjas size={32} />,
      link: "https://www.codingninjas.com/studio/profile/Vinod_IITKGP"
    },
    {
      platform: "Codeforces",
      rating: "1179",
      description: "Earned a platform rating of 1179, demonstrating problem-solving proficiency with 100+ solved problems.",
      icon: <SiCodeforces size={32} />,
      link: "https://codeforces.com/profile/vinod_kumar_maurya"
    },
    {
      platform: "LeetCode",
      rating: "1633",
      description: "Secured a platform rating of 1633 by solving 200+ algorithmic challenges and optimizing solutions.",
      icon: <SiLeetcode size={32} />,
      link: "https://leetcode.com/Vinod_Kumar_Maurya/"
    },
    {
      platform: "CodeChef",
      rating: "3★",
      description: "Active participant in coding contests, solving complex algorithmic problems.",
      icon: <SiCodechef size={32} />,
      link: "https://www.codechef.com/users/vinodmaurya"
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section id="achievements" className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative about-heading">
            Achievements
            <span className="about-heading-decoration"></span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl">
            Competitions, coding profiles, and recognitions
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Competitions */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Trophy className="mr-3 text-primary" /> Hackathons & Competitions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competitions.map((comp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex gap-4">
                      <div className="bg-primary/10 rounded-full p-3 text-primary flex-shrink-0">
                        {comp.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{comp.title}</h4>
                        <div className="bg-primary/10 text-primary text-sm inline-block px-2 py-0.5 rounded mt-1 mb-2">
                          {comp.position}
                        </div>
                        <p className="text-muted-foreground text-sm">{comp.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">{comp.date}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Coding Profiles */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Code className="mr-3 text-primary" /> Coding Profiles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {codingProfiles.map((profile, index) => (
                <motion.a
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="no-underline"
                >
                  <Card className="p-6 h-full coding-profile-card">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 rounded-full p-4 text-primary mb-4">
                        {profile.icon}
                      </div>
                      <h4 className="font-semibold">{profile.platform}</h4>
                      <div className="bg-primary/80 text-primary-foreground text-lg font-bold px-3 py-1 rounded-full mt-2 mb-3">
                        {profile.rating}
                      </div>
                      <p className="text-muted-foreground text-sm">{profile.description}</p>
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}