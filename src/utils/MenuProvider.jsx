import React, { useState } from "react";
import { MenuContext } from "./MenuContext";


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

  return (
    <MenuContext.Provider value={{
      authOpen,
      setAuthOpen,
      selectedCloth,
      setSelectedCloth,
      preferredStyle,
      setPreferredStyle
    }}
    >
      {children}
    </MenuContext.Provider>
  )
}