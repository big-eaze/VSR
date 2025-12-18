import chroma from "chroma-js";
import { useMemo, useContext } from "react";
import { MenuContext } from "../utils/MenuContext.jsx";

// Hook: Generate outfits, filtered by style if provided
export function useOutfits(preferredStyle, generationKey) {
  const { userWardrobe, guestWardrobe } = useContext(MenuContext);

  return useMemo(() => {
    // ❌ Do nothing until user explicitly generates
    if (!generationKey) return [];

    const user = JSON.parse(localStorage.getItem("user"));
    const wardrobe = user ? userWardrobe : guestWardrobe;

    if (!wardrobe || Object.values(wardrobe).every(arr => arr.length === 0)) {
      return [];
    }

    const allOutfits = generateOutfits(wardrobe);

    const filtered = preferredStyle
      ? allOutfits.filter(o => o.style === preferredStyle)
      : allOutfits;

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);

  }, [
    generationKey,   // ✅ ONLY trigger
    preferredStyle,  // used when triggered
    userWardrobe,
    guestWardrobe
  ]);
}

function colorScore(c1, c2) {
  try {
    const distance = chroma.distance(c1.toLowerCase(), c2.toLowerCase());
    const maxDistance = 441; // worst-case distance in RGB
    const score = ((maxDistance - distance) / maxDistance) * 100;
    return Math.max(0, Math.min(100, score)); // clamp between 0–100
  } catch {
    return 0; // invalid color = 0% match
  }
}

function isStyleMatch(top, bottom, shoe) {
  return top.style === bottom.style && top.style === shoe.style;
}

function generateOutfits(wardrobe) {
  const outfits = [];

  wardrobe.Tops.forEach((top) => {
    wardrobe.Bottoms.forEach((bottom) => {
      wardrobe.Footwears.forEach((shoe) => {
        if (!isStyleMatch(top, bottom, shoe)) return;

        const scores = [
          colorScore(top.color, bottom.color),
          colorScore(bottom.color, shoe.color),
          colorScore(top.color, shoe.color),
        ];

        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

        outfits.push({
          items: [top, bottom, shoe],
          style: top.style,
          score: avgScore,
        });
      });
    });
  });

  return outfits.sort((a, b) => b.score - a.score); // higher % first
}
