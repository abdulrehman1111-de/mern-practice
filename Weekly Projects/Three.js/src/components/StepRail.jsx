import { RAIL, STEPS } from "../data/steps";

/* Floating "Beans · Grind · Extract..." rail at the bottom. Click a step to jump to it. */
export default function StepRail({ railRef, step, onNavigate }) {
  return (
    <div className="rail glass" ref={railRef} role="navigation" aria-label="Brewing steps">
      {RAIL.map((r, i) => (
        <span
          key={r}
          role="button"
          tabIndex={0}
          className={step === i ? "on" : ""}
          onClick={(e) => onNavigate(e, "#" + STEPS[i].id)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onNavigate(e, "#" + STEPS[i].id)}
        >
          {r}
        </span>
      ))}
    </div>
  );
}
