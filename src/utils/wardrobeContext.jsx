import React, { useContext } from "react";
import { MenuContext } from "./MenuContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";

export function useRemove() {
  const { setWardrobeOverall } = useContext(MenuContext);

  function removeWear(wearId, category) {
    const map = {
      top: "Tops",
      bottom: "Bottoms",
      footwears: "Footwears",
      accessories: "Accessories",
    };

    const key = map[category];

    console.log("wear id", wearId);
    console.log("category", category);
    if (!key) return;

    setWardrobeOverall((prev) => ({
      ...prev,
      [key]: prev[key].filter((wear) => wear.id !== wearId),
    }));
  };

  return { removeWear };
}





