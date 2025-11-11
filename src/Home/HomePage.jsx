import React from "react";
import { ArrowRight, Wand2, Camera, Sparkles } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import AuthModal from "../Auth/AuthModal";
import { MenuContext } from "../utils/MenuContext";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { authOpen } = React.useContext(MenuContext);

  return (
    <div>
      <Header />
      <div className="w-full min-h-screen bg-[#0D0D0D] text-gray-100">
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#A0552D] to-[#2C150C] text-white overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center max-w-3xl px-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Your AI <span className="text-[#f04e23]">Stylist</span> at Home
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200">
              Upload your wardrobe. Snap a photo. Get stunning outfit matches in
              seconds — powered by VSA.
            </p>
            <button className="mt-8 px-8 py-3 bg-[#f04e23] hover:bg-[#d13d18] text-white font-semibold rounded-full shadow-lg transition">
              <Link to="/upload">upload your wears</Link>
            </button>
          </motion.div>

       
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]"></div>
        </section>

        <section className="relative py-24 bg-gradient-to-b from-[#2C150C] via-[#1A0D08] to-[#120907] text-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
            >
              How It <span className="text-[#f04e23]">Works</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-10 relative">
              {[
                {
                  icon: <Camera className="w-10 h-10 text-[#f04e23]" />,
                  title: "Snap Your Wardrobe",
                  desc: "Take photos or upload your clothes directly into your virtual wardrobe.",
                },
                {
                  icon: <Sparkles className="w-10 h-10 text-[#f04e23]" />,
                  title: "AI Outfit Matching",
                  desc: "Our AI analyzes your wardrobe and crafts stunning outfit ideas.",
                },
                {
                  icon: <Wand2 className="w-10 h-10 text-[#f04e23]" />,
                  title: "Discover Your Style",
                  desc: "Get personalized suggestions based on trends, vibe, and weather.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.3 }}
                  viewport={{ once: true }}
                  className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:bg-white/20 transition-transform hover:-translate-y-2 shadow-lg"
                >
                  <div className="absolute -top-6 left-6 bg-[#f04e23] text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {i + 1}
                  </div>
                  <div className="mt-6">{step.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-gray-300 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-28 bg-gradient-to-b from-[#120907] via-[#1F1009] to-[#2C150C] overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-16 text-white"
            >
              Smart Outfit <span className="text-[#f04e23]">Suggestions</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  img: "/matching5.jpg",
                  title: "Casual Friday",
                  items: ["Denim Jacket", "White Tee", "Sneakers"],
                },
                {
                  img: "/matching4.jpg",
                  title: "Date Night",
                  items: ["Black Dress", "Heels", "Gold Earrings"],
                },
                {
                  img: "/matching3.jpg",
                  title: "Street Style",
                  items: ["Oversized Hoodie", "Cargo Pants", "Chunky Shoes"],
                },
              ].map((outfit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.3 }}
                  viewport={{ once: true }}
                  className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(240,78,35,0.4)] transition duration-500"
                >
                  <img
                    src={outfit.img}
                    alt={outfit.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-left text-white">
                    <h3 className="text-2xl font-bold mb-2">{outfit.title}</h3>
                    <ul className="text-sm space-y-1 opacity-90">
                      {outfit.items.map((item, j) => (
                        <li key={j}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-gradient-to-b from-[#2C150C] via-[#3B1E12] to-[#1A1A1A] text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16">
              Why Choose <span className="text-[#f04e23]">VSA?</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: "🎯",
                  title: "Personalized to You",
                  desc: "Tailored outfit ideas based on your taste, lifestyle, and weather.",
                },
                {
                  icon: "🤖",
                  title: "Smart Fashion Tech",
                  desc: "Our AI fuses trend forecasting with personal preference learning.",
                },
                {
                  icon: "💡",
                  title: "Save Time & Money",
                  desc: "Plan looks effortlessly and rediscover your wardrobe’s potential.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 * i }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-xl hover:bg-white/20 transition"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-200">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <section className="relative py-24 bg-gradient-to-br from-[#f04e23] via-[#A0552D] to-[#3B1E12] text-white text-center overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Find Your Next Look?
          </motion.h2>
          <p className="text-lg opacity-90 mb-8">
            Discover your perfect outfit — powered by AI and your unique wardrobe.
          </p>
          <button
            onClick={() => navigate("/more-abt")}
            className="px-10 py-4 bg-white text-[#f04e23] rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Try It Free
          </button>

          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center mt-20">
            {[
              { value: "90+", label: "Stylists & Fashion Experts" },
              { value: "75K+", label: "Happy Users Every Year" },
              { value: "30+", label: "Style Awards & Features" },
              { value: "100+", label: "New Outfits Every Week" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center"
              >
                <div className="text-5xl sm:text-6xl font-extrabold text-white mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-100 text-sm md:text-base">{stat.label}</p>
                <div className="mt-4 w-10 h-[2px] bg-white/40 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {authOpen && <AuthModal />}
      <Footer />
    </div>
  );
};

export default HomePage;
