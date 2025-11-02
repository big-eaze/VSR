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
        <section className="mt-24 text-white">
          {/* --- FULL-WIDTH ANGLED SNAPSHOT --- */}
          <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] py-24 bg-[url('/fashion-texture.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>

            <h2 className="relative text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight uppercase z-10">
              Your Style Snapshot
            </h2>

            <div className="relative grid grid-cols-2 md:grid-cols-4 text-center z-10">
              {[
                { label: "Tops", value: wardrobeOverall.Tops.length },
                { label: "Bottoms", value: wardrobeOverall.Bottoms.length },
                { label: "Shoes", value: wardrobeOverall.Footwears.length },
                { label: "Accessories", value: wardrobeOverall.Accessories.length },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden flex flex-col justify-center items-center 
          h-56 border-x border-white/10 bg-white/10 backdrop-blur-xl 
          hover:bg-white/20 hover:scale-[1.02] transition-all duration-500"
                  style={{
                    clipPath: "polygon(0 0, 100% 5%, 100% 95%, 0% 100%)",
                  }}
                >
                  <span className="text-5xl font-extrabold text-[#f04e23] drop-shadow-lg">
                    {stat.value}
                  </span>
                  <p className="uppercase text-gray-300 mt-2 tracking-widest text-sm">
                    {stat.label}
                  </p>

                  <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#f04e23] to-transparent opacity-70"></div>
                </div>
              ))}
            </div>

            {/* overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 pointer-events-none"></div>
          </div>

          {/* --- FULL-WIDTH GLASS MIX & MATCH --- */}
          <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] mt-32 overflow-hidden">
            <div className="relative h-[480px] sm:h-[550px] flex flex-col sm:flex-row">
              {/* Glass gradient background */}
              <div className="absolute inset-0 bg-[url('/studio-bg.jpg')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>

              {/* Left: Content */}
              <div className="relative flex-1 flex flex-col justify-center items-start px-8 sm:px-20 z-10">
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                  Mix & Match<br />
                  <span className="text-[#f04e23]">Challenge</span>
                </h2>
                <p className="text-gray-300 max-w-md mb-8">
                  Let the AI stylist remix your wardrobe. Combine unexpected pieces and
                  discover new outfit chemistry.
                </p>
                <button className="relative px-8 py-3 font-semibold uppercase tracking-wider overflow-hidden 
          before:absolute before:inset-0 before:bg-[#f04e23]/90 before:translate-x-[-100%] hover:before:translate-x-0
          before:transition-transform before:duration-500 before:ease-out 
          border border-[#f04e23] text-white transition-all duration-300 hover:text-black">
                  <span className="relative z-10">Try Outfit Generator</span>
                </button>
              </div>

              {/* Right: Reflective Glass Panel */}
              <div className="relative flex-1 flex justify-center items-center overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-l border-white/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#f04e23]/20 via-transparent to-transparent mix-blend-overlay"></div>

                {/* optional image / pattern */}
                <div className="relative z-10 text-center text-[#f04e23]/80 font-bold text-3xl tracking-wider opacity-70">
                  ✦ Wardrobe Fusion ✦
                </div>
              </div>
            </div>
          </div>
        </section>




      </div>

      {authOpen && <AuthModal />}
    </>
  );
}
