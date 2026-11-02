import { useEffect } from "react";

/* 3D tilt + moving highlight on hover. Writes CSS variables on that one element only. */
export default function useTilt(ref, max = 6) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, px = 0.5, py = 0.5;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--rx", ((0.5 - py) * max * 2).toFixed(2) + "deg");
      el.style.setProperty("--ry", ((px - 0.5) * max * 2).toFixed(2) + "deg");
      el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    };
    const move = (e) => {
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width;
      py = (e.clientY - r.top) / r.height;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      px = py = 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, max]);
}
