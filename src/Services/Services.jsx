import React from "react";
import { Sparkles, Shirt, Camera, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import { MenuContext } from "../utils/MenuContext";
import Footer from "../components/Footer";
import AuthModal from "../Auth/AuthModal";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const { authOpen } = React.useContext(MenuContext);

  const navigate = useNavigate();


  const services = [
    {
      title: "Smart Outfit Matching",
      description:
        "Say goodbye to 'What should I wear today?' moments. Our AI scans your wardrobe and recommends the perfect combinations tailored to your mood, the weather, or even an event.",
      icon: <Wand2 className="w-8 h-8 text-[#f04e23]" />,
      features: [
        "AI-powered recommendations",
        "Match clothes in seconds",
        "Personalized to your style",
      ],
    },
    {
      title: "Wardrobe Organization",
      description:
        "Take full control of your digital wardrobe. Upload photos of your clothes, sort them into categories, and never forget what’s in your closet again.",
      icon: <Shirt className="w-8 h-8 text-rose-400" />,
      features: [
        "Upload & categorize clothes",
        "Color & type filters",
        "Wardrobe usage analytics",
      ],
    },
    {
      title: "Virtual Try-On",
      description:
        "Preview your outfit before you wear it. Our virtual try-on helps you visualize different looks instantly without having to try everything physically.",
      icon: <Camera className="w-8 h-8 text-indigo-400" />,
      features: [
        "Instant outfit previews",
        "Mix & match virtually",
        "Save favorite combinations",
      ],
    },
    {
      title: "Style Insights",
      description:
        "Stay ahead of trends with insights curated for you. Discover how to pair your clothes creatively, learn what colors complement you, and elevate your fashion sense.",
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      features: [
        "Style tips & trends",
        "Color & fabric suggestions",
        "Personalized fashion insights",
      ],
    },
  ];

  return (
    <>
      <Header />
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white py-32 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-32">

          {/* INTRO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight">
              What we <span className="text-[#f04e23]">do.</span> <br />
              <span className="text-white/40">And why it feels effortless.</span>
            </h1>

            <p className="mt-8 text-lg text-white/60 max-w-2xl">
              Virtual Styling Assistant isn’t a tool — it’s a quiet intelligence
              working behind your wardrobe, helping you look intentional every day.
            </p>
          </motion.div>

          {/* SERVICES */}
          <div className="space-y-24">

            {/* SERVICE ITEM */}
            {[
              {
                title: "Outfit intelligence",
                description:
                  "Your clothes already know each other. We simply reveal the combinations that work — based on context, mood, and the moment.",
                meta: "Personalized · Instant",
              },
              {
                title: "A wardrobe that remembers",
                description:
                  "Every piece, catalogued. Every option visible. Your wardrobe becomes searchable, organized, and impossible to forget.",
                meta: "Upload · Categorize · Analyze",
              },
              {
                title: "See before you wear",
                description:
                  "Visualize outfits without trying them on. Experiment freely. Commit confidently.",
                meta: "Virtual try-on · Coming soon",
                comingSoon: true,
              },
              {
                title: "Style perspective",
                description:
                  "Understand what works for you. Learn how color, fabric, and balance shape your personal style over time.",
                meta: "Insights · Trends · Guidance",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start"
              >
                {/* LEFT — TITLE */}
                <h2 className="text-3xl sm:text-4xl font-semibold">
                  {service.title}
                </h2>

                {/* RIGHT — CONTENT */}
                <div className="space-y-6">
                  <p className="text-white/60 text-lg max-w-2xl">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm tracking-wide text-white/40">
                    <span>{service.meta}</span>
                    {service.comingSoon && (
                      <span className="text-[#f04e23]">• Coming soon</span>
                    )}
                  </div>

                  <div className="w-full h-px bg-white/10 mt-8" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="pt-24"
          >
            <button
              onClick={() => navigate("/more-abt")}
              className="group flex items-center gap-4 text-[#f04e23] text-sm tracking-[0.35em]"
            >
              START EXPERIENCING IT
              <span className="group-hover:translate-x-2 transition">→</span>
            </button>
          </motion.div>

        </div>
      </section>

      {authOpen && (<AuthModal />)}
      <Footer />
    </>
  );
}
