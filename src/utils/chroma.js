import chroma from "chroma-js";

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
  // All must share the same style
  return top.style === bottom.style && top.style === shoe.style;
}

export function generateOutfits(wardrobe) {
  const outfits = [];

  wardrobe.Tops.forEach((top) => {
    wardrobe.Bottoms.forEach((bottom) => {
      wardrobe.Footwears.forEach((shoe) => {
        // 1️⃣ Style filter
        if (!isStyleMatch(top, bottom, shoe)) return;

        // 2️⃣ Color compatibility (average % match of all pairs)
        const scores = [
          colorScore(top.color, bottom.color),
          colorScore(bottom.color, shoe.color),
          colorScore(top.color, shoe.color),
        ];

        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

        outfits.push({
          items: [top, bottom, shoe],
          style: top.style,
          score: avgScore, // percent 0–100
        });
      });
    });
  });

  // Rank by score (higher % = better match)
  return outfits.sort((a, b) => b.score - a.score);
}
