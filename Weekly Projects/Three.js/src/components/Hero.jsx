import Button from "./Button";
import Reveal from "./Reveal";

export default function Hero({ onNavigate }) {
  return (
    <section className="panel hero" id="top">
      <div className="copy glass">
        <Reveal as="p" className="eyebrow">Small-batch roastery · Poured by hand</Reveal>
        <Reveal as="h1" d={1}>Every cup has a <em>story.</em></Reveal>
        <Reveal as="p" d={2}>
          Scroll down and watch one being made, from the first bean to the last drop of foam.
        </Reveal>
        <Reveal as={Button} d={3} href="#beans" onClick={(e) => onNavigate(e, "#beans")}>
          Start the brew
        </Reveal>
        <Reveal d={4} className="hint"><i /> Scroll to brew</Reveal>
      </div>
    </section>
  );
}
