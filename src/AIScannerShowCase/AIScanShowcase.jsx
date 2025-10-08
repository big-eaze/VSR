import React from "react";
import { Camera, Scan, Wand2, Sparkles, Shirt } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function AIScannerShowcase() {


  const navigate = useNavigate();
  const steps = [
    {
      icon: <Shirt className="w-8 h-8 text-[#f04e23]" />,
      title: "1. Access Wardrobe",
      desc: "Choose items from your saved virtual wardrobe or upload new ones.",
    },
    {
      icon: <Scan className="w-8 h-8 text-[#f04e23]" />,
      title: "2. AI Scans",
      desc: "Our AI detects clothing type, color, and textures with precision.",
    },
    {
      icon: <Wand2 className="w-8 h-8 text-[#f04e23]" />,
      title: "3. Mix & Match",
      desc: "Smart algorithms generate outfit combinations that actually work.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#f04e23]" />,
      title: "4. Get Styled",
      desc: "Visualize the look instantly on your avatar or preview in AR.",
    },
  ];

  return (
    <>
      <Header />
      <div className=" w-full flex flex-col justify-center items-center gap-20 min-h-screen bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white px-6 py-28 sm:py-0">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Our AI <span className="text-[#f04e23]">Styles</span> You
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Whether from your <span className="text-[#f04e23] font-medium">virtual wardrobe</span>
            or fresh uploads, our AI scans everything and instantly curates
            stylish outfit combinations just for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          <button onClick={() => navigate("/generator")}
            className="relative group overflow-hidden px-10 py-3 rounded-full font-semibold text-white 
               bg-gray-900/60 backdrop-blur-xl border border-[#f04e23]/50
               shadow-lg shadow-black/30 transition-all duration-300"
          >
            <span className="relative z-10">🚀 Begin Styling</span>

            {/* Animated gradient pulse */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f04e23] via-[#A0552D] to-[#f04e23] 
                    opacity-20 group-hover:opacity-40 animate-gradient"></div>
          </button>
        </motion.div>


      </div>
      <Footer />
    </>
  );
}
