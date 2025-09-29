import React from 'react'
import { NavLink } from 'react-router-dom'
import { LogoIcon } from '../utils/LogoIcon'
import { User } from 'lucide-react'
import { MenuContext } from '../utils/MenuContext';


const navItems = [
  { label: "Home", to: "/" },
  { label: "Wardrobe", to: "/wardrobe" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];


const Header = () => {

  const [isOpen, setIsOpen] = React.useState(false);
  const { setAuthOpen } = React.useContext(MenuContext);

  return (
    <header className="fixed top-0 z-20 w-full h-20 bg-black/70 backdrop-blur-md text-white flex items-center justify-between px-10">
      {/* LEFT: Logo */}
      <div className="flex items-center space-x-3">
        <LogoIcon size={40} />
        <h1 className="text-2xl font-extrabold tracking-wider">
          VS<span className="text-[#f04e23]">!A</span>
        </h1>
      </div>

      {/* CENTER: Nav links */}
      {/* Nav Links */}
      <nav className=" hidden md:flex space-x-10 relative">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative pb-1 transition duration-300 ${isActive ? "text-[#f04e23] font-semibold" : "hover:text-[#f04e23]"
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


      {/* RIGHT: Auth */}
      <div className='flex space-x-3 sm:space-x-4 items-center'>
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-[#f04e23]" />
          <button onClick={() => setAuthOpen(true)} className="sm:px-4 px-3 py-2 sm:py-2 rounded-full bg-[#f04e23] hover:bg-[#f04e23]/80 transition font-semibold text-sm">
            Log in
          </button>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col space-y-1.5 relative z-30"
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

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-20 w-full right-0 bg-black/75 backdrop-blur-md transform transition-transform duration-500 ${isOpen ? "translate-y-0" : "-translate-y-[200%]"
            }`}
        >
          <nav className="flex flex-col items-center space-y-6 py-10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg transition duration-300 ${isActive ? "text-[#f04e23] font-semibold" : "hover:text-[#f04e23]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>

  )
}

export default Header;