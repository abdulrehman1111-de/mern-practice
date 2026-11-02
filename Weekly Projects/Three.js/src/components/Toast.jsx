export default function Toast({ toast }) {
  return (
    <div id="toast" className={"glass " + (toast.on ? "on" : "")} role="status" aria-live="polite">
      {toast.msg}
    </div>
  );
}
