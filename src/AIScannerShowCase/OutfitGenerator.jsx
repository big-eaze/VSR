import React, { useState, useEffect } from "react";
import { Loader2, Shirt, ShoppingBag, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OutfitGenerator() {
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [loadingText, setLoadingText] = useState("");
  const messages = [
    "Analyzing fabrics...",
    "Matching colors...",
    "Curating trends...",
    "Generating outfit magic..."
  ];

  // Typing effect
  useEffect(() => {
    let msgIndex = 0;
    let charIndex = 0;
    let interval;

    const type = () => {
      if (charIndex < messages[msgIndex].length) {
        setLoadingText((prev) => prev + messages[msgIndex][charIndex]);
        charIndex++;
      } else {
        // pause before clearing
        setTimeout(() => {
          setLoadingText("");
          charIndex = 0;
          msgIndex = (msgIndex + 1) % messages.length;
        }, 1200);
      }
    };

    interval = setInterval(type, 80);

    return () => clearInterval(interval);
  }, []);

  // Fake AI delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const outfits = [
    {
      id: 1,
      icon: <Shirt className="w-8 h-8 text-[#f04e23]" />,
      label: "Casual Fit",
      img: "matching1.jpg",
      desc: "Relaxed tee, denim jeans & sneakers.",
      details: ["Cotton T-shirt", "Slim fit jeans", "White sneakers"],

    },
    {
      id: 2,
      icon: <ShoppingBag className="w-8 h-8 text-[#f04e23]" />,
      label: "Streetwear",
      img: "matching2.jpg",
      desc: "Oversized hoodie, joggers & high-tops.",
      details: ["Graphic hoodie", "Black joggers", "Nike Air Force 1"],
    },
    {
      id: 3,
      icon: <Wand2 className="w-8 h-8 text-[#f04e23]" />,
      label: "Smart Casual",
      img: "matching3.jpg",
      desc: "Blazer, chinos & loafers.",
      details: ["Navy blazer", "Beige chinos", "Brown loafers"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900  via-[#A0552D] to-black text-white px-6 py-12">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4"
      >
        ✨ Outfit <span className="text-[#f04e23]">Generator</span>
      </motion.h1>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          // 🔄 Loading Phase
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-6 mt-16"
          >
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute inset-0 w-28 h-28 rounded-full bg-[#f04e23]/30 blur-2xl animate-pulse"></div>
              <Loader2 className="w-14 h-14 animate-spin text-[#f04e23] relative z-10" />
            </div>
            <p className="text-gray-300 font-mono h-6">
              {loadingText}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>
        ) : (
          // 👕 Results Phase
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl mt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {outfits.map((outfit) => (
                <motion.div
                  key={outfit.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() =>
                    setExpanded(expanded === outfit.id ? null : outfit.id)
                  }
                  className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg cursor-pointer"
                >
                  <img className="w-full max-h-[300px] object-cover" src={outfit.img} />
                  <div className="flex justify-center mb-4">{outfit.icon}</div>
                  <h3 className="font-semibold text-xl mb-2 text-center">
                    {outfit.label}
                  </h3>
                  <p className="text-gray-400 text-sm text-center">
                    {outfit.desc}
                  </p>

                  <AnimatePresence>
                    {expanded === outfit.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 bg-black/40 p-4 rounded-xl text-sm"
                      >
                        <h4 className="font-semibold text-[#f04e23] mb-2">
                          Includes:
                        </h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          {outfit.details.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 px-10 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#f04e23] to-[#A0552D] shadow-lg hover:shadow-[#f04e23]/40 transition"
            >
              🔥 Generate Another Outfit
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
