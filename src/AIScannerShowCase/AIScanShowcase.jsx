import React from "react";
import { Shirt, Scan, Wand2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function AIScannerShowcase() {
  const navigate = useNavigate();

  const flow = [
    {
      title: "Your wardrobe, remembered",
      description:
        "Every piece you own — already there, or newly added — becomes part of a living system that never forgets.",
      icon: <Shirt className="w-6 h-6" />,
    },
    {
      title: "Quiet analysis",
      description:
        "Colors, textures, silhouettes. Our AI reads what the eye often misses — instantly and precisely.",
      icon: <Scan className="w-6 h-6" />,
    },
    {
      title: "Intentional combinations",
      description:
        "Outfits aren’t generated. They’re composed — based on balance, contrast, and context.",
      icon: <Wand2 className="w-6 h-6" />,
    },
    {
      title: "See it before you wear it",
      description:
        "Preview the look. Adjust freely. Commit with confidence.",
      icon: <Sparkles className="w-6 h-6" />,
      comingSoon: true,
    },
  ];

  return (
    <>
      <Header />

      <section className="bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white py-24 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-20">

          {/* INTRO */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.35em] text-white/40 mb-6">
              THE FLOW
            </p>

            <h2 className="text-4xl sm:text-5xl font-semibold leading-tight">
              How <span className="text-[#f04e23]">style</span> comes together.
            </h2>

            <p className="mt-6 text-white/60 max-w-xl">
              A quiet system working in the background — turning what you own
              into something that feels intentional.
            </p>
          </motion.div>

          {/* FLOW */}
          <div className="space-y-16 grid sm:grid-cols-2 gap-10">
            {flow.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-6"
              >
                {/* ICON */}
                <div className="mt-1 flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-[#f04e23]">
                  {item.icon}
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="text-xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-white/60 max-w-lg">
                    {item.description}
                  </p>

                  {item.comingSoon && (
                    <span className="inline-block mt-2 text-xs tracking-wide text-[#f04e23]">
                      Coming soon
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="pt-12"
          >
            <button
              onClick={() => navigate("/generator")}
              className="group flex items-center gap-4 text-[#f04e23] text-xs tracking-[0.35em]"
            >
              EXPLORE THE SYSTEM
              <span className="group-hover:translate-x-1 transition">→</span>
            </button>
          </motion.div>

        </div>
      </section>


      <Footer />
    </>
  );
}
