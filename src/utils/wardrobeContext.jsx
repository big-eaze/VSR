import React, { useContext } from "react";
import { MenuContext } from "./MenuContext";

export function useRemove() {
  const { setWardrobeOverall } = useContext(MenuContext);

  const removeWear = (wearId, category) => {
    const map = {
      top: "Tops",
      bottom: "Bottoms",
      footwear: "Footwears",
      accessory: "Accessories",
    };

    const key = map[category];

    if (!key) return;

    setWardrobeOverall((prev) => ({
      ...prev,
      [key]: prev[key].filter((wear) => wear.id !== wearId),
    }));
  };

  return { removeWear };
}
