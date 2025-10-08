import React, { useEffect } from "react"
import HomePage from "./Home/HomePage"
import WardrobePage from "./wardrobe/WardrobePage"
import Services from "./Services/Services"
import Contact from "./contact/Contact"

import { Routes, Route, useLocation } from "react-router-dom"
import { MenuContext } from "./utils/MenuContext"
import Loader from "./components/Loader"
import TryOn3D from "./TryOn/TryOn3D"
import WardrobeUPL from "./wardrobe/WardrobeUPL"
import AIScannerShowcase from "./AIScannerShowCase/AIScanShowcase"
import OutfitGenerator from "./AIScannerShowCase/OutfitGenerator"


function App() {

  const { authOpen } = React.useContext(MenuContext);
  const [loading, setLoading] = React.useState(true);
  const pathname = useLocation()

  React.useEffect(() => {

    if (authOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [authOpen]);


  //always scroll to the top when a new page opens
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [pathname])



  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000)
    return () => clearTimeout(timer);
  })

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wardrobe" element={<WardrobePage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/try-on" element={<TryOn3D />} />
      <Route path="/upload" element={<WardrobeUPL />} />
      <Route path="generator" element={<OutfitGenerator />} />
      <Route path="/more-abt" element={<AIScannerShowcase />} />
    </Routes>
  )
}

export default App


//https://www.wix.com/website/templates/html/online-store/fashion-clothing/2

//https://www.wix.com/website-template/view/html/2114?originUrl=https%3A%2F%2Fwww.wix.com%2Fwebsite%2Ftemplates%2Fhtml%2Fonline-store%2Ffashion-clothing%2F2&tpClick=view_button&esi=234adaa1-a59f-42c4-b8ee-bfd268c0d43a

//https://www.figma.com/design/cVSqF8giCDk7idytytbKqu/Website-Redesign?node-id=0-1&p=f&t=sWBgDXvhK62DR78L-0