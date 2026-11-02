/* Wrapper that fades in on scroll. d = stagger step (delay = d * 0.1s).
   Use as={Component} to reveal any element or component. */
export default function Reveal({ as: Tag = "div", d, className = "", style, ...rest }) {
  const s = d === undefined ? style : { ...style, "--d": d };
  return <Tag className={(className + " reveal").trim()} style={s} {...rest} />;
}
