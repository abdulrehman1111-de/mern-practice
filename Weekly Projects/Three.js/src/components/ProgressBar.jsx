/* Thin scroll-progress line at the top (scaled by the scene's render loop). */
export default function ProgressBar({ barRef }) {
  return <div className="pbar" ref={barRef} />;
}
