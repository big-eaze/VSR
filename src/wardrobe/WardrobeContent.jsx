import { PlusCircle, Sparkles, BarChart, Trash } from "lucide-react"
import Header from "../components/Header"
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { MenuContext } from "../utils/MenuContext";
import Footer from "../components/Footer";
import AuthModal from "../Auth/AuthModal";
import WRLoader from "../components/WRLoader";
import { useRemove } from "../utils/wardrobeContext";
import { useNavigate } from "react-router-dom";

export default function WardrobeContent() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("All"); // track current filter
  const [filteredCategory, setFilteredCategory] = React.useState([]);


  const navigation = useNavigate();

  const { authOpen, userWardrobe, guestWardrobe, setUserWardrobe, setGuestWardrobe } = React.useContext(MenuContext);
  const { removeWear } = useRemove();
  const userData = JSON.parse(localStorage.getItem("user"));




  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const stored = localStorage.getItem(`wardrobe_${user.uid}`);
      if (stored) {
        setUserWardrobe(JSON.parse(stored));
      }
    } else {
      const stored = localStorage.getItem("guest_wardrobe");
      if (stored) {
        setGuestWardrobe(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (userData) {
      if (activeFilter === "All") {
        setFilteredCategory([
          ...(userWardrobe?.Tops || []),
          ...(userWardrobe?.Bottoms || []),
          ...(userWardrobe?.Footwears || []),
          ...(userWardrobe?.Accessories || []),
        ]);
      } else if (activeFilter === "Top") {
        setFilteredCategory(userWardrobe?.Tops || []);
      } else if (activeFilter === "Bottom") {
        setFilteredCategory(userWardrobe?.Bottoms || []);
      } else if (activeFilter === "Footwear") {
        setFilteredCategory(userWardrobe?.Footwears || []);
      } else if (activeFilter === "Accessories") {
        setFilteredCategory(userWardrobe?.Accessories || []);
      }
    } else {
      if (activeFilter === "All") {
        setFilteredCategory([
          ...(guestWardrobe?.Tops || []),
          ...(guestWardrobe?.Bottoms || []),
          ...(guestWardrobe?.Footwears || []),
          ...(guestWardrobe?.Accessories || []),
        ]);
      } else if (activeFilter === "Top") {
        setFilteredCategory(guestWardrobe?.Tops || []);
      } else if (activeFilter === "Bottom") {
        setFilteredCategory(guestWardrobe?.Bottoms || []);
      } else if (activeFilter === "Footwear") {
        setFilteredCategory(guestWardrobe?.Footwears || []);
      } else if (activeFilter === "Accessories") {
        setFilteredCategory(guestWardrobe?.Accessories || []);
      }
    }

  }, [userWardrobe, guestWardrobe, activeFilter]);

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
      <div className="pt-32 min-h-screen bg-gradient-to-br from-gray-900 via-[#A0552D] to-black text-white px-3 overflow-hidden sm:px-6">

        <header className="flex items-center justify-between mb-8">
          <h1 className="sm:text-3xl text-xl font-extrabold">👕 Your Wardrobe</h1>
          <button onClick={() => navigation("/upload")}
            className="group flex items-center gap-2 px-5 py-2.5 text-sm sm:text-base font-semibold rounded-xl 
            bg-gradient-to-r from-[#f04e23] to-[#c93c17] 
            text-white shadow-md hover:shadow-lg 
            hover:from-[#c93c17] hover:to-[#f04e23] 
            transition-all duration-300 ease-out 
            focus:outline-none focus:ring-2 focus:ring-[#f04e23]/60 whitespace-nowrap">
            <PlusCircle className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:rotate-90" />
            <span>Add Item</span>
          </button>
        </header>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 text-sm sm:text-base">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
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
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap shadow-sm ${activeFilter === filter.value
                  ? "bg-gradient-to-r from-[#f04e23] to-[#f09060] text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <section className="py-8">
          <h2 className="text-3xl font-extrabold mb-8 text-center sm:text-left text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#f04e23] to-[#f09060]">
            Your Items
          </h2>

          <div className="relative">
            {loading ? (
              <div className="w-full h-96 flex items-center justify-center rounded-xl bg-gray-900/30" aria-busy="true">
                <WRLoader />
              </div>
            ) : (
              <>
                {/* Masonry style grid with mobile-friendly fixes */}
                <motion.div
                  className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {currentClothings.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, y: 30, scale: 0.95 },
                        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 12 } },
                      }}
                      className="relative mb-6 break-inside-avoid rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer"
                    >
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-auto object-cover rounded-3xl"
                        loading="lazy"
                        whileHover={{ scale: 1.1, rotate: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Gradient overlay with info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4 flex justify-between items-center rounded-b-3xl">
                        <div>
                          <h3 className="text-white font-bold text-sm sm:text-lg">{item.name}</h3>
                          <p className="text-gray-300 text-xs sm:text-sm">{item.category} • {item.color}</p>
                        </div>
                        <button
                          onClick={() => removeWear(item.id, item.category)}
                          className="text-gray-300 hover:text-[#f04e23] transition text-xl"
                        >
                          <Trash size={22} />
                        </button>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Trash size={22} className="text-white hover:text-[#f04e23]" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                <div className="mt-12 flex flex-col items-center">
                  <div className="flex flex-wrap justify-center gap-3 mb-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageClick(index + 1)}
                        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${currentPage === index + 1
                          ? "bg-gradient-to-r from-[#f04e23] to-[#f09060] text-white shadow-lg"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">
                    Page {currentPage} of {totalPages} • {filteredCategory.length} items total
                  </p>
                </div>
              </>
            )}
          </div>
        </section>


        <section className="mt-24 text-white">
          <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] py-24 bg-[url('/fashion-texture.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>

            <h2 className="relative text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight uppercase z-10">
              Your Style Snapshot
            </h2>

            <div className="relative grid grid-cols-2 md:grid-cols-4 text-center z-10">
              {[
                { label: "Tops", value: userData ? userWardrobe?.Tops?.length : guestWardrobe?.Tops.length || 0 },
                { label: "Bottoms", value: userData ? userWardrobe?.Bottoms?.length : guestWardrobe?.Bottoms?.length || 0 },
                { label: "Shoes", value: userData ? userWardrobe?.Footwears?.length : guestWardrobe?.Bottoms?.length || 0 },
                { label: "Accessories", value: userData ? userWardrobe?.Accessories?.length : guestWardrobe?.Accessories?.length || 0 },
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


            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 pointer-events-none"></div>
          </div>





          <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]  overflow-hidden">
            <div className="relative h-[480px] sm:h-[550px] flex flex-col sm:flex-row">

              <div className="absolute inset-0 bg-[url('/studio-bg.jpg')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>


              <div className="relative flex-1 flex flex-col justify-center items-start px-8 py-8 sm:px-20 z-10">
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                  Mix & Match<br />
                  <span className="text-[#f04e23]">Challenge</span>
                </h2>
                <p className="text-gray-300 max-w-md mb-8">
                  Let the AI stylist remix your wardrobe. Combine unexpected pieces and
                  discover new outfit chemistry.
                </p>
                <button onClick={() => { navigation("/generator") }} className="relative px-8 py-3 font-semibold uppercase tracking-wider overflow-hidden 
                  before:absolute before:inset-0 before:bg-[#f04e23]/90 before:translate-x-[-100%] hover:before:translate-x-0
                  before:transition-transform before:duration-500 before:ease-out 
                  border border-[#f04e23] text-white transition-all duration-300 hover:text-black">
                  <span className="relative z-10">Try Outfit Generator</span>
                </button>
              </div>

              <div className="relative flex-1 flex justify-center items-center px-8 py-8 sm:px-20 overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-l border-white/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#f04e23]/20 via-transparent to-transparent mix-blend-overlay"></div>


                <div className="relative z-10 text-center text-[#f04e23]/80 font-bold text-3xl tracking-wider opacity-70">
                  ✦ Wardrobe Fusion ✦
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {authOpen && <AuthModal />
      }
      <Footer />
    </>
  );
}








