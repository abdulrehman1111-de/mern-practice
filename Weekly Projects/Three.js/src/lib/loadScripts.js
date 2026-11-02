import { LIBS } from "../config";

const scriptCache = {};
export function loadScript(src) {
  if (scriptCache[src]) return scriptCache[src];
  scriptCache[src] = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false; /* downloads in parallel, but still RUNS in insertion order */
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
  return scriptCache[src];
}
/* All libraries download at the same time (was one after another), order of execution is kept. */
export async function loadLibs() {
  await Promise.all(LIBS.map(loadScript));
}
