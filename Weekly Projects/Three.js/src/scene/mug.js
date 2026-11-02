/* The stoneware mug: body texture, glaze, rim and ribbon handle. */
export function createMug(THREE, helpers, world) {
  const { mkTex, noiseTex, lathe, flat, clamp01 } = helpers;
  /* ---- the stoneware mug ---- */
  const MH = 1.25;
  const cupG = new THREE.Group();
  world.add(cupG);
  const cup = new THREE.Group();
  cupG.add(cup);

  const mugTex = mkTex(2048, 512, (c, w, h) => {
    c.fillStyle = "#e8dcc6";
    c.fillRect(0, 0, w, h);
    const g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "rgba(120,70,30,.12)");
    g.addColorStop(0.5, "rgba(255,255,255,0)");
    g.addColorStop(1, "rgba(90,50,20,.14)");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 3200; i++) {
      c.fillStyle = `rgba(${70 + ((Math.random() * 40) | 0)},${38 + ((Math.random() * 20) | 0)},18,${0.25 + Math.random() * 0.5})`;
      c.beginPath();
      c.arc(Math.random() * w, Math.random() * h, 0.7 + Math.random() * 2.2, 0, 6.283);
      c.fill();
    }
    /* raw clay foot at the bottom */
    c.fillStyle = "#bfa27a";
    c.beginPath();
    c.moveTo(0, h);
    for (let x = 0; x <= w; x += 16) c.lineTo(x, h * 0.955 + Math.sin(x * 0.04) * 3 + Math.sin(x * 0.011) * 4);
    c.lineTo(w, h);
    c.fill();
    /* dark glaze that pools and drips from the rim */
    const dr = [];
    for (let i = 0; i < 26; i++) dr.push([Math.random() * w, 10 + Math.random() * 18, h * (0.03 + Math.random() * 0.1)]);
    c.fillStyle = "#5e3319";
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(w, 0);
    c.lineTo(w, h * 0.07);
    for (let x = w; x >= 0; x -= 8) {
      let y = h * 0.07 + Math.sin(x * 0.03) * 5;
      dr.forEach((d) => {
        const dx = Math.abs(x - d[0]);
        if (dx < d[1]) y += d[2] * Math.cos((dx / d[1]) * 1.5708);
      });
      c.lineTo(x, y);
    }
    c.closePath();
    c.fill();
    c.fillStyle = "#3b2619";
    c.strokeStyle = "#3b2619";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = "500 86px Georgia, 'Times New Roman', serif";
    try { c.letterSpacing = "14px"; } catch (e) {}
    c.fillText("COFFEE", w / 2, h * 0.45);
    try { c.letterSpacing = "0px"; } catch (e) {}
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(w / 2 - 250, h * 0.565);
    c.lineTo(w / 2 - 38, h * 0.565);
    c.moveTo(w / 2 + 38, h * 0.565);
    c.lineTo(w / 2 + 250, h * 0.565);
    c.stroke();
    c.beginPath();
    const hx = w / 2, hy = h * 0.565, s = 15;
    c.moveTo(hx, hy + s);
    c.bezierCurveTo(hx - s * 2, hy - s * 0.2, hx - s * 0.9, hy - s * 1.6, hx, hy - s * 0.5);
    c.bezierCurveTo(hx + s * 0.9, hy - s * 1.6, hx + s * 2, hy - s * 0.2, hx, hy + s);
    c.fill();
    c.font = "italic 400 52px Georgia, 'Times New Roman', serif";
    c.fillText("a hug in a mug", w / 2, h * 0.69);
  });
  mugTex.wrapS = THREE.RepeatWrapping;
  mugTex.offset.x = 0.5;

  const mugMat = new THREE.MeshPhysicalMaterial({
    map: mugTex, bumpMap: noiseTex(10, 3, 40), bumpScale: 0.2,
    roughness: 0.5, clearcoat: 0.4, clearcoatRoughness: 0.35, envMapIntensity: 1, side: THREE.DoubleSide,
  });
  const creamMat = new THREE.MeshPhysicalMaterial({
    color: 0xe6d9c2, bumpMap: noiseTex(6, 6, 50), bumpScale: 0.4,
    roughness: 0.48, clearcoat: 0.4, clearcoatRoughness: 0.35, envMapIntensity: 1, side: THREE.DoubleSide,
  });
  const rimMat = new THREE.MeshPhysicalMaterial({ color: 0x5e3319, roughness: 0.3, clearcoat: 0.7, envMapIntensity: 1 });

  const outerPts = [];
  for (let i = 0; i <= 16; i++) {
    const k = i / 16;
    outerPts.push([0.8 + 0.13 * Math.pow(k, 0.8) - 0.07 * Math.pow(Math.max(0, 1 - k * 12), 2), MH * k]);
  }
  cup.add(new THREE.Mesh(lathe(outerPts, 128), mugMat));
  cup.add(new THREE.Mesh(lathe([[0.87, MH], [0.86, MH - 0.05], [0.83, 0.5], [0.78, 0.18], [0.7, 0.1], [0, 0.09]], 128), creamMat));
  const foot = new THREE.Mesh(flat(0.76, 48), creamMat);
  foot.position.y = 0.005;
  cup.add(foot);
  const rimRing = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.042, 14, 128), rimMat);
  rimRing.rotation.x = Math.PI / 2;
  rimRing.position.y = MH;
  cup.add(rimRing);

  /* ribbon handle with flared joins and a thumb rest */
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.88, 1.06, 0),
    new THREE.Vector3(1.22, 1.13, 0),
    new THREE.Vector3(1.55, 0.95, 0),
    new THREE.Vector3(1.62, 0.62, 0),
    new THREE.Vector3(1.42, 0.34, 0),
    new THREE.Vector3(1.1, 0.26, 0),
    new THREE.Vector3(0.84, 0.3, 0),
  ]);
  const handle = new THREE.Mesh(new THREE.TubeGeometry(handleCurve, 80, 0.082, 18, false), creamMat);
  handle.scale.z = 1.45;
  cup.add(handle);
  [[0.88, 1.06], [0.84, 0.3]].forEach(([x, y]) => {
    const fl = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 14), creamMat);
    fl.position.set(x, y, 0);
    fl.scale.set(0.6, 1.1, 1.5);
    cup.add(fl);
  });
  const thumb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 18, 12), creamMat);
  thumb.position.set(1.3, 1.17, 0);
  thumb.scale.set(1.5, 0.55, 1.3);
  cup.add(thumb);

  const innerR = (y) => 0.78 + 0.075 * clamp01((y - 0.14) / 1.05);

  return { cupG, cup, MH, outerPts, handleCurve, innerR, creamMat };
}
