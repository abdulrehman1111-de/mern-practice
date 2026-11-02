/* Falling coffee beans (physics simulation) plus the beans scattered on the table. */
export function createBeans(THREE, helpers, world, { cupG, outerPts, MH, handleCurve, TOP, TR }) {
  const { noiseTex, clamp01 } = helpers;
  /* ---- beans: ellipsoid with crease, pinched ends, flat back, organic wobble ---- */
  const beanGeo = (() => {
    const g = new THREE.SphereGeometry(1, 48, 32);
    const p = g.attributes.position;
    const col = new Float32Array(p.count * 3);
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const yc = Math.sin(x * 2.4) * 0.09;
      const d = y - yc;
      const w = Math.exp((-d * d) / 0.018) * Math.max(0, 1 - x * x);
      const org = 1 + 0.05 * Math.sin(x * 7 + y * 5) * Math.sin(z * 6 + 1);
      const nz = (z > 0 ? z * (1 - 0.62 * w) : z * 0.78) * org;
      p.setXYZ(i, x * org, y * (1 - 0.2 * x * x) * org, nz);
      const c = (z > 0 ? 1 - 0.6 * w : 0.9) * (0.88 + Math.random() * 0.12);
      col[i * 3] = c;
      col[i * 3 + 1] = c;
      col[i * 3 + 2] = c;
    }
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    g.computeVertexNormals();
    return g;
  })();
  const beanMat = new THREE.MeshPhysicalMaterial({
    color: 0x5a3118, roughness: 0.45, clearcoat: 0.2, clearcoatRoughness: 0.5, vertexColors: true,
    bumpMap: noiseTex(3, 2, 110), bumpScale: 0.3, envMapIntensity: 0.9,
  });
  const tmpC = new THREE.Color();
  const dummy = new THREE.Object3D();
  const shade = (mesh, n) => {
    for (let i = 0; i < n; i++) {
      const l = 0.7 + Math.random() * 0.5;
      mesh.setColorAt(i, tmpC.setRGB(l, l * 0.95, l * 0.9));
    }
    mesh.instanceColor.needsUpdate = true;
  };

  const NB = 110;
  const beans = new THREE.InstancedMesh(beanGeo, beanMat, NB);
  beans.frustumCulled = false;
  /* ---- bean physics: gravity, bouncing, and solid collisions with the mug, handle, saucer, table and each other ---- */
  const BR = 0.095;
  const GRAVB = 9;
  const HR = 0.11;
  const polyPts = outerPts
    .map((p) => [p[0], p[1]])
    .concat([[0.87, MH], [0.86, MH - 0.05], [0.83, 0.5], [0.78, 0.18], [0.7, 0.1], [0, 0.09], [0, 0]]);
  const polyEdges = polyPts.map((a, i) => {
    const b = polyPts[(i + 1) % polyPts.length];
    return { a, b, axis: a[0] === 0 && b[0] === 0 };
  });
  const groundPts = [[0, -0.012], [0.8, -0.012], [0.92, -0.004], [1.34, 0.03], [1.43, 0.058], [1.465, 0.04], [1.52, TOP]];
  const groundH = (rho) => {
    if (rho >= 1.52) return TOP;
    for (let i = 1; i < groundPts.length; i++) {
      const a = groundPts[i - 1], b = groundPts[i];
      if (rho <= b[0]) return a[1] + ((b[1] - a[1]) * (rho - a[0])) / (b[0] - a[0]);
    }
    return TOP;
  };
  const handlePts = handleCurve.getPoints(20);
  const nrm = new THREE.Vector3();
  const tv = new THREE.Vector3();
  const tw = new THREE.Vector3();
  const qa = new THREE.Quaternion();
  const ax = new THREE.Vector3();
  const rnd = (a, b) => a + Math.random() * (b - a);

  const spawn = (b, stagger) => {
    const a = Math.random() * 6.283, rr = Math.sqrt(Math.random()) * 1.05;
    b.p.set(Math.cos(a) * rr, (stagger ? 1.8 : 4) + Math.random() * (stagger ? 4.5 : 2), Math.sin(a) * rr);
    b.v.set(rnd(-0.3, 0.3), -Math.random() * 0.6, rnd(-0.3, 0.3));
    b.w.set(rnd(-5, 5), rnd(-5, 5), rnd(-5, 5));
    b.q.setFromEuler(new THREE.Euler(rnd(0, 6.283), rnd(0, 6.283), rnd(0, 6.283)));
  };

  const B = [];
  for (let i = 0; i < NB; i++) {
    const b = {
      p: new THREE.Vector3(), v: new THREE.Vector3(), w: new THREE.Vector3(), q: new THREE.Quaternion(),
      sz: 0.85 + Math.random() * 0.3, r: 0, touch: false,
    };
    b.r = BR * b.sz;
    spawn(b, true);
    B.push(b);
  }

  /* resolve one contact: push out, bounce, friction, and roll */
  const hit = (b, n, depth, e, mu) => {
    b.p.addScaledVector(n, depth);
    const vn = b.v.dot(n);
    if (vn < 0) b.v.addScaledVector(n, -(1 + e) * vn);
    tv.copy(b.v).addScaledVector(n, -b.v.dot(n));
    b.v.addScaledVector(tv, -mu);
    tw.crossVectors(n, tv).multiplyScalar(1 / b.r);
    b.w.lerp(tw, 0.25);
    b.touch = true;
  };

  /* mug wall: closest point on the cup cross-section, revolved around the axis */
  const collideMug = (b) => {
    const rho = Math.hypot(b.p.x, b.p.z), y = b.p.y, r = b.r;
    if (rho > 1.1 + r || y > MH + r + 0.05) return;
    let best = 1e9, cx = 0, cy = 0, inside = false;
    for (let i = 0; i < polyEdges.length; i++) {
      const e = polyEdges[i], a = e.a, c = e.b;
      if ((a[1] > y) !== (c[1] > y) && rho < ((c[0] - a[0]) * (y - a[1])) / (c[1] - a[1]) + a[0]) inside = !inside;
      if (e.axis) continue;
      const dx = c[0] - a[0], dy = c[1] - a[1];
      const t = clamp01(((rho - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy));
      const px = a[0] + dx * t, py = a[1] + dy * t;
      const d2 = (rho - px) * (rho - px) + (y - py) * (y - py);
      if (d2 < best) { best = d2; cx = px; cy = py; }
    }
    const d = Math.sqrt(best);
    let nr, ny, depth;
    if (inside) {
      nr = cx - rho; ny = cy - y;
      const l = Math.hypot(nr, ny) || 1;
      nr /= l; ny /= l;
      depth = r + d;
    } else {
      if (d >= r) return;
      nr = (rho - cx) / (d || 1e-4); ny = (y - cy) / (d || 1e-4);
      depth = r - d;
    }
    const ux = rho > 1e-5 ? b.p.x / rho : 1, uz = rho > 1e-5 ? b.p.z / rho : 0;
    nrm.set(nr * ux, ny, nr * uz);
    hit(b, nrm, depth, 0.25, 0.05);
  };

  /* handle: a chain of spheres that turns with the mug */
  const collideHandle = (b, cs, sn) => {
    for (let i = 0; i < handlePts.length; i++) {
      const hp = handlePts[i];
      const dx = b.p.x - hp.x * cs, dy = b.p.y - hp.y, dz = b.p.z + hp.x * sn;
      const rr = HR + b.r, d2 = dx * dx + dy * dy + dz * dz;
      if (d2 < rr * rr) {
        const d = Math.sqrt(d2) || 1e-4;
        nrm.set(dx / d, dy / d, dz / d);
        hit(b, nrm, rr - d, 0.25, 0.05);
      }
    }
  };

  /* saucer (with its raised rim) and the table top */
  const collideGround = (b) => {
    const x = b.p.x, z = b.p.z, rho = Math.hypot(x, z);
    if (rho > TR - 0.1) return;
    const h = groundH(rho);
    const r0 = Math.max(0, rho - 0.02), r1 = rho + 0.02;
    const slope = (groundH(r1) - groundH(r0)) / (r1 - r0);
    const ux = rho > 1e-5 ? x / rho : 1, uz = rho > 1e-5 ? z / rho : 0;
    nrm.set(-slope * ux, 1, -slope * uz).normalize();
    const depth = b.r - (b.p.y - h) * nrm.y;
    if (depth > 0 && b.p.y - h > -0.4) hit(b, nrm, depth, 0.3, 0.06);
  };

  const stepBeans = (dt) => {
    const sub = 3, h = dt / sub;
    const cs = Math.cos(cupG.rotation.y), sn = Math.sin(cupG.rotation.y);
    for (let s = 0; s < sub; s++) {
      for (let i = 0; i < NB; i++) {
        const b = B[i];
        b.v.y -= GRAVB * h;
        b.p.addScaledVector(b.v, h);
        b.touch = false;
      }
      /* bean against bean */
      for (let i = 0; i < NB; i++) {
        const a = B[i];
        for (let j = i + 1; j < NB; j++) {
          const c = B[j];
          const rr = a.r + c.r;
          const dx = c.p.x - a.p.x;
          if (dx > rr || dx < -rr) continue;
          const dy = c.p.y - a.p.y, dz = c.p.z - a.p.z;
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 >= rr * rr || d2 === 0) continue;
          const d = Math.sqrt(d2);
          nrm.set(dx / d, dy / d, dz / d);
          const pen = (rr - d) * 0.5;
          a.p.addScaledVector(nrm, -pen);
          c.p.addScaledVector(nrm, pen);
          const vr = (c.v.x - a.v.x) * nrm.x + (c.v.y - a.v.y) * nrm.y + (c.v.z - a.v.z) * nrm.z;
          if (vr < 0) {
            const imp = -(1.2 * vr) * 0.5;
            a.v.addScaledVector(nrm, -imp);
            c.v.addScaledVector(nrm, imp);
          }
          a.v.multiplyScalar(0.999);
          c.v.multiplyScalar(0.999);
        }
      }
      /* bean against the world */
      for (let i = 0; i < NB; i++) {
        const b = B[i];
        collideMug(b);
        collideHandle(b, cs, sn);
        collideGround(b);
        if (b.touch) {
          b.v.multiplyScalar(0.99);
          b.w.multiplyScalar(0.97);
          if (b.v.lengthSq() < 0.004) b.v.multiplyScalar(0.3);
        } else b.w.multiplyScalar(0.999);
        const wl = b.w.length();
        if (wl > 1e-3) {
          if (wl > 14) b.w.multiplyScalar(14 / wl);
          qa.setFromAxisAngle(ax.copy(b.w).normalize(), Math.min(wl, 14) * h);
          b.q.premultiply(qa).normalize();
        }
        if (b.p.y < -8) spawn(b, false);
      }
    }
  };
  shade(beans, NB);
  world.add(beans);

  const NT = 26;
  const tBeans = new THREE.InstancedMesh(beanGeo, beanMat, NT);
  tBeans.frustumCulled = false;
  for (let i = 0; i < NT; i++) {
    const k = 0.105 + Math.random() * 0.02;
    const ta = 4.2 + Math.random() * 4.9, tr = 1.7 + Math.random() * 1.4;
    dummy.position.set(Math.cos(ta) * tr, -0.05, Math.sin(ta) * tr);
    dummy.rotation.set(-Math.PI / 2, 0, Math.random() * 6.283);
    dummy.scale.set(k, k * 0.7, k * 0.5);
    dummy.updateMatrix();
    tBeans.setMatrixAt(i, dummy.matrix);
  }
  shade(tBeans, NT);
  world.add(tBeans);

  let beansOff = false;

  function update(st, fr) {
    const { dtP } = fr;
    /* beans: simulated physics, they fall, bounce, roll and pile up inside the mug */
    if (st.bsc > 0.02) {
      if (beansOff) {
        B.forEach((b) => spawn(b, true));
        beansOff = false;
      }
      stepBeans(dtP);
      beans.visible = true;
      const k0 = Math.min(1, st.bsc);
      for (let i = 0; i < NB; i++) {
        const b = B[i];
        dummy.position.copy(b.p);
        dummy.quaternion.copy(b.q);
        const k = k0 * b.sz;
        dummy.scale.set(0.115 * k, 0.08 * k, 0.058 * k);
        dummy.updateMatrix();
        beans.setMatrixAt(i, dummy.matrix);
      }
      beans.instanceMatrix.needsUpdate = true;
    } else {
      beans.visible = false;
      beansOff = true;
    }
  }

  return { tBeans, update };
}
