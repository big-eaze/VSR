import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaMailBulk, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#1A0F0A] text-white py-16 overflow-hidden">
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100, y: 100 }}
          animate={{ opacity: 0.5, x: 0, y: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-[100px] h-[100px] rounded-full bg-[#f04e23] blur-lg"
          style={{ top: "20%", left: "30%" }}
        />
        <motion.div
          initial={{ opacity: 0, x: 100, y: -100 }}
          animate={{ opacity: 0.5, x: 0, y: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-[80px] h-[80px] rounded-full bg-[#f04e23] blur-lg"
          style={{ top: "50%", left: "60%" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section: Floating Logos and Links */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center mb-12 space-y-12 lg:space-y-0">
          {/* Logo Floating */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-[#f04e23] text-6xl font-extrabold hover:scale-110 transform transition-all"
          >
            VS!A
          </motion.div>

          {/* Social Media Floating Icons */}
          <div className="flex gap-8 text-3xl text-gray-300">
            <motion.a
              href="#"
              className="relative group hover:text-[#f04e23] transition-all"
            >
              <FaFacebook />
              <div className="absolute inset-0 rounded-full bg-[#f04e23] opacity-0 group-hover:opacity-100 transition-all"></div>
            </motion.a>
            <motion.a
              href="#"
              className="relative group hover:text-[#f04e23] transition-all"
            >
              <FaTwitter />
              <div className="absolute inset-0 rounded-full bg-[#f04e23] opacity-0 group-hover:opacity-100 transition-all"></div>
            </motion.a>
            <motion.a
              href="#"
              className="relative group hover:text-[#f04e23] transition-all"
            >
              <FaInstagram />
              <div className="absolute inset-0 rounded-full bg-[#f04e23] opacity-0 group-hover:opacity-100 transition-all"></div>
            </motion.a>
            <motion.a
              href="#"
              className="relative group hover:text-[#f04e23] transition-all"
            >
              <FaMailBulk />
              <div className="absolute inset-0 rounded-full bg-[#f04e23] opacity-0 group-hover:opacity-100 transition-all"></div>
            </motion.a>
          </div>
        </div>

        {/* Section: Scattered Links */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Floating Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 space-y-4 text-gray-300 text-sm"
          >
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="hover:text-[#f04e23] transition-all">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/wardrobe" className="hover:text-[#f04e23] transition-all">
                  Wardrobe
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-[#f04e23] transition-all">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-[#f04e23] transition-all">
                  Contact
                </NavLink>
              </li>
            </ul>
          </motion.div>

          {/* Floating Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="relative z-10 space-y-4"
          >
            <h3 className="font-semibold text-lg">Join Our Newsletter</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email *"
                className="w-full bg-transparent border-b border-gray-600 text-white py-3 placeholder-gray-400"
              />
              <label className="flex items-center space-x-2 text-sm text-gray-400">
                <input type="checkbox" className="accent-[#f04e23]" />
                <span>Subscribe to our newsletter</span>
              </label>
              <button
                type="submit"
                className="w-full bg-[#f04e23] text-white py-3 rounded-lg hover:bg-[#d13d18] transition-all font-semibold"
              >
                Subscribe
              </button>
            </form>
          </motion.div>

          {/* Floating Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="relative z-10 space-y-4"
          >
            <h3 className="font-semibold text-lg">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@vsai.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Style St, Fashion City</li>
            </ul>
          </motion.div>
        </div>

        {/* Section: Footer Bottom with Neon Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center text-sm text-gray-500 mt-12 relative z-10"
        >
          <p>© 2025 VS!A. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
