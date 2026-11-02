import { useRef, useState } from "react";

import Navbar from "./components/Navbar";
import ProgressBar from "./components/ProgressBar";
import StepRail from "./components/StepRail";
import PinOverlay from "./components/PinOverlay";
import Journey from "./components/Journey";
import MenuSection from "./components/MenuSection";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { ART_HOLD_VH } from "./data/designs";
import DesignCaption from "./components/DesignCaption";
import Loader from "./components/Loader";
import CursorGlow from "./components/CursorGlow";

import useToast from "./hooks/useToast";
import useCart from "./hooks/useCart";
import useReveal from "./hooks/useReveal";
import usePageHead from "./hooks/usePageHead";
import useScrollTo from "./hooks/useScrollTo";
import useCoffeeScene from "./hooks/useCoffeeScene";

/* ------------------------------------------------------------------
   EMBER & CREMA - a coffee that makes itself as you scroll.
   This file only wires the pieces together. See STRUCTURE.md for the map.
   Three.js, GSAP, ScrollTrigger and Lenis load from CDNs, no installs.
------------------------------------------------------------------- */
export default function App() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const lenisRef = useRef(null);
  const barRef = useRef(null);
  const railRef = useRef(null);
  const pinEls = useRef([]);

  const [nogl, setNogl] = useState(false);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(-1);
  const [design, setDesign] = useState(0);

  const { toast, say } = useToast();
  const { count, add, openCart } = useCart(say);
  const go = useScrollTo(lenisRef);
  const registerPin = (i, el) => { pinEls.current[i] = el; };

  usePageHead();
  useReveal(rootRef);
  useCoffeeScene({
    rootRef, canvasRef, lenisRef, barRef, railRef, pinEls,
    onStep: setStep,
    onDesign: setDesign,
    onReady: () => setReady(true),
    onNoGL: () => setNogl(true),
  });

  return (
    <div ref={rootRef} style={{ "--art-hold": ART_HOLD_VH }} className={"app " + (nogl ? "nogl " : "") + (ready ? "ready" : "")}>
      <Loader done={ready || nogl} />
      <CursorGlow />
      <div id="halo" />
      <canvas id="gl" ref={canvasRef} aria-hidden="true" />
      <ProgressBar barRef={barRef} />
      <PinOverlay registerPin={registerPin} />
      <Navbar count={count} onCart={openCart} onNavigate={go} />
      <StepRail railRef={railRef} step={step} onNavigate={go} />
      <DesignCaption index={design} />
      <Journey onNavigate={go} />
      <MenuSection onAdd={add} />
      <Footer onNavigate={go} onToast={say} />
      <Toast toast={toast} />
    </div>
  );
}
