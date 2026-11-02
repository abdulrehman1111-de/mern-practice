import { useEffect } from "react";
import { loadLibs } from "../lib/loadScripts";
import { createSmoothScroll } from "../scene/smoothScroll";
import { createScene } from "../scene/createScene";

/* Loads the CDN libraries, then builds the 3D scene and smooth scrolling.
   Cleans everything up when the component unmounts. */
export default function useCoffeeScene({ rootRef, canvasRef, lenisRef, barRef, railRef, pinEls, onStep, onDesign, onReady, onNoGL }) {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    loadLibs().then(() => {
      if (cancelled) return;
      const { THREE, gsap, ScrollTrigger, Lenis } = window;
      if (!gsap || !ScrollTrigger || !THREE) {
        onNoGL();
        return;
      }
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMob = () => innerWidth < 760;
      gsap.registerPlugin(ScrollTrigger);

      const smooth = createSmoothScroll({ gsap, ScrollTrigger, Lenis, reduce });
      lenisRef.current = smooth.lenis;

      const disposeScene = createScene({
        THREE, gsap, ScrollTrigger,
        canvas: canvasRef.current,
        root: rootRef.current,
        pinEls, barRef, railRef,
        reduce, isMob, onStep, onDesign, onReady,
      });
      if (!disposeScene) onNoGL();

      cleanup = () => {
        if (disposeScene) disposeScene();
        smooth.dispose();
        lenisRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
