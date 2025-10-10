import React, { useEffect, useState } from "react";
import { MenuContext } from "./MenuContext";
import wardrobe from "../../data/outfits";


export function MenuProvider({ children }) {

  const [authOpen, setAuthOpen] = useState(false);

  //state to hold selected cloth textures
  // virtual try-on selected cloth state
  const [selectedCloth, setSelectedCloth] = useState({
    shirt: null,
    trouser: null,
    shoe: null,
    accessory: null,
  });

  //preferred style (user)

  const [preferredStyle, setPreferredStyle] = useState(null);

  const [wardrobeOverall, setWardrobeOverall] = useState(() => {
    try {
      const saved = localStorage.getItem("wardrobe");
      return saved ? JSON.parse(saved) : wardrobe;
    } catch (error) {
      console.error("Invalid wardrobe in localStorage, resetting:", error);
      localStorage.removeItem("wardrobe");
      return wardrobe;
    }
  }
  );
  useEffect(() => {
    localStorage.setItem("wardrobe", JSON.stringify(wardrobeOverall));
  }, [wardrobeOverall]);

  return (
    <MenuContext.Provider value={{
      authOpen,
      setAuthOpen,
      selectedCloth,
      setSelectedCloth,
      preferredStyle,
      setPreferredStyle,
      wardrobeOverall,
      setWardrobeOverall
    }}
    >
      {children}
    </MenuContext.Provider>
  )
}