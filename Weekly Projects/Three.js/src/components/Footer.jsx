import AnchorLink from "./AnchorLink";
import FooterColumn from "./FooterColumn";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";
import { NAV_LINKS, SOCIAL_LINKS } from "../data/navigation";

export default function Footer({ onNavigate, onToast }) {
  return (
    <footer className="glass" id="visit">
      <div className="fgrid">
        <div>
          <Logo onNavigate={onNavigate} style={{ display: "inline-block", marginBottom: "1rem" }} />
          <h4>Get a free first coffee</h4>
          <NewsletterForm onToast={onToast} />
        </div>
        <FooterColumn title="Explore">
          {NAV_LINKS.filter((l) => l.footer).map((l) => (
            <AnchorLink key={l.href} href={l.href} onNavigate={onNavigate}>{l.label}</AnchorLink>
          ))}
        </FooterColumn>
        <FooterColumn title="Follow">
          {SOCIAL_LINKS.map((l) => (
            <a key={l.label} href={l.href} rel="noopener noreferrer">{l.label}</a>
          ))}
        </FooterColumn>
      </div>
      <p className="legal">© 2026 Ember &amp; Crema. Made slowly, on purpose.</p>
    </footer>
  );
}
