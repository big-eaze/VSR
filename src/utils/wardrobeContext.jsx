import React, { useContext } from "react";
import { MenuContext } from "./MenuContext";

export function useRemove() {
  const {
    userPrivate,
    setUserWardrobe,
    setGuestWardrobe,
    recentUploads,
    setRecentUploads,
    recentUserUploads,
    setRecentUserUploads,
  } = useContext(MenuContext);

  function removeWear(wearId, category) {
    const map = {
      top: "Tops",
      bottom: "Bottoms",
      footwear: "Footwears",
      accessory: "Accessories",
    };

    const key = map[category.toLowerCase()];
    if (!key) return;

    let removedImage;

    if (userPrivate) {
      // Logged-in user
      setUserWardrobe((prev) => {
        const filtered = prev[key].filter((wear) => {
          if (wear.id === wearId) removedImage = wear.image;
          return wear.id !== wearId;
        });
        const updated = { ...prev, [key]: filtered };

        // Update localStorage
        localStorage.setItem(`wardrobe_${userPrivate.uid}`, JSON.stringify(updated));
        return updated;
      });

      if (removedImage) {
        setRecentUserUploads((prev) => {
          const updatedRecent = [...(prev || []).filter((img) => img !== removedImage)];
          localStorage.setItem(`recent_${userPrivate.uid}`, JSON.stringify(updatedRecent));
          return updatedRecent;
        });
      }
    } else {
      // Guest
      setGuestWardrobe((prev) => {
        const filtered = prev[key].filter((wear) => {
          if (wear.id === wearId) removedImage = wear.image;
          return wear.id !== wearId;
        });
        const updated = { ...prev, [key]: filtered };

        // Update localStorage
        localStorage.setItem("guest_wardrobe", JSON.stringify(updated));
        return updated;
      });

      if (removedImage) {
        setRecentUploads((prev) => {
          const updatedRecent = [...(prev || []).filter((img) => img !== removedImage)];
          localStorage.setItem("recent_guest", JSON.stringify(updatedRecent));
          return updatedRecent;
        });
      }
    }
  }

  return { removeWear };
}
