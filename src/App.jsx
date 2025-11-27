import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MenuContext } from "./utils/MenuContext";

import HomePage from "./Home/HomePage";
import WardrobePage from "./wardrobe/WardrobePage";
import Services from "./Services/Services";
import Contact from "./contact/Contact";
import Loader from "./components/Loader";
import WardrobeUPL from "./wardrobe/WardrobeUPL";
import AIScannerShowcase from "./AIScannerShowCase/AIScanShowcase";
import OutfitGenerator from "./AIScannerShowCase/OutfitGenerator";
import TryOnPage from "./TryOn/TryOnPage";
import AuthPage from "./Auth/AuthModal";
import Profile from "./Profile/Profile";
import VerifyEmail from "./VerifyEmail";


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
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/wardrobe" element={<WardrobePage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/upload" element={<WardrobeUPL />} />
      <Route path="generator" element={<OutfitGenerator />} />
      <Route path="/more-abt" element={<AIScannerShowcase />} />
      <Route path="try-on" element={<TryOnPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App



