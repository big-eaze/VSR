import { PlusCircle, Sparkles, Shirt, BarChart } from "lucide-react"
import Header from "../components/Header"
import React from "react";
import { MenuContext } from "../utils/MenuContext";
import Footer from "../components/Footer";
import AuthModal from "../Auth/AuthModal";
import wardrobe from "../../data/outfits";
import WRLoader from "../components/WRLoader";

export default function WardrobePage() {

  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const { authOpen } = React.useContext(MenuContext);

  const [filteredCategory, setFilteredCategory] = React.useState(wardrobe);


  //Pagination logic
  const rowsperPage = 12;
  const totalPages = Math.ceil(filteredCategory.length / rowsperPage);
  const indexOfLastItem = currentPage * rowsperPage;
  const indexOfFirstItem = indexOfLastItem - rowsperPage;
  const currentClothings = filteredCategory.slice(indexOfFirstItem, indexOfLastItem);



  // Filter logic
  const handleFilter = (category) => {
    setFilteredCategory(() => {
      if (category === "All") {
        return wardrobe;
      } else if (category === "Top") {
        return wardrobe.filter(item => item.category === "Top");
      } else if (category === "Bottom") {
        return wardrobe.filter(item => item.category === "Bottom");
      } else if (category === "Footwear") {
        return wardrobe.filter(item => item.category === "Footwear");
      } else if (category === "Accessories") {
        return wardrobe.filter(item => item.category === "Accessory");
      }
    });
  }

  function handlePageClick(pageNumber) {
    // show loader
    setLoading(true);

    setTimeout(() => {
      setCurrentPage(pageNumber);
      setLoading(false);
      // optional: scroll the grid into view
      const gridTop = document.querySelector("section h2")?.getBoundingClientRect()?.top ?? 0;
      window.scrollBy({ top: gridTop - 120, behavior: "smooth" });
    }, 3000);
  }



  return (
    <>
      <Header />
      <div className="pt-32 min-h-screen bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white p-3 sm:p-6">
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 text-sm sm:text-base">


          {/* Buttons wrapper */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All", value: "All" },
              { label: "Tops", value: "Top" },
              { label: "Bottoms", value: "Bottom" },
              { label: "Shoes", value: "Footwear" },
              { label: "Accessories", value: "Accessories" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  handleFilter(filter.value);
                  setLoading(true);
                  setTimeout(() => setLoading(false), 4000);
                  setCurrentPage(1);

                }}
                className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition whitespace-nowrap"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wardrobe Grid */}
        <section className="">
          <h2 className="text-xl font-bold mb-4">Your Items</h2>

          {/* relative wrapper so overlay only covers this region */}
          <div className="relative">

            {/* Overlay loader — only shown while loading */}
            {loading ? (
              <div
                className="w-full h-96 flex items-center justify-center  rounded-xl"
                aria-busy="true"
              >
                <WRLoader />
              </div>
            ) :
              (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
                    {currentClothings.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-800/60 h-96 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
                      >
                        <img src={item.image} alt={item.name} className="w-full h-72 object-cover" />
                        <div className="p-3">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-400">{item.category} • {item.color}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Pagination */}
                  <div>
                    <div className="flex justify-center mt-8 space-x-2">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => {
                            handlePageClick(index + 1);

                          }}
                          className={`px-3 py-1 rounded-full ${currentPage === index + 1
                            ? "bg-[#f04e23] text-white"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            } transition`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    <div>
                      <p className="text-center text-sm text-gray-400 mt-2">
                        Page {currentPage} of {totalPages} • {filteredCategory.length} items total
                      </p>
                    </div>
                  </div>
                </>
              )
            }
          </div>


        </section>


        {/* Outfit Suggestions */}
        <section className="mt-16">
          <h2 className="flex items-center gap-2 text-2xl font-bold mb-8">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            Suggested Outfits
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Outfit Card */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
              <span className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full">
                Casual
              </span>
              <p className="text-lg font-semibold mb-4 group-hover:text-yellow-400 transition">
                Casual Fit
              </p>
              <div className="flex gap-3">
                <img
                  src="/matching1.jpg"
                  className="w-20 h-20 rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-transform"
                />
                <img
                  src="/matching2.jpg"
                  className="w-20 h-20 rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-transform delay-100"
                />
                <img
                  src="/matching3.jpg"
                  className="w-20 h-20 rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-transform delay-200"
                />
              </div>
            </div>

            {/* Another Outfit */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
              <span className="absolute top-4 right-4 bg-pink-500/20 text-pink-400 text-xs font-semibold px-3 py-1 rounded-full">
                Night Out
              </span>
              <p className="text-lg font-semibold mb-4 group-hover:text-pink-400 transition">
                Night Out
              </p>
              <div className="flex gap-3">
                <img
                  src="/matching1.jpg"
                  className="w-20 h-20 rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-transform"
                />
                <img
                  src="/matching2.jpg"
                  className="w-20 h-20 rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-transform delay-100"
                />
                <img
                  src="/matching3.jpg"
                  className="w-20 h-20 rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-transform delay-200"
                />
              </div>
            </div>

            {/* Example Third Outfit */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
              <span className="absolute top-4 right-4 bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                Formal
              </span>
              <p className="text-lg font-semibold mb-4 group-hover:text-green-400 transition">
                Formal Look
              </p>
              <div className="flex gap-3">
                <img
                  src="/matching1.jpg"
                  className="w-20 h-20 rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-transform"
                />
                <img
                  src="/matching2.jpg"
                  className="w-20 h-20 rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-transform delay-100"
                />
                <img
                  src="/matching3.jpg"
                  className="w-20 h-20 rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-transform delay-200"
                />
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
            <p className="text-gray-300 text-sm sm:text-base mb-2">👕 40% Tops • 👖 30% Bottoms • 👟 20% Shoes • 🎒 10% Accessories</p>
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
