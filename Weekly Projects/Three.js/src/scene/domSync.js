import { PINS } from "../data/pins";
import { artMix } from "./latteArt";

/* Keeps the HTML overlay in sync with the 3D scene:
   warm halo behind the mug, numbered latte-art pins, progress bar, step rail and design caption.
   Speed note: CSS variables are written on the small element that uses them (not on the page root,
   which would re-style the entire page every frame), and only when the value really changed. */
export function createDomSync({ THREE, camera, world, cup, cupG, root, pinEls, barRef, railRef, onStep, onDesign }) {
  const v3 = new THREE.Vector3();
  let pinsOff = false, lastStep = -2, lastDesign = -1;
  let halo = null, cap = null;
  let lastHx = "", lastHy = "", lastAo = "", lastProg = "", lastRail = "";

  function update(st, fr, metrics) {
    const { ex, gone } = fr;
    if (!halo) halo = document.getElementById("halo");
    if (!cap) cap = root.querySelector(".design-cap");

    /* which latte-art design is on the cup (drives the caption) + caption visibility */
    const mix = artMix(st.ad);
    if (mix.shown !== lastDesign) {
      lastDesign = mix.shown;
      onDesign && onDesign(mix.shown);
    }
    if (cap) {
      const ao = (Math.min(1, Math.max(0, (st.el - 1.0) / 0.3)) * Math.max(0, 1 - ex * 3)).toFixed(2);
      if (ao !== lastAo) {
        lastAo = ao;
        cap.style.setProperty("--ao", ao);
      }
    }

    /* warm halo follows the mug */
    if (halo) {
      v3.set(world.position.x, 0.7 * st.s, 0);
      v3.project(camera);
      const hx = ((v3.x * 0.5 + 0.5) * 100).toFixed(1) + "%";
      const hy = ((-v3.y * 0.5 + 0.5) * 100).toFixed(1) + "%";
      if (hx !== lastHx) { lastHx = hx; halo.style.setProperty("--hx", hx); }
      if (hy !== lastHy) { lastHy = hy; halo.style.setProperty("--hy", hy); }
    }

    /* latte-art pins (they describe the heart only, so they fade once the designs start changing) */
    const hPin = st.h * Math.max(0, 1 - st.ad * 1.5) * Math.max(0, 1 - st.rg * 4);
    if (hPin > 0.01 && cupG.visible && gone < 0.5) {
      pinsOff = false;
      world.updateMatrixWorld(true);
      for (let i = 0; i < PINS.length; i++) {
        const el = pinEls.current[i];
        if (!el) continue;
        v3.set(PINS[i].p[0], PINS[i].p[1], PINS[i].p[2]);
        cup.localToWorld(v3);
        v3.project(camera);
        el.style.opacity = (hPin * (1 - ex * 2)).toFixed(3);
        el.style.transform = `translate3d(${((v3.x * 0.5 + 0.5) * innerWidth).toFixed(1)}px,${((-v3.y * 0.5 + 0.5) * innerHeight).toFixed(1)}px,0) translate(-50%,-50%)`;
      }
    } else if (!pinsOff) {
      pinsOff = true;
      pinEls.current.forEach((el) => el && (el.style.opacity = "0"));
    }

    /* progress bar + step rail */
    const prog = Math.min(1, Math.max(0, scrollY / metrics.total)).toFixed(4);
    if (barRef.current && prog !== lastProg) {
      lastProg = prog;
      barRef.current.style.transform = `scaleX(${prog})`;
    }
    const ro = String(Math.max(0, 1 - ex * 2.5).toFixed(2));
    if (railRef.current && ro !== lastRail) {
      lastRail = ro;
      railRef.current.style.opacity = ro;
    }
    let k = -1;
    for (let i = 1; i < metrics.pos.length; i++) if (scrollY >= metrics.pos[i] - innerHeight * 0.45) k = i - 1;
    if (k !== lastStep) {
      lastStep = k;
      onStep(k);
    }
  }

  return { update };
}
