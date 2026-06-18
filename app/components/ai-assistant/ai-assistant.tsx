"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Minimize2, Sparkles, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const VINOD_KNOWLEDGE: Record<string, string> = {
  education: "I completed a Dual Degree (B.Tech + M.Tech) in Mining Engineering from IIT Kharagpur with a CGPA of 7.64. I graduated in 2026.",
  work: "I'm currently working as a Software Engineer at Machani Group in Bengaluru (May 2026 - Present). Previously I was at Enerzyflow India (Aug 2025 - Mar 2026), ClaimBuddy as an SDE intern (May - July 2025), and Delishia Analytics (Feb - Apr 2025).",
  skills: "My core stack is React, Next.js, Node.js, Express, Django, FastAPI, TypeScript, Python, MongoDB, MySQL, PostgreSQL, and Tailwind CSS. I'm also into Machine Learning with Python (scikit-learn, XGBoost).",
  projects: "Key projects include: Rock Mass Blasting Prediction System (FastAPI + Next.js + ML), TaskTrek (full-stack task management), Resume Analyzer AI Platform (Django + React + Gemini API), All-in-One Finance Website (React + Supabase), School Management System, and a Solar Energy Management Platform.",
  contact: "You can reach me at vinodmaurya0410@gmail.com or call +91 9305627067. I'm also on LinkedIn (vinod-maurya) and GitHub (vinodkumarmaury).",
  interests: "Besides coding, I love writing shayari (Urdu/Hindi poetry), travelling to new places, and exploring startup ideas. I dream of building my own startup and becoming a billionaire entrepreneur someday!",
  achievements: "I'm a semifinalist at Luminous Techno-X Hackathon 2024 (Solar Energy platform). I ranked 32nd out of 1600+ in HackerEarth World Water Day ML Challenge (top 2%). My LeetCode rating is 1688, Codeforces 1224, CodeChef 3 stars.",
  shayari: "I write shayari that blends the world of code with life philosophy. My verses often talk about late-night debugging sessions, startup dreams, travel adventures, and the journey from a small village to IIT Kharagpur.",
  startup: "I'm passionate about entrepreneurship. My goal is to build a tech startup that solves real-world problems at scale. I believe in working hard, thinking big, and never stopping. Billionaire by 30 — that's the goal!",
  travel: "I love exploring new places! Every journey teaches something new. I believe travelling broadens perspective — which makes you a better engineer and a better human.",
  iit: "IIT Kharagpur is where I transformed. From a student in Bahraich (UP) to an IITian — it was a journey of hard work, sleepless nights, and relentless pursuit of excellence.",
};

function getSmartResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes("educat") || msg.includes("degree") || msg.includes("iit") || msg.includes("college") || msg.includes("study") || msg.includes("cgpa")) {
    return VINOD_KNOWLEDGE.education;
  }
  if (msg.includes("work") || msg.includes("job") || msg.includes("company") || msg.includes("experience") || msg.includes("machani") || msg.includes("enerzyflow") || msg.includes("claimbuddy")) {
    return VINOD_KNOWLEDGE.work;
  }
  if (msg.includes("skill") || msg.includes("tech") || msg.includes("stack") || msg.includes("language") || msg.includes("framework") || msg.includes("code") || msg.includes("program")) {
    return VINOD_KNOWLEDGE.skills;
  }
  if (msg.includes("project") || msg.includes("build") || msg.includes("portfolio") || msg.includes("blasting") || msg.includes("tasktrek") || msg.includes("finance")) {
    return VINOD_KNOWLEDGE.projects;
  }
  if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("reach") || msg.includes("connect")) {
    return VINOD_KNOWLEDGE.contact;
  }
  if (msg.includes("hobby") || msg.includes("interest") || msg.includes("like") || msg.includes("enjoy") || msg.includes("passion") || msg.includes("besides") || msg.includes("outside")) {
    return VINOD_KNOWLEDGE.interests;
  }
  if (msg.includes("achiev") || msg.includes("award") || msg.includes("hackathon") || msg.includes("leetcode") || msg.includes("codeforces") || msg.includes("rank")) {
    return VINOD_KNOWLEDGE.achievements;
  }
  if (msg.includes("shayari") || msg.includes("poem") || msg.includes("poetry") || msg.includes("write") || msg.includes("urdu") || msg.includes("hindi verse")) {
    return VINOD_KNOWLEDGE.shayari;
  }
  if (msg.includes("startup") || msg.includes("entrepreneur") || msg.includes("business") || msg.includes("billion") || msg.includes("found")) {
    return VINOD_KNOWLEDGE.startup;
  }
  if (msg.includes("travel") || msg.includes("trip") || msg.includes("journey") || msg.includes("explore") || msg.includes("visit")) {
    return VINOD_KNOWLEDGE.travel;
  }
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("namaste")) {
    return "Namaste! 🙏 I'm Vinod's AI assistant. I can tell you about his education, work experience, projects, skills, shayari writing, travel adventures, or startup dreams. What would you like to know?";
  }
  if (msg.includes("who are you") || msg.includes("who is vinod") || msg.includes("about")) {
    return "Vinod Kumar Maurya is a Software Engineer, IIT Kharagpur graduate, shayari writer, travel enthusiast, and aspiring startup founder. He builds full-stack applications with React, Next.js, Django & more. Ask me anything specific!";
  }
  return "That's an interesting question! I can best answer questions about Vinod's education, work experience, technical skills, projects, achievements, shayari writing, travel interests, or startup ambitions. Try asking about any of those!";
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey there! 👋 I'm Vinod's AI assistant. Ask me anything about his work, projects, skills, shayari, or startup journey!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));

    const response = getSmartResponse(userMessage);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: "assistant", content: response }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "What's Vinod's tech stack?",
    "Tell me about his projects",
    "What are his achievements?",
    "His startup dreams?",
  ];

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(0,229,255,0.9), rgba(168,85,247,0.9))",
              boxShadow: "0 0 30px rgba(0,229,255,0.4), 0 0 60px rgba(168,85,247,0.2)"
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, rgba(0,229,255,0.4), rgba(168,85,247,0.4), rgba(0,229,255,0.4))",
                filter: "blur(4px)"
              }}
            />
            <Bot className="w-7 h-7 text-white relative z-10" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-background"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(4,7,20,0.95)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(0,229,255,0.2)",
              boxShadow: "0 0 0 1px rgba(0,229,255,0.1), 0 30px 80px -20px rgba(0,0,0,0.9), 0 0 60px rgba(0,229,255,0.08)"
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(168,85,247,0.1))",
                borderBottom: "1px solid rgba(0,229,255,0.15)"
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.8), rgba(168,85,247,0.8))" }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border border-background" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Vinod&apos;s AI Assistant</p>
                  <p className="text-xs text-green-400">Online • Ready to chat</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Messages */}
                  <div className="h-72 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            msg.role === "assistant"
                              ? "bg-gradient-to-br from-cyan-500/30 to-purple-500/30"
                              : "bg-primary/30"
                          }`}
                        >
                          {msg.role === "assistant" ? (
                            <Bot className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <User className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                            msg.role === "assistant"
                              ? "rounded-tl-sm bg-white/5 text-foreground"
                              : "rounded-tr-sm bg-primary/20 text-foreground border border-primary/20"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2"
                      >
                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex-shrink-0">
                          <Bot className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="px-3 py-3 rounded-2xl rounded-tl-sm bg-white/5 flex gap-1 items-center">
                          {[0, 0.2, 0.4].map((delay, i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggested questions (only at start) */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-3">
                      <p className="text-xs text-muted-foreground mb-2">Suggested:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestedQuestions.map((q, i) => (
                          <motion.button
                            key={i}
                            onClick={() => { setInput(q); }}
                            className="text-xs px-2.5 py-1 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {q}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div
                    className="px-3 py-3 flex gap-2 items-end"
                    style={{ borderTop: "1px solid rgba(0,229,255,0.1)" }}
                  >
                    <textarea
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything about Vinod..."
                      rows={1}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/40 resize-none max-h-24 leading-relaxed"
                    />
                    <motion.button
                      onClick={sendMessage}
                      disabled={!input.trim() || isTyping}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        input.trim() && !isTyping
                          ? "bg-primary text-primary-foreground hover:opacity-90"
                          : "bg-white/5 text-muted-foreground cursor-not-allowed"
                      }`}
                      whileHover={input.trim() && !isTyping ? { scale: 1.1 } : {}}
                      whileTap={input.trim() && !isTyping ? { scale: 0.9 } : {}}
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
