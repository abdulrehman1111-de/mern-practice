import { DESIGNS } from "../data/designs";

/* Name of the latte-art design currently on the cup, plus progress dots.
   Visibility (--ao) is set by the scene while the top-down view is on screen. */
export default function DesignCaption({ index }) {
  const d = DESIGNS[index] || DESIGNS[0];
  return (
    <div className="design-cap glass" aria-live="polite">
      <div className="design-cap__no">{String(index + 1).padStart(2, "0")} / {String(DESIGNS.length).padStart(2, "0")}</div>
      <div className="design-cap__txt" key={d.id}>
        <h3>{d.name}</h3>
        <p>{d.note}</p>
      </div>
      <div className="design-cap__dots" aria-hidden="true">
        {DESIGNS.map((x, i) => (
          <i key={x.id} className={i === index ? "on" : ""} />
        ))}
      </div>
    </div>
  );
}
