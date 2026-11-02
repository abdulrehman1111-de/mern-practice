/* Copy for the six brewing steps (one scroll panel each). side: "r" = text on the right. */
export const STEPS = [
  {
    id: "beans", no: "01", t: "Choose the", em: "bean.", side: "r",
    p: "Single-origin arabica from high-altitude farms, roasted medium-dark until the sugars turn to caramel.",
    chips: ["Arabica", "Medium-dark roast", "Single origin"],
  },
  {
    id: "grind", no: "02", t: "Grind to", em: "order.", side: "l",
    p: "Eighteen grams, ground fine just before brewing, so the aroma ends up in your cup instead of the air.",
    chips: ["18 g dose", "Fine grind", "Fresh every shot"],
  },
  {
    id: "extract", no: "03", t: "Pull the", em: "shot.", side: "r",
    p: "Hot water is pushed through the coffee at nine bars of pressure. Half a minute later: dark, syrupy espresso under a golden crema.",
    chips: ["9 bar", "About 30 seconds", "Golden crema"],
  },
  {
    id: "pour", no: "04", t: "Steam and", em: "pour.", side: "l",
    p: "Milk is steamed to a silky microfoam and poured in a slow, steady stream, straight into the heart of the espresso.",
    chips: ["60–65 °C", "Microfoam", "Slow pour"],
  },
  {
    id: "art", no: "05", t: "Draw the", em: "art.", side: "r",
    p: "A last gentle wiggle and the foam folds into a pattern. Keep scrolling: seen from above, the same cup becomes a heart, a rosetta, a tulip, a swan and more.",
    list: [
      "Velvety microfoam, steamed until glossy",
      "Caramel crema ring, where the espresso shows through",
      "Six hand-poured designs, from easy to very hard",
    ],
    chips: ["Latte art", "Hand poured", "6 designs"],
  },
  {
    id: "serve", no: "06", t: "Served warm,", em: "never rushed.", side: "l",
    p: "A warm stoneware mug, a breath, and the first sip. Take your time.",
    chips: ["Stoneware mug", "Made to stay"], cta: true,
  },
];

/* Labels for the floating step rail at the bottom of the screen. */
export const RAIL = ["Beans", "Grind", "Extract", "Pour", "Art", "Serve"];
