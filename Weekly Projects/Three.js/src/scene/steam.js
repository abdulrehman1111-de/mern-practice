/* Wispy steam rising from a filled mug. */
export function createSteam(THREE, helpers, world, MH) {
  const { clamp01, frac, dotTex } = helpers;
  /* ---- steam (soft, wispy, fades into the void on exit) ---- */
  const NS = 140;
  const spos = new Float32Array(NS * 3);
  const scol = new Float32Array(NS * 3);
  const sph = new Float32Array(NS);
  for (let i = 0; i < NS; i++) sph[i] = Math.random();
  const sgeo = new THREE.BufferGeometry();
  sgeo.setAttribute("position", new THREE.BufferAttribute(spos, 3));
  sgeo.setAttribute("color", new THREE.BufferAttribute(scol, 3));
  const steam = new THREE.Points(
    sgeo,
    new THREE.PointsMaterial({
      map: dotTex, size: 0.55, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    })
  );
  steam.frustumCulled = false;
  world.add(steam);
  /* the same wisps, shared, for every extra cup in the ring (each turned a different way so they don't look cloned) */
  const extras = [];
  const makeInstance = () => {
    const p = steam.clone();
    p.rotation.y = 1.9 * extras.length + 0.7;
    p.visible = false;
    world.add(p);
    extras.push(p);
    return p;
  };

  function update(st, fr) {
    const { t, ex } = fr;
    steam.position.x = fr.hx || 0;
    steam.position.z = fr.hz || 0;
    steam.scale.setScalar(fr.hs || 1);
    /* steam: buoyant, turbulent, only from a filled mug; thins and drifts away on exit */
    const filled = clamp01((st.lv - 0.55) / 0.4);
    const puff = Math.sin(Math.min(1, ex) * Math.PI) * 0.75;
    const sAmt = st.stm * filled * (1 - ex) + puff * filled;
    steam.position.y = (fr.hy || 0) + (MH + ex * 1.3) * (fr.hs || 1);
    if (sAmt > 0.02) {
      steam.visible = true;
      for (let i = 0; i < NS; i++) {
        const f = frac(t * 0.1 + sph[i]);
        const spread = (0.15 + f * f * 0.6) * (1 + ex * 5);
        const rise = (f + 0.35 * f * f) * (1.4 + ex * 3.5);
        spos[i * 3] = Math.sin(t * 0.6 + sph[i] * 9 + f * 5) * spread + Math.sin(t * 1.7 + sph[i] * 31) * 0.04 * f;
        spos[i * 3 + 1] = rise;
        spos[i * 3 + 2] = Math.cos(t * 0.5 + sph[i] * 7 + f * 4) * spread;
        const c = 0.2 * sAmt * Math.pow(Math.sin(f * Math.PI), 1.3);
        scol[i * 3] = c;
        scol[i * 3 + 1] = c * 0.95;
        scol[i * 3 + 2] = c * 0.88;
      }
      sgeo.attributes.position.needsUpdate = true;
      sgeo.attributes.color.needsUpdate = true;
    } else steam.visible = false;
    for (let i = 0; i < extras.length; i++) extras[i].visible = steam.visible && extras[i].userData.on === true;
  }

  return { update, makeInstance };
}
