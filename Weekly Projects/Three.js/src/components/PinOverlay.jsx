import { PINS } from "../data/pins";

/* Numbered dots that float over the latte art (positioned by the scene's render loop). */
export default function PinOverlay({ registerPin }) {
  return (
    <div className="pins" aria-hidden="true">
      {PINS.map((_, i) => (
        <div key={i} className="pin" ref={(el) => registerPin(i, el)}>
          <b>{i + 1}</b>
        </div>
      ))}
    </div>
  );
}
