import { DESIGNS } from "../data/designs";

/* Latte art, made the way a barista really makes it.

   Each design is a few blobs/rings of milk foam that get PUSHED and PULLED around with the same maths
   used for paper marbling (Jaffer, "Mathematical Marbling"):
     drop()  a new blob lands and shoves everything else out of its way
     tine()  a toothpick is dragged through the foam and stretches it into a cusp
   That is exactly what a pitcher and an etching pin do, so hearts, ferns, tulips and webs come out with
   real, organic, feathered edges instead of drawn outlines.

   The foam is then rendered with soft caramel halos, a thin crema line along every fold, micro-bubble
   speckle and a matching bump map, on top of a mottled espresso-crema surface. One full disc per design
   (1024 x 1024, the cup surface is the circle inscribed in the square). */

const TAU = Math.PI * 2, S = 1024, C = 512;

/* seeded random so every design looks the same on every load */
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* ---------- shapes: a shape is a list of loops (flat [x,y,x,y...]); filled even-odd so rings have holes ---------- */
const circle = (cx, cy, r, rx = r, ry = r) => {
  const n = Math.max(64, Math.ceil((Math.max(rx, ry) * TAU) / 3));
  const a = new Array(n * 2);
  for (let i = 0; i < n; i++) {
    const t = (i / n) * TAU;
    a[i * 2] = cx + Math.cos(t) * rx;
    a[i * 2 + 1] = cy + Math.sin(t) * ry;
  }
  return a;
};
const disc = (cx, cy, r, rx, ry) => [circle(cx, cy, r, rx, ry)];
const ring = (cx, cy, ro, ri) => [circle(cx, cy, ro), circle(cx, cy, ri)];

/* keep every edge short so stretched folds stay smooth */
const refine = (a, max = 3) => {
  const out = [], n = a.length / 2;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const x = a[i * 2], y = a[i * 2 + 1], dx = a[j * 2] - x, dy = a[j * 2 + 1] - y;
    out.push(x, y);
    const k = Math.ceil(Math.hypot(dx, dy) / max);
    for (let m = 1; m < k; m++) out.push(x + (dx * m) / k, y + (dy * m) / k);
  }
  return out;
};
const each = (shapes, f) => shapes.forEach((sh) => { for (let k = 0; k < sh.length; k++) sh[k] = refine(f(sh[k])); });

/* a new blob of radius r lands at (cx,cy); the older foam is pushed away from it */
const drop = (shapes, cx, cy, r, rx = 1, ry = 1) => {
  each(shapes, (a) => {
    for (let i = 0; i < a.length; i += 2) {
      const dx = (a[i] - cx) / rx, dy = (a[i + 1] - cy) / ry;
      const f = Math.sqrt(1 + (r * r) / Math.max(dx * dx + dy * dy, 1e-6));
      a[i] = cx + dx * f * rx;
      a[i + 1] = cy + dy * f * ry;
    }
    return a;
  });
  shapes.push(disc(cx, cy, r, r * rx, r * ry));
};

const smooth = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
/* a pin dragged from (ax,ay) along direction u: pulls foam near the line by up to z px (sharpness c).
   s0..s1 = stretch of the line (distance along u) that is actually dragged, eased in/out over `fade`. */
const tine = (shapes, ax, ay, ux, uy, z, c, s0 = -1e5, s1 = 1e5, fade = 40) => {
  const l = Math.hypot(ux, uy);
  ux /= l; uy /= l;
  const nx = -uy, ny = ux;
  each(shapes, (a) => {
    for (let i = 0; i < a.length; i += 2) {
      const rx = a[i] - ax, ry = a[i + 1] - ay;
      const d = Math.abs(rx * nx + ry * ny), s = rx * ux + ry * uy;
      const w = smooth((s - s0) / fade) * smooth((s1 - s) / fade);
      if (w <= 0) continue;
      const sh = z * w * Math.pow(2, -d / c);
      a[i] += ux * sh;
      a[i + 1] += uy * sh;
    }
    return a;
  });
};

