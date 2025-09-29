import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-gray-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6 py-12">
        {/* Column 1 */}
        <div>
          <h3 className="text-[#A0552D] font-bold text-lg mb-4">VS!A</h3>
          <div className="space-y-2 flex flex-col">
            <NavLink><a href="/" className="hover:text-white">Home</a></NavLink>
            <NavLink><a href="/wardrobe" className="hover:text-white">Wardrobe</a></NavLink>
            <NavLink><a href="/about" className="hover:text-white">About</a></NavLink>
            <NavLink><a href="/contact" className="hover:text-white">Contact</a></NavLink>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-[#A0552D] font-bold text-lg mb-4">EXPERIENCE</h3>
          <div className="space-y-2 flex flex-col">
            <NavLink><a href="#" className="hover:text-white">FAQ</a></NavLink>
            <NavLink><a href="#" className="hover:text-white">Shipping & Returns</a></NavLink>
            <NavLink><a href="#" className="hover:text-white">Store Policy</a></NavLink>
            <NavLink><a href="#" className="hover:text-white">Payment Methods</a></NavLink>
          </div >
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-[#A0552D] font-bold text-lg mb-4">FOLLOW US</h3>
          <div className="space-y-2 flex flex-col">
            <NavLink><a href="#" className="hover:text-white">Facebook</a></NavLink>
            <NavLink><a href="#" className="hover:text-white">X</a></NavLink>
            <NavLink><a href="#" className="hover:text-white">Instagram</a></NavLink>
            <NavLink><a href="#" className="hover:text-white">LinkedIn</a></NavLink>
          </div >
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-[#A0552D] font-bold text-lg mb-4">JOIN OUR NEWSLETTER</h3>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email here *"
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-[#A0552D] py-2 text-white"
            />
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="accent-[#A0552D]" />
              <span>Yes, subscribe me to your newsletter *</span>
            </label>
            <button
              type="submit"
              className="w-full bg-[#A0552D] text-white py-2 hover:bg-[#A0552D]/60 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#A0552D] text-center py-3 text-sm">
        © 2025 by VSA. Powered and secured by ISR
      </div>
    </footer>
  );
};

export default Footer;
