import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Heart, Briefcase, Dumbbell, Coffee } from "lucide-react";
import { MenuContext } from "../utils/MenuContext";


const styles = [
  {
    key: "casual",
    label: "Casual",
    desc: "Relaxed fits for everyday comfort",
    icon: <Coffee className="w-8 h-8 text-[#f04e23]" />,
    gradient: "from-[#f04e23]/80 to-[#FF8A65]/80",
  },
  {
    key: "fashion",
    label: "High Chic",
    desc: "Stylish & sleek to impress",
    icon: <Heart className="w-8 h-8 text-[#ff477e]" />,
    gradient: "from-[#ff477e]/80 to-[#ff6ec7]/80",
  },
  {
    key: "formal",
    label: "Work",
    desc: "Professional yet comfortable",
    icon: <Briefcase className="w-8 h-8 text-[#4fa3ff]" />,
    gradient: "from-[#4fa3ff]/80 to-[#1e3c72]/80",
  },
  {
    key: "gym-fit",
    label: "Gym",
    desc: "Performance outfits for training",
    icon: <Dumbbell className="w-8 h-8 text-[#45ff90]" />,
    gradient: "from-[#45ff90]/80 to-[#00c853]/80",
  },
];


export default function StyleSelector() {
  const { preferredStyle, setPreferredStyle } = useContext(MenuContext);

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-12">
      {styles.map((style) => (
        <motion.div
          key={style.key}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPreferredStyle(style.key)}
          className={`relative rounded-3xl p-6 cursor-pointer overflow-hidden shadow-lg backdrop-blur-xl border
        ${preferredStyle === style.key ? "border-white/40" : "border-white/10"}
      `}
        >
          {/* Glow Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${style.gradient} opacity-70 blur-2xl`}
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-black/40 rounded-2xl shadow-inner">
              {style.icon}
            </div>
            <h3 className="font-bold text-lg sm:text-xl tracking-wide">{style.label}</h3>
            <p className="text-xs sm:text-sm text-gray-300">{style.desc}</p>
            {preferredStyle === style.key && (
              <motion.div
                layoutId="active-glow"
                className="mt-4 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-white border border-white/20"
              >
                Selected
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
