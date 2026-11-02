/* Floating dust motes in two depth layers (far = small and slow, near = bigger and quicker). */
export function createMotes(THREE, helpers, scene) {
  const { dotTex } = helpers;
  const layer = (n, size, opacity, sx, sy, sz, color) => {
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      p[i * 3] = (Math.random() - 0.5) * sx;
      p[i * 3 + 1] = (Math.random() - 0.5) * sy + 1.5;
      p[i * 3 + 2] = (Math.random() - 0.5) * sz - 1;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    const m = new THREE.Points(
      g,
      new THREE.PointsMaterial({ color, size, map: dotTex, transparent: true, opacity, depthWrite: false })
    );
    m.frustumCulled = false;
    scene.add(m);
    return m;
  };
  const far = layer(150, 0.04, 0.38, 16, 13, 6, 0xffd9a8);
  const near = layer(55, 0.095, 0.5, 12, 10, 3, 0xffe6c4);

  function update(fr) {
    const { t } = fr;
    far.rotation.y = t * 0.012;
    near.rotation.y = -t * 0.022;
    far.position.y = scrollY * 0.0004;
    near.position.y = scrollY * 0.0012;
    near.material.opacity = 0.42 + 0.12 * Math.sin(t * 0.9); /* gentle twinkle */
  }

  return { update };
}
