/* Intro screen: shows until the 3D scene has drawn its first frame, then fades away. */
export default function Loader({ done }) {
  return (
    <div className={"loader" + (done ? " done" : "")} aria-hidden={done}>
      <svg className="loader__cup" width="74" height="74" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path className="loader__steam s1" d="M22 18c-3-4 3-6 0-11" />
        <path className="loader__steam s2" d="M32 18c-3-4 3-6 0-11" />
        <path className="loader__steam s3" d="M42 18c-3-4 3-6 0-11" />
        <path d="M13 26h35v13a14 14 0 01-14 14h-7A14 14 0 0113 39V26zM48 30h4a6 6 0 010 12h-4M10 58h42" />
      </svg>
      <div className="loader__brand">Ember <i>&amp;</i> Crema</div>
      <div className="loader__bar"><i /></div>
    </div>
  );
}
