"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Trophy, Award, Code, Star, ExternalLink, ChevronRight } from "lucide-react";
import { SiCodechef, SiCodeforces, SiLeetcode, SiCodingninjas } from "react-icons/si";
import Confetti from 'react-confetti';

export default function Achievements() {
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  
  // Update window size for confetti
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Show confetti briefly on initial load
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const competitions = [
    {
      title: "Luminous Techno-X Hackathon 2024",
      position: "Semifinalist",
      description: "Developed an innovative Solar Energy Management Platform leveraging smart scheduling, advanced machine learning predictions, and real-time insights to optimize energy usage, reduce costs, and maximize savings by 30%, improving overall efficiency and sustainability.",
      date: "October 2024",
      icon: <Trophy className="h-8 w-8" />,
      color: "from-yellow-500 to-amber-600"
    }
  ];

  const codingProfiles = [
    {
      platform: "Coding Ninjas",
      rating: "2439",
      description: "Achieved a platform rating of 2439 after completing over 500 challenges across various difficulty levels.",
      icon: <SiCodingninjas size={32} />,
      link: "https://www.codingninjas.com/studio/profile/Vinod_IITKGP",
      color: "from-orange-500 to-rose-600",
      accent: "codingninjas", // Changed to CSS class identifier
      stats: [
        { label: "Problems Solved", value: "500+" },
        { label: "Contest Rating", value: "2439" },
        { label: "Global Rank", value: "Top 5%" }
      ]
    },
    {
      platform: "Codeforces",
      rating: "1179",
      description: "Earned a platform rating of 1179, demonstrating problem-solving proficiency with 100+ solved problems.",
      icon: <SiCodeforces size={32} />,
      link: "https://codeforces.com/profile/vinod_kumar_maurya",
      color: "from-blue-500 to-indigo-600",
      accent: "codeforces", // Changed to CSS class identifier
      stats: [
        { label: "Problems Solved", value: "100+" },
        { label: "Contest Rating", value: "1179" },
        { label: "Max Rating", value: "1204" }
      ]
    },
    {
      platform: "LeetCode",
      rating: "1633",
      description: "Secured a platform rating of 1633 by solving 200+ algorithmic challenges and optimizing solutions.",
      icon: <SiLeetcode size={32} />,
      link: "https://leetcode.com/Vinod_Kumar_Maurya/",
      color: "from-yellow-500 to-orange-600",
      accent: "leetcode", // Changed to CSS class identifier
      stats: [
        { label: "Problems Solved", value: "200+" },
        { label: "Contest Rating", value: "1633" },
        { label: "Acceptance Rate", value: "65%" }
      ]
    },
    {
      platform: "CodeChef",
      rating: "3★",
      description: "Active participant in coding contests, solving complex algorithmic problems.",
      icon: <SiCodechef size={32} />,
      link: "https://www.codechef.com/users/vinodmaurya",
      color: "from-brown-500 to-amber-700",
      accent: "codechef", // Changed to CSS class identifier
      stats: [
        { label: "Star Rating", value: "3★" },
        { label: "Global Rank", value: "Top 20%" },
        { label: "Contests", value: "15+" }
      ]
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

  // Combined variants for cards (fixing duplicate variants error)
  const combinedCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.15)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    }
  };

  return (
    <section id="achievements" className="py-24 bg-gradient-to-b from-secondary/30 to-background/80 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="achievements-background-pattern absolute inset-0 opacity-5"></div>
      
      {/* Confetti effect */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={showConfetti ? 200 : 0}
          gravity={0.15}
          colors={['#FFD700', '#FFA500', '#4C7CFF', '#FFA116', '#FF6B6B']}
        />
      )}
      
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            Achievements
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            ></motion.span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mt-4">
            Recognition, milestones, and coding excellence
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Competitions with enhanced design */}
          <div>
            <motion.h3 
              className="text-2xl font-semibold mb-8 flex items-center relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="absolute left-0 w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center"
                animate={{ 
                  boxShadow: ["0 0 0 rgba(234, 179, 8, 0.4)", "0 0 15px rgba(234, 179, 8, 0.7)", "0 0 0 rgba(234, 179, 8, 0.4)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="h-5 w-5 text-white" />
              </motion.div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-700">
                Hackathons & Competitions
              </span>
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {competitions.map((comp, index) => (
                <motion.div
                  key={index}
                  variants={combinedCardVariants} // Using combined variants instead of duplicate props
                  whileHover="hover"
                  className="achievement-competition-card"
                >
                  <Card className="p-0 overflow-hidden border border-amber-200/20 dark:border-amber-900/20">
                    <div className="bg-gradient-to-r from-yellow-500/10 to-amber-600/10 px-6 py-4 border-b border-amber-200/20 dark:border-amber-900/20">
                      <div className="flex items-center gap-4">
                        <div className="achievement-trophy-icon">
                          {comp.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-amber-900 dark:text-amber-400">{comp.title}</h4>
                          <div className="flex items-center mt-1">
                            <div className="achievement-badge">
                              {comp.position}
                            </div>
                            <span className="text-xs ml-2 text-muted-foreground">{comp.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground">{comp.description}</p>
                      
                      <motion.div 
                        className="mt-4 flex justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="w-20 h-20 relative achievement-stamp">
                          <div className="w-full h-full rounded-full border-2 border-amber-600/30 flex items-center justify-center rotate-12">
                            <span className="text-xs font-bold text-amber-600/80 tracking-wider">SEMIFINAL</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Coding Profiles with fancy interactive cards */}
          <div>
            <motion.h3 
              className="text-2xl font-semibold mb-8 flex items-center relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div 
                className="absolute left-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center"
                animate={{ 
                  boxShadow: ["0 0 0 rgba(59, 130, 246, 0.4)", "0 0 15px rgba(59, 130, 246, 0.7)", "0 0 0 rgba(59, 130, 246, 0.4)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Code className="h-5 w-5 text-white" />
              </motion.div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                Coding Profiles
              </span>
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {codingProfiles.map((profile, index) => (
                <motion.div
                  key={index}
                  variants={combinedCardVariants} // Using combined variants instead of duplicate props
                  className="h-full"
                  onHoverStart={() => setSelectedProfile(index)}
                  onHoverEnd={() => setSelectedProfile(null)}
                  whileHover="hover"
                >
                  <Card className="coding-profile-card border-0 overflow-hidden h-full relative">
                    <div className={`absolute inset-0 coding-profile-bg bg-gradient-to-br ${profile.color} opacity-10`}></div>
                    <div className="p-6 relative h-full flex flex-col">
                      <div className="flex flex-col items-center text-center mb-4">
                        <motion.div 
                          className={`platform-icon-container platform-container-${profile.accent} mb-4`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className={`platform-icon platform-text-${profile.accent}`}>
                            {profile.icon}
                          </div>
                        </motion.div>
                        <h4 className="font-bold text-lg">{profile.platform}</h4>
                        <motion.div 
                          className={`rating-badge platform-bg-${profile.accent} mt-2`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {profile.rating}
                        </motion.div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground text-center flex-grow">
                        {profile.description}
                      </p>
                      
                      {/* Stats that appear on hover */}
                      <AnimatePresence>
                        {selectedProfile === index && (
                          <motion.div 
                            className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-primary/10"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {profile.stats.map((stat, statIndex) => (
                              <motion.div 
                                key={statIndex} 
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: statIndex * 0.1 + 0.2 }}
                              >
                                <span className="text-xs text-muted-foreground">{stat.label}</span>
                                <span className={`font-bold text-sm platform-text-${profile.accent}`}>
                                  {stat.value}
                                </span>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <motion.a 
                        href={profile.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`mt-4 w-full view-profile-button platform-border-${profile.accent} platform-text-${profile.accent} group`}
                        whileHover={{ 
                          scale: 1.02,
                        }}
                      >
                        <span>View Profile</span>
                        <ExternalLink size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </motion.a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}