import React from "react"
import HomePage from "./Home/HomePage"
import WardrobePage from "./wardrobe/WardrobePage"
import Services from "./Services/Services"
import Contact from "./contact/Contact"

import { Routes, Route } from "react-router-dom"
import { MenuContext } from "./utils/MenuContext"


function App() {

  const { authOpen } = React.useContext(MenuContext);

  React.useEffect(() => {

    if (authOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [authOpen]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wardrobe" element={<WardrobePage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default App


//https://www.wix.com/website/templates/html/online-store/fashion-clothing/2

//https://www.wix.com/website-template/view/html/2114?originUrl=https%3A%2F%2Fwww.wix.com%2Fwebsite%2Ftemplates%2Fhtml%2Fonline-store%2Ffashion-clothing%2F2&tpClick=view_button&esi=234adaa1-a59f-42c4-b8ee-bfd268c0d43a