import React from "react";
import { Sparkles, Shirt, Camera, Wand2 } from "lucide-react";
import Header from "../components/Header";
import { MenuContext } from "../utils/MenuContext";
import Footer from "../components/Footer";
import AuthModal from "../Auth/AuthModal";

export default function Services() {
  const { authOpen } = React.useContext(MenuContext);


  

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
      <section className="relative pt-32 py-24 bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Intro */}
          <div className="text-center mb-20">
            <h2 className="text-2xl sm:text-5xl font-extrabold mb-6 tracking-wide">
              Discover What We Offer
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Your wardrobe is more than just clothes—it’s your story. With{" "}
              <span className="text-[#f04e23] font-semibold">Virtual Styling Assistant</span>,
              you’ll unlock new ways to express yourself, save time, and look your best every single day.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 group-hover:scale-110 transition">
                  {service.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Mini Features */}
                <ul className="space-y-2 text-gray-300 text-sm">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center space-x-2 group-hover:text-white transition"
                    >
                      <span className="w-2 h-2 bg-[#f04e23] rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Elevate Your Style?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join thousands of users already redefining their wardrobe. Start matching outfits, organizing your closet, and styling smarter with just a few taps.
            </p>
            <button className="bg-[#f04e23] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#f04e23]/50 transition shadow-lg">
              Start Matching Now
            </button>
          </div>
        </div>
      </section>
      {authOpen && (<AuthModal />)}
      <Footer />
    </>
  );
}
