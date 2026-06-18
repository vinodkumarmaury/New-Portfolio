"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiCodechef, SiCodeforces, SiLeetcode, SiGmail, SiCodingninjas } from "react-icons/si";
import { FaPhoneAlt, FaDownload } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import GameCursor from "@/components/cursor/GameCursor";
import GamingBackground from "@/components/background/GamingBackground";
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";
import Skills from "@/app/components/skills/skills";
import Education from "@/app/components/education/education";
import Experience from "@/app/components/experience/experience";
import Contact from "@/app/components/contact/contact";
import Projects from "@/app/components/projects/projects";
import Achievements from "@/app/components/achievements/achievements";
import Shayari from "@/app/components/shayari/shayari";
import Appointment from "@/app/components/appointment/appointment";
import AIAssistant from "@/app/components/ai-assistant/ai-assistant";
import Skills3DGlobe from "@/app/components/skills3d/Skills3DGlobe";
import TiltCard3D from "@/app/components/interactive/TiltCard3D";
import Scene3D from "@/app/components/interactive/Scene3D";
import { useEffect, useState, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Rocket, MapPin, Feather, Code2, Plane, Star, Globe, Zap } from "lucide-react";

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: 500, height: 500 });
  const [isResumeHovered, setIsResumeHovered] = useState(false);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const interests = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Full-Stack Dev",
      description: "Building production-ready apps with React, Next.js, Django & FastAPI.",
      color: "#00e5ff",
      gradient: "from-cyan-500/20 to-blue-600/20",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Startup Founder",
      description: "Dreaming of building a billion-dollar startup. Big ideas, relentless hustle.",
      color: "#a855f7",
      gradient: "from-purple-500/20 to-pink-600/20",
    },
    {
      icon: <Feather className="w-6 h-6" />,
      title: "Shayar & Writer",
      description: "Writing shayari that blends code, life, and the journey from Bahraich to Bengaluru.",
      color: "#f59e0b",
      gradient: "from-yellow-500/20 to-orange-600/20",
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Travel Lover",
      description: "Every journey teaches. From mountains to code — exploration is my nature.",
      color: "#22c55e",
      gradient: "from-green-500/20 to-emerald-600/20",
    },
  ];

  const stats = [
    { icon: <Code2 className="w-6 h-6" />, number: "1000+", label: "Problems Solved", color: "#00e5ff" },
    { icon: <Star className="w-6 h-6" />, number: "12+", label: "Projects Shipped", color: "#a855f7" },
    { icon: <Globe className="w-6 h-6" />, number: "3+", label: "Years of Coding", color: "#22c55e" },
    { icon: <Zap className="w-6 h-6" />, number: "5+", label: "Internships & Jobs", color: "#f59e0b" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background relative overflow-hidden game-shell">
        <div className="bg-blob w-[34rem] h-[34rem] top-[-8rem] left-[-10rem] opacity-60"></div>
        <div className="bg-blob w-[38rem] h-[38rem] top-[28%] right-[-14rem] opacity-50" style={{ animationDelay: '-5s' }}></div>
        <div className="bg-blob w-80 h-80 bottom-[14%] left-[18%] opacity-30" style={{ animationDelay: '-2s' }}></div>
        <div className="bg-blob w-64 h-64 bottom-0 right-[12%] opacity-20" style={{ animationDelay: '-7s' }}></div>

        <GameCursor />
        <GamingBackground />

        {/* ══════════════════ HERO — PS5 PLAYER SELECT ══════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
          {/* Ambient beams */}
          <div className="hero-beam top-[-10%] left-[-8%]" />
          <div className="hero-beam bottom-[-14%] right-[-10%]" style={{ animationDelay: '-4s' }} />
          <div className="hero-grid-line absolute inset-0" />

          {/* Floating mini particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="hero-particle absolute"
                style={{ left: `${(i * 4.1) % 100}%`, top: `${(i * 7.3) % 100}%` }}
                animate={{ y: [0, -30, 0], opacity: [0.15, 0.7, 0.15] }}
                transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
            {/* Main hero grid */}
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

              {/* ── LEFT: Player Card (image + rings) ── */}
              <motion.div
                className="relative flex-shrink-0"
                initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 80 }}
                style={{ perspective: 800 }}
              >
                {/* Outer glow disc */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, rgba(0,229,255,0.6), rgba(168,85,247,0.5), rgba(34,197,94,0.4), rgba(0,229,255,0.6))",
                    filter: "blur(18px)",
                    borderRadius: "9999px",
                    inset: "-20px"
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />

                {/* Ring 3 — outermost */}
                <motion.div
                  className="absolute"
                  style={{
                    inset: "-28px", borderRadius: "9999px",
                    border: "1px dashed rgba(0,229,255,0.25)"
                  }}
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                {/* Ring 2 */}
                <motion.div
                  className="absolute"
                  style={{
                    inset: "-14px", borderRadius: "9999px",
                    border: "1.5px solid rgba(168,85,247,0.4)",
                    boxShadow: "0 0 20px rgba(168,85,247,0.2)"
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                {/* Ring 1 */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    borderRadius: "9999px",
                    border: "2px solid rgba(0,229,255,0.6)",
                    boxShadow: "0 0 30px rgba(0,229,255,0.3), inset 0 0 20px rgba(0,229,255,0.08)"
                  }}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Profile image with 3D tilt */}
                <TiltCard3D maxTilt={18} glare scale={1.05} className="relative z-10">
                  <Image
                    src="/images/profile.jpg"
                    alt="Vinod Kumar Maurya"
                    width={280}
                    height={280}
                    className="rounded-full object-cover border-4"
                    style={{
                      borderColor: "rgba(0,229,255,0.5)",
                      boxShadow: "0 0 40px rgba(0,229,255,0.4), 0 0 80px rgba(0,229,255,0.15)"
                    }}
                    priority
                  />
                </TiltCard3D>

                {/* Floating PS-style badges around image */}
                {[
                  { label: "×", top: "8%",  left: "92%",  color: "#00e5ff" },
                  { label: "○", top: "92%", left: "88%",  color: "#fbbf24" },
                  { label: "△", top: "5%",  left: "5%",   color: "#a855f7" },
                  { label: "□", top: "88%", left: "2%",   color: "#22c55e" },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border z-20"
                    style={{
                      top: b.top, left: b.left,
                      borderColor: b.color + "60",
                      backgroundColor: b.color + "18",
                      color: b.color,
                      boxShadow: `0 0 12px ${b.color}50`
                    }}
                    animate={{ y: [0, -6, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.4 }}
                  >
                    {b.label}
                  </motion.div>
                ))}

                {/* Level badge */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(168,85,247,0.15))",
                    borderColor: "rgba(0,229,255,0.5)",
                    color: "#00e5ff",
                    boxShadow: "0 0 20px rgba(0,229,255,0.3)"
                  }}
                  animate={{ boxShadow: ["0 0 20px rgba(0,229,255,0.3)", "0 0 35px rgba(0,229,255,0.6)", "0 0 20px rgba(0,229,255,0.3)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  LVL 26 • IIT KGP
                </motion.div>
              </motion.div>

              {/* ── RIGHT: Text + HUD ── */}
              <div className="flex-1 text-center lg:text-left">
                {/* Greeting */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 text-xs font-semibold tracking-[0.3em] uppercase"
                  style={{ borderColor: "rgba(0,229,255,0.3)", backgroundColor: "rgba(0,229,255,0.06)", color: "#00e5ff" }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  PLAYER ONLINE · SOFTWARE ENGINEER
                </motion.div>

                {/* Name */}
                <motion.h1
                  className="hero-name mb-3"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                >
                  Vinod Kumar<br />
                  <span style={{ backgroundImage: "linear-gradient(135deg, #00e5ff, #a855f7, #22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Maurya
                  </span>
                </motion.h1>

                {/* Typewriter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mb-6"
                >
                  <h3 className="hero-typewriter">
                    <Typewriter
                      options={{
                        strings: [
                          'Software Engineer 💻',
                          'IIT Kharagpur Grad 🎓',
                          'Startup Founder Wannabe 🚀',
                          'Shayar & Poet ✍️',
                          'Travel Lover 🌏',
                          'Full Stack Builder 🛠️',
                          'Billionaire in Progress 💰',
                          'Problem Solver ⚡',
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 40,
                        deleteSpeed: 30,
                      }}
                    />
                  </h3>
                </motion.div>

                {/* XP / Stat bars */}
                <motion.div
                  className="mb-6 space-y-2 max-w-sm mx-auto lg:mx-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  {[
                    { label: "Full-Stack",    val: 90, color: "#00e5ff" },
                    { label: "Problem Solving", val: 82, color: "#a855f7" },
                    { label: "Machine Learning", val: 70, color: "#22c55e" },
                    { label: "Startup Vision",  val: 95, color: "#fbbf24" },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-32 text-right flex-shrink-0">{bar.label}</span>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${bar.color}80, ${bar.color})`,
                            boxShadow: `0 0 8px ${bar.color}60`
                          }}
                          initial={{ width: "0%" }}
                          animate={{ width: `${bar.val}%` }}
                          transition={{ duration: 1.2, delay: 1.3 + i * 0.1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-xs font-bold w-8" style={{ color: bar.color }}>{bar.val}</span>
                    </div>
                  ))}
                </motion.div>

                {/* HUD Panels */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.4 }}
                >
                  <motion.div
                    className="glass-panel panel-border hud-corners neon-border-animated os-window"
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="hud-title">Status</div>
                    <div className="hud-value text-xl">SWE @ Machani</div>
                    <p className="hud-caption">Bengaluru · IIT KGP ʼ26</p>
                  </motion.div>
                  <motion.div
                    className="glass-panel panel-border hud-corners neon-border-animated os-window"
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="hud-title">Mission</div>
                    <div className="hud-value text-xl" style={{ color: "#a855f7" }}>Startup + Billion$</div>
                    <p className="hud-caption">No limits. Relentless.</p>
                  </motion.div>
                  <motion.div
                    className="glass-panel panel-border hud-corners neon-border-animated os-window"
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="hud-title">Vibe</div>
                    <div className="hud-value text-xl" style={{ color: "#22c55e" }}>Code × Shayari</div>
                    <p className="hud-caption">Code day, write night.</p>
                  </motion.div>
                </motion.div>

                {/* Social icons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.6 }}
                >
                  <ul className="hero-social-icons justify-center lg:justify-start">
                    {[
                      { href: "https://www.linkedin.com/in/vinod-maurya/",                       icon: <i className="fab fa-linkedin-in" /> },
                      { href: "https://github.com/vinodkumarmaury",                               icon: <i className="fa-brands fa-github" /> },
                      { href: "https://x.com/its_vinod_kr",                                      icon: <i className="fa-brands fa-twitter" /> },
                      { href: "https://www.instagram.com/vinodmaurya0410/",                       icon: <i className="fa-brands fa-instagram" /> },
                      { href: "https://www.codechef.com/users/vinodmaurya",                       icon: <i><SiCodechef /></i> },
                      { href: "https://codeforces.com/profile/vinod_kumar_maurya",                icon: <i><SiCodeforces /></i> },
                      { href: "https://leetcode.com/Vinod_Kumar_Maurya/",                        icon: <i><SiLeetcode /></i> },
                      { href: "https://www.codingninjas.com/studio/profile/Vinod_IITKGP",        icon: <i><SiCodingninjas /></i> },
                      { href: "mailto:vinodmaurya0410@gmail.com",                                icon: <i><SiGmail /></i> },
                      { href: "tel:9305627067",                                                   icon: <i><FaPhoneAlt /></i> },
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ scale: 1.25, y: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Link href={item.href} target="_blank" rel="noreferrer">{item.icon}</Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="flex flex-col items-center mt-12 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Scroll to explore</span>
              <motion.div
                className="w-5 h-8 rounded-full border-2 border-primary/40 flex justify-center pt-1.5"
                animate={{ borderColor: ["rgba(0,229,255,0.3)", "rgba(0,229,255,0.8)", "rgba(0,229,255,0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-2 rounded-full bg-primary"
                  animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════ ABOUT — PS5 CHARACTER PROFILE ══════════════════ */}
        <section id="about" className="py-20 relative overflow-hidden">
          {/* Section ambient glow */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,229,255,0.04), transparent 70%)", filter: "blur(40px)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.04), transparent 70%)", filter: "blur(40px)" }} />

          <div className="container px-4 mx-auto">
            {/* Section header */}
            <motion.div
              className="flex flex-col items-center mb-14"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
                <span className="text-xs tracking-[0.4em] uppercase text-primary/80 font-semibold">Player Profile</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3 gaming-title">
                About Me
              </h2>
              <p className="text-muted-foreground text-center max-w-xl">
                Engineer · Builder · Shayar · Dreamer · Traveller
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">

              {/* ── LEFT: Character Card ── */}
              <div className="lg:col-span-4 space-y-5">

                {/* Profile card */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden border hud-corners os-window"
                  style={{ borderColor: "rgba(0,229,255,0.2)", background: "linear-gradient(135deg, rgba(0,229,255,0.04), rgba(168,85,247,0.04))" }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ borderColor: "rgba(0,229,255,0.4)" }}
                >
                  {/* Top banner */}
                  <div className="relative h-24 overflow-hidden"
                    style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(168,85,247,0.12), rgba(34,197,94,0.08))" }}>
                    <div className="about-card-pattern absolute inset-0" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs tracking-[0.35em] uppercase text-white/40 font-medium">Character Info</span>
                    </div>
                    {/* PS symbols floating */}
                    {["×", "○", "△", "□"].map((s, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-sm font-bold"
                        style={{
                          top: `${20 + (i % 2) * 40}%`, left: `${10 + i * 22}%`,
                          color: ["#00e5ff","#fbbf24","#a855f7","#22c55e"][i],
                          opacity: 0.3
                        }}
                        animate={{ y: [0, -4, 0], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                      >{s}</motion.span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-4">
                    {[
                      { icon: <i className="fas fa-user" />, label: "Name", value: "Vinod Kumar Maurya", color: "#00e5ff" },
                      { icon: <MapPin className="w-4 h-4" />, label: "Location", value: "Bengaluru, Karnataka", color: "#22c55e" },
                      { icon: <i className="fas fa-graduation-cap" />, label: "Education", value: "Dual Degree — IIT KGP", sub: "Mining Engg. | CGPA 7.64", color: "#a855f7" },
                      { icon: <i className="fas fa-envelope" />, label: "Email", value: "vinodmaurya0410@gmail.com", color: "#fbbf24" },
                      { icon: <i className="fas fa-phone-alt" />, label: "Phone", value: "+91 9305627067", color: "#00e5ff" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex gap-3 items-start group"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                          style={{ backgroundColor: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                          <p className="text-sm font-medium">{item.value}</p>
                          {item.sub && <p className="text-xs" style={{ color: item.color }}>{item.sub}</p>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Resume download */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Link
                    href="https://drive.google.com/file/d/1ktC8iFLBrkRw3tH3J12rPjM5XR6-uGth/view?usp=sharing"
                    target="_blank"
                    className="download-resume-btn"
                    onMouseEnter={() => setIsResumeHovered(true)}
                    onMouseLeave={() => setIsResumeHovered(false)}
                  >
                    <FaDownload className="mr-2" />
                    Download Resume
                  </Link>

                  <AnimatePresence>
                    {isResumeHovered && (
                      <motion.div
                        className="resume-preview"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1.9 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.8 }}
                      >
                        <motion.div
                          className="resume-preview-inner"
                          initial={{ rotateY: 30 }}
                          animate={{ rotateY: 0, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image
                            src="/images/resume.png"
                            alt="Resume Preview"
                            width={550}
                            height={650}
                            className="rounded-md shadow-xl"
                          />
                          <div className="resume-preview-overlay">
                            <span>Click to view full resume</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Interests */}
                <motion.div
                  className="space-y-2.5"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {interests.map((interest, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl border bg-card/30 hud-corners"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                      whileHover={{ x: 6, borderColor: interest.color + "50", backgroundColor: interest.color + "08" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${interest.color}18`, color: interest.color }}
                      >
                        {interest.icon}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{interest.title}</p>
                        <p className="text-xs text-muted-foreground">{interest.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT: Story + Stats ── */}
              <div className="lg:col-span-8 space-y-6">

                {/* Journey timeline */}
                <motion.div
                  className="rounded-2xl border p-6 hud-corners os-window"
                  style={{ borderColor: "rgba(0,229,255,0.15)", background: "rgba(0,229,255,0.02)" }}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                    <span className="text-primary text-xl">◈</span>
                    My Story
                  </h3>

                  <div className="relative space-y-5">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[19px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(to bottom, rgba(0,229,255,0.4), rgba(168,85,247,0.4), rgba(0,229,255,0.1))" }} />

                    {[
                      { dot: "#00e5ff", symbol: "×", title: "Bahraich → IIT KGP", desc: "From a small UP town to IIT Kharagpur — Dual Degree in Mining Engg. (CGPA 7.64). An underdog story that proves grit over everything.", color: "#00e5ff" },
                      { dot: "#a855f7", symbol: "△", title: "Software Engineer @ Machani Group", desc: "Building scalable web apps with React, Next.js, Django & FastAPI. Previously interned at Enerzyflow, ClaimBuddy & Delishia Analytics — real code, real users, real impact.", color: "#a855f7" },
                      { dot: "#fbbf24", symbol: "○", title: "The Billion-Dollar Dream", desc: "Beyond the 9-to-5: I'm building toward my own startup. Thinking big, executing relentlessly — every line of code is a step toward a company that touches millions.", color: "#fbbf24" },
                      { dot: "#22c55e", symbol: "□", title: "Shayar & World Traveller", desc: "I write shayari that blends code with philosophy. When not shipping features, I'm exploring new cities, cultures and perspectives — staying human while being technical.", color: "#22c55e" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="relative flex gap-5 pl-10"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        {/* Timeline dot */}
                        <div
                          className="absolute left-0 top-1 w-10 h-10 rounded-full border flex items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{ borderColor: item.dot + "60", backgroundColor: item.dot + "15", color: item.dot, boxShadow: `0 0 12px ${item.dot}40` }}
                        >
                          {item.symbol}
                        </div>
                        <div className="flex-1 pb-1">
                          <h4 className="font-semibold text-sm mb-1.5" style={{ color: item.color }}>{item.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="stat-card hud-corners"
                      whileHover={{ y: -8, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className="stat-icon mb-3"
                        style={{ color: stat.color, backgroundColor: `${stat.color}20` }}
                      >
                        {stat.icon}
                      </div>
                      <motion.div
                        className="stat-number text-2xl font-bold"
                        style={{ color: stat.color }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="stat-label text-xs">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Competitive coding + Startup vision side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Coding ratings */}
                  <motion.div
                    className="rounded-xl border p-5 hud-corners"
                    style={{ borderColor: "rgba(0,229,255,0.15)", background: "rgba(0,229,255,0.02)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    whileHover={{ borderColor: "rgba(0,229,255,0.4)" }}
                  >
                    <h4 className="font-bold text-sm mb-4 text-primary flex items-center gap-2">
                      <span>⚡</span> Competitive Coding
                    </h4>
                    <div className="space-y-3">
                      {[
                        { platform: "LeetCode", rating: "1688", bar: 68, color: "#f59e0b" },
                        { platform: "Codeforces", rating: "1224", bar: 49, color: "#00e5ff" },
                        { platform: "CodeChef", rating: "3★", bar: 60, color: "#a855f7" },
                        { platform: "Problems Solved", rating: "1000+", bar: 90, color: "#22c55e" },
                      ].map((c, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{c.platform}</span>
                            <span className="font-bold" style={{ color: c.color }}>{c.rating}</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: c.color, boxShadow: `0 0 6px ${c.color}60` }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${c.bar}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Startup Vision */}
                  <motion.div
                    className="rounded-xl border p-5 hud-corners os-window"
                    style={{ borderColor: "rgba(168,85,247,0.2)", background: "linear-gradient(135deg, rgba(168,85,247,0.06), rgba(0,229,255,0.03))" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ borderColor: "rgba(168,85,247,0.5)" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(0,229,255,0.2))" }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Rocket className="w-5 h-5 text-purple-400" />
                      </motion.div>
                      <h4 className="font-bold text-sm text-purple-300">Startup Vision</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Every great startup begins with an obsessive founder.
                      <span className="text-purple-400 font-medium"> Building the foundation. The goal: impact millions.</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Problem Solver", "Product Thinker", "Tech First", "0→1 Builder"].map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ 3D INTERACTIVE ZONE ══════════════════ */}
        <section id="skills3d" className="py-20 relative overflow-hidden">
          {/* Floating 3D cubes canvas layer */}
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <Scene3D className="w-full h-full" />
          </div>

          <div className="container px-4 mx-auto relative z-10">
            {/* Header */}
            <motion.div
              className="flex flex-col items-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
                <span className="text-xs tracking-[0.4em] uppercase text-primary/80 font-semibold">3D Interactive</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3 gaming-title text-center">
                Skills Universe
              </h2>
              <p className="text-muted-foreground text-center max-w-xl">
                Every node is a skill — drag the sphere, scroll to zoom, click any node for details
              </p>
            </motion.div>

            {/* Globe + side info layout */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* 3D Globe */}
              <motion.div
                className="w-full lg:w-1/2 max-w-[520px]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Skills3DGlobe />
              </motion.div>

              {/* Right panel: quick stat cards */}
              <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-md lg:max-w-none">
                {[
                  { label: "Frontend", count: 9,  color: "#00e5ff", icon: "◈", desc: "React, Next.js, TypeScript & more" },
                  { label: "Backend",  count: 7,  color: "#a855f7", icon: "▲", desc: "Node, Django, FastAPI, Python" },
                  { label: "Database", count: 6,  color: "#22c55e", icon: "■", desc: "PostgreSQL, MongoDB, Redis" },
                  { label: "DevOps",   count: 6,  color: "#fbbf24", icon: "●", desc: "Docker, AWS, Git, CI/CD" },
                  { label: "ML / AI",  count: 6,  color: "#f97316", icon: "◆", desc: "TensorFlow, PyTorch, Pandas" },
                  { label: "CS & DSA", count: 5,  color: "#ec4899", icon: "✦", desc: "Algorithms, System Design" },
                ].map((cat, i) => (
                  <TiltCard3D key={i} maxTilt={12} glare>
                    <motion.div
                      className="rounded-xl border p-4 hud-corners h-full"
                      style={{
                        borderColor: cat.color + "30",
                        background: cat.color + "08",
                        transformStyle: "preserve-3d",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl" style={{ color: cat.color }}>{cat.icon}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: cat.color + "20", color: cat.color }}>
                          {cat.count} skills
                        </span>
                      </div>
                      <p className="font-bold text-sm mb-1">{cat.label}</p>
                      <p className="text-xs text-muted-foreground">{cat.desc}</p>
                      {/* mini bar */}
                      <div className="mt-3 h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: cat.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(cat.count / 9) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.07 }}
                        />
                      </div>
                    </motion.div>
                  </TiltCard3D>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ SKILLS ══════════════════ */}
        <Skills />

        {/* ══════════════════ EDUCATION ══════════════════ */}
        <Education />

        {/* ══════════════════ EXPERIENCE ══════════════════ */}
        <Experience />

        {/* ══════════════════ PROJECTS ══════════════════ */}
        <Projects />

        {/* ══════════════════ SHAYARI / SOCIAL ══════════════════ */}
        <Shayari />

        {/* ══════════════════ ACHIEVEMENTS ══════════════════ */}
        <Achievements />

        {/* ══════════════════ SCHEDULE APPOINTMENT ══════════════════ */}
        <Appointment />

        {/* ══════════════════ CONTACT ══════════════════ */}
        <Contact />
      </main>

      <Footer />

      {/* Floating AI Assistant */}
      <AIAssistant />
    </>
  );
}
