import { useEffect, useRef } from "react";

/* Soft warm light that trails the mouse (desktop only). Grows over links, buttons and cards. */
export default function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-50%)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const over = (e) => el.classList.toggle("hot", !!e.target.closest("a,button,[role=button],.mtilt"));
    const out = () => (el.style.opacity = "0");
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", out);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", out);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
}
