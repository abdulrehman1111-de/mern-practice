import Hero from "./Hero";
import StepSection from "./StepSection";
import { STEPS } from "../data/steps";

/* The scroll-driven part: hero + six steps. #journey is what the 3D timeline scrubs against. */
export default function Journey({ onNavigate }) {
  return (
    <main id="journey">
      <Hero onNavigate={onNavigate} />
      {STEPS.map((s) => (
        <StepSection key={s.id} step={s} onNavigate={onNavigate} />
      ))}
    </main>
  );
}
