import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MenuContext } from "../utils/MenuContext";
import AuthModal from "../Auth/AuthModal";

export default function Contact() {
  const { authOpen } = React.useContext(MenuContext);

  return (
    <>
      <Header />
      {/* Fullscreen Hero Section with Parallax Effect */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white pt-32 pb-20 lg:pb-0 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20">

          {/* LEFT — EDITORIAL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight">
              Let’s <span className="text-[#f04e23]">talk.</span> <br />
              <span className="text-white/40">Really talk.</span>
            </h1>

            <p className="text-lg text-white/60 max-w-xl">
              Whether it’s feedback, collaboration, or a wild idea —
              we’re listening.
            </p>

            <div className="w-24 h-px bg-white/20" />

            <div className="space-y-2 text-sm text-white/50">
              <p>support@vsia.com</p>
              <p>+1 (000) 000-3333</p>
            </div>
          </motion.div>

          {/* RIGHT — MINIMAL FORM */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="space-y-10"
          >
            <input
              placeholder="Name"
              className="w-full bg-transparent border-b border-white/30 py-4 focus:outline-none focus:border-[#f04e23]"
            />

            <input
              placeholder="Email"
              className="w-full bg-transparent border-b border-white/30 py-4 focus:outline-none focus:border-[#f04e23]"
            />

            <textarea
              rows={4}
              placeholder="Message"
              className="w-full bg-transparent border-b border-white/30 py-4 focus:outline-none focus:border-[#f04e23]"
            />

            <button
              className="group flex items-center gap-3 text-[#f04e23] font-semibold tracking-wide"
            >
              SEND MESSAGE
              <span className="group-hover:translate-x-2 transition">→</span>
            </button>
          </motion.form>

        </div>
      </section>


      {authOpen && <AuthModal />}
      <Footer />
    </>
  );
}
