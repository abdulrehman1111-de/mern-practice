import Button from "./Button";
import Reveal from "./Reveal";

/* One scroll panel of the brewing journey (see data/steps.js for the copy). */
export default function StepSection({ step: s, onNavigate }) {
  return (
    <section className="panel" id={s.id}>
      <div className={"copy glass " + (s.side === "r" ? "r" : "")}>
        <Reveal className="no">{s.no}</Reveal>
        <Reveal as="h2" d={1}>{s.t} <em>{s.em}</em></Reveal>
        <Reveal as="p" d={2}>{s.p}</Reveal>
        {s.list && (
          <Reveal as="ol" d={3} className="plist">
            {s.list.map((x, i) => (
              <li key={x}><b>{i + 1}</b><span>{x}</span></li>
            ))}
          </Reveal>
        )}
        <Reveal d={3} className="chips">
          {s.chips.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </Reveal>
        {s.cta && (
          <Reveal as={Button} d={4} href="#menu" onClick={(e) => onNavigate(e, "#menu")}>
            See the menu
          </Reveal>
        )}
      </div>
    </section>
  );
}
