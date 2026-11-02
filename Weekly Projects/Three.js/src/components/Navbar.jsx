import AnchorLink from "./AnchorLink";
import Logo from "./Logo";
import { NAV_LINKS } from "../data/navigation";

export default function Navbar({ count, onCart, onNavigate }) {
  return (
    <nav className="glass">
      <Logo onNavigate={onNavigate} />
      <ul>
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <AnchorLink href={l.href} onNavigate={onNavigate}>{l.label}</AnchorLink>
          </li>
        ))}
      </ul>
      <button className="cart" onClick={onCart} aria-label="Your order">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8zM17 10h1.5a2.5 2.5 0 010 5H17M7 3v2M11 3v2M15 3v2" />
        </svg>
        Order · {count}
      </button>
    </nav>
  );
}
