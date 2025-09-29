import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MenuContext } from "../utils/MenuContext";
import AuthModal from "../Auth/AuthModal";


export default function Contact() {
  const { authOpen } = React.useContext(MenuContext);
  return (
    <>
      <Header />
      <section className="min-h-screen relative bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white pt-32 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-5xl font-extrabold mb-4 tracking-wide">
              Get in Touch
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have questions, feedback, or ideas? We’d love to hear from you.
              Reach out and let’s make your wardrobe smarter together.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700">
                  <Mail className="w-6 h-6 text-[#f04e23]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="text-gray-400">support@vsia.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700">
                  <Phone className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Phone</h3>
                  <p className="text-gray-400">+1 (555) 234-5678</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700">
                  <MapPin className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Address</h3>
                  <p className="text-gray-400">123 Fashion Street, Style City</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-800">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#f04e23] focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#f04e23] focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#f04e23] focus:outline-none"
                    placeholder="Type your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-[#f04e23] hover:bg-[#f04e23]/50 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {authOpen && (<AuthModal />)}
      <Footer />
    </>
  );
}
