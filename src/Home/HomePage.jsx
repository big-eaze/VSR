import React, { useEffect, useState } from "react";
import { ArrowRight, Wand2, Camera, Sparkles } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "../Auth/AuthModal";
import { MenuContext } from "../utils/MenuContext";
import { Link, useNavigate } from "react-router-dom";
import WardrobeTeaser from "../components/WardrobeTeaser";

const HomePage = () => {
  const navigate = useNavigate();
  const { authOpen } = React.useContext(MenuContext);

  const [loaded, setLoaded] = useState({
    img1: false,
    img2: false,
    img3: false,
  });

  const Skeleton = () => (
    <motion.div
      className="absolute inset-0 w-full h-full bg-gray-700/30 rounded-3xl"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    />
  );

  return (
    <div>
      <Header />
      <div className="w-full min-h-screen bg-[#0D0D0D] text-gray-100">
        <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-black via-[#A0552D] to-[#2C150C] text-white overflow-hidden px-6 md:px-20 py-12">

          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.9 }}
            className="flex-1 flex flex-col justify-center max-w-xl z-10 mt-20 sm:mt-10 text-center md:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
            >
              Your AI <span className="text-[#f04e23]">Stylist</span> at Home
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-200 text-lg md:text-xl mb-8"
            >
              Upload your wardrobe, snap a photo, and get stunning outfit matches in seconds — powered by VSA.
            </motion.p>

            <motion.button
              onClick={() => navigate("/upload")}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-[#f04e23] hover:bg-[#d13d18] px-6 sm:px-8 py-3 rounded-full font-semibold shadow-2xl transition mx-auto md:mx-0"
            >
              <p>Upload Your Wears</p>
            </motion.button>
          </motion.div>




          <div className="w-full h-[550px] sm:h-[650px] md:flex-1 md:h-[750px] relative mt-20 sm:mt-10 md:ml-10 flex justify-start items-center">
            {[
              { key: "img1", src: "homeslide6.jpg", left: "0%", z: 5, delay: 0 },
              { key: "img2", src: "homeslide10.jpg", left: "35%", z: 10, delay: 0.2 },
              { key: "img3", src: "homeslide7.jpg", left: "70%", z: 10, delay: 0.4 },
            ].map((img) => (
              <motion.div
                key={img.key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={loaded[img.key] ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
                transition={{ duration: 0.8, delay: img.delay }}
                className="absolute top-0 w-full h-full rounded-3xl shadow-2xl overflow-hidden"
                style={{ left: img.left, zIndex: img.z }}
              >
                <AnimatePresence>
                  {!loaded[img.key] && <Skeleton key={img.key} />}
                </AnimatePresence>
                <img
                  src={img.src}
                  onLoad={() => setLoaded((prev) => ({ ...prev, [img.key]: true }))}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${loaded[img.key] ? "opacity-100" : "opacity-0"
                    }`}
                />
              </motion.div>
            ))}
          </div>

        </section>

        <section className="relative py-32 bg-[#1A0F0A] overflow-hidden text-white">
          <div className="max-w-7xl mx-auto px-6">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-4">
                AI Curated Looks
              </p>
              <h2 className="text-4xl md:text-6xl font-extrabold">
                Smart Outfit <span className="text-[#f04e23]">Suggestions</span>
              </h2>
            </motion.div>

            {/* Lookbook Layout */}
            <div className="relative grid lg:grid-cols-3 gap-12 items-center">

              {/* Left Look */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="relative group rounded-3xl overflow-hidden aspect-[3/4] border border-white/10"
              >
                <img
                  src="/matching5.jpg"
                  alt="Casual Friday"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-semibold">Casual Friday</h3>
                  <p className="text-sm text-gray-300">Denim Jacket · White Tee · Sneakers</p>
                </div>
              </motion.div>

              {/* Center Hero Look */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative group rounded-[2.5rem] overflow-hidden aspect-[3/4] border border-[#f04e23]/40 shadow-[0_0_80px_rgba(240,78,35,0.25)]"
              >
                <img
                  src="/matching4.jpg"
                  alt="Date Night"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="uppercase text-xs tracking-widest text-[#f04e23] mb-2">
                    Featured Look
                  </p>
                  <h3 className="text-3xl font-bold mb-2">Date Night</h3>
                  <p className="text-sm text-gray-200">
                    Black Dress · Heels · Gold Earrings
                  </p>
                </div>
              </motion.div>

              {/* Right Look */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="relative group rounded-3xl overflow-hidden aspect-[3/4] border border-white/10"
              >
                <img
                  src="/matching3.jpg"
                  alt="Street Style"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-semibold">Street Style</h3>
                  <p className="text-sm text-gray-300">
                    Oversized Hoodie · Cargo Pants · Chunky Shoes
                  </p>
                </div>
              </motion.div>
            </div>

            {/* AI Insight Line */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-24 text-center text-gray-300 max-w-2xl mx-auto text-lg"
            >
              Each look is intelligently curated using your wardrobe, preferences, and context —
              so what you wear always feels effortless and intentional.
            </motion.p>
          </div>
        </section>

        <section className="relative py-32 bg-[#1A0F0A]
">
          <WardrobeTeaser />
        </section>

        <section className="relative min-h-screen bg-[#1A0F0A] text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 min-h-screen items-center">

            {/* LEFT — Philosophy */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="py-32"
            >
              <p className="uppercase tracking-[0.35em] text-xs text-gray-400 mb-6">
                Why VSA Exists
              </p>

              <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-12">
                Fashion<br />
                that <span className="text-[#f04e23]">understands</span><br />
                you.
              </h2>

              <div className="space-y-10 max-w-md">
                {[
                  {
                    title: "Personalized to You",
                    desc: "Outfit intelligence shaped by your taste, habits, and daily reality.",
                  },
                  {
                    title: "Smart Fashion Tech",
                    desc: "AI that evolves with your style instead of forcing trends.",
                  },
                  {
                    title: "Save Time & Money",
                    desc: "Fewer decisions. Better outfits. Zero waste.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                    className="border-l-2 border-[#f04e23]/40 pl-6"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Living Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative h-[70vh] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="/matching4.jpg"
                alt="VSA Styling Intelligence"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent" />

              {/* Overlay Copy */}
              <div className="absolute bottom-10 left-10">
                <p className="text-sm uppercase tracking-widest text-gray-300 mb-2">
                  Real Styling Logic
                </p>
                <h4 className="text-2xl font-bold max-w-xs">
                  Every outfit starts with your wardrobe.
                </h4>
              </div>
            </motion.div>

          </div>
        </section>


        <section className="relative py-32 bg-[#1A0F0A] text-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-4">
                Testimonials
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold">
                Loved by <span className="text-[#f04e23]">Style-Minded Users</span>
              </h2>
            </motion.div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  name: "Jane D.",
                  review:
                    "VSA transformed my wardrobe. I finally feel confident choosing outfits every day.",
                  avatar: "/woman1.jpg",
                },
                {
                  name: "Michael R.",
                  review:
                    "The AI suggestions are incredibly accurate. My mornings are effortless now.",
                  avatar: "/man1.jpg",
                },
                {
                  name: "Andrew L.",
                  review:
                    "It feels like having a personal stylist that actually understands my taste.",
                  avatar: "/man2.jpg",
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#f04e23]/40 transition-all"
                >
                  {/* Quote mark */}
                  <div className="absolute -top-6 -left-4 text-7xl text-[#f04e23]/20 font-serif">
                    “
                  </div>

                  {/* Review */}
                  <p className="text-gray-200 text-lg leading-relaxed mb-10">
                    {testimonial.review}
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#f04e23]/40">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">Verified User</p>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-[#f04e23]/10 via-transparent to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-32 overflow-hidden bg-[#1A0F0A] text-white">

          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="uppercase tracking-[0.35em] text-xs text-gray-300 mb-6"
            >
              Your Style, Elevated
            </motion.p>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8"
            >
              Ready to Find
              <br />
              <span className="text-[#f04e23]">Your Next Look?</span>
            </motion.h2>

            {/* Subcopy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-14"
            >
              AI-powered styling built entirely around your wardrobe,
              your lifestyle, and your taste — nothing generic.
            </motion.p>

            {/* CTA */}
            <motion.button
              onClick={() => navigate("/more-abt")}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative inline-flex items-center gap-3 px-12 py-5 rounded-full bg-white text-black font-semibold text-lg shadow-[0_20px_60px_rgba(240,78,35,0.35)]"
            >
              <span>Try It Free</span>
              <span className="w-8 h-8 rounded-full bg-[#f04e23] text-white flex items-center justify-center">
                →
              </span>
            </motion.button>

            {/* Stats */}
            <div className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { value: "90+", label: "Stylists & Experts" },
                { value: "75K+", label: "Users Styled Yearly" },
                { value: "30+", label: "Awards & Features" },
                { value: "100+", label: "Outfits Weekly" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-5xl md:text-6xl font-extrabold tracking-tight">
                    {stat.value}
                  </div>
                  <p className="mt-3 text-sm md:text-base text-gray-300">
                    {stat.label}
                  </p>
                  <div className="mt-5 w-12 h-[2px] bg-gradient-to-r from-transparent via-[#f04e23] to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>





      </div>

      {authOpen && <AuthModal />}
      <Footer />
    </div>
  );
};

export default HomePage;
