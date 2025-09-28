import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-gray-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6 py-12">
        {/* Column 1 */}
        <div>
          <h3 className="text-[#A0552D] font-bold text-lg mb-4">VS!A</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-[#A0552D] font-bold text-lg mb-4">EXPERIENCE</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Store Policy</a></li>
            <li><a href="#" className="hover:text-white">Payment Methods</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-[#A0552D] font-bold text-lg mb-4">FOLLOW US</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Facebook</a></li>
            <li><a href="#" className="hover:text-white">X</a></li>
            <li><a href="#" className="hover:text-white">Instagram</a></li>
            <li><a href="#" className="hover:text-white">Pinterest</a></li>
          </ul>
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
        © 2035 by IN.EX. Powered and secured by Wix
      </div>
    </footer>
  );
};

export default Footer;
