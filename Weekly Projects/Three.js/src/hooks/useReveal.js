import { useEffect } from "react";

/* Fades in every .reveal element when it scrolls into view. */
export default function useReveal(rootRef) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
      { threshold: 0.25 }
    );
    rootRef.current.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}
