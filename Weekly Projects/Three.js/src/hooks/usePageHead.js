import { useEffect } from "react";
import { FONT_URL } from "../config";

/* Sets the page title and loads the Google Fonts stylesheet. */
export default function usePageHead() {
  useEffect(() => {
    document.title = "Ember & Crema | Coffee, made in front of you";
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_URL;
    document.head.appendChild(l);
    return () => l.remove();
  }, []);
}
