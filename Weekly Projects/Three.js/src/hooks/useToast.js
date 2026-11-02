import { useCallback, useRef, useState } from "react";

/* Small pop-up message at the bottom of the screen. */
export default function useToast() {
  const [toast, setToast] = useState({ msg: "", on: false });
  const timer = useRef(null);

  const say = useCallback((msg) => {
    setToast({ msg, on: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 2200);
  }, []);

  return { toast, say };
}
