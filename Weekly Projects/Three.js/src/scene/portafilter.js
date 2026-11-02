/* Chrome portafilter, ground-coffee particles and the coffee puck. */
export function createPortafilter(THREE, helpers, world, metalEnv) {
  const { mkTex, noiseTex, lathe, frac, dotTex } = helpers;
  /* ---- portafilter: chrome basket, single funnel spout, lugs, ribbed handle ---- */
  const machine = new THREE.Group();
  world.add(machine);
  const steel = new THREE.MeshStandardMaterial({
    color: 0xe2e4e8, metalness: 1, roughness: 0.16, envMap: metalEnv, envMapIntensity: 1.35, side: THREE.DoubleSide,
  });
  const dark = new THREE.MeshPhysicalMaterial({ color: 0x1b1410, roughness: 0.4, clearcoat: 0.5, clearcoatRoughness: 0.3 });
  const bowl = new THREE.Mesh(
    lathe([
      [0, -0.14], [0.2, -0.14], [0.34, -0.1], [0.52, 0.0], [0.78, 0.3], [0.88, 0.55], [0.9, 0.66], [0.93, 0.7],
      [0.94, 0.74], [0.9, 0.76], [0.85, 0.72], [0.82, 0.62], [0.76, 0.3], [0.52, 0.06], [0, 0.0],
    ], 80),
    steel
  );
  const bead = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.025, 10, 80), steel);
  bead.rotation.x = Math.PI / 2;
  bead.position.y = 0.52;
  const lugA = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.07, 0.24), steel);
  lugA.position.set(0, 0.64, 0.98);
  const lugB = lugA.clone();
  lugB.position.z = -0.98;
  const funnel = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.14, 0.24, 32), steel);
  funnel.position.y = -0.24;
  const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.1, 0.24, 28, 1, true), steel);
  spout.position.y = -0.46;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 0.7, 24), steel);
  neck.rotation.z = -Math.PI / 2;
  neck.position.set(1.2, 0.4, 0);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.1, 28), steel);
  collar.rotation.z = -Math.PI / 2;
  collar.position.set(1.55, 0.4, 0);
  const handleWood = mkTex(512, 512, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, "#7a4727");
    g.addColorStop(0.5, "#8d5630");
    g.addColorStop(1, "#6e3f21");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 260; i++) {
      const x0 = Math.random() * w, dk = Math.random() < 0.6;
      c.strokeStyle = dk ? `rgba(45,22,8,${0.08 + Math.random() * 0.22})` : `rgba(205,150,95,${0.06 + Math.random() * 0.14})`;
      c.lineWidth = 0.6 + Math.random() * 2.4;
      c.beginPath();
      c.moveTo(x0, 0);
      for (let y = 0; y <= h; y += 24) c.lineTo(x0 + Math.sin(y * 0.02 + i) * 4, y);
      c.stroke();
    }
  });
  const woodMat = new THREE.MeshPhysicalMaterial({
    map: handleWood, roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.3, envMapIntensity: 0.8,
  });
  const hdl = new THREE.Mesh(
    lathe([[0, 0], [0.15, 0], [0.16, 0.05], [0.15, 0.3], [0.17, 0.8], [0.2, 1.3], [0.21, 1.65], [0.18, 1.88], [0.1, 1.97], [0, 2.0]], 48),
    woodMat
  );
  hdl.rotation.z = -Math.PI / 2 + 0.1;
  hdl.position.set(1.6, 0.4, 0);
  const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.12, 36), steel);
  ferrule.rotation.z = -Math.PI / 2;
  ferrule.position.set(1.64, 0.4, 0);
  const puckTex = noiseTex(2, 2, 120);
  const puckGeo = new THREE.SphereGeometry(0.8, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  puckGeo.scale(1, 0.2, 1);
  const puck = new THREE.Mesh(
    puckGeo,
    new THREE.MeshStandardMaterial({ color: 0x3d2112, bumpMap: puckTex, bumpScale: 2, roughness: 0.95 })
  );
  puck.position.y = 0.6;
  machine.add(bowl, bead, lugA, lugB, funnel, spout, neck, collar, ferrule, hdl, puck);
  machine.rotation.y = -0.5;


  /* Ground coffee falling into the basket */
  const NG = 1500;
  const gpos = new Float32Array(NG * 3);
  const gph = new Float32Array(NG);
  const grd = new Float32Array(NG);
  for (let i = 0; i < NG; i++) {
    gph[i] = Math.random();
    grd[i] = Math.random();
  }
  const ggeo = new THREE.BufferGeometry();
  ggeo.setAttribute("position", new THREE.BufferAttribute(gpos, 3));
  const ground = new THREE.Points(
    ggeo,
    new THREE.PointsMaterial({ color: 0x7a4421, size: 0.05, map: dotTex, transparent: true, depthWrite: false })
  );
  ground.frustumCulled = false;
  machine.add(ground);

  function update(st, fr) {
    const { t } = fr;
    /* portafilter, grounds */
    machine.position.y = st.my;
    machine.visible = st.my < 6.5;
    puck.visible = st.fill > 0.02;
    puck.scale.set(st.fill, 1, st.fill);
    if (st.grind > 0.01 && machine.visible) {
      ground.visible = true;
      ground.material.opacity = st.grind;
      for (let i = 0; i < NG; i++) {
        const f = frac(t * 0.45 + gph[i]);
        const rad = (0.1 + 0.75 * grd[i]) * (0.35 + 0.65 * (1 - f));
        const a = gph[i] * 6.283 + t * 2 + f * 3;
        gpos[i * 3] = Math.cos(a) * rad;
        gpos[i * 3 + 1] = 0.65 + 2.4 * (1 - f);
        gpos[i * 3 + 2] = Math.sin(a) * rad;
      }
      ggeo.attributes.position.needsUpdate = true;
    } else ground.visible = false;
  }

  return { machine, update };
}
