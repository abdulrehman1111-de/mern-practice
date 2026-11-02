/* Pointer parallax target, canvas resizing, adaptive resolution, tab visibility and ScrollTrigger refresh. */
export function createViewport({ renderer, camera, isMob, ScrollTrigger, rebuild }) {
  const pointer = { x: 0, y: 0 };
  const onMove = (e) => {
    pointer.x = e.clientX / innerWidth - 0.5;
    pointer.y = e.clientY / innerHeight - 0.5;
  };
  addEventListener("pointermove", onMove, { passive: true });

  /* capDpr = the sharpest we allow; dpr = what we use right now (adapt() lowers it if frames get slow) */
  const capNow = () => Math.min(devicePixelRatio || 1, isMob() ? 1.5 : 1.85);
  let cap = capNow(), dpr = cap;
  let lastW = innerWidth, lastH = innerHeight, wasMob = isMob(), rz;
  const sizeNow = () => {
    cap = capNow();
    dpr = Math.min(dpr, cap);
    renderer.setPixelRatio(dpr);
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  };
  /* dir -1 = a bit blurrier but faster, +1 = sharper. Returns true if something changed. */
  const adapt = (dir) => {
    const next = Math.max(1, Math.min(cap, dpr + dir * 0.25));
    if (next === dpr) return false;
    dpr = next;
    sizeNow();
    return true;
  };
  const resize = () => {
    sizeNow();
    clearTimeout(rz);
    rz = setTimeout(() => {
      const wChanged = innerWidth !== lastW || isMob() !== wasMob;
      const hChanged = Math.abs(innerHeight - lastH) > 140; /* ignore small address-bar jumps */
      if (wChanged) {
        wasMob = isMob();
        rebuild();
      }
      if (wChanged || hChanged) {
        lastW = innerWidth;
        lastH = innerHeight;
        ScrollTrigger.refresh();
      }
    }, 220);
  };
  addEventListener("resize", resize);
  sizeNow();
  const onLoad = () => ScrollTrigger.refresh();
  addEventListener("load", onLoad);

  let vis = true;
  const onVis = () => (vis = !document.hidden);
  document.addEventListener("visibilitychange", onVis);

  const dispose = () => {
    clearTimeout(rz);
    removeEventListener("pointermove", onMove);
    removeEventListener("resize", resize);
    removeEventListener("load", onLoad);
    document.removeEventListener("visibilitychange", onVis);
  };

  return { pointer, isVisible: () => vis, adapt, dispose };
}
