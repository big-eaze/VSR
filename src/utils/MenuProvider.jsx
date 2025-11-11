import React, { useState, useEffect } from "react";
import { MenuContext } from "./MenuContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import wardrobe from "../../data/outfits";

export function MenuProvider({ children }) {
  const [userPrivate, setUserPrivate] = useState(null);
  const [wardrobeOverall, setWardrobeOverall] = useState({
    Tops: [],
    Bottoms: [],
    Footwears: [],
    Accessories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreUserSession() {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const wardrobeData = JSON.parse(localStorage.getItem("wardrobe"));

        if (userData) {
          setUserPrivate(userData);

          if (wardrobeData) {
            setWardrobeOverall(wardrobeData);
          } else {
            const wardrobeRef = doc(db, "users", userData.uid, "wardrobe", "meta");
            const wardrobeSnap = await getDoc(wardrobeRef);

            if (wardrobeSnap.exists()) {
              const data = wardrobeSnap.data();
              setWardrobeOverall(data);
              localStorage.setItem("wardrobe", JSON.stringify(data));
            } else {
              // ensure default
              const emptyWardrobe = {
                Tops: [],
                Bottoms: [],
                Footwears: [],
                Accessories: [],
              };
              setWardrobeOverall(emptyWardrobe);
              localStorage.setItem("wardrobe", JSON.stringify(emptyWardrobe));
            }
          }
        } else {
          // 👇 Initialize empty wardrobe for logged-out state
          const defaultWardrobe = wardrobe;
          setWardrobeOverall(defaultWardrobe);
          localStorage.setItem("wardrobe", JSON.stringify(defaultWardrobe));
        }
      } catch (error) {
        console.error("⚠️ Error restoring user session:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("wardrobe");
      } finally {
        setLoading(false);
      }
    }

    restoreUserSession();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("wardrobe");
    setUserPrivate(null);
    setWardrobeOverall({
      Tops: [],
      Bottoms: [],
      Footwears: [],
      Accessories: [],
    });
  };

  return (
    <MenuContext.Provider
      value={{
        userPrivate,
        setUserPrivate,
        wardrobeOverall,
        setWardrobeOverall,
        logout,
        loading,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
