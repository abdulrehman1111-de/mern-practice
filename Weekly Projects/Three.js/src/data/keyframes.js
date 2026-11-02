/* ---------------- Scroll keyframes ----------------
   lv = absolute liquid height inside the mug (mug is 1.25 tall).
   pxo = pitcher spout x; the milk arcs ~0.4 to the right as it falls. */
export const D = {
  fx: 0.5, ty: 0.55, cz: 7.4, el: 0.2, sy: 0, s: 1, ry: 0,
  bsp: 4, bsc: 0, bx: 0, by: 1.5,
  my: 7, pxo: -9, pt: 0,
  lv: 0, mk: 0, art: 0, ad: 0, rg: 0, grind: 0, fill: 0, stm: 0, es: 0, ms: 0, h: 0,
};
export const FR = [
  { fx: 0.5, ty: 0.6, cz: 7.4, el: 0.22, ry: -0.5, bsp: 3.6, bsc: 1, by: 1.8 },
  { fx: -0.5, ty: 0.9, cz: 7, el: 0.28, ry: 0.3, bsp: 1.6, bsc: 1.25, by: 1.9, s: 0.9 },
  { fx: 0.5, ty: 1.7, cz: 9.4, el: 0.22, ry: 0.2, bsp: 0.4, bsc: 0, by: 2.4, my: 3.1, grind: 1, fill: 1, s: 0.9 },
  { fx: -0.5, ty: 1.5, cz: 8.2, el: 0.22, ry: 0.1, my: 2.5, fill: 1, lv: 0.5, es: 1 },
  { fx: 0.5, ty: 1.35, cz: 8.2, el: 0.3, ry: 0, pxo: -0.45, pt: 1, lv: 1.06, mk: 1, ms: 1, stm: 0.45 },
  { fx: -0.35, ty: 0.9, cz: 5.4, el: 1.42, ry: 0, lv: 1.06, mk: 1, art: 1, stm: 0.3, h: 1 },
  { fx: 0.5, ty: 0.6, cz: 7.6, el: 0.2, ry: 0.9, lv: 1.06, mk: 1, art: 1, stm: 1 },
];

/* The ring of cups (scene/cupRing.js). While the top-down view is held, the camera eases from the close-up
   (FR[5]) out to this view so the whole circle of cups fits on the round table; rg = 1 means full ring. */
export const RING = { fx: -0.3, ty: 1.0, cz: 13.2, el: 1.3, rg: 1 };
