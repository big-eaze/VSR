import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Shirt, ShoppingBag, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutfits } from "../utils/chroma.jsx";
import StyleSelector from "../components/StyleSelector.jsx";
import { MenuContext } from "../utils/MenuContext.jsx";

export default function OutfitGenerator() {

  const { preferredStyle, setPreferredStyle, userWardrobe, guestWardrobe } = useContext(MenuContext);
  const [bestOutfits, setBestOutfits] = useState([]);


  const [loading, setLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [loadingText, setLoadingText] = useState("");
  const messages = [
    "Analyzing fabrics...",
    "Matching colors...",
    "Curating trends...",
    "Generating outfit magic..."
  ];



  const outfits = useOutfits(preferredStyle);

  useEffect(() => {
    if (outfits && outfits.length > 0) {
      setBestOutfits(outfits.slice(0, 3))
    }
  }, [outfits]);

  function regenerate() {
    const shuffled = [...outfits].sort(() => Math.random() - 0.5);

    return setBestOutfits(shuffled.slice(0, 3));
  }


  useEffect(() => {
    if (!messages || messages.length === 0) return;

    let isCancelled = false;
    let msgIndex = 0;
    let charIndex = 0;

    const typeNext = () => {
      if (isCancelled) return;

      const current = messages[msgIndex] || "";

      if (charIndex <= current.length) {
        setLoadingText(current.slice(0, charIndex));
        charIndex++;
        setTimeout(typeNext, 80);
      } else {
        setTimeout(() => {
          if (isCancelled) return;
          setLoadingText("");
          charIndex = 0;
          msgIndex = (msgIndex + 1) % messages.length;
          typeNext();
        }, 3000);
      }

    };

    typeNext();

    return () => {
      isCancelled = true;
    };

    //eslint-disable-next-line
  }, []);






  // Fake AI delay
  useEffect(() => {

    if (!loading) return;

    const duration = firstLoading ? 2000 : 11000;

    const timer = setTimeout(
      () => {
        setLoading(false)
        setFirstLoading(false);
      }
      , duration
    );

    return () => clearTimeout(timer);

  }, [loading]);



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white px-6 py-12">
    
      {!loading && (
        <Link to="/" className="p-2 absolute top-4 left-4 rounded-full hover:bg-gray-700/50">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
      )}

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4"
      >
        ✨ Outfit <span className="text-[#f04e23]">Generator</span>
      </motion.h1>


      <AnimatePresence mode="wait">
        {loading ? (
         
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-6 mt-16"
          >
            <div className="relative">
              <div className="absolute inset-0 w-28 h-28 rounded-full bg-[#f04e23]/30 blur-2xl animate-pulse"></div>
              <Loader2 className="w-14 h-14 animate-spin text-[#f04e23] relative z-10" />
            </div>
            <p className="text-gray-300 font-mono h-6">
              {loadingText}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>
        ) : bestOutfits.length === 0 ? (
       
          <motion.div
            key="empty-wardrobe"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-6 mt-16 text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              👕✨
            </motion.div>

            <p className="text-xl md:text-2xl font-semibold text-gray-200 max-w-xl">
              {(() => {
                const wardrobe = userWardrobe || guestWardrobe || {};

            
                const tops = (wardrobe.Tops || []).filter(t => t.style === preferredStyle);
                const bottoms = (wardrobe.Bottoms || []).filter(b => b.style === preferredStyle);
                const footwears = (wardrobe.Footwears || []).filter(f => f.style === preferredStyle);

               
                const missingCategories = [];
                if (tops.length < 1) missingCategories.push("Tops");
                if (bottoms.length < 1) missingCategories.push("Bottoms");
                if (footwears.length < 1) missingCategories.push("Footwears");

                if (missingCategories.length > 0) {
                  return `Add more ${preferredStyle} wears in: ${missingCategories.join(", ")} to generate outfits!`;
                }

                return "Hmm… Looks like we don't have enough outfit combinations yet. Add more items to unlock AI magic!";
              })()}
            </p>

            <Link
              to="/upload"
              className="mt-6 px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#f04e23] to-[#A0552D] shadow-lg hover:scale-105 transition"
            >
              Add More Fits
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl mt-12"
          >
            {/* Outfit grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-6xl mt-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {bestOutfits.map((outfit, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="relative bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl cursor-pointer overflow-hidden group border border-white/10"
                  >
                  
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-4 right-4 z-20"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#f04e23] to-[#A0552D] flex items-center justify-center text-white font-bold shadow-lg border border-white/20">
                        {outfit.score.toFixed(0)}%
                      </div>
                    </motion.div>

                    <div className="relative h-60 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                      <div className="flex items-center justify-center h-full gap-3 p-4">
                        {outfit.items.slice(0, 3).map((piece, j) => (
                          <motion.img
                            key={j}
                            src={piece.image}
                            alt={piece.name}
                            className={`w-28 h-40 object-cover rounded-2xl shadow-md border border-white/10
                  ${j === 0 ? "-rotate-6" : j === 2 ? "rotate-6" : ""}`}
                            whileHover={{ y: -8, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                        ))}
                      </div>
                    </div>

               
                    <div className="p-6">
                      <h3 className="font-extrabold text-2xl text-center mb-3 bg-gradient-to-r from-[#f04e23] to-[#A0552D] bg-clip-text text-transparent tracking-wide">
                        Outfit #{i + 1}
                      </h3>
                      <p className="text-gray-400 text-sm text-center italic">
                        {outfit.mood || "Tap to see full breakdown "}
                      </p>
                    </div>

                  
                    <AnimatePresence>
                      {expanded === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5 }}
                          className="px-6 pb-6"
                        >
                          <h4 className="font-semibold text-[#f04e23] mb-4 text-lg">Includes:</h4>
                          <ul className="space-y-3 text-gray-300">
                            {outfit.items.map((piece) => (
                              <motion.li
                                key={piece.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * piece.id }}
                                className="flex items-center gap-4 bg-gray-800/40 p-4 rounded-xl hover:bg-gray-700/50 transition"
                              >
                                <span className="w-12 h-12 flex-shrink-0">
                                  <img
                                    src={piece.image}
                                    alt={piece.name}
                                    className="w-full h-full object-cover rounded-lg border border-white/10"
                                  />
                                </span>
                                <div>
                                  <p className="font-medium">{piece.name}</p>
                                  <p className="text-xs text-gray-400">
                                    {piece.style} • {piece.season} • {piece.color}
                                  </p>
                                </div>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <StyleSelector selected={preferredStyle} onSelect={setPreferredStyle} />

  
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => {
                regenerate();
                setLoading(true);
              }}
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
