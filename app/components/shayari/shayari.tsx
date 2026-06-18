"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, Quote, Feather, Globe, Code2, Rocket } from "lucide-react";

const shayariPosts = [
  {
    id: 1,
    category: "Code & Life",
    categoryIcon: <Code2 className="w-4 h-4" />,
    categoryColor: "#00e5ff",
    hindi: "कोड की लाइनों में जिंदगी लिखी है मेरी,\nसपनों की दुनिया बनाता हूँ पर्दे पर।\nBug fix करते करते रात बीती है कितनी,\nपर हर sunrise के साथ नई उम्मीद है मेरी।",
    english: "My life is written in lines of code,\nI build worlds of dreams on a glowing screen.\nHow many nights have passed fixing bugs alone,\nBut with every sunrise, a new hope is seen.",
    likes: 847,
    comments: 63,
    timestamp: "2 days ago",
    mood: "reflective",
    gradient: "from-cyan-500/20 to-blue-600/20",
    border: "border-cyan-500/30"
  },
  {
    id: 2,
    category: "Startup Dreams",
    categoryIcon: <Rocket className="w-4 h-4" />,
    categoryColor: "#a855f7",
    hindi: "Startup का सपना आँखों में पाला है,\nBillionaire बनना है, यह इरादा कमाल है।\nIIT की राहों पर चला जो सफर,\nवो नींव है जिस पर मेरा सारा जहाँ है।",
    english: "I've nurtured the dream of a startup in my eyes,\nBeing a billionaire — this intention is extraordinary.\nThe journey on IIT's roads I once walked,\nIs the foundation on which my whole world lies.",
    likes: 1204,
    comments: 89,
    timestamp: "5 days ago",
    mood: "ambitious",
    gradient: "from-purple-500/20 to-pink-600/20",
    border: "border-purple-500/30"
  },
  {
    id: 3,
    category: "Travel & Soul",
    categoryIcon: <Globe className="w-4 h-4" />,
    categoryColor: "#22c55e",
    hindi: "सफर करना है मुझे दुनिया के हर कोने को,\nहर राह, हर मोड़ पर नई कहानी सुनाना है।\nPahaadon की ऊँचाई हो या समंदर की गहराई,\nहर जगह कुछ नया सीखना और पाना है।",
    english: "I wish to travel every corner of this world,\nAt every path, every turn, to share new tales.\nBe it the heights of mountains or ocean's depth,\nIn every place, something new learns and prevails.",
    likes: 933,
    comments: 71,
    timestamp: "1 week ago",
    mood: "wanderlust",
    gradient: "from-green-500/20 to-emerald-600/20",
    border: "border-green-500/30"
  },
  {
    id: 4,
    category: "Late Night Hustle",
    categoryIcon: <Code2 className="w-4 h-4" />,
    categoryColor: "#f59e0b",
    hindi: "रात के अँधेरे में जब terminal खुला है,\nBug fix करते करते subah हो जाती है।\nLog में errors का जाल बुना है,\nPer console.log ने जब hint दी, जिंदगी खुल जाती है।",
    english: "When the terminal opens in the dark of night,\nMorning arrives while debugging every flaw.\nThe logs weave a web of tangled errors tight,\nBut when console.log hints — life opens its door.",
    likes: 1567,
    comments: 124,
    timestamp: "2 weeks ago",
    mood: "humorous",
    gradient: "from-yellow-500/20 to-orange-600/20",
    border: "border-yellow-500/30"
  },
  {
    id: 5,
    category: "Bahraich to Bengaluru",
    categoryIcon: <Feather className="w-4 h-4" />,
    categoryColor: "#ef4444",
    hindi: "छोटे से गाँव से निकला था जब मैं,\nसपने बड़े थे, पर जेब थी खाली।\nIIT की धूप में तपा जब मैं,\nसोना बन गई मेरी हर एक रात काली।",
    english: "When I left from a small village long ago,\nDreams were big, but the pocket was bare.\nWhen tempered in IIT's relentless glow,\nEvery dark night turned golden — pure and rare.",
    likes: 2341,
    comments: 187,
    timestamp: "3 weeks ago",
    mood: "inspirational",
    gradient: "from-red-500/20 to-rose-600/20",
    border: "border-red-500/30"
  },
  {
    id: 6,
    category: "The Developer's Heart",
    categoryIcon: <Feather className="w-4 h-4" />,
    categoryColor: "#06b6d4",
    hindi: "Deploy हो जाए तो दिल को सुकून मिलता है,\nCI/CD pipeline जब green हो, मुस्कुराहट आती है।\nCode review में जब 'LGTM' मिलता है,\nवो खुशी किसी shayari से कम नहीं होती है।",
    english: "When deploy succeeds, peace fills the heart,\nWhen CI/CD pipeline turns green — a smile appears.\nWhen the code review says 'LGTM' from the start,\nThat joy equals any shayari through the years.",
    likes: 1089,
    comments: 95,
    timestamp: "1 month ago",
    mood: "joyful",
    gradient: "from-cyan-500/20 to-teal-600/20",
    border: "border-cyan-500/30"
  }
];

