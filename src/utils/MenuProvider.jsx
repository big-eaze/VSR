import React, { useState, useEffect } from "react";
import { MenuContext } from "./MenuContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import wardrobe from "../../data/outfits";

export function MenuProvider({ children }) {
  const [userPrivate, setUserPrivate] = useState(null);
  const [preferredStyle, setPreferredStyle] = useState(null);
  const [wardrobeOverall, setWardrobeOverall] = useState({
    Tops: [],
    Bottoms: [],
    Footwears: [],
    Accessories: [],
  });
  const [loading, setLoading] = useState(true);

  const wardrobeKey = (uid) =>
    uid ? `wardrobe_${uid}` : "guest_wardrobe";

  useEffect(() => {
    async function restoreUserSession() {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const key = wardrobeKey(userData?.uid);
        const savedWardrobe = JSON.parse(localStorage.getItem(key));

        if (userData) {
          // LOGGED-IN USER
          setUserPrivate(userData);

          if (savedWardrobe) {
            setWardrobeOverall(savedWardrobe);
          } else {
            // Fetch from Firestore
            const wardrobeRef = doc(
              db,
              "users",
              userData.uid,
              "wardrobe",
              "meta"
            );
            const wardrobeSnap = await getDoc(wardrobeRef);

            if (wardrobeSnap.exists()) {
              const data = wardrobeSnap.data();
              setWardrobeOverall(data);
              localStorage.setItem(key, JSON.stringify(data));
            } else {
              // Empty default for new user
              const empty = {
                Tops: [],
                Bottoms: [],
                Footwears: [],
                Accessories: [],
              };
              setWardrobeOverall(empty);
              localStorage.setItem(key, JSON.stringify(empty));
            }
          }
        } else {
          // GUEST USER
          if (savedWardrobe) {
            setWardrobeOverall(savedWardrobe);
          } else {
            // Guest default wardrobes
            const guestWardrobe = wardrobe;
            setWardrobeOverall(guestWardrobe);
            localStorage.setItem("guest_wardrobe", JSON.stringify(guestWardrobe));
          }
        }
      } catch (error) {
        console.error("⚠️ Error restoring session:", error);
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    }

    restoreUserSession();
  }, []);

  const logout = () => {
    const key = wardrobeKey(userPrivate?.uid);
    localStorage.removeItem("user");
    localStorage.removeItem(key);

    // Restore guest wardrobe after logout
    const guestWardrobe =
      JSON.parse(localStorage.getItem("guest_wardrobe")) || wardrobe;

    setWardrobeOverall(guestWardrobe);
    setUserPrivate(null);
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
        preferredStyle,
        setPreferredStyle,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
