import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogoIcon } from "../utils/LogoIcon";
import { User, LogOut, UserCircle2, Settings } from "lucide-react";
import { MenuContext } from "../utils/MenuContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { userPrivate, setUserPrivate } = useContext(MenuContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserPrivate(null);
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const user = localStorage.getItem("user");

  return (
    <header className="fixed top-0 z-50 w-full h-20 bg-black/70 backdrop-blur-md text-white flex items-center justify-between px-6 sm:px-10 border-b border-white/10">
      {/* === LEFT: LOGO === */}
      <div className="flex items-center space-x-3">
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="hidden sm:block p-2 rounded-full bg-white/20 shadow-lg hover:shadow-[#f04e23]/50"
        >
          <LogoIcon className="w-10 h-10 drop-shadow-lg" />
        </motion.div>
        <h1 className="text-2xl font-extrabold tracking-wider">
          VS<span className="text-[#f04e23]">!A</span>
        </h1>
      </div>

      {/* === CENTER: NAV === */}
      <nav className="hidden md:flex space-x-10 relative">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative pb-1 transition duration-300 ${isActive
                ? "text-[#f04e23] font-semibold"
                : "hover:text-[#f04e23]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {item.label}
                {isActive && (
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#f04e23] rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/*RIGHT: USER/AUTH */}
      <div className="flex items-center space-x-4 relative">
        {userPrivate || user ? (
          // Logged in view
          <div className="relative">
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-2 rounded-full hover:bg-white/20 transition"
            >
              <User className="w-5 h-5 text-[#f04e23]" />
              <span className="hidden sm:inline text-sm font-medium">
                {userPrivate.username || "Israel"}
              </span>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-44 bg-black/70 border-y-2 border-y-[#f04e23] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-lg"
                >
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-white/10 transition text-sm"
                  >
                    <UserCircle2 className="w-4 h-4 text-[#f04e23]" />
                    Profile
                  </Link>
                  <Link
                    to="/wardrobe"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-white/10 transition text-sm"
                  >
                    <Settings className="w-4 h-4 text-[#f04e23]" />
                    My Wardrobe
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-white/10 transition text-sm"
                  >
                    <LogOut className="w-4 h-4 text-[#f04e23]" />
                    Log Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // Not logged in view
          <button className="px-4 py-2 rounded-full bg-[#f04e23] hover:bg-[#f04e23]/80 transition font-semibold text-sm">
            <Link to="/auth">Log in</Link>
          </button>
        )}

        {/*Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col space-y-1.5 z-30"
        >
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""
              }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"
              }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          ></span>
        </button>
      </div>

      {/* === Mobile Menu === */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-black/80 backdrop-blur-lg transform transition-transform duration-500 ${isOpen ? "translate-y-0" : "-translate-y-[200%]"
          }`}
      >
        <nav className="flex flex-col items-center space-y-6 py-10">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg transition duration-300 ${isActive
                  ? "text-[#f04e23] font-semibold"
                  : "hover:text-[#f04e23]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

        </nav>
      </div>
    </header>
  );
};

export default Header;
