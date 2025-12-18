import React, { useState, useEffect } from "react";
import { MenuContext } from "./MenuContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import wardrobe from "../../data/outfits";
import { userData } from "three/tsl";

export function MenuProvider({ children }) {

  const [showIntro, setShowIntro] = useState(true);

  const [userPrivate, setUserPrivate] = useState(null);
  const [preferredStyle, setPreferredStyle] = useState(null);
  const [guestWardrobe, setGuestWardrobe] = useState({
    Tops: [],
    Bottoms: [],
    Footwears: [],
    Accessories: [],
  });
  const [userWardrobe, setUserWardrobe] = useState({
    Tops: [],
    Bottoms: [],
    Footwears: [],
    Accessories: [],
  });
  const [loading, setLoading] = useState(true);

  const wardrobeKey = (uid) =>
    uid ? `wardrobe_${uid}` : "guest_wardrobe";







  const getRecentKey = (uid) => (uid ? `recent_${uid}` : "recent_guest");

  // ---------------- Clean recentUploads ----------------
  const [recentUploads, setRecentUploads] = useState([]);
  // ------------- For Users ------------------
  const [recentUserUploads, setRecentUserUploads] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    async function restoreUserRecentUploads() {
      const recentKey = getRecentKey(userData?.uid);
      const savedRecent = JSON.parse(localStorage.getItem(recentKey) || "[]") || [];

      setRecentUserUploads(savedRecent);
    }
    function restoreGuestRecentUploads() {
      const savedRecent = JSON.parse(localStorage.getItem("recent_guest") || "[]") || [];
      setRecentUploads(savedRecent);
    }
    if (userData) {
      restoreUserRecentUploads();
    } else {
      restoreGuestRecentUploads();
    }


  }, []);

  useEffect(() => {
    // If a user is logged in → sync user recent uploads
    if (userPrivate?.uid) {
      const key = getRecentKey(userPrivate.uid);
      localStorage.setItem(key, JSON.stringify(recentUserUploads));
    }

    // If NO logged-in user → sync guest recent uploads
    else {
      localStorage.setItem("recent_guest", JSON.stringify(recentUploads));
    }
  }, [recentUserUploads, recentUploads, userPrivate]);





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
            setUserWardrobe(savedWardrobe);
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
              setUserWardrobe(data);
              localStorage.setItem(key, JSON.stringify(data));
            } else {
              // Empty default for new user
              const empty = {
                Tops: [],
                Bottoms: [],
                Footwears: [],
                Accessories: [],
              };
              setUserWardrobe(empty);
              localStorage.setItem(key, JSON.stringify(empty));
            }
          }
        } else {
          // GUEST USER
          if (savedWardrobe) {
            setGuestWardrobe(savedWardrobe);
          } else {
            // Guest default wardrobes
            const guestWardrobe = wardrobe;
            setGuestWardrobe(guestWardrobe);
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
    setUserPrivate(null);
  };

  return (
    <MenuContext.Provider
      value={{
        userPrivate,
        setUserPrivate,
        guestWardrobe,
        setGuestWardrobe,
        userWardrobe,
        setUserWardrobe,
        logout,
        loading,
        preferredStyle,
        setPreferredStyle,
        recentUploads,
        setRecentUploads,
        recentUserUploads,
        setRecentUserUploads,
        showIntro,
        setShowIntro
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
