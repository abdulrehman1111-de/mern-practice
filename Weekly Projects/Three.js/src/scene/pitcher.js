/* Steel milk pitcher that slides in and tilts to pour. */
export function createPitcher(THREE, helpers, world, metalEnv) {
  const { lathe, clamp01 } = helpers;
  /* ---- steel milk pitcher with a pinched spout, rolled rim and tube handle ---- */
  const pitcherG = new THREE.Group();
  world.add(pitcherG);
  const pSteel = new THREE.MeshStandardMaterial({
    color: 0xe6e7ea, metalness: 1, roughness: 0.2, envMap: metalEnv, envMapIntensity: 1.3, side: THREE.DoubleSide,
  });
  const jugGeo = lathe([
    [0, 0], [0.48, 0], [0.56, 0.03], [0.6, 0.08], [0.68, 0.5], [0.74, 1.0], [0.75, 1.1], [0.74, 1.2], [0.72, 1.3],
    [0.76, 1.335], [0.76, 1.35], [0.73, 1.355], [0.7, 1.34], [0.69, 1.3], [0.7, 1.2], [0.71, 1.1], [0.72, 1.0],
    [0.66, 0.5], [0.52, 0.1], [0, 0.08],
  ], 96);
  const jp = jugGeo.attributes.position;
  for (let i = 0; i < jp.count; i++) {
    const x = jp.getX(i), y = jp.getY(i), z = jp.getZ(i);
    if (y > 1.0) {
      const t = clamp01((y - 1.0) / 0.35);
      const rr = Math.hypot(x, z) || 1;
      const a = Math.pow(Math.max(0, x / rr), 8);
      jp.setXYZ(i, x + 0.42 * t * t * a, y + 0.1 * t * t * a, z * (1 - 0.6 * t * a));
    }
  }
  jugGeo.computeVertexNormals();
  const jug = new THREE.Mesh(jugGeo, pSteel);
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.025, 8, 64), pSteel);
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = 0.05;
  const jhCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.72, 1.26, 0),
    new THREE.Vector3(-0.84, 1.55, 0),
    new THREE.Vector3(-1.08, 1.5, 0),
    new THREE.Vector3(-1.3, 0.98, 0),
    new THREE.Vector3(-1.22, 0.62, 0),
    new THREE.Vector3(-0.68, 0.55, 0),
  ], false, "catmullrom", 0.35);
  const jugHandle = new THREE.Mesh(new THREE.TubeGeometry(jhCurve, 72, 0.04, 14, false), pSteel);
  jugHandle.scale.z = 2.4;
  const jugG = new THREE.Group();
  jugG.add(jug, baseRing, jugHandle);
  jugG.position.set(-1.16, -1.44, 0); /* spout tip sits at the group origin */
  pitcherG.add(jugG);

  function update(st, fr) {
    const { gate } = fr;
    pitcherG.position.set(st.pxo, 2.55, 0);
    pitcherG.rotation.z = -st.pt * gate * 0.95;
    pitcherG.visible = st.pxo > -8;
  }

  return { pitcherG, update };
}
