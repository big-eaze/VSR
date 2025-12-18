import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WardrobeTeaser() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto my-32 max-w-7xl px-6 md:px-10">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-[#120a06] to-black p-10 md:p-16"
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#A0552D]/70 blur-3xl transition-opacity duration-500 group-hover:opacity-60" />

        
        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          {/* Left */}
          <div>
            <span className="inline-block rounded-full border border-white/20 px-4 py-1 text-xs tracking-widest text-white/60">
              YOUR SPACE
            </span>

            <h3 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
              Step inside your
              <span className="block bg-gradient-to-r from-[#f04e23] to-[#ff8a5c] bg-clip-text text-transparent">
                digital wardrobe
              </span>
            </h3>

            <p className="mt-4 max-w-md text-white/65">
              Every piece you own, intelligently organized and styled to evolve with you.
            </p>
          </div>

          {/* Right CTA */}
          <div className="flex items-center justify-start md:justify-end">
            <motion.button
              onClick={() => navigate("/wardrobe")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold backdrop-blur transition-colors hover:bg-white hover:text-black"
            >
              Open Wardrobe
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
