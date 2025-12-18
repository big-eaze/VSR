import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutfits } from "../utils/chroma.jsx";
import StyleSelector from "../components/StyleSelector.jsx";
import { MenuContext } from "../utils/MenuContext.jsx";

/* =========================
   OUTFIT DETAILS COMPONENT
========================= */
function OutfitDetails({ outfit }) {
  if (!outfit) return null;

  const metrics = outfit.metrics || [
    { label: "Formality", value: 3 },
    { label: "Boldness", value: 4 },
    { label: "Versatility", value: 4 },
  ];

  const tags = outfit.tags || ["Smart Casual", "Evening", "City Ready"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
    mt-10 md:mt-12
    bg-black/40 backdrop-blur-xl
    rounded-2xl md:rounded-3xl
    border border-white/10
    p-5 sm:p-6 md:p-8
  "
    >
      {/* WHY */}
      <section className="mb-8 md:mb-10">
        <h4 className="text-[10px] sm:text-xs tracking-widest uppercase text-[#f04e23] mb-2">
          Why this outfit works
        </h4>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {outfit.reason ||
            "This look balances structure and texture while maintaining clean proportions. The contrast hierarchy guides attention naturally without overpowering the silhouette."}
        </p>
      </section>

      {/* PIECES */}
      <section className="mb-8 md:mb-10">
        <h4 className="text-[10px] sm:text-xs tracking-widest uppercase text-[#f04e23] mb-4">
          Piece intelligence
        </h4>

        <div className="space-y-3 sm:space-y-4">
          {outfit.items.map((piece) => (
            <div
              key={piece.id}
              className="
            flex items-center gap-3 sm:gap-4
            bg-white/5 rounded-xl
            p-3 sm:p-4
            border border-white/10
          "
            >
              <img
                src={piece.image}
                alt={piece.name}
                className="
              w-12 h-14
              sm:w-14 sm:h-16
              object-cover rounded-lg
              flex-shrink-0
            "
              />
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">
                  {piece.name}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400 leading-snug">
                  {piece.role || "Balances silhouette and color temperature"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section className="mb-8 md:mb-10">
        <h4 className="text-[10px] sm:text-xs tracking-widest uppercase text-[#f04e23] mb-4">
          Style metrics
        </h4>

        {metrics.map(({ label, value }) => (
          <div key={label} className="mb-3">
            <div className="flex justify-between text-[11px] sm:text-xs text-gray-400 mb-1">
              <span>{label}</span>
              <span>{value}/5</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#f04e23] to-[#A0552D]"
                style={{ width: `${(value / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* TAGS */}
      <section>
        <h4 className="text-[10px] sm:text-xs tracking-widest uppercase text-[#f04e23] mb-3">
          Best for
        </h4>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
            px-3 sm:px-4
            py-1 sm:py-1.5
            rounded-full
            text-[11px] sm:text-xs
            bg-white/10
            border border-white/10
          "
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </motion.div>

  );
}

/* =========================
   MAIN PAGE
========================= */
export default function OutfitGenerator() {
  const { preferredStyle, setPreferredStyle } = useContext(MenuContext);

  const outfits = useOutfits(preferredStyle);
  const [bestOutfits, setBestOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");

  const messages = [
    "Analyzing fabrics...",
    "Matching colors...",
    "Curating trends...",
    "Generating outfit magic...",
  ];

  useEffect(() => {
    if (outfits?.length) setBestOutfits(outfits.slice(0, 3));
  }, [outfits]);

  function regenerate() {
    const shuffled = [...outfits].sort(() => Math.random() - 0.5);
    setBestOutfits(shuffled.slice(0, 3));
  }

  useEffect(() => {
    let i = 0;
    let j = 0;
    let cancelled = false;

    function type() {
      if (cancelled) return;
      const msg = messages[i];
      if (j <= msg.length) {
        setLoadingText(msg.slice(0, j++));
        setTimeout(type, 80);
      } else {
        setTimeout(() => {
          j = 0;
          i = (i + 1) % messages.length;
          type();
        }, 2000);
      }
    }

    type();
    return () => (cancelled = true);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(
      () => {
        setLoading(false);
        setFirstLoading(false);
      },
      firstLoading ? 2000 : 11000
    );
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#A0552D] py-10 to-[#2C150C] text-white overflow-hidden">

      {/* Back */}
      {!loading && (
        <Link
          to="/"
          className="absolute top-4 left-4 md:top-6 md:left-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      )}

      {/* Header */}
      <motion.div className="pt-20 md:pt-24 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          AI{" "}
          <span className="bg-gradient-to-r from-[#f04e23] to-[#A0552D] bg-clip-text text-transparent">
            Outfit Lab
          </span>
        </h1>
        <p className="mt-3 md:mt-4 text-sm sm:text-base text-gray-400">
          Curated. Scored. Styled for{" "}
          <span className="text-white">{preferredStyle}</span>
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          /* ================= LOADING ================= */
          <motion.div className="mt-32 md:mt-40 flex flex-col items-center px-4">
            <Loader2 className="w-14 h-14 md:w-16 md:h-16 animate-spin text-[#f04e23]" />
            <p className="mt-6 font-mono text-sm md:text-base text-gray-400 text-center">
              {loadingText}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>
        ) : (
          /* ================= RESULTS ================= */
          <motion.div className="mt-16 md:mt-20 max-w-7xl mx-auto px-4 sm:px-6">

            {/* ===== FEATURED OUTFIT ===== */}
            <motion.div className="bg-white/5 rounded-3xl md:rounded-[2.5rem] p-3 sm:p-8 md:p-10 border border-white/10">

              {/* Outfit images */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {bestOutfits[0].items.map((p, i) => (
                  <motion.img
                    key={p.id}
                    src={p.image}
                    alt={p.name}
                    className="
                  w-40 h-56
                  sm:w-44 sm:h-60
                  object-cover rounded-2xl
                  border border-white/10
                "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                  />
                ))}
              </div>

              {/* 👇 DETAILS LIVE HERE */}
              <OutfitDetails outfit={bestOutfits[0]} />
            </motion.div>

            {/* ===== CONTROLS ===== */}
            <div className="mt-12 md:mt-16">
              <StyleSelector
                selected={preferredStyle}
                onSelect={setPreferredStyle}
              />
            </div>

            {/* ===== CTA ===== */}
            <div className="flex justify-center px-4">
              <button
                onClick={() => {
                  setLoading(true);
                  regenerate()
                }}
                className="
              mt-10 md:mt-14
              w-full sm:w-auto
              px-10 md:px-12
              py-4
              rounded-full
              text-base md:text-lg
              font-semibold
              bg-gradient-to-r from-[#f04e23] to-[#A0552D]
              hover:scale-[1.03]
              transition
              shadow-xl
            "
              >
                ✨ Generate with VSA
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
}
