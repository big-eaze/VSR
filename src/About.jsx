import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, Wand2, ArrowBigLeft, ArrowLeft } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { BiCloset } from "react-icons/bi";

// AboutPage — wild, overlapping, bold, highly aesthetic
// Uses Tailwind utility classes + Framer Motion for expressive animation.

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-[#2C150C] via-[#A0552D] to-black overflow-x-hidden">
      <Header />
      {/* HERO — Giant overlapped typography + floating blob + split content */}
      <section className="relative  pt-24 md:pt-32 pb-20 px-6 md:px-16 lg:px-28">
        <div className="max-w-7xl mx-auto relative">
          {/* Decorative: morphing gradient blob */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1.06, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-40 -top-36 w-[520px] h-[520px] md:w-[720px] md:h-[720px] rounded-fullblur-3xl transform-gpu"
          />

          <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 lg:col-span-8">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-[clamp(28px,6vw,72px)] leading-tight font-extrabold tracking-tight"
              >
                About <span className="text-white">VS<span className="text-[#f04e23]">!A</span></span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl"
              >
                We weave AI, design, and wardrobe love into a single, bold experience — matching you to looks you didn't know your closet could create.
                Big personalities. Big overlaps. Zero boredom.
              </motion.p>

              <div className="mt-8 flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/upload')}
                  className="rounded-full bg-white text-[#f04e23] px-6 py-3 font-semibold shadow-2xl"
                >
                  Upload Your Wardrobe
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/features')}
                  className="rounded-full border border-white/20 px-5 py-3 font-medium backdrop-blur-md"
                >
                  Explore Features
                </motion.button>
              </div>

              {/* Overlapping badges */}
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  { icon: <Sparkles size={16} />, text: "AI Curation" },
                  { icon: <Wand2 size={16} />, text: "Style Discovery" },
                  { icon: <BiCloset size={16} />, text: "Wardrobe Organisation" },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-3 bg-white/6 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/6"
                  >
                    <div className="p-1 rounded-md bg-white/8">{b.icon}</div>
                    <div className="text-sm font-medium">{b.text}</div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Floating artboard — overlapping cards and imagery */}
            <div className="md:col-span-5 lg:col-span-4 relative flex items-center justify-center">
              <motion.div
                initial={{ rotate: -8, scale: 0.95, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
                className="w-[360px] md:w-[420px] relative rounded-3xl p-4 
               bg-[url(/about-img3.jpg)] bg-cover bg-center 
               shadow-2xl overflow-visible"
              >
                <div className="absolute inset-0 rounded-3xl bg-black/50 pointer-events-none"></div>

                <div className="relative w-full h-[420px]">

                  {/* —————————— MAIN HERO CARD —————————— */}
                  <motion.div
                    initial={{ x: -24, y: 24, opacity: 0, scale: 0.97 }}
                    animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    whileHover={{ y: 45, scale: 1.05, rotate: 1.5 }}
                    transition={{ duration: 0.8 }}
                    className="absolute -left-6 -top-8 w-[300px] md:w-[340px] h-[220px]
                   rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:z-40  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    <div className="relative w-full h-full flex items-end p-4">
                      <div className="absolute inset-0 bg-[url(/about-img1.jpg)] bg-cover bg-center"></div>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                        Match - Rediscovered
                      </div>
                    </div>
                  </motion.div>

                  {/* —————————— SECONDARY FLOAT CARD —————————— */}
                  <motion.div
                    initial={{ x: 24, y: -8, opacity: 0, scale: 0.97 }}
                    animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    whileHover={{ x: 34, y: -14, scale: 1.06, rotate: 1 }}
                    transition={{ duration: 0.9, delay: 0.12 }}
                    className="absolute right-0 top-16 w-[220px] h-[160px] rounded-2xl bg-[#0f0a08] border border-white/10 shadow-lg overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    <div className="relative w-full h-full flex items-end p-4">
                      <div className="absolute inset-0 bg-[url(/about-img2.jpg)] bg-cover bg-center"></div>
                      <div className="text-sm text-gray-200 z-30 p-3 rounded-lg bg-black/50 backdrop-blur-md">
                        Wardrobe snapshots · AI labels
                      </div>
                    </div>
                  </motion.div>

                  {/* —————————— FLOATING BADGE —————————— */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute left-6 bottom-0 w-28 h-28 rounded-full bg-[#f04e23]
                   flex items-center justify-center border border-white/10
                   backdrop-blur-sm 
                   transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                   hover:scale-[1.08] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.4)]
        "
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="text-2xl font-extrabold">85%</div>
                      <div className="text-xs text-gray-200">User Satisfaction</div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </div>


          </div>
        </div>
      </section>

      {/* MISSION / PRINCIPLES — stacked overlapping tiles with parallax entrance */}
      <section className="relative py-20 px-6 md:px-16 lg:px-28">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Our Mission</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Style Made Effortless",
                desc: "Outfit decisions shouldn’t drain your time. We turn the chaos of everyday dressing into an intuitive, intelligent experience that adapts to your life.",
                accent: "#ffc6b3",
                emoji: "🪞",
              },
              {
                title: "Your Wardrobe, Upgraded",
                desc: "Clothes deserve more than dusty hangers and forgotten corners. We transform your closet into a smart, organized system that works for you — not the other way around.",
                accent: "#ffe2c8",
                emoji: "👗",
              },
              {
                title: "See Yourself Differently",
                desc: "Style isn’t static. We help you explore, experiment, and evolve — blending creativity with tech so you can unlock new versions of your look effortlessly.",
                accent: "#ffe8d6",
                emoji: "🔮",
              },
            ]
              .map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  className="relative rounded-3xl p-6 bg-gradient-to-br from-[#100806]/40 to-[#220e08]/20 border border-white/6 overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10" style={{ background: card.accent }} />
                  <div className="flex items-start gap-4">
                    <div className="text-3xl md:text-4xl">{card.emoji}</div>
                    <div>
                      <h3 className="text-xl font-bold">{card.title}</h3>
                      <p className="mt-2 text-gray-300 text-sm max-w-xs">{card.desc}</p>
                    </div>
                  </div>

                  {/* subtle overlapping ribbon */}
                  <div className="absolute -bottom-6 left-6 w-36 h-16 rounded-xl bg-[linear-gradient(90deg,#ff7a4a,#a0552d)]/90 blur-sm opacity-80 transform rotate-6" />
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 md:px-16 lg:px-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-tight">
            We believe style is a <span className="text-[#f04e23]">conversation </span>
            between you, your clothes, and your evolving identity.
          </h2>

          <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
            <p>
              Clothes are not static items — they’re emotional artifacts.
              We build tools that help you rediscover what you own,
              experiment boldly, and wear your story with intention.
            </p>

            <p>
              OutfitMatchMaker exists to make creativity practical.
              We blend computer vision, color theory, and human taste
              into an engine that helps you unlock quiet confidence.
            </p>

            <p className="text-gray-200 font-medium">
              This isn’t fast fashion.
              This is thoughtful, personal, sustainable dressing — powered by AI.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE — vertical with overlapping markers */}
      <section className="relative py-20 px-6 md:px-16 lg:px-28 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">Our Story</h2>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff7a4a] to-[#a0552d] rounded-full opacity-30" />

            <div className="space-y-12 pl-16">
              {[
                { year: "2021", title: "Concept Born", desc: "A tiny sketch turned into the first prototype: match clothes, not labels." },
                { year: "2022", title: "AI Core", desc: "We trained the first matching model on thousands of real closets." },
                { year: "2023", title: "Beta People", desc: "Hundreds of users helped shape our taste engine and UX." },
                { year: "2024", title: "Public Launch", desc: "We opened the closet — and the world started styling along." },
              ].map((node, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  className="relative"
                >
                  <div className="absolute -left-12 top-2 w-9 h-9 rounded-full bg-[#12060a] border-4 border-[#ff7a4a] flex items-center justify-center shadow-lg">
                    <Star className="text-white" size={18} />
                  </div>

                  <div className="bg-[#0f0b0a]/40 backdrop-blur-md p-6 rounded-xl border border-white/6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{node.title}</h3>
                        <p className="text-sm text-gray-300 mt-2">{node.desc}</p>
                      </div>
                      <div className="text-sm font-extrabold text-[#ffb59a]">{node.year}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="relative py-24 px-6 md:px-16 lg:px-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-4xl font-extrabold mb-10">Why We Built This</h2>

          <div className="text-gray-300 space-y-6 text-lg leading-relaxed">
            <p>
              Outfit problems weren’t supposed to be this hard.
              We own more clothes than ever, and yet we wear the same five pieces on repeat.
            </p>

            <p>
              We built OutfitMatchMaker because picking what to wear shouldn’t feel overwhelming.
              We wanted to build a system that understands personal taste —
              not trends, not algorithms for clicks — but your genuine preferences.
            </p>

            <p>
              This project is our attempt to redefine what it means to get dressed in the modern world.
              Smarter. Slower. More intentional. More fun.
            </p>
          </div>
        </div>
      </section>



      {/* CTA — loud, overlapping, giant text */}
      <section className="relative py-20 px-6 md:px-16 lg:px-28">
        <div className="max-w-6xl mx-auto text-center relative">
          <motion.h2
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(28px,6.5vw,96px)] leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffdfcf] to-[#f04e23]"
          >
            Ready to Remix Your Closet?
          </motion.h2>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-8 flex justify-center gap-4"
          >
            <button onClick={() => navigate('/upload')} className="px-8 py-4 rounded-full bg-white text-[#f04e23] font-bold shadow-2xl">Start Now</button>
            <button className="px-6 py-4 rounded-full border border-white/10 animate-bounce"><ArrowLeft /></button>
          </motion.div>

          {/* Layered decorative text behind CTA */}
          <div className="pointer-events-none flex items-center justify-center opacity-6">
            <div className="text-7xl sm:text-[140px] md:text-[200px] lg:text-[220px] font-extrabold leading-none text-[#2a140f] tracking-tight select-none" style={{ transform: 'translateY(30px) scale(1.02)' }}>MATCH</div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
