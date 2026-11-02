import { artMix } from "./latteArt";
import { DESIGNS } from "../data/designs";

/* The ring of cups.
   While the top-down latte-art view is held, the single mug splits into one cup per design. They spiral
   out of the middle, settle on a circle around the round table and revolve as you scroll, so the design
   that is being named is always the cup in front. When the view closes they spiral back in and merge
   into the one mug again.

   st.rg  0 = one cup, 1 = full ring (animated by the scroll timeline, see data/keyframes.js RING)
   st.ad  which design is in front (0..N-1), shared with the caption.

   Cup 0 is the real mug (its liquid is animated in liquid.js); the others are copies built here that share
   its meshes and materials, so the extra cups cost almost nothing. update() returns where cup 0 should
   stand so createScene can move it. */
const TAU = Math.PI * 2, HALF = Math.PI / 2;
const RING_R = 2.62;          /* radius of the circle the cups stand on */
const BASE = 0.7, BOOST = 0.2; /* cup scale at the back / extra scale for the cup in front */
const STAGGER = 0.38;         /* how much later each cup starts to leave the middle */

const ease = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

export function createCupRing(THREE, helpers, world, { proto, liquid, MH, LV, steam }) {
  const { flat, clamp01 } = helpers;
  const N = DESIGNS.length;
  const r = liquid.innerR(LV) - 0.015;
  const topGeo = flat(1, 72);

  const cups = [];
  for (let k = 1; k < N; k++) {
    const g = proto.clone(true);
    const top = new THREE.Mesh(
      topGeo,
      new THREE.MeshStandardMaterial({ map: liquid.getArt(k), bumpMap: liquid.getBump(k), bumpScale: 0.012, roughness: 0.42, envMapIntensity: 0.9 })
    );
    top.scale.set(r, 1, r);
    top.position.y = LV;
    g.add(top);
    g.visible = false;
    world.add(g);
    const wisps = steam.makeInstance();
    wisps.userData.on = false;
    cups.push({ k, g, wisps });
  }

  /* where is cup k, given the revolve position idx and its own progress rk (0 = in the middle, 1 = on the ring)? */
  const place = (k, idx, rg) => {
    const rk = ease((rg - (k / N) * STAGGER) / (1 - STAGGER));
    const phi = HALF + ((k - idx) * TAU) / N - (1 - rk) * 1.5; /* front of the table is +z, and they swirl in while arriving */
    const rad = RING_R * rk;
    const front = Math.pow(Math.max(0, Math.cos(phi - HALF + (1 - rk) * 1.5)), 2);
    return {
      rk,
      x: Math.cos(phi) * rad,
      z: Math.sin(phi) * rad,
      y: Math.sin(rk * Math.PI) * 0.45,
      s: BASE + BOOST * front,
      /* the top of every design points at the middle of the table, handles run round the circle */
      rot: -(phi - HALF) + (1 - rk) * 3.2,
    };
  };

  const hero = { x: 0, y: 0, z: 0, s: 1, rot: 0, k: 0 };

  function update(st, fr) {
    const rg = st.rg;
    if (rg <= 0.0005) {
      cups.forEach((c) => { c.g.visible = false; c.wisps.userData.on = false; });
      hero.x = hero.y = hero.z = 0; hero.s = 1; hero.rot = 0; hero.k = 0;
      return hero;
    }
    const mix = artMix(st.ad);
    const idx = mix.i + mix.s;
    const { ex } = fr;

    const h = place(0, idx, rg);
    const hk = h.rk;
    hero.x = h.x; hero.z = h.z; hero.y = h.y;
    hero.s = 1 + (h.s - 1) * hk;
    hero.rot = h.rot; hero.k = hk;

    for (let i = 0; i < cups.length; i++) {
      const c = cups[i], p = place(c.k, idx, rg);
      const s = p.s * ease(p.rk * 1.6);
      const on = p.rk > 0.004 && s > 0.01;
      c.g.visible = on;
      c.wisps.userData.on = on && st.stm > 0.02;
      if (!on) continue;
      c.g.position.set(p.x, p.y + ex * 1.3, p.z);
      c.g.scale.setScalar(s);
      c.g.rotation.y = p.rot;
      c.wisps.position.set(p.x, p.y + (MH + ex * 1.3) * s, p.z);
      c.wisps.scale.setScalar(s);
    }
    return hero;
  }

  return { update };
}
