export default function FooterColumn({ title, children }) {
  return (
    <div>
      <h4>{title}</h4>
      {children}
    </div>
  );
}
