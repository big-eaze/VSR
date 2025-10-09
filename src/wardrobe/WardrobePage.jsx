import { PlusCircle, Sparkles, BarChart, Trash } from "lucide-react"
import Header from "../components/Header"
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { MenuContext } from "../utils/MenuContext";
import Footer from "../components/Footer";
import AuthModal from "../Auth/AuthModal";
import WRLoader from "../components/WRLoader";
import { useRemove } from "../utils/wardrobeContext";

export default function WardrobePage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("All"); // track current filter
  const [filteredCategory, setFilteredCategory] = React.useState([]);

  const { authOpen, wardrobeOverall } = React.useContext(MenuContext);
  const { removeWear } = useRemove();


  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredCategory([
        ...wardrobeOverall.Tops,
        ...wardrobeOverall.Bottoms,
        ...wardrobeOverall.Footwears,
        ...wardrobeOverall.Accessories,
      ]);
    } else if (activeFilter === "Top") {
      setFilteredCategory(wardrobeOverall.Tops);
    } else if (activeFilter === "Bottom") {
      setFilteredCategory(wardrobeOverall.Bottoms);
    } else if (activeFilter === "Footwear") {
      setFilteredCategory(wardrobeOverall.Footwears);
    } else if (activeFilter === "Accessories") {
      setFilteredCategory(wardrobeOverall.Accessories);
    }
  }, [wardrobeOverall, activeFilter]);

  // Pagination logic
  const rowsPerPage = 12;
  const totalPages = Math.ceil(filteredCategory.length / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentClothings = filteredCategory.slice(indexOfFirstItem, indexOfLastItem);

  function handlePageClick(pageNumber) {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setLoading(false);
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
                  setActiveFilter(filter.value);
                  setCurrentPage(1);
                  setLoading(true);
                  setTimeout(() => setLoading(false), 400);
                }}
                className={`px-4 py-2 rounded-full transition whitespace-nowrap ${activeFilter === filter.value
                  ? "bg-[#f04e23] text-white"
                  : "bg-gray-800 hover:bg-gray-700"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wardrobe Grid */}
        <section>
          <h2 className="text-xl font-bold mb-4">Your Items</h2>
          <div className="relative">
            {loading ? (
              <div className="w-full h-96 flex items-center justify-center rounded-xl" aria-busy="true">
                <WRLoader />
              </div>
            ) : (
              <>
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08 },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {currentClothings.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, y: 40, scale: 0.9 },
                        show: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { type: "spring", stiffness: 120, damping: 12 },
                        },
                      }}
                      whileHover={{
                        scale: 1.05,
                        rotate: 1,
                        transition: { type: "spring", stiffness: 200 },
                      }}
                      className="bg-gray-800/60 h-96 rounded-xl shadow-lg overflow-hidden cursor-pointer"
                    >
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-72 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="flex items-center justify-between">
                        <div className="p-3">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-400">
                            {item.category} • {item.color}
                          </p>
                        </div>
                        <div
                          onClick={() => removeWear(item.id, item.category)}
                          className="pr-4 w-10 h-10 text-white  hover:text-[#f04e23] transition"
                        >
                          <Trash className="w-full h-full" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                <div>
                  <div className="flex justify-center mt-8 space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageClick(index + 1)}
                        className={`px-3 py-1 rounded-full ${currentPage === index + 1
                          ? "bg-[#f04e23] text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                          } transition`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-2">
                    Page {currentPage} of {totalPages} • {filteredCategory.length} items total
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
      {authOpen && <AuthModal />}
    </>
  );
}
