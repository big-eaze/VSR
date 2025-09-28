import React, { useState } from "react";
import { MenuContext } from "./MenuContext";


export function MenuProvider({ children }) {

  const [authOpen, setAuthOpen] = useState(false);


  return (
    <MenuContext.Provider value={{
      authOpen,
      setAuthOpen
    }}
    >
      {children}
    </MenuContext.Provider>
  )
}