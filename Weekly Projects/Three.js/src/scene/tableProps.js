/* Saucer, brass spoon, cinnamon sticks and the open book on the table. */
export function createTableProps(THREE, helpers, { tableG, cupG, creamMat, TOP }) {
  const { mkTex, noiseTex, lathe } = helpers;
  /* ---- saucer, open book, brass spoon, cinnamon ---- */
  const saucer = new THREE.Mesh(
    lathe([[0, -0.088], [0.7, -0.088], [0.78, -0.06], [1.38, 0.01], [1.46, 0.05], [1.43, 0.058], [1.34, 0.03], [0.92, -0.004], [0.8, -0.012], [0, -0.012]], 96),
    creamMat
  );
  cupG.add(saucer);

  /* everything lying on the table goes in one group, so it can sink out of the way for the cup ring */
  const props = new THREE.Group();
  tableG.add(props);

  const brass = new THREE.MeshStandardMaterial({ color: 0xc9a25a, metalness: 1, roughness: 0.32, envMapIntensity: 1 });
  const spoon = new THREE.Group();
  const sb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 16), brass);
  sb.scale.set(1, 0.25, 0.7);
  const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 1.0, 12), brass);
  sh.rotation.z = Math.PI / 2;
  sh.position.x = 0.62;
  spoon.add(sb, sh);
  spoon.position.set(1.9, TOP + 0.03, 1.5);
  spoon.rotation.y = -0.6;
  props.add(spoon);

  const cinMat = new THREE.MeshStandardMaterial({ color: 0x8a4a22, roughness: 0.85, bumpMap: noiseTex(2, 4, 90), bumpScale: 0.3 });
  [[2.3, -0.5, 0.4], [2.45, -0.3, -0.2], [2.2, -0.2, 0.9]].forEach(([x, z, r]) => {
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 14), cinMat);
    s.rotation.z = Math.PI / 2;
    s.rotation.y = r;
    s.position.set(x, TOP + 0.04, z);
    props.add(s);
  });

  const pageTex = mkTex(512, 700, (c, w, h) => {
    c.fillStyle = "#efe3cb";
    c.fillRect(0, 0, w, h);
    const g = c.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, "rgba(0,0,0,.18)");
    g.addColorStop(0.18, "rgba(0,0,0,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
    c.fillStyle = "rgba(60,40,25,.55)";
    for (let y = 70; y < h - 60; y += 17) c.fillRect(70, y, (0.6 + Math.random() * 0.4) * (w - 130), 3.5);
  });
  const leather = new THREE.MeshStandardMaterial({ color: 0x2b1a10, roughness: 0.6 });
  const pageSide = new THREE.MeshStandardMaterial({ color: 0xe8dcc3, roughness: 0.9 });
  const pageTop = new THREE.MeshStandardMaterial({ map: pageTex, roughness: 0.9 });
  const half = new THREE.Group();
  const cov = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 1.1), leather);
  cov.position.set(0.4, 0.025, 0);
  const pg = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.1, 1.0), [pageSide, pageSide, pageTop, pageSide, pageSide, pageSide]);
  pg.position.set(0.39, 0.1, 0);
  half.add(cov, pg);
  half.rotation.z = -0.07;
  const half2 = half.clone();
  half2.rotation.set(0, Math.PI, -0.07);
  const book = new THREE.Group();
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.09, 0.025, 64, 8), brass);
  knot.position.set(0.75, 0.2, -0.2);
  book.add(half, half2, knot);
  book.position.set(-2.3, TOP + 0.05, -1.0);
  book.rotation.y = 0.5;
  props.add(book);

  return { props };
}