export default function Shayari() {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [activePost, setActivePost] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSave = (id: number) => {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleTranslation = (id: number) => {
    setShowTranslation(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="shayari" className="py-24 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Feather className="w-8 h-8 text-purple-400" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Shayari & Thoughts
              </span>
            </h2>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <Feather className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            When code meets poetry — verses from a developer&apos;s heart.
            <span className="text-purple-400"> #ShayarDevloper</span>
          </p>
          <motion.div
            className="h-0.5 w-32 mx-auto mt-4 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Instagram-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {shayariPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative rounded-2xl border ${post.border} bg-gradient-to-br ${post.gradient} backdrop-blur-xl overflow-hidden cursor-pointer group`}
              style={{
                background: `linear-gradient(135deg, rgba(4,7,20,0.85), rgba(4,7,20,0.75))`,
                boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px -20px rgba(0,0,0,0.5)`
              }}
              onClick={() => setActivePost(activePost === post.id ? null : post.id)}
            >
              {/* Top bar — category */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${post.categoryColor}20`, color: post.categoryColor }}
                  >
                    {post.categoryIcon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: post.categoryColor }}>
                      {post.category}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-primary/20 flex items-center justify-center bg-primary/10 text-primary text-xs font-bold">
                  V
                </div>
              </div>

              {/* Quote mark */}
              <div className="px-5 pt-2 pb-1">
                <Quote className="w-5 h-5 text-muted-foreground/30 mb-1" />
              </div>

              {/* Shayari text */}
              <div className="px-5 pb-4">
                <AnimatePresence mode="wait">
                  {showTranslation.has(post.id) ? (
                    <motion.p
                      key="english"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-foreground/90 leading-7 italic whitespace-pre-line"
                    >
                      {post.english}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="hindi"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-foreground/90 leading-7 whitespace-pre-line"
                      style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    >
                      {post.hindi}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Translation toggle */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleTranslation(post.id); }}
                  className="mt-3 text-[11px] font-medium transition-colors"
                  style={{ color: post.categoryColor }}
                >
                  {showTranslation.has(post.id) ? "हिंदी में पढ़ें" : "Read in English"}
                </button>
              </div>

              {/* Divider */}
              <div className="mx-4 h-px bg-white/5" />

              {/* Action bar */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
                    whileTap={{ scale: 0.8 }}
                    className="flex items-center gap-1.5 group/like"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${liked.has(post.id) ? "text-red-500 fill-red-500" : "text-muted-foreground group-hover/like:text-red-400"}`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {post.likes + (liked.has(post.id) ? 1 : 0)}
                    </span>
                  </motion.button>

                  <button className="flex items-center gap-1.5 group/comment">
                    <MessageCircle className="w-5 h-5 text-muted-foreground group-hover/comment:text-cyan-400 transition-colors" />
                    <span className="text-xs text-muted-foreground">{post.comments}</span>
                  </button>

                  <button className="group/share">
                    <Share2 className="w-5 h-5 text-muted-foreground group-hover/share:text-green-400 transition-colors" />
                  </button>
                </div>

                <motion.button
                  onClick={(e) => { e.stopPropagation(); toggleSave(post.id); }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Bookmark
                    className={`w-5 h-5 transition-colors ${saved.has(post.id) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`}
                  />
                </motion.button>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  boxShadow: `inset 0 0 40px ${post.categoryColor}08`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            Follow on{" "}
            <a
              href="https://www.instagram.com/vinodmaurya0410/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Instagram @vinodmaurya0410
            </a>{" "}
            for more shayari &amp; life updates
          </p>
        </motion.div>
      </div>
    </section>
  );
}
