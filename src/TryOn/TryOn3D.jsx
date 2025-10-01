// src/pages/TryOnPage.jsx
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Menu, X, ArrowLeft } from "lucide-react"; // icons
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom";

export default function TryOnPage() {
  const wardrobe = {
    shirts: [
      { id: 1, name: "White Tee", textureUrl: "/textures/shirts/t-shirt1.jpg" },
      { id: 2, name: "Black Hoodie", textureUrl: "/textures/shirts/t-shirt2.jpg" },
      { id: 3, name: "Gray Sweatshirt", textureUrl: "/textures/shirts/t-shirt3.jpg" },
      { id: 4, name: "Red Polo", textureUrl: "/textures/shirts/t-shirt4.jpg" },
    ],
    trousers: [
      { id: 1, name: "Jeans", textureUrl: "/textures/trousers/jeans1.jpg" },
      { id: 2, name: "Chinos", textureUrl: "/textures/trousers/jeans2.jpg" },
    ],
    shoes: [
      { id: 1, name: "Sneakers", textureUrl: "/textures/shoes/sneaker7.jpg" },
      { id: 2, name: "Black Sneakers", textureUrl: "/textures/shoes/sneaker6.jpg" },
    ],
    accessories: [
      { id: 1, name: "Cap", textureUrl: "/textures/accessories/cap4.jpg" },
      { id: 2, name: "Watch", textureUrl: "/textures/accessories/watch6.jpg" },
    ],
  };

  const categoryMap = {
    shirts: "shirt",
    trousers: "trouser",
    shoes: "shoe",
    accessories: "accessory",
  };

  const [selectedCloth, setSelectedCloth] = useState({
    shirt: null,
    trouser: null,
    shoe: null,
    accessory: null,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function handleSelect(category, item) {
    setSelectedCloth((prev) => ({ ...prev, [category]: item.textureUrl }));
  }

  return (
    <div className="flex w-full h-screen bg-gradient-to-br from-gray-900 via-[#A0552D] to-black overflow-hidden relative">
      {/* ========== NAVBAR (back + wardrobe toggle on mobile) ========== */}
      <div className="md:hidden absolute top-4 left-4 z-30 flex items-center gap-4">
        {/* Back to home */}
        <Link
          to="/"
          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition"
        >
          <ArrowLeft size={18} />
          Home
        </Link>

        {/* Wardrobe toggle (mobile only) */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="md:hidden flex items-center gap-1 px-3 py-2 rounded-lg bg-[#f04e23] hover:bg-[#d9441f] text-white text-sm font-medium transition"
        >
          <Menu size={18} />
          Wardrobe
        </button>
      </div>

      {/* ========== SIDEBAR (desktop & tablet) ========== */}
      <div className="hidden md:flex w-[380px] lg:w-[450px] flex-shrink-0 
        bg-gradient-to-b from-gray-800/80 via-[#A0552D]/90 to-black/90 
        backdrop-blur-xl border-r border-gray-700/50 shadow-xl p-6 
        flex-col gap-8 overflow-y-auto z-20"
      >
        {/* Back to Home Nav */}
        <div className="hidden md:flex items-center gap-3 mb-4">
          <Link to="/" className="p-2 rounded-full hover:bg-gray-700/50">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h2 className="text-xl font-bold text-white tracking-wide">👕 Wardrobe</h2>
        </div>

        {Object.entries(wardrobe).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-gray-300 text-sm font-semibold uppercase mb-3 tracking-widest">
              {category}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(categoryMap[category], item)}
                  className={`relative group rounded-xl overflow-hidden border-2 transition-all 
                    ${selectedCloth[categoryMap[category]] === item.textureUrl
                      ? "border-[#f04e23] scale-105 shadow-lg shadow-[#f04e23]/40"
                      : "border-gray-700 hover:border-[#f04e23]/80 hover:scale-105"
                    }`}
                >
                  <img
                    src={item.textureUrl}
                    className="w-full h-24 object-cover group-hover:brightness-110 transition"
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/textures/fallback.svg";
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 text-xs text-gray-200 py-1 text-center">
                    {item.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ========== DRAWER (mobile only) ========== */}
      <div
        className={`fixed inset-y-0 left-0 w-[85%] max-w-sm bg-gradient-to-b 
          from-gray-800/95 via-[#A0552D]/95 to-black/95 backdrop-blur-xl p-6 
          z-40 transform transition-transform duration-300 ease-in-out 
          ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="absolute top-4 right-4 text-gray-200 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">👕 Wardrobe</h2>

        <div className="flex flex-col gap-8 overflow-y-auto max-h-[80vh] pr-2">
          {Object.entries(wardrobe).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-gray-300 text-sm font-semibold uppercase mb-3 tracking-widest">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(categoryMap[category], item)}
                    className={`relative group rounded-xl overflow-hidden border-2 transition-all 
                      ${selectedCloth[categoryMap[category]] === item.textureUrl
                        ? "border-[#f04e23] scale-105 shadow-lg shadow-[#f04e23]/40"
                        : "border-gray-700 hover:border-[#f04e23]/80 hover:scale-105"
                      }`}
                  >
                    <img
                      src={item.textureUrl}
                      className="w-full h-24 object-cover group-hover:brightness-110 transition"
                      alt={item.name}
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-xs text-gray-200 py-1 text-center">
                      {item.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== 3D Canvas Area ========== */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 1.6, 3], fov: 35 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Environment preset="studio" />

          <Suspense fallback={null}>
            <Avatar />
          </Suspense>

          <OrbitControls />
        </Canvas>

        {/* Floating Overlay */}
        <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 sm:py-4 rounded-lg border border-gray-700/50 shadow-lg">
          <p className="text-[12px] sm:text-base text-gray-200">Drag to rotate • Scroll to zoom</p>
        </div>
      </div>
    </div>
  );
}
