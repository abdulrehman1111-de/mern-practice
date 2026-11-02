import { useCallback } from "react";

/* Returns go(event, "#id"): smooth-scrolls to a section (Lenis if running, native otherwise). */
export default function useScrollTo(lenisRef) {
  return useCallback((e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenisRef.current) lenisRef.current.scrollTo(el);
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [lenisRef]);
}
