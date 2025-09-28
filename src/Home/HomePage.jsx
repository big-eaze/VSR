import React from 'react'
import { ArrowRight } from "lucide-react";
import Header from '../components/Header'
import Footer from '../components/Footer';
import { Wand2, Camera, Sparkles } from "lucide-react";
import AuthModal from '../Auth/AuthModal';
import { MenuContext } from '../utils/MenuContext';

const HomePage = () => {

  const { authOpen } = React.useContext(MenuContext);
  return (
    <div>
      <Header />
      <div className="w-full min-h-screen bg-gray-50 text-gray-900">
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white overflow-hidden">
          <div className="relative z-10 text-center max-w-3xl px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Your AI <span className="text-[#f04e23]">Stylist</span> at Home
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200">
              Upload your wardrobe. Snap a photo. Get stunning outfit matches in
              seconds — powered by AI.
            </p>
            <button className="mt-8 px-8 py-3 bg-[#f04e23] hover:bg-[#d13d18] text-white font-semibold rounded-full shadow-lg transition">
              Try It Now
            </button>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Camera className="w-10 h-10 text-[#f04e23]" />,
                  title: "Snap Your Wardrobe",
                  desc: "Take photos of your clothes or upload them directly into your virtual wardrobe.",
                },
                {
                  icon: <Sparkles className="w-10 h-10 text-[#f04e23]" />,
                  title: "AI Outfit Matching",
                  desc: "Our AI scans your wardrobe and instantly generates stylish outfit combinations.",
                },
                {
                  icon: <Wand2 className="w-10 h-10 text-[#f04e23]" />,
                  title: "Discover Your Style",
                  desc: "Get personalized recommendations that fit your vibe, occasion, and weather.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition text-center"
                >
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED OUTFIT DEMO */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">
              Smart Outfit Suggestions
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
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
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition"
                >
                  <img
                    src={outfit.img}
                    alt={outfit.title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{outfit.title}</h3>
                    <ul className="mt-3 space-y-1 text-gray-600">
                      {outfit.items.map((item, j) => (
                        <li key={j}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#A0552D] text-white text-center">
          <h2 className="text-4xl font-bold">
            Ready to find your next outfit?
          </h2>
          <p className="mt-4 text-lg">
            Start matching your wardrobe with AI-powered suggestions today.
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-[#A0552D] hover:bg-gray-100 font-semibold rounded-full shadow-lg transition">
            Get Started Free
          </button>
        </section>
      </div>
      {authOpen && (<AuthModal />)}
      <Footer />
    </div>
  )
}

{
  /*
  <div className='w-full h-96 bg-white/50 flex items-center justify-center'>
            <h2 className='text-3xl font-semibold'>Explore Our Latest Collections</h2>
          </div>
          <div className='w-full h-96 bg-gray-200 flex items-center justify-center'>
            <h2 className='text-3xl font-semibold'>Join Our Community of Fashion Enthusiasts</h2>
          </div>
  */
}
export default HomePage