/* Espresso, milk and latte-art surfaces inside the mug, with ripples. */
import { renderArt } from "./latteArt";
import { DESIGNS } from "../data/designs";

export function createLiquid(THREE, helpers, cup, innerR, renderer) {
  const { mkTex, clamp01 } = helpers;
  /* ---- liquid layers (rippling surfaces) ---- */
  const espTex = mkTex(512, 512, (c, w, h) => {
    const g = c.createRadialGradient(256, 256, 0, 256, 256, 256);
    g.addColorStop(0, "#6b3a18");
    g.addColorStop(0.6, "#4a2610");
    g.addColorStop(0.9, "#2e170a");
    g.addColorStop(1, "#1d0e06");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i++) {
      const a = Math.random() * 6.283, r = Math.random() * 250;
      c.fillStyle = `rgba(200,140,70,${Math.random() * 0.12})`;
      c.fillRect(256 + Math.cos(a) * r, 256 + Math.sin(a) * r, 2, 2);
    }
  });
  const milkTex = mkTex(512, 512, (c, w, h) => {
    const g = c.createRadialGradient(256, 256, 0, 256, 256, 256);
    g.addColorStop(0, "#e6ac6e");
    g.addColorStop(0.4, "#da9a5a");
    g.addColorStop(0.75, "#c4803f");
    g.addColorStop(0.9, "#a8632a");
    g.addColorStop(1, "#7a4219");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
    /* soft swirling crema bands */
    c.save();
    c.filter = "blur(5px)";
    c.lineCap = "round";
    for (let i = 0; i < 46; i++) {
      const r = 40 + Math.random() * 190, a0 = Math.random() * 6.283, len = 0.6 + Math.random() * 1.6;
      c.strokeStyle = i % 2 ? "rgba(255,226,186,.22)" : "rgba(110,54,18,.22)";
      c.lineWidth = 6 + Math.random() * 18;
      c.beginPath();
      c.arc(256 + (Math.random() - 0.5) * 20, 256 + (Math.random() - 0.5) * 20, r, a0, a0 + len);
      c.stroke();
    }
    c.restore();
    for (let i = 0; i < 1200; i++) {
      const a = Math.random() * 6.283, r = 205 + Math.random() * 50;
      c.fillStyle = `rgba(70,32,10,${0.1 + Math.random() * 0.2})`;
      c.beginPath();
      c.arc(256 + Math.cos(a) * r, 256 + Math.sin(a) * r, 0.8 + Math.random() * 1.8, 0, 6.283);
      c.fill();
    }
  });
  /* One texture (+ bump map) per latte-art design. The drawings are made in latteArt.js as full opaque discs.
     Built lazily: the first two now, the rest one per idle moment, so the page starts fast
     and no texture upload ever happens in the middle of a hand-over. */
  const N = DESIGNS.length;
  const artTexs = new Array(N).fill(null);
  const bumpTexs = new Array(N).fill(null);
  let dead = false;
  const fromCanvas = (cnv, srgb) => {
    const t = new THREE.CanvasTexture(cnv);
    if (srgb) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    helpers.texs.push(t);
    return t;
  };
  const getArt = (i) => {
    if (artTexs[i]) return artTexs[i];
    const tex = fromCanvas(renderArt(i).color, true);
    if (renderer && renderer.initTexture) renderer.initTexture(tex); /* upload to the GPU now */
    artTexs[i] = tex;
    return tex;
  };
  const getBump = (i) => bumpTexs[i] || (bumpTexs[i] = fromCanvas(renderArt(i).bump, false));
  const idle = window.requestIdleCallback ? (f) => window.requestIdleCallback(f, { timeout: 1500 }) : (f) => setTimeout(f, 250);
  let warm = 2;
  const warmNext = () => {
    if (dead || warm >= N) return;
    getArt(warm);
    getBump(warm++);
    idle(warmNext);
  };

  const surfGeo = () => {
    const g = new THREE.RingGeometry(0.001, 1, 64, 24);
    g.rotateX(-Math.PI / 2);
    return g;
  };
  const artMat = (i, off) =>
    new THREE.MeshStandardMaterial({
      map: getArt(i), bumpMap: getBump(i), bumpScale: 0.012, roughness: 0.42, envMapIntensity: 0.9,
      transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: off,
    });
  const espresso = new THREE.Mesh(
    surfGeo(),
    new THREE.MeshStandardMaterial({ map: espTex, roughness: 0.3, envMapIntensity: 0.9 })
  );
  const milk = new THREE.Mesh(
    surfGeo(),
    new THREE.MeshStandardMaterial({ map: milkTex, roughness: 0.45, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 })
  );
  /* the cup in the middle keeps the first design while the cups circle around it, and ends on the last one:
     art = first design, artB = last design, faded over each other while the cups merge back into one */
  const art = new THREE.Mesh(surfGeo(), artMat(0, -2));
  const artB = new THREE.Mesh(surfGeo(), artMat(N - 1, -3));
  milk.renderOrder = 2;
  art.renderOrder = 3;
  artB.renderOrder = 4;
  cup.add(espresso, milk, art, artB);
  const surfs = [espresso, milk, art, artB];
  /* all four surfaces share one geometry layout, so ripples are computed ONCE per frame and copied */
  const base = surfGeo().attributes.position.array.slice();
  const nV = base.length / 3;
  const H = new Float32Array(nV);
  let rip = 0, warmStarted = false;

  const setHeights = (arr) => {
    for (let k = 0; k < surfs.length; k++) {
      const m = surfs[k];
      if (!m.visible && arr !== null) continue;
      const pa = m.geometry.attributes.position;
      if (arr) for (let i = 0; i < nV; i++) pa.array[i * 3 + 1] = arr[i];
      else for (let i = 0; i < nV; i++) pa.array[i * 3 + 1] = 0;
      pa.needsUpdate = true;
    }
  };
  const smoothNormals = () => {
    let first = null;
    for (let k = 0; k < surfs.length; k++) {
      const m = surfs[k];
      if (!m.visible) continue;
      if (!first) {
        first = m;
        m.geometry.computeVertexNormals();
      } else {
        const na = m.geometry.attributes.normal;
        na.array.set(first.geometry.attributes.normal.array);
        na.needsUpdate = true;
      }
    }
  };

  function update(st, fr) {
    const { t, dtP, hasE, hasM, milkLand, show } = fr;
    if (!warmStarted) { warmStarted = true; idle(warmNext); }
    /* liquid layers with ripples radiating from the impact point */
    espresso.visible = show;
    milk.visible = show && st.mk > 0.01;
    art.visible = show && st.art > 0.01;
    /* p: 0 = still the first design, 1 = the last one. Only moves while the ring merges back (rg falls, ad is at its end). */
    const p = (1 - st.rg) * clamp01(st.ad / Math.max(1, N - 1));
    artB.visible = art.visible && p > 0.003;
    if (show) {
      const r = innerR(st.lv) - 0.015;
      espresso.position.y = st.lv;
      milk.position.y = st.lv + 0.003;
      art.position.y = st.lv + 0.006;
      artB.position.y = st.lv + 0.009;
      espresso.scale.set(r, 1, r);
      milk.scale.set(r, 1, r);
      /* crossfade flourish: the old design drifts outward and twists away, the new one settles in */
      const so = r * (1 + 0.05 * p), si = r * (0.95 + 0.05 * p);
      art.scale.set(so, 1, so);
      artB.scale.set(si, 1, si);
      art.rotation.y = -0.12 * p;
      artB.rotation.y = 0.12 * (1 - p);
      milk.material.opacity = st.mk;
      art.material.opacity = st.art * (1 - p);
      artB.material.opacity = st.art * p;
      const tgtAmp = hasE ? 0.012 : hasM ? 0.016 : 0;
      rip += (tgtAmp - rip) * (1 - Math.exp(-dtP * 1.5));
      if (rip > 0.002) {
        const ox = hasM ? Math.max(-0.35, Math.min(0.35, milkLand)) : 0;
        const ph = t * 3.5, k9 = 9 * r;
        for (let i = 0; i < nV; i++) {
          const x = base[i * 3] - ox, z = base[i * 3 + 2];
          const d = Math.sqrt(x * x + z * z);
          H[i] = rip * Math.sin(k9 * d - ph) * Math.exp(-2.4 * d) * (1 - 0.4 * d);
        }
        setHeights(H);
        smoothNormals();
      } else if (rip > 0) {
        rip = 0;
        setHeights(null);
        surfs.forEach((m) => m.geometry.computeVertexNormals());
      }
    }
  }

  const dispose = () => { dead = true; };
  return { update, dispose, getArt, getBump, innerR };
}