/* the hand is never perfect: a very gentle low-frequency warp */
const wobble = (shapes, amp, seed) => {
  const r = rng(seed), p = [r() * 6, r() * 6, r() * 6, r() * 6];
  each(shapes, (a) => {
    for (let i = 0; i < a.length; i += 2) {
      const x = a[i], y = a[i + 1];
      a[i] = x + amp * (Math.sin(y * 0.012 + p[0]) + 0.5 * Math.sin(y * 0.031 + p[1]));
      a[i + 1] = y + amp * (Math.sin(x * 0.011 + p[2]) + 0.5 * Math.sin(x * 0.029 + p[3]));
    }
    return a;
  });
};
const rotate = (shapes, ang, cx = C, cy = C) => {
  const co = Math.cos(ang), si = Math.sin(ang);
  each(shapes, (a) => {
    for (let i = 0; i < a.length; i += 2) {
      const x = a[i] - cx, y = a[i + 1] - cy;
      a[i] = cx + x * co - y * si;
      a[i + 1] = cy + x * si + y * co;
    }
    return a;
  });
};
const shift = (shapes, dx, dy) => each(shapes, (a) => { for (let i = 0; i < a.length; i += 2) { a[i] += dx; a[i + 1] += dy; } return a; });

/* ---------- the designs ---------- */
const rosettaShapes = (cx, top, bottom, maxW, rows) => {
  const sh = [];
  for (let k = 0; k < rows; k++) {
    const t = k / (rows - 1);
    const y = bottom - t * (bottom - top);
    const w = maxW * (0.28 + 0.72 * Math.sin(Math.PI * Math.min(1, 0.12 + 0.88 * Math.pow(t, 0.72)))) * (1 - 0.28 * t);
    sh.push(disc(cx, y, 0, w, 15 + 8 * (1 - t)));
  }
  return sh;
};

const ering = (cx, cy, rxo, ryo, rxi, ryi) => [circle(cx, cy, 0, rxo, ryo), circle(cx, cy, 0, rxi, ryi)];

