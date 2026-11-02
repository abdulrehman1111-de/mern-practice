/* Latte-art designs shown one after another while the top-down view is held.
   Order here = order on scroll. The drawing for each id lives in scene/latteArt.js.
   To add a design: add it here AND add a drawer with the same id in scene/latteArt.js. */
export const DESIGNS = [
  { id: "heart",     name: "The Heart",      note: "The classic. A folded heart, poured in one motion." },
  { id: "rosetta",   name: "The Rosetta",    note: "Stacked ripples pulled through into a fern leaf." },
  { id: "tulip",     name: "The Tulip",      note: "Layered petals pushed together, then split by a line." },
  { id: "swan",      name: "The Swan",       note: "A hard one: feathered wing, long neck, tiny beak." },
  { id: "web",       name: "The Spiderweb",  note: "Rings of foam dragged outward into a fine web." },
  { id: "sunflower", name: "The Sunflower",  note: "Two rings of petals around a dark espresso eye." },
];

/* How long the top-down view is held, in viewport heights of scrolling.
   The old version held it for about 1. 4 = four times longer. Raise it to hold longer. */
export const ART_HOLD_VH = 7.5;
