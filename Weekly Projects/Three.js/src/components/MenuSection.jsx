import MenuCard from "./MenuCard";
import Reveal from "./Reveal";
import { MENU } from "../data/menu";

export default function MenuSection({ onAdd }) {
  return (
    <section id="menu">
      <div className="mhead">
        <Reveal as="p" className="eyebrow">The menu</Reveal>
        <Reveal as="h2" d={1}>Pick your <em>cup.</em></Reveal>
        <Reveal as="p" d={2}>Every drink starts with the same careful steps you just watched.</Reveal>
      </div>
      <div className="mgrid">
        {MENU.map((m, i) => (
          <MenuCard key={m.n} item={m} index={i} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
