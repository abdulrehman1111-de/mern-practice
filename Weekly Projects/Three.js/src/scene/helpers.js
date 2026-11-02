/* Shared canvas-texture and geometry helpers for the 3D scene. */
export function createHelpers(THREE) {
  /* ---- helpers ---- */
  const texs = [];
  const mkTex = (w, h, draw, srgb = true) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    draw(c.getContext("2d"), w, h);
    const t = new THREE.CanvasTexture(c);
    if (srgb) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    texs.push(t);
    return t;
  };
  const noiseTex = (rx, ry, amp = 90) => {
    const t = mkTex(256, 256, (c, w, h) => {
      const id = c.createImageData(w, h);
      for (let i = 0; i < id.data.length; i += 4) {
        const v = (128 + (Math.random() - 0.5) * amp) | 0;
        id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
        id.data[i + 3] = 255;
      }
      c.putImageData(id, 0, 0);
    }, false);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rx, ry);
    return t;
  };
  const lathe = (pts, seg = 96) =>
    new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), seg);
  const flat = (r, seg = 64) => {
    const g = new THREE.CircleGeometry(r, seg);
    g.rotateX(-Math.PI / 2);
    return g;
  };
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  const frac = (x) => x - Math.floor(x);

  const dotTex = mkTex(64, 64, (c, w, h) => {
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.5, "rgba(255,255,255,.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  });

  return { texs, mkTex, noiseTex, lathe, flat, clamp01, frac, dotTex };
}