const DESIGN = {
  /* a stack of milk rings, one pin pulled straight through the middle */
  heart() {
    const cx = C, cy = C - 55;
    const sh = [ring(cx, cy, 262, 220), ring(cx, cy, 194, 154), ring(cx, cy, 128, 92), disc(cx, cy, 56)];
    tine(sh, cx, 90, 0, 1, 150, 92, 150, 900, 70);
    wobble(sh, 2.6, 11);
    return { shapes: sh };
  },

  /* a wiggled stack of crescents, pulled up the middle into a fern leaf */
  rosetta() {
    const sh = rosettaShapes(C, 300, 790, 262, 10);
    tine(sh, C, 930, 0, -1, 190, 70, 120, 1000, 60);
    tine(sh, C, 910, 0, -1, 70, 12, 140, 1000, 60);
    wobble(sh, 3, 23);
    shift(sh, 0, 6);
    return { shapes: sh };
  },

  /* layers of milk dropped one on top of another, then a pin through the middle */
  tulip() {
    const sh = [];
    drop(sh, C, 765, 112, 1.9, 0.82);
    drop(sh, C, 665, 108, 1.7, 0.8);
    drop(sh, C, 565, 100, 1.45, 0.78);
    drop(sh, C, 470, 92, 1.18, 0.78);
    drop(sh, C, 380, 80, 0.8, 0.85);
    tine(sh, C, 180, 0, 1, 170, 16, 220, 900, 60);
    wobble(sh, 2.4, 5);
    return { shapes: sh };
  },

  /* a heart-shaped body pulled into a tail, a long S neck and a small head with a beak */
  swan() {
    const cx = 520, cy = 668;
    const body = [ering(cx, cy, 215, 112, 176, 90), ering(cx, cy, 150, 70, 112, 52), ering(cx, cy, 78, 34, 44, 18), disc(cx, cy, 0, 22, 9)];
    tine(body, 880, cy, -1, 0, 150, 54, 120, 820, 60);
    tine(body, 880, cy, -1, 0, 60, 11, 120, 820, 60);
    /* neck: a smooth S, thick at the chest, thin under the head */
    const P = [[610, 650], [715, 610], [745, 500], [700, 400], [640, 340], [628, 280]];
    const pt = (t) => {
      const n = P.length - 1, f = Math.min(t, 0.9999) * n, i = Math.floor(f), u = f - i;
      const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(n, i + 2)];
      const u2 = u * u, u3 = u2 * u;
      return [0, 1].map((k) => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * u + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * u2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * u3));
    };
    const L = [], R = [], M = 70;
    for (let i = 0; i <= M; i++) {
      const t = i / M, a = pt(Math.max(0, t - 0.012)), b = pt(Math.min(1, t + 0.012)), p = pt(t);
      let nx = -(b[1] - a[1]), ny = b[0] - a[0];
      const l = Math.hypot(nx, ny) || 1;
      nx /= l; ny /= l;
      const w = 15 + 22 * Math.pow(1 - t, 1.6);
      L.push(p[0] + nx * w, p[1] + ny * w);
      R.push(p[0] - nx * w, p[1] - ny * w);
    }
    const rev = [];
    for (let i = R.length - 2; i >= 0; i -= 2) rev.push(R[i], R[i + 1]);
    const neck = [[...L, ...rev]];
    const head = disc(624, 262, 0, 31, 25);
    neck.ns = head.ns = true;
    const sh = [...body, neck, head];
    wobble(sh, 2, 8);
    return {
      shapes: sh,
      over(c) {
        c.fillStyle = "rgba(176,92,34,.96)";
        c.beginPath();
        c.moveTo(600, 252); c.quadraticCurveTo(556, 252, 528, 276); c.quadraticCurveTo(562, 282, 602, 274); c.closePath();
        c.fill();
        c.fillStyle = "#3a1d0b";
        c.beginPath(); c.arc(618, 256, 6, 0, TAU); c.fill();
      },
    };
  },

  /* rings of milk, a pin dragged outward from the centre in twelve directions */
  web() {
    const sh = [disc(C, C, 30)];
    for (let r = 96; r < 345; r += 60) sh.push(ring(C, C, r + 20, r - 20));
    const n = 12;
    for (let k = 0; k < n; k++) {
      const a = (k / n) * TAU + 0.26;
      tine(sh, C, C, Math.cos(a), Math.sin(a), 92, 17, 6, 520, 90);
    }
    wobble(sh, 1.6, 31);
    return { shapes: sh };
  },

  /* rings pulled in and out in turn: a flower with a seeded centre */
  sunflower() {
    const sh = [];
    for (let r = 205; r < 400; r += 52) sh.push(ring(C, C, r + 18, r - 18));
    const n = 16;
    for (let k = 0; k < n; k++) {
      const a = (k / n) * TAU, out = k % 2 === 0, z = out ? 96 : 38;
      tine(sh, C, C, Math.cos(a) * (out ? 1 : -1), Math.sin(a) * (out ? 1 : -1), z, 20, out ? 120 : -460, out ? 520 : -120, 50);
    }
    wobble(sh, 1.8, 17);
    const r = rng(7);
    return {
      shapes: sh,
      over(c) {
        const R0 = 168;
        c.save();
        c.shadowColor = "rgba(40,18,6,.55)"; c.shadowBlur = 14;
        const g = c.createRadialGradient(C, C, 0, C, C, R0);
        g.addColorStop(0, "#2b1407"); g.addColorStop(0.75, "#44220c"); g.addColorStop(1, "#5a3014");
        c.fillStyle = g;
        c.beginPath(); c.arc(C, C, R0, 0, TAU); c.fill();
        c.restore();
        for (let i = 0; i < 230; i++) {
          const a = i * 2.39996, rr = 6 + Math.sqrt(i) * 10.4;
          const x = C + Math.cos(a) * rr, y = C + Math.sin(a) * rr, s = 3 + (i / 230) * 4.5;
          c.fillStyle = `rgba(${150 + ((r() * 50) | 0)},${92 + ((r() * 30) | 0)},40,${0.55 + r() * 0.3})`;
          c.beginPath(); c.ellipse(x, y, s, s * 0.7, a, 0, TAU); c.fill();
        }
      },
    };
  },
};

/* ---------- rendering ---------- */
const cv = (w, h) => {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  return c;
};
const trace = (c, loops) => {
  c.beginPath();
  for (const a of loops) {
    c.moveTo(a[0], a[1]);
    for (let i = 2; i < a.length; i += 2) c.lineTo(a[i], a[i + 1]);
    c.closePath();
  }
};

