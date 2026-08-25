"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, Quote, Feather, Code2 } from "lucide-react";

const shayariPosts = [
  {
    id: 1,
    category: "Dil ki Daastaan",
    categoryIcon: <Heart className="w-4 h-4" />,
    categoryColor: "#f43f5e",
    hindi: `Kaash us raat hum soye na hote,
Na tum khwaabon mein aate, na hum tumhare hone ke khwaab sajate.

Kaash us din gaadi thodi der se aati,
Na woh tanha mulaqat hoti, na hum tumse yun nazrein milate.

Kaash woh shehar thoda aur shor se bhara hota,
Na hum teri baaton ko sun paate, na un baaton pe dil haar jaate.

Kaash humne tumhe pehli dafa dekha hi na hota,
Na aankhon se dil tak tera raasta banta, na hum apna sukoon gawaate.

Kaash tumne yun halka sa chhua hi na hota,
Na hum mom ki tarah pighalte, na khud ko sambhaal na paate.

Har mod pe bas ek hi "kaash" reh gaya,
Har dua se pehle tera naam reh gaya.

Agar mile hi the...
To humesha ke liye humare ho jaate.

Aur agar kismat ko ye manzoor na tha...

To kaash...
Na tum humare raste aate, na hum tumhare.
Na ye dil tumhara hota, na ise tootna padta.
Aur kaash... Hum kabhi mile hi na hote.`,
    english: `If only we hadn't stayed awake that night —
You'd never have entered my dreams, I'd never have dreamt of belonging to you.

If only the car had come a little late that day,
That lonely meeting wouldn't have happened, our eyes would never have met.

If only that city had been a little noisier,
I'd never have heard your words, never let them break my heart.

If only I had never seen you for the first time,
No path would have formed from your eyes to my heart, I'd never have lost my peace.

If only you had never touched me so lightly,
I'd never have melted like wax, never lost the strength to hold myself.

At every turn, only one "kaash" remained,
Before every prayer, only your name remained.

If we had met... we would have been each other's forever.
But if fate didn't allow it...

Then I wish — you never crossed my path, I never crossed yours.
This heart would never have been yours. It would never have shattered.
And I wish... we had never met at all.`,
    likes: 3241,
    comments: 187,
    timestamp: "1 day ago",
    mood: "longing",
    gradient: "from-rose-500/20 to-pink-600/20",
    border: "border-rose-500/30"
  },
  {
    id: 2,
    category: "Mohabbat",
    categoryIcon: <Heart className="w-4 h-4" />,
    categoryColor: "#ec4899",
    hindi: `Mere gussa hone par pyaar se manana tera,
Bikhri julfon ko dheere se sanwarna tera.
Haaye, un qaatil nigahon se mujhe takna tera,
Aur meri nazar padte hi muskurakar sharma jaana tera.
Meri har baat aur har ehsaas ko samajhna tera,
Dil ke har kone mein chupke se bas jaana tera.
Ab to dil ki bas yahi aarzu reh gayi hai,
Kab muqaddar mein likha hoga milna tera.`,
    english: `Your way of calming me with love when I am angry,
Your gentle way of softly arranging your scattered hair.
Those killer eyes glancing at me — oh how they pierce,
And that shy smile blooming when our eyes meet there.
Understanding my every word, my every feeling so deeply,
Quietly making a home in every corner of my heart.
Now this heart holds only one longing remaining —
When will fate inscribe the meeting of our paths?`,
    likes: 2847,
    comments: 143,
    timestamp: "3 days ago",
    mood: "love",
    gradient: "from-pink-500/20 to-fuchsia-600/20",
    border: "border-pink-500/30"
  },
  {
    id: 3,
    category: "Wafa & Judai",
    categoryIcon: <Feather className="w-4 h-4" />,
    categoryColor: "#f97316",
    hindi: `Yun to chahne wale bahut mile, par tum-sa koi dildaar na mila,
Dard bhi sabne bahut diye, par tum-sa koi gunahgaar na mila.
Gairon se kya shikwa karte, apnon se bhi koi gila na mila,
Jisko apna samjha tha humne, us jaisa koi adaakaar na mila.
Girgit to yun hi badnaam hai, bas rang badalne ke liye,
Lagta hai duniya walon ko ab tak tera deedaar na mila.`,
    english: `Many came to love me, but none as warm as you,
Many gave me pain, but none quite guilty like your form.
What complaint to strangers — even my own people weren't true,
The one I called mine — no actor matched that storm.
The chameleon gets its bad name for just changing colors,
But it seems the world hasn't yet seen what real betrayal conjures.`,
    likes: 1934,
    comments: 98,
    timestamp: "5 days ago",
    mood: "reflective",
    gradient: "from-orange-500/20 to-amber-600/20",
    border: "border-orange-500/30"
  },
  {
    id: 4,
    category: "Dil ka Darwaza",
    categoryIcon: <Quote className="w-4 h-4" />,
    categoryColor: "#00e5ff",
    hindi: `Kai logo ne dil ke darwaze pe dastak di, par maine andar bulaya nahi,
Maine usko dil mein thodi der thahrane ki ijazat kya di, wo bahar aaya hi nahi.
Jab dil ne use apni dhadkan samajh kar apna humsafar bana liya,
To wo sukoon ki chabhi le gaya aur tala lagaya bhi nahi.`,
    english: `Many knocked on the door of my heart, but I let none inside,
I gave one permission to stay just a little — and they never left.
When the heart made them its own heartbeat, its own companion,
They took the key to my peace — and never even locked the door behind.`,
    likes: 2156,
    comments: 112,
    timestamp: "1 week ago",
    mood: "melancholy",
    gradient: "from-cyan-500/20 to-blue-600/20",
    border: "border-cyan-500/30"
  },
  {
    id: 5,
    category: "Ishq-e-Kamil",
    categoryIcon: <Heart className="w-4 h-4" />,
    categoryColor: "#a855f7",
    hindi: `Tujhe har kisse ki kahani banana chahta hu main,
Khud khara paani hoke bhi tujhe meetha dariya sa paana chahta hu main.
Payal ki chan-chan, chudiyon ki khanak, maathe ki chhoti si bindi,
Aankhon ke kajal se lekar teri har ada sajana chahta hu main.
Jo bhi teri khwahish ho, haste haste tere kadmo me le aau,
Tujhe sirf apna nahi, apne dil ki rani banana chahta hu main.`,
    english: `I want to make you the story of every tale I know,
Though I am plain water, I want to find in you a sweet river's flow.
The anklet's jingle, bangles' melody, that tiny bindi on your brow,
From the kohl of your eyes to every grace — I want to adorn you now.
Whatever your wish, I want to lay it laughing at your feet,
I don't just want to call you mine — I want to crown you queen complete.`,
    likes: 3089,
    comments: 201,
    timestamp: "2 weeks ago",
    mood: "romantic",
    gradient: "from-purple-500/20 to-violet-600/20",
    border: "border-purple-500/30"
  },
  {
    id: 6,
    category: "Sach-e-Dil",
    categoryIcon: <Feather className="w-4 h-4" />,
    categoryColor: "#22c55e",
    hindi: `Har kisi se ishq ho jaaye zaroori thodi hai,
Jise tum chaho woh bhi tumhe chahe zaroori thodi hai.
Kayi dafa mohabbat sirf ek tarfa hi hoti hai,
Har kahani mukammal ho jaaye zaroori thodi hai.`,
    english: `It's not necessary that love blooms with everyone you meet,
It's not necessary that who you love, loves you back.
Many times, love lives only on one side complete,
It's not necessary that every story finds its way back.`,
    likes: 1678,
    comments: 89,
    timestamp: "2 weeks ago",
    mood: "truth",
    gradient: "from-green-500/20 to-emerald-600/20",
    border: "border-green-500/30"
  },
  {
    id: 7,
    category: "Kitaab-e-Dil",
    categoryIcon: <Feather className="w-4 h-4" />,
    categoryColor: "#d946ef",
    hindi: `Likhne ko to ek din tum par poori kitaab likhu,
Har lafz mein chhupa ek haseen sa khwaab likhu.
Tumhari aankhon ko gehri si sharab likhu,
Unmein doobta har pal apna hisaab likhu.

Tumhe rani kahu aur khud ko tera nawab likhu,
Tumhe har sawaal ka sabse khoobsurat jawab likhu.
Tumhari zulfon ko gehra sa ek khwaab likhu,
Unke saaye mein palta har ek mera jazbaat-e-hisaab likhu.

Tumhare honton ko khilta hua gulaab likhu,
Tumhara chehra roshan sa ek mahtaab likhu.
Tumhari chaal ko halki si lehrati hawa likhu,
Tumko har dard ki sabse asar-daar dawa likhu.
Likhu tumhari wo baatein jo duniya ko pata nahi,
Har sach ko mehfooz rakhkar ek pyaari si dua likhu.`,
    english: `One day I'll write a whole book about you,
Hiding a beautiful dream in every word I write.
I'll call your eyes the deepest wine,
And write the account of every moment I drown in their light.

I'll call you queen and myself your king,
I'll write you as the most beautiful answer to every question.
Your hair — a deep dream I'd capture in verse,
Every feeling that grew in their shadow — my finest expression.

Your lips — a blooming rose I'd describe in rhyme,
Your face — a glowing moon I'd paint in every line.
Your walk — a light breeze swaying through the air,
I'd write you as the most powerful cure to every despair.
I'd write what the world doesn't know about you —
And keeping every truth safe, write a loving prayer.`,
    likes: 4127,
    comments: 267,
    timestamp: "3 weeks ago",
    mood: "poetic",
    gradient: "from-fuchsia-500/20 to-pink-600/20",
    border: "border-fuchsia-500/30"
  },
  {
    id: 8,
    category: "Late Night Hustle",
    categoryIcon: <Code2 className="w-4 h-4" />,
    categoryColor: "#f59e0b",
    hindi: "रात के अँधेरे में जब terminal खुला है,\nBug fix करते करते subah हो जाती है।\nLog में errors का जाल बुना है,\nPer console.log ने जब hint दी, जिंदगी खुल जाती है।",
    english: "When the terminal opens in the dark of night,\nMorning arrives while debugging every flaw.\nThe logs weave a web of tangled errors tight,\nBut when console.log hints — life opens its door.",
    likes: 1567,
    comments: 124,
    timestamp: "1 month ago",
    mood: "humorous",
    gradient: "from-yellow-500/20 to-orange-600/20",
    border: "border-yellow-500/30"
  },
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
              href="https://www.instagram.com/im_vinod_maurya/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Instagram @im_vinod_maurya
            </a>{" "}
            for more shayari &amp; life updates
          </p>
        </motion.div>
      </div>
    </section>
  );
}
