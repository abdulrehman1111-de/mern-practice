/* In-page link that scrolls smoothly via the onNavigate handler (useScrollTo). */
export default function AnchorLink({ href, onNavigate, children, ...rest }) {
  return <a href={href} onClick={(e) => onNavigate(e, href)} {...rest}>{children}</a>;
}