const crema = (c, seed) => {
  const r = rng(seed);
  const g = c.createRadialGradient(C, C, 0, C, C, C);
  g.addColorStop(0, "#c98b46");
  g.addColorStop(0.55, "#bb7a37");
  g.addColorStop(0.86, "#9c5b26");
  g.addColorStop(1, "#5e3112");
  c.fillStyle = g;
  c.fillRect(0, 0, S, S);
  c.save();
  c.beginPath(); c.arc(C, C, C, 0, TAU); c.clip();
  c.filter = "blur(7px)";
  c.lineCap = "round";
  for (let i = 0; i < 70; i++) {
    const rad = 60 + r() * 400, a0 = r() * TAU, len = 0.4 + r() * 1.5;
    c.strokeStyle = i % 2 ? "rgba(255,214,160,.13)" : "rgba(90,44,14,.16)";
    c.lineWidth = 8 + r() * 26;
    c.beginPath(); c.arc(C + (r() - 0.5) * 40, C + (r() - 0.5) * 40, rad, a0, a0 + len); c.stroke();
  }
  c.filter = "none";
  for (let i = 0; i < 5000; i++) {
    const a = r() * TAU, rr = Math.sqrt(r()) * C;
    c.fillStyle = r() < 0.5 ? `rgba(80,38,12,${0.05 + r() * 0.12})` : `rgba(255,215,160,${0.04 + r() * 0.1})`;
    c.beginPath(); c.arc(C + Math.cos(a) * rr, C + Math.sin(a) * rr, 0.8 + r() * 2.2, 0, TAU); c.fill();
  }
  c.restore();
};

const cache = new Map();
/* -> { color: 1024 canvas (full opaque disc), bump: 512 canvas } */
export function renderArt(i) {
  if (cache.has(i)) return cache.get(i);
  const id = DESIGNS[i].id, d = DESIGN[id]();
  const color = cv(S, S), c = color.getContext("2d");
  crema(c, 100 + i);
  d.under && d.under(c);

  /* foam on its own layer so the speckle only lands on foam */
  const foam = cv(S, S), f = foam.getContext("2d");
  const all = (fn, skip) => d.shapes.forEach((sh) => { if (skip && sh.ns) return; trace(f, sh); fn(); });
  f.filter = "blur(13px)";
  f.fillStyle = "rgba(244,206,150,.55)";
  all(() => f.fill("evenodd"));
  f.filter = "blur(2.4px)";
  f.fillStyle = "#fff3e0";
  all(() => f.fill("evenodd"));
  /* thin caramel crema line along every fold, soft inner glow so the milk looks thick */
  f.strokeStyle = "rgba(176,104,48,.42)";
  f.lineWidth = 2.6;
  f.filter = "blur(1.4px)";
  all(() => f.stroke(), true);
  f.globalCompositeOperation = "source-atop";
  f.filter = "blur(26px)";
  f.fillStyle = "rgba(255,255,250,.5)";
  all(() => f.fill("evenodd"));
  f.filter = "none";
  const r = rng(300 + i);
  for (let k = 0; k < 9000; k++) {
    f.fillStyle = r() < 0.5 ? `rgba(255,255,255,${0.06 + r() * 0.12})` : `rgba(190,130,70,${0.04 + r() * 0.08})`;
    f.beginPath(); f.arc(r() * S, r() * S, 0.6 + r() * 1.7, 0, TAU); f.fill();
  }
  f.globalCompositeOperation = "source-over";
  c.drawImage(foam, 0, 0);
  d.over && d.over(c);

  /* bump: foam sits a little proud of the crema */
  const bump = cv(512, 512), b = bump.getContext("2d");
  const tmp = cv(S, S), t = tmp.getContext("2d");
  t.drawImage(foam, 0, 0);
  t.globalCompositeOperation = "source-in";
  t.fillStyle = "#fff";
  t.fillRect(0, 0, S, S);
  b.fillStyle = "#000";
  b.fillRect(0, 0, 512, 512);
  b.filter = "blur(3px)";
  b.drawImage(tmp, 0, 0, 512, 512);

  const out = { color, bump };
  cache.set(i, out);
  return out;
}

/* One entry per design in data/designs.js, in the same order (kept for callers that only need the colour map). */
export const ART_DRAWERS = DESIGNS.map((_, i) => (c) => c.drawImage(renderArt(i).color, 0, 0));

/* Where are we between designs? ad = animated design position from the timeline
   (0 = first design, N-1 = last). Each design holds still for most of its slot,
   then moves on to the next one over the final part of it.
   Returns { i: current design, j: next design, s: eased 0..1 hand-over, shown: the one to name }. */
export function artMix(ad, n = DESIGNS.length) {
  const x = Math.min(n - 1, Math.max(0, ad));
  let i = Math.floor(x);
  let f = x - i;
  if (i >= n - 1) { i = n - 1; f = 0; }
  const u = Math.min(1, Math.max(0, (f - 0.62) / 0.38));
  const s = u * u * (3 - 2 * u);
  return { i, j: Math.min(n - 1, i + 1), s, shown: s > 0.5 ? Math.min(n - 1, i + 1) : i };
}
