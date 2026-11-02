/* Espresso + milk streams and the splash droplets where they land. */
export function createStreams(THREE, helpers, world) {
  const { frac, dotTex } = helpers;
  /* ---- physically shaped streams: thin as they fall, wobble, arc under gravity ---- */
  const GRAV = 6;
  const mkStream = (color, rough) => {
    const geo = new THREE.CylinderGeometry(1, 1, 1, 24, 28, true);
    const base = geo.attributes.position.array.slice();
    const m = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({ color, roughness: rough, envMapIntensity: 1.1, side: THREE.DoubleSide })
    );
    m.visible = false;
    m.frustumCulled = false;
    world.add(m);
    return { m, geo, base };
  };
  const espS = mkStream(0x3b1a08, 0.2);
  const milkS = mkStream(0xf6e8d4, 0.25);
  const setStream = (S, x, top, bot, amt, r, vx, t) => {
    const m = S.m;
    if (amt < 0.02 || top - bot < 0.05) {
      m.visible = false;
      return;
    }
    m.visible = true;
    const h = top - bot;
    m.position.set(0, bot + h / 2, 0);
    m.scale.set(1, h, 1);
    const p = S.geo.attributes.position, b = S.base;
    for (let i = 0; i < p.count; i++) {
      const s = 0.5 - b[i * 3 + 1];
      const f = (r * amt) / Math.sqrt(1 + 2.4 * s);
      const off = vx * Math.sqrt((2 * s * h) / GRAV);
      const sx = Math.sin(t * 7 + s * 9) * 0.005 * s * amt;
      const sz = Math.cos(t * 6 + s * 7) * 0.004 * s * amt;
      p.setXYZ(i, x + off + b[i * 3] * f + sx, b[i * 3 + 1], b[i * 3 + 2] * f + sz);
    }
    p.needsUpdate = true;
  };

  /* ---- splash droplets thrown off where the stream hits the surface ---- */
  const NP = 90;
  const ppos = new Float32Array(NP * 3);
  const pang = new Float32Array(NP), pspd = new Float32Array(NP), pup = new Float32Array(NP), pph = new Float32Array(NP);
  for (let i = 0; i < NP; i++) {
    pang[i] = Math.random() * 6.283;
    pspd[i] = 0.15 + Math.random() * 0.45;
    pup[i] = 0.9 + Math.random() * 1.4;
    pph[i] = Math.random();
  }
  const pgeo = new THREE.BufferGeometry();
  pgeo.setAttribute("position", new THREE.BufferAttribute(ppos, 3));
  const splash = new THREE.Points(
    pgeo,
    new THREE.PointsMaterial({ color: 0x4a2410, size: 0.06, map: dotTex, transparent: true, depthWrite: false })
  );
  splash.frustumCulled = false;
  world.add(splash);

  const MILK_VX = 0.55;

  function update(st, fr) {
    const { t, milkAmt, surf, topE, hasE, hasM, milkLand, show } = fr;
    setStream(espS, 0, topE, surf, hasE ? st.es : 0, 0.075, 0, t);
    setStream(milkS, st.pxo, 2.55, surf, milkAmt, 0.09, MILK_VX, t);

    /* splash droplets: ballistic arcs from the impact point */
    const splAmt = Math.max(hasE ? st.es : 0, milkAmt);
    if (splAmt > 0.1 && show) {
      splash.visible = true;
      splash.material.color.setHex(hasM ? 0xfff0dc : 0x4a2410);
      const sx = hasM ? milkLand : 0;
      for (let i = 0; i < NP; i++) {
        const tau = frac(t * 1.5 + pph[i]) * 0.45;
        const hy = pup[i] * tau - 0.5 * 5 * tau * tau;
        const rad = pspd[i] * tau * 2;
        ppos[i * 3] = sx + Math.cos(pang[i]) * rad;
        ppos[i * 3 + 1] = surf + Math.max(0, hy);
        ppos[i * 3 + 2] = Math.sin(pang[i]) * rad;
      }
      pgeo.attributes.position.needsUpdate = true;
    } else splash.visible = false;
  }

  return { GRAV, MILK_VX, update };
}
