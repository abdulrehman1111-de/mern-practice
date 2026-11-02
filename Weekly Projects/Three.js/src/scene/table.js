/* Walnut coffee table, pedestal, rug and the soft shadow under the mug. */
export function createTable(THREE, helpers, world) {
  const { mkTex, lathe, flat } = helpers;
  /* ---- coffee table: walnut slab, rounded edge, pedestal, rug ---- */
  const tableG = new THREE.Group();
  world.add(tableG);
  const TOP = -0.09, TR = 4.3;

  const woodTex = mkTex(1024, 1024, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#4a2813");
    g.addColorStop(0.5, "#5e3519");
    g.addColorStop(1, "#3d210f");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 40; i++) {
      const y = Math.random() * h, th = 20 + Math.random() * 80;
      c.fillStyle = Math.random() < 0.5 ? "rgba(20,8,2,.10)" : "rgba(150,90,45,.07)";
      c.beginPath();
      c.moveTo(0, y);
      for (let x = 0; x <= w; x += 32) c.lineTo(x, y + Math.sin(x * 0.006 + i) * 14);
      for (let x = w; x >= 0; x -= 32) c.lineTo(x, y + th + Math.sin(x * 0.006 + i + 1) * 14);
      c.closePath();
      c.fill();
    }
    for (let i = 0; i < 420; i++) {
      const y = Math.random() * h;
      c.strokeStyle = `rgba(${(15 + Math.random() * 30) | 0},${(6 + Math.random() * 12) | 0},2,${0.04 + Math.random() * 0.1})`;
      c.lineWidth = 0.6 + Math.random() * 1.8;
      c.beginPath();
      c.moveTo(0, y);
      for (let x = 0; x <= w; x += 48) c.lineTo(x, y + Math.sin(x * 0.008 + i * 0.7) * 9 + Math.sin(x * 0.03 + i) * 1.5);
      c.stroke();
    }
    [[0.28, 0.3], [0.72, 0.7]].forEach(([kx, ky]) => {
      for (let r = 7; r > 0; r--) {
        c.strokeStyle = `rgba(25,10,3,${0.12 + (7 - r) * 0.03})`;
        c.lineWidth = 1.5;
        c.beginPath();
        c.ellipse(kx * w, ky * h, r * 9, r * 4.5, 0, 0, 6.283);
        c.stroke();
      }
      c.fillStyle = "rgba(20,8,2,.55)";
      c.beginPath();
      c.ellipse(kx * w, ky * h, 10, 5, 0, 0, 6.283);
      c.fill();
    });
    for (let i = 0; i < 2500; i++) {
      c.fillStyle = "rgba(15,6,2,.25)";
      c.fillRect(Math.random() * w, Math.random() * h, 2 + Math.random() * 5, 1);
    }
  });
  const topMat = new THREE.MeshPhysicalMaterial({
    map: woodTex, bumpMap: woodTex, bumpScale: 0.6, roughness: 0.42,
    clearcoat: 0.55, clearcoatRoughness: 0.35, envMapIntensity: 0.9,
  });
  const edgeMat = new THREE.MeshPhysicalMaterial({
    map: woodTex, color: 0xcaa07a, roughness: 0.4,
    clearcoat: 0.4, clearcoatRoughness: 0.4, envMapIntensity: 0.8,
  });
  const slab = new THREE.Mesh(new THREE.CylinderGeometry(TR - 0.16, TR - 0.16, 0.32, 128), [edgeMat, topMat, edgeMat]);
  slab.position.y = TOP - 0.16;
  const bull = new THREE.Mesh(new THREE.TorusGeometry(TR - 0.16, 0.16, 24, 128), edgeMat);
  bull.rotation.x = Math.PI / 2;
  bull.position.y = TOP - 0.16;
  const pedestal = new THREE.Mesh(
    lathe([[0, -2.4], [1.5, -2.4], [1.5, -2.3], [0.8, -2.1], [0.7, -1.2], [0.9, -0.6], [1.2, -0.4], [0, -0.4]], 64),
    new THREE.MeshPhysicalMaterial({ color: 0x2a1509, roughness: 0.5, clearcoat: 0.4, clearcoatRoughness: 0.4 })
  );
  const rugTex = mkTex(1024, 1024, (c, w, h) => {
    c.fillStyle = "#6a5442";
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 14000; i++) {
      c.fillStyle = `rgba(${Math.random() < 0.5 ? "30,20,10" : "200,170,140"},${0.05 + Math.random() * 0.08})`;
      c.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 6, 1 + Math.random() * 2);
    }
  });
  const rugFade = mkTex(256, 256, (c, w, h) => {
    const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "#fff");
    g.addColorStop(0.5, "#fff");
    g.addColorStop(1, "#000");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  }, false);
  const rug = new THREE.Mesh(
    flat(9, 64),
    new THREE.MeshStandardMaterial({ map: rugTex, alphaMap: rugFade, transparent: true, roughness: 1, envMapIntensity: 0.2 })
  );
  rug.position.y = -2.4;
  tableG.add(slab, bull, pedestal, rug);

  const shTex = mkTex(256, 256, (c, w, h) => {
    const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(0,0,0,.8)");
    g.addColorStop(0.55, "rgba(0,0,0,.4)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  });
  const shadow = new THREE.Mesh(
    flat(2.4, 48),
    new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false })
  );
  shadow.position.y = -0.086;
  world.add(shadow);

  return { tableG, TOP, TR, shadow };
}
