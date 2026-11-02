/* Lenis smooth scrolling, wired into GSAP's ticker so ScrollTrigger stays in sync. */
export function createSmoothScroll({ gsap, ScrollTrigger, Lenis, reduce }) {
  let lenis = null;
  let tick = null;
  /* phone address bar showing/hiding must not re-measure the whole timeline */
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (!reduce && Lenis) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true, syncTouch: false });
    lenis.on("scroll", ScrollTrigger.update);
    tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick); /* added BEFORE the scene's render callback, so scroll is always up to date */
    gsap.ticker.lagSmoothing(0);
  }

  const dispose = () => {
    if (tick) gsap.ticker.remove(tick);
    if (lenis) lenis.destroy();
  };

  return { lenis, dispose };
}
