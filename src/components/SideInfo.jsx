import React from 'react'

function SideInfo() {
  return (
    <div className="w-full lg:w-96 bg-gradient-to-b from-[#A0552D]/80 via-gray-800/40 to-black/40 backdrop-blur-xl p-8 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white/90 mb-4">Style Inspiration ✨</h2>
        <ul className="space-y-3 text-white/50 text-sm leading-relaxed">
          <li>👔 A crisp white shirt never goes out of style.</li>
          <li>👖 Neutral trousers pair well with bold tops.</li>
          <li>👟 Sneakers bring casual comfort to any look.</li>
          <li>🧢 Accessories can transform your outfit instantly.</li>
        </ul>
      </div>

      <blockquote className="mt-8 text-lg italic text-gray-300 border-l-4 border-[#f04e23] pl-4">
        “Style is a way to say who you are without having to speak.”
      </blockquote>
    </div>
  )
}

export default SideInfo;