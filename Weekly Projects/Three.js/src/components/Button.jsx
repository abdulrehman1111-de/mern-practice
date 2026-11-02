/* Pill button. Renders an <a> when you pass href, otherwise a <button>. */
export default function Button({ href, className = "", children, ...rest }) {
  const cls = ("btn " + className).trim();
  if (href) {
    return <a className={cls} href={href} {...rest}>{children}</a>;
  }
  return <button className={cls} {...rest}>{children}</button>;
}
