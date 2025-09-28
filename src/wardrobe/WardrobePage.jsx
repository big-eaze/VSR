import { PlusCircle, Sparkles, Shirt, BarChart } from "lucide-react"
import Header from "../components/Header"
import React from "react";
import { MenuContext } from "../utils/MenuContext";
import Footer from "../components/Footer";
import AuthModal from "../Auth/AuthModal";

export default function WardrobePage() {


  const { authOpen } = React.useContext(MenuContext);
  // Example wardrobe items
  const wardrobe = [
    { id: 1, name: "White T-Shirt", category: "Top", color: "White", image: "/matching2.jpg" },
    { id: 2, name: "Blue Jeans", category: "Bottom", color: "Blue", image: "/matching3.jpg" },
    { id: 3, name: "Leather Jacket", category: "Outerwear", color: "Black", image: "/matching4.jpg" },
    { id: 4, name: "White T-Shirt", category: "Top", color: "White", image: "/matching2.jpg" },
    { id: 5, name: "Blue Jeans", category: "Bottom", color: "Blue", image: "/matching3.jpg" },
    { id: 6, name: "Leather Jacket", category: "Outerwear", color: "Black", image: "/matching4.jpg" },
  ]

  return (
    <>
      <Header />
      <div className="pt-32 min-h-screen bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="sm:text-3xl text-xl font-extrabold">👕 Your Wardrobe</h1>
          <button className="group flex items-center gap-2 px-5 py-2.5 text-sm sm:text-base font-semibold rounded-xl 
            bg-gradient-to-r from-[#f04e23] to-[#c93c17] 
            text-white shadow-md hover:shadow-lg 
            hover:from-[#c93c17] hover:to-[#f04e23] 
            transition-all duration-300 ease-out 
            focus:outline-none focus:ring-2 focus:ring-[#f04e23]/60 whitespace-nowrap">
            <PlusCircle className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:rotate-90" />
            <span>Add Item</span>
          </button>


        </header>

        {/* Filters */}
        <div className="flex flex-col items-start sm:flex-row sm:items-center  gap-1 md:gap-4 mb-6 text-sm">
          <button className="px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700 transition">All</button>
          <button className="px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700 transition">Tops</button>
          <button className="px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700 transition">Bottoms</button>
          <button className="px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700 transition">Shoes</button>
          <button className="px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700 transition">Accessories</button>
        </div>

        {/* Wardrobe Grid */}
        <section>
          <h2 className="text-xl font-bold mb-4">Your Items</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {wardrobe.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800/60 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.category} • {item.color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outfit Suggestions */}
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Suggested Outfits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/70 rounded-xl p-4 shadow-md">
              <p className="font-medium mb-2">Casual Fit</p>
              <div className="flex gap-2">
                <img src="/matching1.jpg" className="w-16 h-16 rounded-md object-cover" />
                <img src="/matching2.jpg" className="w-16 h-16 rounded-md object-cover" />
                <img src="/matching3.jpg" className="w-16 h-16 rounded-md object-cover" />
              </div>
            </div>
            <div className="bg-gray-800/70 rounded-xl p-4 shadow-md">
              <p className="font-medium mb-2">Night Out</p>
              <div className="flex gap-2">
                <img src="/matching1.jpg" className="w-16 h-16 rounded-md object-cover" />
                <img src="/matching2.jpg" className="w-16 h-16 rounded-md object-cover" />
                <img src="/matching3.jpg" className="w-16 h-16 rounded-md object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Wardrobe Insights */}
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <BarChart className="w-5 h-5 text-teal-400" />
            Wardrobe Insights
          </h2>
          <div className="bg-gray-800/70 p-6 rounded-xl shadow-md">
            <p className="text-gray-300 mb-2">👕 40% Tops • 👖 30% Bottoms • 👟 20% Shoes • 🎒 10% Accessories</p>
            <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-3 w-[40%] float-left"></div>
              <div className="bg-indigo-500 h-3 w-[30%] float-left"></div>
              <div className="bg-pink-500 h-3 w-[20%] float-left"></div>
              <div className="bg-yellow-500 h-3 w-[10%] float-left"></div>
            </div>
          </div>
        </section>
      </div>
      {authOpen && (<AuthModal />)}

    </>
  )
}
