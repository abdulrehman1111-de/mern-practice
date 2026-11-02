import { D, FR, RING } from "../data/keyframes";
import { DESIGNS } from "../data/designs";

/* Scroll-driven timeline: tweens the shared `st` state between the keyframes in
   data/keyframes.js, plus the intro spin and the exit when the menu arrives. */
export function createTimeline({ gsap, reduce, isMob, TAN }) {
  /* ---------- keyframes (desktop and mobile) ---------- */
  const frames = () => {
    const mob = isMob();
    const asp = innerWidth / innerHeight;
    return FR.map((f) => {
      const o = { ...D, ...f };
      if (!mob) return o;
      const props = o.my < 6 || o.pxo > -5;
      o.fx = 0;
      o.bsp *= 0.6;
      let cz = Math.max(o.cz * 1.15, 2.35 / (TAN * asp));
      if (props) cz *= 1.15;
      o.cz = cz;
      o.sy = 0.46 * cz * TAN;
      return o;
    });
  };

  const st = { ...D, ...FR[0] };
  const metrics = { pos: [0, 1, 2, 3, 4, 5, 6], total: 1 };
  let tl;
  const build = () => {
    if (tl) {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    }
    const K = frames();
    Object.assign(st, K[0]);
    const jr = document.getElementById("journey");
    const top0 = jr.getBoundingClientRect().top + scrollY;
    const topOf = (id) => document.getElementById(id).getBoundingClientRect().top + scrollY - top0;
    const total = Math.max(1, jr.offsetHeight - innerHeight);
    const pos = [0, topOf("beans"), topOf("grind"), topOf("extract"), topOf("pour"), topOf("art"), total];
    for (let i = 1; i < pos.length; i++) if (pos[i] <= pos[i - 1]) pos[i] = pos[i - 1] + 1;
    metrics.pos = pos;
    metrics.total = total;
    tl = gsap.timeline({
      defaults: { ease: "sine.inOut" },
      scrollTrigger: { trigger: "#journey", start: "top top", end: "bottom bottom", scrub: reduce ? true : 1.1 },
    });
    /* Beans -> ... -> top-down art view (K[5]) */
    for (let i = 1; i <= 5; i++) tl.to(st, { ...K[i], duration: pos[i] - pos[i - 1] }, pos[i - 1]);
    /* HOLD: stay on the top-down view while the designs change (ad runs 0 -> last design).
       The #art panel is ART_HOLD_VH tall (see styles/sections.css); the last viewport is left for
       the move to the serve view. ease "none" keeps the design changes evenly spaced. */
    const last = DESIGNS.length - 1;
    const holdEnd = Math.min(total - 1, Math.max(pos[5] + 1, total - innerHeight));
    const hold = holdEnd - pos[5];
    /* 1) the camera eases out and the single cup becomes a ring of cups (rg 0 -> 1) */
    const asp = innerWidth / innerHeight;
    const mob = isMob();
    const R = { ...RING, fx: mob ? 0 : RING.fx, cz: Math.max(RING.cz, 4.5 / (TAN * asp)) };
    const ramp = hold * 0.2;
    tl.to(st, { fx: R.fx, ty: R.ty, cz: R.cz, el: R.el, rg: 1, duration: ramp, ease: "sine.inOut" }, pos[5]);
    /* 2) the ring revolves, one design after another (ad runs 0 -> last, evenly spaced) */
    tl.to(st, { ad: last, duration: hold - ramp, ease: "none" }, pos[5] + ramp);
    /* 3) ring -> serve view: the cups spiral back in and merge into one (keeps the last design on the cup) */
    const { rg: _rg, ...K6 } = K[6];
    tl.to(st, { ...K6, ad: last, duration: total - holdEnd }, holdEnd);
    tl.to(st, { rg: 0, duration: (total - holdEnd) * 0.8, ease: "power2.inOut" }, holdEnd);
  };
  build();

  const intro = { v: 1 };
  const introTween = gsap.to(intro, { v: 0, duration: reduce ? 0.01 : 2.4, ease: "power3.out", delay: 0.1 });

  const exit = { v: 0 };
  const exitTween = gsap.to(exit, {
    v: 1,
    ease: "none",
    scrollTrigger: { trigger: "#menu", start: "top 100%", end: "top 12%", scrub: true },
  });

  const dispose = () => {
    introTween.kill();
    exitTween.scrollTrigger && exitTween.scrollTrigger.kill();
    exitTween.kill();
    if (tl) {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    }
  };

  return { st, metrics, intro, exit, build, dispose };
}
