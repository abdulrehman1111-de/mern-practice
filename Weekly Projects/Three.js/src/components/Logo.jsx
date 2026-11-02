import AnchorLink from "./AnchorLink";

export default function Logo({ onNavigate, style }) {
  return (
    <AnchorLink className="logo" href="#top" onNavigate={onNavigate} style={style}>
      Ember<i>&amp;</i>Crema
    </AnchorLink>
  );
}
