import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContext } from "react";
import { MenuContext } from "../utils/MenuContext";

export default function IntroPage() {
  const { setShowIntro } = useContext(MenuContext);
  const { scrollYProgress } = useScroll();

  // Subtle cinematic parallax
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 bg-[url('/fashion-intro.jpg')] bg-cover bg-center"
      />

      {/* Gradient + Noise Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90" />

      {/* Content Grid */}
      <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 items-center px-6 md:grid-cols-2 md:px-10">
        {/* Left: Editorial Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 inline-block rounded-full border border-white/20 px-4 py-1 text-xs tracking-widest text-white/70"
          >
            PERSONAL STYLE · AI CURATED
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
          >
            Your wardrobe,
            <span className="block bg-gradient-to-r from-[#f04e23] to-[#ff8a5c] bg-clip-text text-transparent">
              reimagined.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-lg text-white/70"
          >
            Explore outfits, unlock combinations, and experience fashion as a living system — not a closet.
          </motion.p>

          {/* CTA */}
          <motion.button
            onClick={() => setShowIntro(false)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-2xl"
          >
            Enter Experience
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Right: Floating Visual Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative hidden h-[70%] w-full md:block"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute right-0 top-1/2 h-80 w-64 -translate-y-1/2 rounded-3xl bg-gradient-to-br from-[#f04e23]/30 to-transparent backdrop-blur-xl"
          />
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/50"
      >
        SCROLL
      </motion.div>
    </div>
  );
}
