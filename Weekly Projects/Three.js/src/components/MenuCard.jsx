import { useRef } from "react";
import Button from "./Button";
import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";

export default function MenuCard({ item, index, onAdd }) {
  const ref = useRef(null);
  useTilt(ref);
  return (
    <div className="mtilt" ref={ref}>
      <Reveal as="article" d={index} className="mcard glass">
        <h3>{item.n}</h3>
        <p>{item.d}</p>
        <div className="mrow">
          <span className="price">${item.p.toFixed(2)}</span>
          <Button onClick={() => onAdd(item.n)}>Add</Button>
        </div>
      </Reveal>
    </div>
  );
}
