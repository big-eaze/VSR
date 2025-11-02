import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#2a2a2a] via-[#1e1e1e] to-black text-gray-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6 py-14">

        {/* Brand */}
        <div>
          <h3 className="text-[#A0552D] font-bold text-2xl mb-4 tracking-wide">VS!A</h3>
          <p className="text-sm text-gray-400 mb-4">
            Elevate your wardrobe with AI-driven fashion insights and timeless design.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-[#A0552D] transition"><i className="ri-facebook-circle-line text-2xl"></i></a>
            <a href="#" className="hover:text-[#A0552D] transition"><i className="ri-twitter-x-line text-2xl"></i></a>
            <a href="#" className="hover:text-[#A0552D] transition"><i className="ri-instagram-line text-2xl"></i></a>
            <a href="#" className="hover:text-[#A0552D] transition"><i className="ri-linkedin-box-line text-2xl"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><NavLink to="/" className="hover:text-white transition">Home</NavLink></li>
            <li><NavLink to="/wardrobe" className="hover:text-white transition">Wardrobe</NavLink></li>
            <li><NavLink to="/about" className="hover:text-white transition">About</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-white transition">Contact</NavLink></li>
          </ul>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Experience</h3>
          <ul className="space-y-2 text-gray-400">
            <li>FAQ</li>
            <li>Shipping & Returns</li>
            <li>Store Policy</li>
            <li>Payment Methods</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Join Our Newsletter</h3>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email *"
              className="w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-[#A0552D] py-2 text-sm text-white placeholder-gray-400"
            />
            <label className="flex items-center space-x-2 text-sm text-gray-400">
              <input type="checkbox" className="accent-[#A0552D]" />
              <span>Subscribe to our newsletter</span>
            </label>
            <button
              type="submit"
              className="w-full bg-[#A0552D] text-white py-2 rounded-lg hover:bg-[#A0552D]/80 transition font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-sm text-gray-500">
        © 2025 VS!A. Powered by ISR.
      </div>
    </footer>

  );
};

export default Footer;
