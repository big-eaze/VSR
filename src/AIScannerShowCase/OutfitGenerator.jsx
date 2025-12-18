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
      className="mt-12 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8"
    >
      {/* WHY */}
      <section className="mb-10">
        <h4 className="text-xs tracking-widest uppercase text-[#f04e23] mb-2">
          Why this outfit works
        </h4>
        <p className="text-gray-300 leading-relaxed">
          {outfit.reason ||
            "This look balances structure and texture while maintaining clean proportions. The contrast hierarchy guides attention naturally without overpowering the silhouette."}
        </p>
      </section>

      {/* PIECES */}
      <section className="mb-10">
        <h4 className="text-xs tracking-widest uppercase text-[#f04e23] mb-4">
          Piece intelligence
        </h4>

        <div className="space-y-4">
          {outfit.items.map((piece) => (
            <div
              key={piece.id}
              className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <img
                src={piece.image}
                alt={piece.name}
                className="w-14 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">{piece.name}</p>
                <p className="text-xs text-gray-400">
                  {piece.role || "Balances silhouette and color temperature"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section className="mb-10">
        <h4 className="text-xs tracking-widest uppercase text-[#f04e23] mb-4">
          Style metrics
        </h4>

        {metrics.map(({ label, value }) => (
          <div key={label} className="mb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
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
        <h4 className="text-xs tracking-widest uppercase text-[#f04e23] mb-3">
          Best for
        </h4>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-xs bg-white/10 border border-white/10"
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

  const [generationKey, setGenerationKey] = useState(0);
  const outfits = useOutfits(preferredStyle, generationKey);

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
    if (!generationKey) return;
    if (outfits?.length) {
      setBestOutfits(outfits.slice(0, 3));
    }
  }, [generationKey, outfits]);


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
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#A0552D] to-[#2C150C] text-white overflow-hidden">

      {!loading && (
        <Link to="/" className="absolute top-6 left-6 z-50 p-3 rounded-full bg-white/5">
          <ArrowLeft />
        </Link>
      )}

      <motion.div className="pt-24 text-center">
        <h1 className="text-6xl font-extrabold">
          AI{" "}
          <span className="bg-gradient-to-r from-[#f04e23] to-[#A0552D] bg-clip-text text-transparent">
            Outfit Lab
          </span>
        </h1>
        <p className="mt-4 text-gray-400">
          Curated. Scored. Styled for{" "}
          <span className="text-white">{preferredStyle}</span>
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div className="mt-40 flex flex-col items-center">
            <Loader2 className="w-16 h-16 animate-spin text-[#f04e23]" />
            <p className="mt-6 font-mono text-gray-400">
              {loadingText}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>
        ) : (
          <motion.div className="mt-20 max-w-7xl mx-auto px-6">
            <motion.div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10">
              <div className="flex justify-center gap-6">
                {bestOutfits[0].items.map((p, i) => (
                  <motion.img
                    key={p.id}
                    src={p.image}
                    className="w-44 h-60 object-cover rounded-2xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                  />
                ))}
              </div>

              {/* 👇 DETAILS LIVE HERE */}
              <OutfitDetails outfit={bestOutfits[0]} />
            </motion.div>

            <StyleSelector
              selected={preferredStyle}
              onSelect={setPreferredStyle}
            />

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setLoading(true);
                  setGenerationKey((k) => k + 1);
                }}
                className="mt-14 px-12 py-4 rounded-full text-lg bg-gradient-to-r from-[#f04e23] to-[#A0552D]"
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
