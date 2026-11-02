/* Studio reflections (two environment maps) and the key / rim / ambient lights.
   Returns the high-contrast map used by the polished steel parts. */
export function createEnvironment(THREE, renderer, scene) {
  /* Soft warm studio reflections */
  const es = new THREE.Scene();
  es.background = new THREE.Color(0x120c08);
  const envPanel = (w, h, x, y, z, c, k) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide })
    );
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    es.add(m);
  };
  envPanel(9, 4, 0, 6, 0, 0xfff1dc, 2.6);
  envPanel(2, 8, -6, 1, 3, 0xffe2b8, 2.6);
  envPanel(2, 8, 6, 1, -2, 0xffd2a0, 1.6);
  envPanel(10, 3, 0, 0, -7, 0xffc890, 1.4);
  envPanel(4, 5, 3, 2, 6, 0xffffff, 1.4);
  envPanel(1.2, 7, -3, 2, -5, 0xffffff, 1.8);
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(es, 0.08).texture;
  pm.dispose();

  /* separate high-contrast studio so the stainless steel reads as real polished metal */
  const es2 = new THREE.Scene();
  es2.background = new THREE.Color(0x8d7660);
  const envPanel2 = (w, h, x, y, z, c, k) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide })
    );
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    es2.add(m);
  };
  envPanel2(10, 5, 0, 6, 0, 0xffffff, 3.5);
  envPanel2(1.6, 9, -6, 1, 3, 0xffffff, 3);
  envPanel2(1.6, 9, 6, 1, -2, 0xfff0dc, 2.5);
  envPanel2(12, 4, 0, 0, -7, 0xe8cfae, 1.6);
  envPanel2(6, 6, 0, 1, 7, 0xd9c3a5, 1.2);
  envPanel2(14, 14, 0, -5, 0, 0x6b5038, 0.9);
  envPanel2(14, 1.4, 0, -0.8, -6.8, 0x050302, 1);
  envPanel2(1, 8, 3.5, 0, 5.5, 0x050302, 1);
  const pm2 = new THREE.PMREMGenerator(renderer);
  const metalEnv = pm2.fromScene(es2, 0.03).texture;

  const key = new THREE.DirectionalLight(0xffe2bd, 1.0);
  key.position.set(3, 6, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffa860, 0.7);
  rim.position.set(-4, 3, -3);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  return metalEnv;
}
