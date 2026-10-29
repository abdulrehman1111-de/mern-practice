import { useEffect, useRef, useState, useCallback } from "react";

/* ------------------------------------------------------------------
   EMBER & CREMA — a coffee that makes itself as you scroll
   Single-file React version. Paste into src/App.jsx.
   Three.js, GSAP, ScrollTrigger and Lenis load from CDNs, no installs.
------------------------------------------------------------------- */

const LIBS = [
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
  "https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js",
];
const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=DM+Sans:wght@300;400;500&display=swap";

const scriptCache = {};
function loadScript(src) {
  if (scriptCache[src]) return scriptCache[src];
  scriptCache[src] = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
  return scriptCache[src];
}
async function loadLibs() {
  for (const src of LIBS) await loadScript(src);
}

/* ---------------- Content ---------------- */
const STEPS = [
  {
    id: "beans", no: "01", t: "Choose the", em: "bean.", side: "r",
    p: "Single-origin arabica from high-altitude farms, roasted medium-dark until the sugars turn to caramel.",
    chips: ["Arabica", "Medium-dark roast", "Single origin"],
  },
  {
    id: "grind", no: "02", t: "Grind to", em: "order.", side: "l",
    p: "Eighteen grams, ground fine just before brewing, so the aroma ends up in your cup instead of the air.",
    chips: ["18 g dose", "Fine grind", "Fresh every shot"],
  },
  {
    id: "extract", no: "03", t: "Pull the", em: "shot.", side: "r",
    p: "Hot water is pushed through the coffee at nine bars of pressure. Half a minute later: dark, syrupy espresso under a golden crema.",
    chips: ["9 bar", "About 30 seconds", "Golden crema"],
  },
  {
    id: "pour", no: "04", t: "Steam and", em: "pour.", side: "l",
    p: "Milk is steamed to a silky microfoam and poured in a slow, steady stream, straight into the heart of the espresso.",
    chips: ["60–65 °C", "Microfoam", "Slow pour"],
  },
  {
    id: "art", no: "05", t: "Draw the", em: "heart.", side: "r",
    p: "A last gentle wiggle and the foam folds into a heart. Seen from above, every ring is a small decision made by hand.",
    list: [
      "Velvety microfoam, steamed until glossy",
      "Caramel crema ring, where the espresso shows through",
      "The folded heart, poured in one motion",
    ],
    chips: ["Latte art", "Hand poured"],
  },
  {
    id: "serve", no: "06", t: "Served warm,", em: "never rushed.", side: "l",
    p: "A warm stoneware mug, a breath, and the first sip. Take your time.",
    chips: ["Stoneware mug", "Made to stay"], cta: true,
  },
];
const RAIL = ["Beans", "Grind", "Extract", "Pour", "Art", "Serve"];

const MENU = [
  { n: "Espresso", d: "A double shot with a golden crema.", p: 3.5 },
  { n: "Flat White", d: "Velvet milk poured over two shots.", p: 4.5 },
  { n: "Latte", d: "Soft and milky, with a heart on top.", p: 5 },
  { n: "Cappuccino", d: "Espresso, steamed milk and a cloud of foam.", p: 4.5 },
];

/* Numbered pins on the latte art (coordinates inside the mug) */
const PINS = [
  { p: [0.0, 1.09, -0.05] },
  { p: [0.55, 1.09, 0.25] },
  { p: [0.0, 1.09, 0.55] },
];

/* ---------------- Styles ---------------- */
const CSS = `
:root{
  --espresso:#140b07;--roast:#2a1810;--caramel:#c68642;--copper:#e39a55;--crema:#e8c9a0;--cream:#fbf1e3;--mute:#cdb79c;
  color-scheme:dark;box-sizing:border-box;
}
*,*::before,*::after{box-sizing:inherit}
html{background:var(--espresso)}
body{margin:0;background:transparent;color:var(--cream);font:300 1rem/1.7 "DM Sans",system-ui,sans-serif;overflow-x:hidden}
.app{position:relative}
#halo{position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(circle at var(--hx,70%) var(--hy,45%),rgba(224,146,76,.34),rgba(140,80,34,.16) 26%,transparent 56%),
    radial-gradient(circle at 15% 85%,rgba(90,48,22,.45),transparent 50%),
    linear-gradient(#1b0f09,#0f0805)}
#gl{position:fixed;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;opacity:0;transition:opacity 1.4s ease}
.ready #gl{opacity:1}
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:40;opacity:.035;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")}

/* Glassmorphism */
.glass{position:relative;border-radius:28px;
  background:linear-gradient(145deg,rgba(255,236,210,.17),rgba(255,236,210,.05));
  -webkit-backdrop-filter:blur(20px) saturate(150%);backdrop-filter:blur(20px) saturate(150%);
  border:1px solid rgba(255,226,190,.22);
  box-shadow:0 24px 70px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.24),inset 0 -1px 0 rgba(255,255,255,.04)}

/* Progress line + nav + rail */
.pbar{position:fixed;top:0;left:0;right:0;height:3px;z-index:50;transform-origin:left;transform:scaleX(0);
  background:linear-gradient(90deg,var(--copper),#f7d9ac)}
nav{position:fixed;top:14px;left:50%;transform:translateX(-50%);width:min(1100px,92vw);z-index:30;
  display:flex;justify-content:space-between;align-items:center;padding:.65rem .8rem .65rem 1.5rem;border-radius:999px}
.logo{font:600 1.25rem/1 Fraunces,Georgia,serif;color:var(--cream);text-decoration:none;letter-spacing:.01em}
.logo i{color:var(--copper);font-style:normal;padding:0 .12em}
nav ul{display:flex;gap:2rem;list-style:none;margin:0;padding:0}
nav a{color:var(--cream);text-decoration:none;font-size:.85rem;opacity:.8;transition:opacity .3s,color .3s}
nav a:hover{opacity:1;color:var(--copper)}
.cart{display:flex;align-items:center;gap:.55rem;border:1px solid rgba(255,226,190,.25);background:rgba(255,236,210,.1);
  color:var(--cream);border-radius:999px;padding:.55rem 1.1rem;font:400 .85rem "DM Sans",sans-serif;cursor:pointer;transition:background .3s}
.cart:hover{background:rgba(255,236,210,.2)}
a:focus-visible,button:focus-visible,input:focus-visible{outline:2px solid var(--copper);outline-offset:3px}
.rail{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:30;display:flex;gap:.2rem;padding:.35rem;border-radius:999px;transition:opacity .4s}
.rail span{padding:.45rem .95rem;border-radius:999px;font-size:.75rem;letter-spacing:.06em;opacity:.55;transition:all .4s}
.rail span.on{background:rgba(227,154,85,.3);opacity:1;box-shadow:inset 0 1px 0 rgba(255,255,255,.25)}

/* Sections */
.panel{min-height:100vh;min-height:100svh;display:flex;align-items:center;padding:6rem 6vw 5rem;position:relative;z-index:2}
.copy{max-width:30rem;padding:2.2rem 2.4rem}
.copy.r{margin-left:auto}
.eyebrow{font-size:.72rem;letter-spacing:.3em;text-transform:uppercase;color:var(--copper);margin:0 0 1rem}
h1,h2{font-family:Fraunces,Georgia,serif;font-weight:400;margin:0 0 1.1rem;line-height:1.02;letter-spacing:-.01em}
h1{font-size:clamp(2.6rem,5.4vw,5.4rem)}
h2{font-size:clamp(2rem,3.6vw,3.4rem)}
h1 em,h2 em{font-style:italic;color:var(--copper)}
p{margin:0 0 1.2rem;color:#e4d3bd}
.no{font:400 4.2rem/1 Fraunces,Georgia,serif;color:transparent;-webkit-text-stroke:1px rgba(232,201,160,.55);margin-bottom:.4rem}
.chips{margin:.2rem 0 1.2rem}
.chip{display:inline-block;padding:.35rem .85rem;margin:0 .4rem .45rem 0;border-radius:999px;font-size:.76rem;
  background:rgba(255,236,210,.1);border:1px solid rgba(255,226,190,.22)}
.plist{list-style:none;margin:0 0 1.2rem;padding:0;display:grid;gap:.7rem}
.plist li{display:flex;gap:.8rem;align-items:flex-start;font-size:.92rem;color:#e4d3bd}
.plist b{flex:none;width:1.7rem;height:1.7rem;border-radius:50%;display:grid;place-items:center;font-size:.78rem;font-weight:500;
  background:linear-gradient(135deg,var(--copper),#b8641f);color:#1b0e06}
.btn{display:inline-block;border:0;border-radius:999px;padding:.95rem 1.8rem;cursor:pointer;text-decoration:none;
  background:linear-gradient(135deg,#e8a05c,#b8641f);color:#1b0e06;font:500 .9rem "DM Sans",sans-serif;
  box-shadow:0 10px 30px rgba(217,137,74,.35),inset 0 1px 0 rgba(255,255,255,.4);transition:transform .25s,box-shadow .25s}
.btn:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(217,137,74,.45),inset 0 1px 0 rgba(255,255,255,.4)}
.btn.ghost{background:rgba(255,236,210,.1);color:var(--cream);border:1px solid rgba(255,226,190,.3);box-shadow:none}
.hero .copy{max-width:min(36rem,46vw)}
.hero p{max-width:26rem}
.hint{display:flex;align-items:center;gap:.8rem;margin-top:1.6rem;font-size:.78rem;color:var(--mute)}
.hint i{width:22px;height:36px;border:1px solid rgba(255,226,190,.4);border-radius:12px;position:relative}
.hint i::after{content:"";position:absolute;left:50%;top:7px;width:3px;height:7px;margin-left:-1.5px;border-radius:2px;background:var(--copper);animation:wheel 1.6s infinite}
@keyframes wheel{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(12px)}}

/* Latte-art pins */
.pins{position:fixed;inset:0;pointer-events:none;z-index:20}
.pin{position:absolute;left:0;top:0;opacity:0;will-change:transform}
.pin b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;font:500 .8rem "DM Sans",sans-serif;color:#1b0e06;
  background:rgba(251,241,227,.9);box-shadow:0 0 0 5px rgba(251,241,227,.22),0 6px 20px rgba(0,0,0,.4);animation:pulse 2.2s infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 4px rgba(251,241,227,.25),0 6px 20px rgba(0,0,0,.4)}50%{box-shadow:0 0 0 10px rgba(251,241,227,.08),0 6px 20px rgba(0,0,0,.4)}}

/* Menu + footer */
#menu{position:relative;z-index:2;padding:16vh 6vw 10vh}
.mhead{max-width:40rem;margin-bottom:2.6rem}
.mgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem}
.mcard{padding:1.6rem 1.5rem}
.mcard h3{font:400 1.6rem/1.1 Fraunces,Georgia,serif;margin:0 0 .5rem}
.mcard p{font-size:.9rem;margin:0 0 1.3rem;min-height:3.2em}
.mrow{display:flex;justify-content:space-between;align-items:center}
.price{font:600 1.35rem Fraunces,Georgia,serif;color:var(--copper)}
.mrow .btn{padding:.6rem 1.1rem;font-size:.8rem}
footer{position:relative;z-index:2;margin:0 3vw 3vw;padding:3.2rem 3rem 2rem}
.fgrid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem}
footer h4{font:500 .72rem "DM Sans",sans-serif;letter-spacing:.25em;text-transform:uppercase;color:var(--copper);margin:0 0 1rem}
footer a{display:block;color:var(--mute);text-decoration:none;margin-bottom:.45rem;font-size:.92rem}
footer a:hover{color:var(--cream)}
.nl{display:flex;gap:.6rem;flex-wrap:wrap}
.nl input{flex:1;min-width:12rem;border-radius:999px;background:rgba(255,236,210,.08);border:1px solid rgba(255,226,190,.25);color:var(--cream);padding:.8rem 1.1rem;font:inherit}
.nl input::placeholder{color:var(--mute)}
.legal{margin:2.4rem 0 0;font-size:.78rem;color:var(--mute)}

.reveal{opacity:0;transform:translateY(26px);
  transition:opacity 1s cubic-bezier(.2,.7,.2,1),transform 1s cubic-bezier(.2,.7,.2,1);transition-delay:calc(var(--d,0)*.1s)}
.reveal.in{opacity:1;transform:none}
#toast{position:fixed;left:50%;bottom:5.2rem;transform:translate(-50%,20px);z-index:60;padding:.8rem 1.5rem;border-radius:999px;
  font-size:.85rem;opacity:0;pointer-events:none;transition:.4s}
#toast.on{opacity:1;transform:translate(-50%,0)}
.nogl .panel::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(circle at 70% 45%,rgba(224,146,76,.25),transparent 55%)}

@media (max-width:1000px){.mgrid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:760px){
  nav ul{display:none}
  nav{padding-left:1.1rem}
  .rail{display:none}
  .panel{align-items:flex-end;padding:6rem 5vw 5vh}
  .copy{max-width:none;padding:1.4rem 1.4rem}
  .copy.r{margin-left:0}
  .no{font-size:2.6rem}
  .hero .copy{max-width:none}
  h1{font-size:clamp(2.2rem,10vw,3.2rem)}
  h2{font-size:clamp(1.7rem,8vw,2.4rem)}
  .copy p,.plist li{font-size:.92rem}
  .hint{display:none}
  .mgrid{grid-template-columns:1fr}
  .fgrid{grid-template-columns:1fr;gap:1.6rem}
  footer{padding:2rem 1.5rem 1.5rem}
}
@media (prefers-reduced-motion:reduce){
  .reveal{transition:none;opacity:1;transform:none}
  .hint i::after,.pin b{animation:none}
}
`;

/* ---------------- Scroll keyframes ----------------
   lv = absolute liquid height inside the mug (mug is 1.25 tall).
   pxo = pitcher spout x; the milk arcs ~0.4 to the right as it falls. */
const D = {
  fx: 0.5, ty: 0.55, cz: 7.4, el: 0.2, sy: 0, s: 1, ry: 0,
  bsp: 4, bsc: 0, bx: 0, by: 1.5,
  my: 7, pxo: -9, pt: 0,
  lv: 0, mk: 0, art: 0, grind: 0, fill: 0, stm: 0, es: 0, ms: 0, h: 0,
};
const FR = [
  { fx: 0.5, ty: 0.6, cz: 7.4, el: 0.22, ry: -0.5, bsp: 3.6, bsc: 1, by: 1.8 },
  { fx: -0.5, ty: 0.9, cz: 7, el: 0.28, ry: 0.3, bsp: 1.6, bsc: 1.25, by: 1.9, s: 0.9 },
  { fx: 0.5, ty: 1.7, cz: 9.4, el: 0.22, ry: 0.2, bsp: 0.4, bsc: 0, by: 2.4, my: 3.1, grind: 1, fill: 1, s: 0.9 },
  { fx: -0.5, ty: 1.5, cz: 8.2, el: 0.22, ry: 0.1, my: 2.5, fill: 1, lv: 0.5, es: 1 },
  { fx: 0.5, ty: 1.35, cz: 8.2, el: 0.3, ry: 0, pxo: -0.45, pt: 1, lv: 1.06, mk: 1, ms: 1, stm: 0.45 },
  { fx: -0.35, ty: 0.9, cz: 5.4, el: 1.42, ry: 0, lv: 1.06, mk: 1, art: 1, stm: 0.3, h: 1 },
  { fx: 0.5, ty: 0.6, cz: 7.6, el: 0.2, ry: 0.9, lv: 1.06, mk: 1, art: 1, stm: 1 },
];

export default function App() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const lenisRef = useRef(null);
  const toastTimer = useRef(null);
  const pinEls = useRef([]);
  const barRef = useRef(null);
  const railRef = useRef(null);

  const [count, setCount] = useState(0);
  const [toast, setToast] = useState({ msg: "", on: false });
  const [email, setEmail] = useState("");
  const [nogl, setNogl] = useState(false);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(-1);

  const say = useCallback((msg) => {
    setToast({ msg, on: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 2200);
  }, []);

  const add = (name) => {
    setCount((c) => c + 1);
    say(name + " added to your order");
  };
  const openCart = () =>
    say(count ? count + " item" + (count > 1 ? "s" : "") + " in your order" : "Your order is empty");
  const join = () => {
    if (/^\S+@\S+\.\S+$/.test(email)) {
      say("Welcome, your first coffee is on us");
      setEmail("");
    } else say("Please enter a valid email");
  };
  const go = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenisRef.current) lenisRef.current.scrollTo(el);
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    document.title = "Ember & Crema | Coffee, made in front of you";
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_URL;
    document.head.appendChild(l);
    return () => l.remove();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
      { threshold: 0.25 }
    );
    rootRef.current.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ================= 3D scene ================= */
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    loadLibs().then(() => {
      if (cancelled) return;
      const { THREE, gsap, ScrollTrigger, Lenis } = window;
      if (!gsap || !ScrollTrigger || !THREE) {
        setNogl(true);
        return;
      }
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMob = () => innerWidth < 760;
      gsap.registerPlugin(ScrollTrigger);

      let lenis = null;
      let tick = null;
      if (!reduce && Lenis) {
        lenis = new Lenis({ lerp: 0.07 });
        lenisRef.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);
        tick = (t) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch (e) {}
      if (!renderer) {
        setNogl(true);
        cleanup = () => {
          if (tick) gsap.ticker.remove(tick);
          if (lenis) lenis.destroy();
          lenisRef.current = null;
        };
        return;
      }
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      renderer.outputEncoding = THREE.sRGBEncoding;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
      const TAN = Math.tan((17.5 * Math.PI) / 180);

      /* Soft warm studio reflections */
      const es = new THREE.Scene();
      es.background = new THREE.Color(0x120c08);
      const envPanel = (w, h, x, y, z, c, k) => {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide })
        );
        m.position.set(x, y, z);
        m.lookAt(0, 0, 0);
        es.add(m);
      };
      envPanel(9, 4, 0, 6, 0, 0xfff1dc, 2.6);
      envPanel(2, 8, -6, 1, 3, 0xffe2b8, 2.6);
      envPanel(2, 8, 6, 1, -2, 0xffd2a0, 1.6);
      envPanel(10, 3, 0, 0, -7, 0xffc890, 1.4);
      envPanel(4, 5, 3, 2, 6, 0xffffff, 1.4);
      envPanel(1.2, 7, -3, 2, -5, 0xffffff, 1.8);
      const pm = new THREE.PMREMGenerator(renderer);
      scene.environment = pm.fromScene(es, 0.08).texture;
      pm.dispose();

      /* separate high-contrast studio so the stainless steel reads as real polished metal */
      const es2 = new THREE.Scene();
      es2.background = new THREE.Color(0x8d7660);
      const envPanel2 = (w, h, x, y, z, c, k) => {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide })
        );
        m.position.set(x, y, z);
        m.lookAt(0, 0, 0);
        es2.add(m);
      };
      envPanel2(10, 5, 0, 6, 0, 0xffffff, 3.5);
      envPanel2(1.6, 9, -6, 1, 3, 0xffffff, 3);
      envPanel2(1.6, 9, 6, 1, -2, 0xfff0dc, 2.5);
      envPanel2(12, 4, 0, 0, -7, 0xe8cfae, 1.6);
      envPanel2(6, 6, 0, 1, 7, 0xd9c3a5, 1.2);
      envPanel2(14, 14, 0, -5, 0, 0x6b5038, 0.9);
      envPanel2(14, 1.4, 0, -0.8, -6.8, 0x050302, 1);
      envPanel2(1, 8, 3.5, 0, 5.5, 0x050302, 1);
      const pm2 = new THREE.PMREMGenerator(renderer);
      const metalEnv = pm2.fromScene(es2, 0.03).texture;
      pm2.dispose();

      const key = new THREE.DirectionalLight(0xffe2bd, 1.0);
      key.position.set(3, 6, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffa860, 0.7);
      rim.position.set(-4, 3, -3);
      scene.add(rim);
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));

      /* ---- helpers ---- */
      const texs = [];
      const mkTex = (w, h, draw, srgb = true) => {
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        draw(c.getContext("2d"), w, h);
        const t = new THREE.CanvasTexture(c);
        if (srgb) t.encoding = THREE.sRGBEncoding;
        t.anisotropy = 8;
        texs.push(t);
        return t;
      };
      const noiseTex = (rx, ry, amp = 90) => {
        const t = mkTex(256, 256, (c, w, h) => {
          const id = c.createImageData(w, h);
          for (let i = 0; i < id.data.length; i += 4) {
            const v = (128 + (Math.random() - 0.5) * amp) | 0;
            id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
            id.data[i + 3] = 255;
          }
          c.putImageData(id, 0, 0);
        }, false);
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(rx, ry);
        return t;
      };
      const lathe = (pts, seg = 96) =>
        new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), seg);
      const flat = (r, seg = 64) => {
        const g = new THREE.CircleGeometry(r, seg);
        g.rotateX(-Math.PI / 2);
        return g;
      };
      const clamp01 = (x) => Math.min(1, Math.max(0, x));
      const frac = (x) => x - Math.floor(x);

      const world = new THREE.Group();
      scene.add(world);

      /* ---- coffee table: walnut slab, rounded edge, pedestal, rug ---- */
      const tableG = new THREE.Group();
      world.add(tableG);
      const TOP = -0.09, TR = 4.3;

      const woodTex = mkTex(1024, 1024, (c, w, h) => {
        const g = c.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, "#4a2813");
        g.addColorStop(0.5, "#5e3519");
        g.addColorStop(1, "#3d210f");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
        for (let i = 0; i < 40; i++) {
          const y = Math.random() * h, th = 20 + Math.random() * 80;
          c.fillStyle = Math.random() < 0.5 ? "rgba(20,8,2,.10)" : "rgba(150,90,45,.07)";
          c.beginPath();
          c.moveTo(0, y);
          for (let x = 0; x <= w; x += 32) c.lineTo(x, y + Math.sin(x * 0.006 + i) * 14);
          for (let x = w; x >= 0; x -= 32) c.lineTo(x, y + th + Math.sin(x * 0.006 + i + 1) * 14);
          c.closePath();
          c.fill();
        }
        for (let i = 0; i < 420; i++) {
          const y = Math.random() * h;
          c.strokeStyle = `rgba(${(15 + Math.random() * 30) | 0},${(6 + Math.random() * 12) | 0},2,${0.04 + Math.random() * 0.1})`;
          c.lineWidth = 0.6 + Math.random() * 1.8;
          c.beginPath();
          c.moveTo(0, y);
          for (let x = 0; x <= w; x += 48) c.lineTo(x, y + Math.sin(x * 0.008 + i * 0.7) * 9 + Math.sin(x * 0.03 + i) * 1.5);
          c.stroke();
        }
        [[0.28, 0.3], [0.72, 0.7]].forEach(([kx, ky]) => {
          for (let r = 7; r > 0; r--) {
            c.strokeStyle = `rgba(25,10,3,${0.12 + (7 - r) * 0.03})`;
            c.lineWidth = 1.5;
            c.beginPath();
            c.ellipse(kx * w, ky * h, r * 9, r * 4.5, 0, 0, 6.283);
            c.stroke();
          }
          c.fillStyle = "rgba(20,8,2,.55)";
          c.beginPath();
          c.ellipse(kx * w, ky * h, 10, 5, 0, 0, 6.283);
          c.fill();
        });
        for (let i = 0; i < 2500; i++) {
          c.fillStyle = "rgba(15,6,2,.25)";
          c.fillRect(Math.random() * w, Math.random() * h, 2 + Math.random() * 5, 1);
        }
      });
      const topMat = new THREE.MeshPhysicalMaterial({
        map: woodTex, bumpMap: woodTex, bumpScale: 0.6, roughness: 0.42,
        clearcoat: 0.55, clearcoatRoughness: 0.35, envMapIntensity: 0.9,
      });
      const edgeMat = new THREE.MeshPhysicalMaterial({
        map: woodTex, color: 0xcaa07a, roughness: 0.4,
        clearcoat: 0.4, clearcoatRoughness: 0.4, envMapIntensity: 0.8,
      });
      const slab = new THREE.Mesh(new THREE.CylinderGeometry(TR - 0.16, TR - 0.16, 0.32, 128), [edgeMat, topMat, edgeMat]);
      slab.position.y = TOP - 0.16;
      const bull = new THREE.Mesh(new THREE.TorusGeometry(TR - 0.16, 0.16, 24, 128), edgeMat);
      bull.rotation.x = Math.PI / 2;
      bull.position.y = TOP - 0.16;
      const pedestal = new THREE.Mesh(
        lathe([[0, -2.4], [1.5, -2.4], [1.5, -2.3], [0.8, -2.1], [0.7, -1.2], [0.9, -0.6], [1.2, -0.4], [0, -0.4]], 64),
        new THREE.MeshPhysicalMaterial({ color: 0x2a1509, roughness: 0.5, clearcoat: 0.4, clearcoatRoughness: 0.4 })
      );
      const rugTex = mkTex(1024, 1024, (c, w, h) => {
        c.fillStyle = "#6a5442";
        c.fillRect(0, 0, w, h);
        for (let i = 0; i < 14000; i++) {
          c.fillStyle = `rgba(${Math.random() < 0.5 ? "30,20,10" : "200,170,140"},${0.05 + Math.random() * 0.08})`;
          c.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 6, 1 + Math.random() * 2);
        }
      });
      const rugFade = mkTex(256, 256, (c, w, h) => {
        const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
        g.addColorStop(0, "#fff");
        g.addColorStop(0.5, "#fff");
        g.addColorStop(1, "#000");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
      }, false);
      const rug = new THREE.Mesh(
        flat(9, 64),
        new THREE.MeshStandardMaterial({ map: rugTex, alphaMap: rugFade, transparent: true, roughness: 1, envMapIntensity: 0.2 })
      );
      rug.position.y = -2.4;
      tableG.add(slab, bull, pedestal, rug);

      const shTex = mkTex(256, 256, (c, w, h) => {
        const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
        g.addColorStop(0, "rgba(0,0,0,.8)");
        g.addColorStop(0.55, "rgba(0,0,0,.4)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
      });
      const shadow = new THREE.Mesh(
        flat(2.4, 48),
        new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false })
      );
      shadow.position.y = -0.086;
      world.add(shadow);

      /* ---- the stoneware mug ---- */
      const MH = 1.25;
      const cupG = new THREE.Group();
      world.add(cupG);
      const cup = new THREE.Group();
      cupG.add(cup);

      const mugTex = mkTex(2048, 512, (c, w, h) => {
        c.fillStyle = "#e8dcc6";
        c.fillRect(0, 0, w, h);
        const g = c.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, "rgba(120,70,30,.12)");
        g.addColorStop(0.5, "rgba(255,255,255,0)");
        g.addColorStop(1, "rgba(90,50,20,.14)");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
        for (let i = 0; i < 3200; i++) {
          c.fillStyle = `rgba(${70 + ((Math.random() * 40) | 0)},${38 + ((Math.random() * 20) | 0)},18,${0.25 + Math.random() * 0.5})`;
          c.beginPath();
          c.arc(Math.random() * w, Math.random() * h, 0.7 + Math.random() * 2.2, 0, 6.283);
          c.fill();
        }
        /* raw clay foot at the bottom */
        c.fillStyle = "#bfa27a";
        c.beginPath();
        c.moveTo(0, h);
        for (let x = 0; x <= w; x += 16) c.lineTo(x, h * 0.955 + Math.sin(x * 0.04) * 3 + Math.sin(x * 0.011) * 4);
        c.lineTo(w, h);
        c.fill();
        /* dark glaze that pools and drips from the rim */
        const dr = [];
        for (let i = 0; i < 26; i++) dr.push([Math.random() * w, 10 + Math.random() * 18, h * (0.03 + Math.random() * 0.1)]);
        c.fillStyle = "#5e3319";
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(w, 0);
        c.lineTo(w, h * 0.07);
        for (let x = w; x >= 0; x -= 8) {
          let y = h * 0.07 + Math.sin(x * 0.03) * 5;
          dr.forEach((d) => {
            const dx = Math.abs(x - d[0]);
            if (dx < d[1]) y += d[2] * Math.cos((dx / d[1]) * 1.5708);
          });
          c.lineTo(x, y);
        }
        c.closePath();
        c.fill();
        c.fillStyle = "#3b2619";
        c.strokeStyle = "#3b2619";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.font = "500 86px Georgia, 'Times New Roman', serif";
        try { c.letterSpacing = "14px"; } catch (e) {}
        c.fillText("COFFEE", w / 2, h * 0.45);
        try { c.letterSpacing = "0px"; } catch (e) {}
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(w / 2 - 250, h * 0.565);
        c.lineTo(w / 2 - 38, h * 0.565);
        c.moveTo(w / 2 + 38, h * 0.565);
        c.lineTo(w / 2 + 250, h * 0.565);
        c.stroke();
        c.beginPath();
        const hx = w / 2, hy = h * 0.565, s = 15;
        c.moveTo(hx, hy + s);
        c.bezierCurveTo(hx - s * 2, hy - s * 0.2, hx - s * 0.9, hy - s * 1.6, hx, hy - s * 0.5);
        c.bezierCurveTo(hx + s * 0.9, hy - s * 1.6, hx + s * 2, hy - s * 0.2, hx, hy + s);
        c.fill();
        c.font = "italic 400 52px Georgia, 'Times New Roman', serif";
        c.fillText("a hug in a mug", w / 2, h * 0.69);
      });
      mugTex.wrapS = THREE.RepeatWrapping;
      mugTex.offset.x = 0.5;

      const mugMat = new THREE.MeshPhysicalMaterial({
        map: mugTex, bumpMap: noiseTex(10, 3, 40), bumpScale: 0.2,
        roughness: 0.5, clearcoat: 0.4, clearcoatRoughness: 0.35, envMapIntensity: 1, side: THREE.DoubleSide,
      });
      const creamMat = new THREE.MeshPhysicalMaterial({
        color: 0xe6d9c2, bumpMap: noiseTex(6, 6, 50), bumpScale: 0.4,
        roughness: 0.48, clearcoat: 0.4, clearcoatRoughness: 0.35, envMapIntensity: 1, side: THREE.DoubleSide,
      });
      const rimMat = new THREE.MeshPhysicalMaterial({ color: 0x5e3319, roughness: 0.3, clearcoat: 0.7, envMapIntensity: 1 });

      const outerPts = [];
      for (let i = 0; i <= 16; i++) {
        const k = i / 16;
        outerPts.push([0.8 + 0.13 * Math.pow(k, 0.8) - 0.07 * Math.pow(Math.max(0, 1 - k * 12), 2), MH * k]);
      }
      cup.add(new THREE.Mesh(lathe(outerPts, 128), mugMat));
      cup.add(new THREE.Mesh(lathe([[0.87, MH], [0.86, MH - 0.05], [0.83, 0.5], [0.78, 0.18], [0.7, 0.1], [0, 0.09]], 128), creamMat));
      const foot = new THREE.Mesh(flat(0.76, 48), creamMat);
      foot.position.y = 0.005;
      cup.add(foot);
      const rimRing = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.042, 14, 128), rimMat);
      rimRing.rotation.x = Math.PI / 2;
      rimRing.position.y = MH;
      cup.add(rimRing);

      /* ribbon handle with flared joins and a thumb rest */
      const handleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.88, 1.06, 0),
        new THREE.Vector3(1.22, 1.13, 0),
        new THREE.Vector3(1.55, 0.95, 0),
        new THREE.Vector3(1.62, 0.62, 0),
        new THREE.Vector3(1.42, 0.34, 0),
        new THREE.Vector3(1.1, 0.26, 0),
        new THREE.Vector3(0.84, 0.3, 0),
      ]);
      const handle = new THREE.Mesh(new THREE.TubeGeometry(handleCurve, 80, 0.082, 18, false), creamMat);
      handle.scale.z = 1.45;
      cup.add(handle);
      [[0.88, 1.06], [0.84, 0.3]].forEach(([x, y]) => {
        const fl = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 14), creamMat);
        fl.position.set(x, y, 0);
        fl.scale.set(0.6, 1.1, 1.5);
        cup.add(fl);
      });
      const thumb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 18, 12), creamMat);
      thumb.position.set(1.3, 1.17, 0);
      thumb.scale.set(1.5, 0.55, 1.3);
      cup.add(thumb);

      const innerR = (y) => 0.78 + 0.075 * clamp01((y - 0.14) / 1.05);

      /* ---- saucer, open book, brass spoon, cinnamon ---- */
      const saucer = new THREE.Mesh(
        lathe([[0, -0.088], [0.7, -0.088], [0.78, -0.06], [1.38, 0.01], [1.46, 0.05], [1.43, 0.058], [1.34, 0.03], [0.92, -0.004], [0.8, -0.012], [0, -0.012]], 96),
        creamMat
      );
      cupG.add(saucer);

      const brass = new THREE.MeshStandardMaterial({ color: 0xc9a25a, metalness: 1, roughness: 0.32, envMapIntensity: 1 });
      const spoon = new THREE.Group();
      const sb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 16), brass);
      sb.scale.set(1, 0.25, 0.7);
      const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 1.0, 12), brass);
      sh.rotation.z = Math.PI / 2;
      sh.position.x = 0.62;
      spoon.add(sb, sh);
      spoon.position.set(1.9, TOP + 0.03, 1.5);
      spoon.rotation.y = -0.6;
      tableG.add(spoon);

      const cinMat = new THREE.MeshStandardMaterial({ color: 0x8a4a22, roughness: 0.85, bumpMap: noiseTex(2, 4, 90), bumpScale: 0.3 });
      [[2.3, -0.5, 0.4], [2.45, -0.3, -0.2], [2.2, -0.2, 0.9]].forEach(([x, z, r]) => {
        const s = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 14), cinMat);
        s.rotation.z = Math.PI / 2;
        s.rotation.y = r;
        s.position.set(x, TOP + 0.04, z);
        tableG.add(s);
      });

      const pageTex = mkTex(512, 700, (c, w, h) => {
        c.fillStyle = "#efe3cb";
        c.fillRect(0, 0, w, h);
        const g = c.createLinearGradient(0, 0, w, 0);
        g.addColorStop(0, "rgba(0,0,0,.18)");
        g.addColorStop(0.18, "rgba(0,0,0,0)");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
        c.fillStyle = "rgba(60,40,25,.55)";
        for (let y = 70; y < h - 60; y += 17) c.fillRect(70, y, (0.6 + Math.random() * 0.4) * (w - 130), 3.5);
      });
      const leather = new THREE.MeshStandardMaterial({ color: 0x2b1a10, roughness: 0.6 });
      const pageSide = new THREE.MeshStandardMaterial({ color: 0xe8dcc3, roughness: 0.9 });
      const pageTop = new THREE.MeshStandardMaterial({ map: pageTex, roughness: 0.9 });
      const half = new THREE.Group();
      const cov = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 1.1), leather);
      cov.position.set(0.4, 0.025, 0);
      const pg = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.1, 1.0), [pageSide, pageSide, pageTop, pageSide, pageSide, pageSide]);
      pg.position.set(0.39, 0.1, 0);
      half.add(cov, pg);
      half.rotation.z = -0.07;
      const half2 = half.clone();
      half2.rotation.set(0, Math.PI, -0.07);
      const book = new THREE.Group();
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.09, 0.025, 64, 8), brass);
      knot.position.set(0.75, 0.2, -0.2);
      book.add(half, half2, knot);
      book.position.set(-2.3, TOP + 0.05, -1.0);
      book.rotation.y = 0.5;
      tableG.add(book);

      /* ---- liquid layers (rippling surfaces) ---- */
      const espTex = mkTex(512, 512, (c, w, h) => {
        const g = c.createRadialGradient(256, 256, 0, 256, 256, 256);
        g.addColorStop(0, "#6b3a18");
        g.addColorStop(0.6, "#4a2610");
        g.addColorStop(0.9, "#2e170a");
        g.addColorStop(1, "#1d0e06");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
        for (let i = 0; i < 900; i++) {
          const a = Math.random() * 6.283, r = Math.random() * 250;
          c.fillStyle = `rgba(200,140,70,${Math.random() * 0.12})`;
          c.fillRect(256 + Math.cos(a) * r, 256 + Math.sin(a) * r, 2, 2);
        }
      });
      const milkTex = mkTex(512, 512, (c, w, h) => {
        const g = c.createRadialGradient(256, 256, 0, 256, 256, 256);
        g.addColorStop(0, "#e6ac6e");
        g.addColorStop(0.4, "#da9a5a");
        g.addColorStop(0.75, "#c4803f");
        g.addColorStop(0.9, "#a8632a");
        g.addColorStop(1, "#7a4219");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
        /* soft swirling crema bands */
        c.save();
        c.filter = "blur(5px)";
        c.lineCap = "round";
        for (let i = 0; i < 46; i++) {
          const r = 40 + Math.random() * 190, a0 = Math.random() * 6.283, len = 0.6 + Math.random() * 1.6;
          c.strokeStyle = i % 2 ? "rgba(255,226,186,.22)" : "rgba(110,54,18,.22)";
          c.lineWidth = 6 + Math.random() * 18;
          c.beginPath();
          c.arc(256 + (Math.random() - 0.5) * 20, 256 + (Math.random() - 0.5) * 20, r, a0, a0 + len);
          c.stroke();
        }
        c.restore();
        for (let i = 0; i < 1200; i++) {
          const a = Math.random() * 6.283, r = 205 + Math.random() * 50;
          c.fillStyle = `rgba(70,32,10,${0.1 + Math.random() * 0.2})`;
          c.beginPath();
          c.arc(256 + Math.cos(a) * r, 256 + Math.sin(a) * r, 0.8 + Math.random() * 1.8, 0, 6.283);
          c.fill();
        }
      });
      const artTex = mkTex(1024, 1024, (c) => {
        const heart = (cx, cy, w, h) => {
          c.beginPath();
          c.moveTo(cx, cy - h * 0.25);
          c.bezierCurveTo(cx - w * 0.1, cy - h * 0.55, cx - w * 0.55, cy - h * 0.5, cx - w * 0.5, cy - h * 0.1);
          c.bezierCurveTo(cx - w * 0.48, cy + h * 0.2, cx - w * 0.15, cy + h * 0.35, cx, cy + h * 0.55);
          c.bezierCurveTo(cx + w * 0.15, cy + h * 0.35, cx + w * 0.48, cy + h * 0.2, cx + w * 0.5, cy - h * 0.1);
          c.bezierCurveTo(cx + w * 0.55, cy - h * 0.5, cx + w * 0.1, cy - h * 0.55, cx, cy - h * 0.25);
          c.closePath();
        };
        c.filter = "blur(4px)";
        c.lineCap = "round";
        c.lineJoin = "round";
        const CX = 512;
        /* feathered wings that sweep up around the heart */
        c.strokeStyle = "#fff6e6";
        c.lineWidth = 30;
        for (let i = 0; i < 9; i++) {
          const t = i / 8;
          const y0 = 790 - i * 42;
          const s = 40 + 250 * Math.sin(Math.PI * Math.pow(t, 1.3));
          [-1, 1].forEach((d) => {
            c.beginPath();
            c.moveTo(CX, y0);
            c.bezierCurveTo(CX + d * s * 0.55, y0 + 28, CX + d * s * 1.05, y0 - 30, CX + d * s, y0 - 130);
            c.stroke();
          });
        }
        /* tapered tail */
        c.fillStyle = "#fff6e6";
        c.beginPath();
        c.moveTo(CX - 22, 790);
        c.quadraticCurveTo(CX, 880, CX + 22, 790);
        c.closePath();
        c.fill();
        /* brown spine splitting the leaf */
        c.strokeStyle = "rgba(176,104,50,.85)";
        c.lineWidth = 7;
        c.beginPath();
        c.moveTo(CX, 380);
        c.lineTo(CX, 810);
        c.stroke();
        /* the heart on top, ringed by a thin brown line */
        heart(CX, 335, 175, 155);
        c.strokeStyle = "rgba(176,104,50,.9)";
        c.lineWidth = 16;
        c.stroke();
        c.fillStyle = "#fffaf0";
        c.fill();
        heart(CX, 335, 70, 62);
        c.strokeStyle = "rgba(190,120,62,.8)";
        c.lineWidth = 5;
        c.stroke();
        c.filter = "none";
      });

      const surfGeo = () => {
        const g = new THREE.RingGeometry(0.001, 1, 64, 24);
        g.rotateX(-Math.PI / 2);
        return g;
      };
      const espresso = new THREE.Mesh(
        surfGeo(),
        new THREE.MeshStandardMaterial({ map: espTex, roughness: 0.3, envMapIntensity: 0.9 })
      );
      const milk = new THREE.Mesh(
        surfGeo(),
        new THREE.MeshStandardMaterial({ map: milkTex, roughness: 0.45, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 })
      );
      const art = new THREE.Mesh(
        surfGeo(),
        new THREE.MeshStandardMaterial({ map: artTex, roughness: 0.45, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 })
      );
      milk.renderOrder = 2;
      art.renderOrder = 3;
      cup.add(espresso, milk, art);
      const surfs = [espresso, milk, art];
      const surfBase = surfs.map((m) => m.geometry.attributes.position.array.slice());
      let rip = 0;

      /* ---- portafilter: chrome basket, single funnel spout, lugs, ribbed handle ---- */
      const machine = new THREE.Group();
      world.add(machine);
      const steel = new THREE.MeshStandardMaterial({
        color: 0xe2e4e8, metalness: 1, roughness: 0.16, envMap: metalEnv, envMapIntensity: 1.35, side: THREE.DoubleSide,
      });
      const dark = new THREE.MeshPhysicalMaterial({ color: 0x1b1410, roughness: 0.4, clearcoat: 0.5, clearcoatRoughness: 0.3 });
      const bowl = new THREE.Mesh(
        lathe([
          [0, -0.14], [0.2, -0.14], [0.34, -0.1], [0.52, 0.0], [0.78, 0.3], [0.88, 0.55], [0.9, 0.66], [0.93, 0.7],
          [0.94, 0.74], [0.9, 0.76], [0.85, 0.72], [0.82, 0.62], [0.76, 0.3], [0.52, 0.06], [0, 0.0],
        ], 80),
        steel
      );
      const bead = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.025, 10, 80), steel);
      bead.rotation.x = Math.PI / 2;
      bead.position.y = 0.52;
      const lugA = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.07, 0.24), steel);
      lugA.position.set(0, 0.64, 0.98);
      const lugB = lugA.clone();
      lugB.position.z = -0.98;
      const funnel = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.14, 0.24, 32), steel);
      funnel.position.y = -0.24;
      const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.1, 0.24, 28, 1, true), steel);
      spout.position.y = -0.46;
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 0.7, 24), steel);
      neck.rotation.z = -Math.PI / 2;
      neck.position.set(1.2, 0.4, 0);
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.1, 28), steel);
      collar.rotation.z = -Math.PI / 2;
      collar.position.set(1.55, 0.4, 0);
const handleWood = mkTex(512, 512, (c, w, h) => {
        const g = c.createLinearGradient(0, 0, w, 0);
        g.addColorStop(0, "#7a4727");
        g.addColorStop(0.5, "#8d5630");
        g.addColorStop(1, "#6e3f21");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
        for (let i = 0; i < 260; i++) {
          const x0 = Math.random() * w, dk = Math.random() < 0.6;
          c.strokeStyle = dk ? `rgba(45,22,8,${0.08 + Math.random() * 0.22})` : `rgba(205,150,95,${0.06 + Math.random() * 0.14})`;
          c.lineWidth = 0.6 + Math.random() * 2.4;
          c.beginPath();
          c.moveTo(x0, 0);
          for (let y = 0; y <= h; y += 24) c.lineTo(x0 + Math.sin(y * 0.02 + i) * 4, y);
          c.stroke();
        }
      });
      const woodMat = new THREE.MeshPhysicalMaterial({
        map: handleWood, roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.3, envMapIntensity: 0.8,
      });
      const hdl = new THREE.Mesh(
        lathe([[0, 0], [0.15, 0], [0.16, 0.05], [0.15, 0.3], [0.17, 0.8], [0.2, 1.3], [0.21, 1.65], [0.18, 1.88], [0.1, 1.97], [0, 2.0]], 48),
        woodMat
      );
      hdl.rotation.z = -Math.PI / 2 + 0.1;
      hdl.position.set(1.6, 0.4, 0);
      const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.12, 36), steel);
      ferrule.rotation.z = -Math.PI / 2;
      ferrule.position.set(1.64, 0.4, 0);
      const puckTex = noiseTex(2, 2, 120);
      const puckGeo = new THREE.SphereGeometry(0.8, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      puckGeo.scale(1, 0.2, 1);
      const puck = new THREE.Mesh(
        puckGeo,
        new THREE.MeshStandardMaterial({ color: 0x3d2112, bumpMap: puckTex, bumpScale: 2, roughness: 0.95 })
      );
      puck.position.y = 0.6;
      machine.add(bowl, bead, lugA, lugB, funnel, spout, neck, collar, ferrule, hdl, puck);
      machine.rotation.y = -0.5;

      const dotTex = mkTex(64, 64, (c, w, h) => {
        const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.5, "rgba(255,255,255,.55)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
      });

      /* Ground coffee falling into the basket */
      const NG = 1500;
      const gpos = new Float32Array(NG * 3);
      const gph = new Float32Array(NG);
      const grd = new Float32Array(NG);
      for (let i = 0; i < NG; i++) {
        gph[i] = Math.random();
        grd[i] = Math.random();
      }
      const ggeo = new THREE.BufferGeometry();
      ggeo.setAttribute("position", new THREE.BufferAttribute(gpos, 3));
      const ground = new THREE.Points(
        ggeo,
        new THREE.PointsMaterial({ color: 0x7a4421, size: 0.05, map: dotTex, transparent: true, depthWrite: false })
      );
      ground.frustumCulled = false;
      machine.add(ground);

      /* ---- steel milk pitcher with a pinched spout, rolled rim and tube handle ---- */
      const pitcherG = new THREE.Group();
      world.add(pitcherG);
      const pSteel = new THREE.MeshStandardMaterial({
        color: 0xe6e7ea, metalness: 1, roughness: 0.2, envMap: metalEnv, envMapIntensity: 1.3, side: THREE.DoubleSide,
      });
      const jugGeo = lathe([
        [0, 0], [0.48, 0], [0.56, 0.03], [0.6, 0.08], [0.68, 0.5], [0.74, 1.0], [0.75, 1.1], [0.74, 1.2], [0.72, 1.3],
        [0.76, 1.335], [0.76, 1.35], [0.73, 1.355], [0.7, 1.34], [0.69, 1.3], [0.7, 1.2], [0.71, 1.1], [0.72, 1.0],
        [0.66, 0.5], [0.52, 0.1], [0, 0.08],
      ], 96);
      const jp = jugGeo.attributes.position;
      for (let i = 0; i < jp.count; i++) {
        const x = jp.getX(i), y = jp.getY(i), z = jp.getZ(i);
        if (y > 1.0) {
          const t = clamp01((y - 1.0) / 0.35);
          const rr = Math.hypot(x, z) || 1;
          const a = Math.pow(Math.max(0, x / rr), 8);
          jp.setXYZ(i, x + 0.42 * t * t * a, y + 0.1 * t * t * a, z * (1 - 0.6 * t * a));
        }
      }
      jugGeo.computeVertexNormals();
      const jug = new THREE.Mesh(jugGeo, pSteel);
      const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.025, 8, 64), pSteel);
      baseRing.rotation.x = Math.PI / 2;
      baseRing.position.y = 0.05;
      const jhCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.72, 1.26, 0),
        new THREE.Vector3(-0.84, 1.55, 0),
        new THREE.Vector3(-1.08, 1.5, 0),
        new THREE.Vector3(-1.3, 0.98, 0),
        new THREE.Vector3(-1.22, 0.62, 0),
        new THREE.Vector3(-0.68, 0.55, 0),
      ], false, "catmullrom", 0.35);
      const jugHandle = new THREE.Mesh(new THREE.TubeGeometry(jhCurve, 72, 0.04, 14, false), pSteel);
      jugHandle.scale.z = 2.4;
      const jugG = new THREE.Group();
      jugG.add(jug, baseRing, jugHandle);
      jugG.position.set(-1.16, -1.44, 0); /* spout tip sits at the group origin */
      pitcherG.add(jugG);

      /* ---- physically shaped streams: thin as they fall, wobble, arc under gravity ---- */
      const GRAV = 6;
      const mkStream = (color, rough) => {
        const geo = new THREE.CylinderGeometry(1, 1, 1, 24, 28, true);
        const base = geo.attributes.position.array.slice();
        const m = new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({ color, roughness: rough, envMapIntensity: 1.1, side: THREE.DoubleSide })
        );
        m.visible = false;
        m.frustumCulled = false;
        world.add(m);
        return { m, geo, base };
      };
      const espS = mkStream(0x3b1a08, 0.2);
      const milkS = mkStream(0xf6e8d4, 0.25);
      const setStream = (S, x, top, bot, amt, r, vx, t) => {
        const m = S.m;
        if (amt < 0.02 || top - bot < 0.05) {
          m.visible = false;
          return;
        }
        m.visible = true;
        const h = top - bot;
        m.position.set(0, bot + h / 2, 0);
        m.scale.set(1, h, 1);
        const p = S.geo.attributes.position, b = S.base;
        for (let i = 0; i < p.count; i++) {
          const s = 0.5 - b[i * 3 + 1];
          const f = (r * amt) / Math.sqrt(1 + 2.4 * s);
          const off = vx * Math.sqrt((2 * s * h) / GRAV);
          const sx = Math.sin(t * 7 + s * 9) * 0.005 * s * amt;
          const sz = Math.cos(t * 6 + s * 7) * 0.004 * s * amt;
          p.setXYZ(i, x + off + b[i * 3] * f + sx, b[i * 3 + 1], b[i * 3 + 2] * f + sz);
        }
        p.needsUpdate = true;
      };

      /* ---- splash droplets thrown off where the stream hits the surface ---- */
      const NP = 90;
      const ppos = new Float32Array(NP * 3);
      const pang = new Float32Array(NP), pspd = new Float32Array(NP), pup = new Float32Array(NP), pph = new Float32Array(NP);
      for (let i = 0; i < NP; i++) {
        pang[i] = Math.random() * 6.283;
        pspd[i] = 0.15 + Math.random() * 0.45;
        pup[i] = 0.9 + Math.random() * 1.4;
        pph[i] = Math.random();
      }
      const pgeo = new THREE.BufferGeometry();
      pgeo.setAttribute("position", new THREE.BufferAttribute(ppos, 3));
      const splash = new THREE.Points(
        pgeo,
        new THREE.PointsMaterial({ color: 0x4a2410, size: 0.06, map: dotTex, transparent: true, depthWrite: false })
      );
      splash.frustumCulled = false;
      world.add(splash);

      /* ---- beans: ellipsoid with crease, pinched ends, flat back, organic wobble ---- */
      const beanGeo = (() => {
        const g = new THREE.SphereGeometry(1, 48, 32);
        const p = g.attributes.position;
        const col = new Float32Array(p.count * 3);
        for (let i = 0; i < p.count; i++) {
          const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
          const yc = Math.sin(x * 2.4) * 0.09;
          const d = y - yc;
          const w = Math.exp((-d * d) / 0.018) * Math.max(0, 1 - x * x);
          const org = 1 + 0.05 * Math.sin(x * 7 + y * 5) * Math.sin(z * 6 + 1);
          const nz = (z > 0 ? z * (1 - 0.62 * w) : z * 0.78) * org;
          p.setXYZ(i, x * org, y * (1 - 0.2 * x * x) * org, nz);
          const c = (z > 0 ? 1 - 0.6 * w : 0.9) * (0.88 + Math.random() * 0.12);
          col[i * 3] = c;
          col[i * 3 + 1] = c;
          col[i * 3 + 2] = c;
        }
        g.setAttribute("color", new THREE.BufferAttribute(col, 3));
        g.computeVertexNormals();
        return g;
      })();
      const beanMat = new THREE.MeshPhysicalMaterial({
        color: 0x5a3118, roughness: 0.45, clearcoat: 0.2, clearcoatRoughness: 0.5, vertexColors: true,
        bumpMap: noiseTex(3, 2, 110), bumpScale: 0.3, envMapIntensity: 0.9,
      });
      const tmpC = new THREE.Color();
      const dummy = new THREE.Object3D();
      const shade = (mesh, n) => {
        for (let i = 0; i < n; i++) {
          const l = 0.7 + Math.random() * 0.5;
          mesh.setColorAt(i, tmpC.setRGB(l, l * 0.95, l * 0.9));
        }
        mesh.instanceColor.needsUpdate = true;
      };

      const NB = 110;
      const beans = new THREE.InstancedMesh(beanGeo, beanMat, NB);
      beans.frustumCulled = false;
      /* ---- bean physics: gravity, bouncing, and solid collisions with the mug, handle, saucer, table and each other ---- */
      const BR = 0.095;
      const GRAVB = 9;
      const HR = 0.11;
      const polyPts = outerPts
        .map((p) => [p[0], p[1]])
        .concat([[0.87, MH], [0.86, MH - 0.05], [0.83, 0.5], [0.78, 0.18], [0.7, 0.1], [0, 0.09], [0, 0]]);
      const polyEdges = polyPts.map((a, i) => {
        const b = polyPts[(i + 1) % polyPts.length];
        return { a, b, axis: a[0] === 0 && b[0] === 0 };
      });
      const groundPts = [[0, -0.012], [0.8, -0.012], [0.92, -0.004], [1.34, 0.03], [1.43, 0.058], [1.465, 0.04], [1.52, TOP]];
      const groundH = (rho) => {
        if (rho >= 1.52) return TOP;
        for (let i = 1; i < groundPts.length; i++) {
          const a = groundPts[i - 1], b = groundPts[i];
          if (rho <= b[0]) return a[1] + ((b[1] - a[1]) * (rho - a[0])) / (b[0] - a[0]);
        }
        return TOP;
      };
      const handlePts = handleCurve.getPoints(20);
      const nrm = new THREE.Vector3();
      const tv = new THREE.Vector3();
      const tw = new THREE.Vector3();
      const qa = new THREE.Quaternion();
      const ax = new THREE.Vector3();
      const rnd = (a, b) => a + Math.random() * (b - a);

      const spawn = (b, stagger) => {
        const a = Math.random() * 6.283, rr = Math.sqrt(Math.random()) * 1.05;
        b.p.set(Math.cos(a) * rr, (stagger ? 1.8 : 4) + Math.random() * (stagger ? 4.5 : 2), Math.sin(a) * rr);
        b.v.set(rnd(-0.3, 0.3), -Math.random() * 0.6, rnd(-0.3, 0.3));
        b.w.set(rnd(-5, 5), rnd(-5, 5), rnd(-5, 5));
        b.q.setFromEuler(new THREE.Euler(rnd(0, 6.283), rnd(0, 6.283), rnd(0, 6.283)));
      };

      const B = [];
      for (let i = 0; i < NB; i++) {
        const b = {
          p: new THREE.Vector3(), v: new THREE.Vector3(), w: new THREE.Vector3(), q: new THREE.Quaternion(),
          sz: 0.85 + Math.random() * 0.3, r: 0, touch: false,
        };
        b.r = BR * b.sz;
        spawn(b, true);
        B.push(b);
      }

      /* resolve one contact: push out, bounce, friction, and roll */
      const hit = (b, n, depth, e, mu) => {
        b.p.addScaledVector(n, depth);
        const vn = b.v.dot(n);
        if (vn < 0) b.v.addScaledVector(n, -(1 + e) * vn);
        tv.copy(b.v).addScaledVector(n, -b.v.dot(n));
        b.v.addScaledVector(tv, -mu);
        tw.crossVectors(n, tv).multiplyScalar(1 / b.r);
        b.w.lerp(tw, 0.25);
        b.touch = true;
      };

      /* mug wall: closest point on the cup cross-section, revolved around the axis */
      const collideMug = (b) => {
        const rho = Math.hypot(b.p.x, b.p.z), y = b.p.y, r = b.r;
        if (rho > 1.1 + r || y > MH + r + 0.05) return;
        let best = 1e9, cx = 0, cy = 0, inside = false;
        for (let i = 0; i < polyEdges.length; i++) {
          const e = polyEdges[i], a = e.a, c = e.b;
          if ((a[1] > y) !== (c[1] > y) && rho < ((c[0] - a[0]) * (y - a[1])) / (c[1] - a[1]) + a[0]) inside = !inside;
          if (e.axis) continue;
          const dx = c[0] - a[0], dy = c[1] - a[1];
          const t = clamp01(((rho - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy));
          const px = a[0] + dx * t, py = a[1] + dy * t;
          const d2 = (rho - px) * (rho - px) + (y - py) * (y - py);
          if (d2 < best) { best = d2; cx = px; cy = py; }
        }
        const d = Math.sqrt(best);
        let nr, ny, depth;
        if (inside) {
          nr = cx - rho; ny = cy - y;
          const l = Math.hypot(nr, ny) || 1;
          nr /= l; ny /= l;
          depth = r + d;
        } else {
          if (d >= r) return;
          nr = (rho - cx) / (d || 1e-4); ny = (y - cy) / (d || 1e-4);
          depth = r - d;
        }
        const ux = rho > 1e-5 ? b.p.x / rho : 1, uz = rho > 1e-5 ? b.p.z / rho : 0;
        nrm.set(nr * ux, ny, nr * uz);
        hit(b, nrm, depth, 0.25, 0.05);
      };

      /* handle: a chain of spheres that turns with the mug */
      const collideHandle = (b, cs, sn) => {
        for (let i = 0; i < handlePts.length; i++) {
          const hp = handlePts[i];
          const dx = b.p.x - hp.x * cs, dy = b.p.y - hp.y, dz = b.p.z + hp.x * sn;
          const rr = HR + b.r, d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < rr * rr) {
            const d = Math.sqrt(d2) || 1e-4;
            nrm.set(dx / d, dy / d, dz / d);
            hit(b, nrm, rr - d, 0.25, 0.05);
          }
        }
      };

      /* saucer (with its raised rim) and the table top */
      const collideGround = (b) => {
        const x = b.p.x, z = b.p.z, rho = Math.hypot(x, z);
        if (rho > TR - 0.1) return;
        const h = groundH(rho);
        const r0 = Math.max(0, rho - 0.02), r1 = rho + 0.02;
        const slope = (groundH(r1) - groundH(r0)) / (r1 - r0);
        const ux = rho > 1e-5 ? x / rho : 1, uz = rho > 1e-5 ? z / rho : 0;
        nrm.set(-slope * ux, 1, -slope * uz).normalize();
        const depth = b.r - (b.p.y - h) * nrm.y;
        if (depth > 0 && b.p.y - h > -0.4) hit(b, nrm, depth, 0.3, 0.06);
      };

      const stepBeans = (dt) => {
        const sub = 3, h = dt / sub;
        const cs = Math.cos(cupG.rotation.y), sn = Math.sin(cupG.rotation.y);
        for (let s = 0; s < sub; s++) {
          for (let i = 0; i < NB; i++) {
            const b = B[i];
            b.v.y -= GRAVB * h;
            b.p.addScaledVector(b.v, h);
            b.touch = false;
          }
          /* bean against bean */
          for (let i = 0; i < NB; i++) {
            const a = B[i];
            for (let j = i + 1; j < NB; j++) {
              const c = B[j];
              const rr = a.r + c.r;
              const dx = c.p.x - a.p.x;
              if (dx > rr || dx < -rr) continue;
              const dy = c.p.y - a.p.y, dz = c.p.z - a.p.z;
              const d2 = dx * dx + dy * dy + dz * dz;
              if (d2 >= rr * rr || d2 === 0) continue;
              const d = Math.sqrt(d2);
              nrm.set(dx / d, dy / d, dz / d);
              const pen = (rr - d) * 0.5;
              a.p.addScaledVector(nrm, -pen);
              c.p.addScaledVector(nrm, pen);
              const vr = (c.v.x - a.v.x) * nrm.x + (c.v.y - a.v.y) * nrm.y + (c.v.z - a.v.z) * nrm.z;
              if (vr < 0) {
                const imp = -(1.2 * vr) * 0.5;
                a.v.addScaledVector(nrm, -imp);
                c.v.addScaledVector(nrm, imp);
              }
              a.v.multiplyScalar(0.999);
              c.v.multiplyScalar(0.999);
            }
          }
          /* bean against the world */
          for (let i = 0; i < NB; i++) {
            const b = B[i];
            collideMug(b);
            collideHandle(b, cs, sn);
            collideGround(b);
            if (b.touch) {
              b.v.multiplyScalar(0.99);
              b.w.multiplyScalar(0.97);
              if (b.v.lengthSq() < 0.004) b.v.multiplyScalar(0.3);
            } else b.w.multiplyScalar(0.999);
            const wl = b.w.length();
            if (wl > 1e-3) {
              if (wl > 14) b.w.multiplyScalar(14 / wl);
              qa.setFromAxisAngle(ax.copy(b.w).normalize(), Math.min(wl, 14) * h);
              b.q.premultiply(qa).normalize();
            }
            if (b.p.y < -8) spawn(b, false);
          }
        }
      };
      shade(beans, NB);
      world.add(beans);

      const NT = 26;
      const tBeans = new THREE.InstancedMesh(beanGeo, beanMat, NT);
      tBeans.frustumCulled = false;
      for (let i = 0; i < NT; i++) {
        const k = 0.105 + Math.random() * 0.02;
        const ta = 4.2 + Math.random() * 4.9, tr = 1.7 + Math.random() * 1.4;
        dummy.position.set(Math.cos(ta) * tr, -0.05, Math.sin(ta) * tr);
        dummy.rotation.set(-Math.PI / 2, 0, Math.random() * 6.283);
        dummy.scale.set(k, k * 0.7, k * 0.5);
        dummy.updateMatrix();
        tBeans.setMatrixAt(i, dummy.matrix);
      }
      shade(tBeans, NT);
      world.add(tBeans);

      /* ---- steam (soft, wispy, fades into the void on exit) ---- */
      const NS = 140;
      const spos = new Float32Array(NS * 3);
      const scol = new Float32Array(NS * 3);
      const sph = new Float32Array(NS);
      for (let i = 0; i < NS; i++) sph[i] = Math.random();
      const sgeo = new THREE.BufferGeometry();
      sgeo.setAttribute("position", new THREE.BufferAttribute(spos, 3));
      sgeo.setAttribute("color", new THREE.BufferAttribute(scol, 3));
      const steam = new THREE.Points(
        sgeo,
        new THREE.PointsMaterial({
          map: dotTex, size: 0.55, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        })
      );
      steam.frustumCulled = false;
      world.add(steam);

      /* ---- floating motes ---- */
      const NM = 200;
      const mp = new Float32Array(NM * 3);
      for (let i = 0; i < NM; i++) {
        mp[i * 3] = (Math.random() - 0.5) * 14;
        mp[i * 3 + 1] = (Math.random() - 0.5) * 12 + 1.5;
        mp[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      }
      const mg = new THREE.BufferGeometry();
      mg.setAttribute("position", new THREE.BufferAttribute(mp, 3));
      const motes = new THREE.Points(
        mg,
        new THREE.PointsMaterial({ color: 0xffd9a8, size: 0.05, map: dotTex, transparent: true, opacity: 0.45, depthWrite: false })
      );
      motes.frustumCulled = false;
      scene.add(motes);

      /* ---------- keyframes (desktop and mobile) ---------- */
      const frames = () => {
        const mob = isMob();
        const asp = innerWidth / innerHeight;
        return FR.map((f) => {
          const o = { ...D, ...f };
          if (!mob) return o;
          const props = o.my < 6 || o.pxo > -5;
          o.fx = 0;
          o.bsp *= 0.6;
          let cz = Math.max(o.cz * 1.15, 2.35 / (TAN * asp));
          if (props) cz *= 1.15;
          o.cz = cz;
          o.sy = 0.46 * cz * TAN;
          return o;
        });
      };

      const st = { ...D, ...FR[0] };
      const metrics = { pos: [0, 1, 2, 3, 4, 5, 6], total: 1 };
      let tl;
      const build = () => {
        if (tl) {
          tl.scrollTrigger && tl.scrollTrigger.kill();
          tl.kill();
        }
        const K = frames();
        Object.assign(st, K[0]);
        const jr = document.getElementById("journey");
        const top0 = jr.getBoundingClientRect().top + scrollY;
        const topOf = (id) => document.getElementById(id).getBoundingClientRect().top + scrollY - top0;
        const total = Math.max(1, jr.offsetHeight - innerHeight);
        const pos = [0, topOf("beans"), topOf("grind"), topOf("extract"), topOf("pour"), topOf("art"), total];
        for (let i = 1; i < pos.length; i++) if (pos[i] <= pos[i - 1]) pos[i] = pos[i - 1] + 1;
        metrics.pos = pos;
        metrics.total = total;
        tl = gsap.timeline({
          defaults: { ease: "sine.inOut" },
          scrollTrigger: { trigger: "#journey", start: "top top", end: "bottom bottom", scrub: reduce ? true : 2 },
        });
        K.slice(1).forEach((k, i) => {
          tl.to(st, { ...k, duration: pos[i + 1] - pos[i] }, pos[i]);
        });
      };
      build();

      const intro = { v: 1 };
      const introTween = gsap.to(intro, { v: 0, duration: reduce ? 0.01 : 2.4, ease: "power3.out", delay: 0.1 });

      const exit = { v: 0 };
      const exitTween = gsap.to(exit, {
        v: 1,
        ease: "none",
        scrollTrigger: { trigger: "#menu", start: "top 100%", end: "top 12%", scrub: true },
      });

      let pmx = 0, pmy = 0, pmtx = 0, pmty = 0;
      const onMove = (e) => {
        pmtx = e.clientX / innerWidth - 0.5;
        pmty = e.clientY / innerHeight - 0.5;
      };
      addEventListener("pointermove", onMove, { passive: true });

      let lastW = innerWidth, wasMob = isMob(), rz;
      const sizeNow = () => {
        renderer.setPixelRatio(Math.min(devicePixelRatio, isMob() ? 1.5 : 2));
        renderer.setSize(innerWidth, innerHeight, false);
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
      };
      const resize = () => {
        sizeNow();
        clearTimeout(rz);
        rz = setTimeout(() => {
          if (innerWidth !== lastW || isMob() !== wasMob) {
            lastW = innerWidth;
            wasMob = isMob();
            build();
          }
          ScrollTrigger.refresh();
        }, 220);
      };
      addEventListener("resize", resize);
      sizeNow();
      const onLoad = () => ScrollTrigger.refresh();
      addEventListener("load", onLoad);

      let vis = true;
      const onVis = () => (vis = !document.hidden);
      document.addEventListener("visibilitychange", onVis);

      const v3 = new THREE.Vector3();
      const tgt = new THREE.Vector3();
      let firstFrame = true, pinsOff = false, lastStep = -2, beansOff = false, lastT = 0;
      const root = rootRef.current;
      const MILK_VX = 0.55;

      renderer.setAnimationLoop((ms) => {
        if (!vis) return;
        const t = ms / 1000;
        const dtP = Math.min(0.033, Math.max(0, t - lastT));
        lastT = t;
        const ex = exit.v;
        const gone = Math.pow(ex, 1.4);
        pmx += (pmtx - pmx) * 0.05;
        pmy += (pmty - pmy) * 0.05;

        /* camera */
        const hw = st.cz * TAN * camera.aspect;
        const se = Math.sin(st.el), ce = Math.cos(st.el);
        tgt.set(0, st.ty - ce * st.sy, se * st.sy);
        camera.position.set(tgt.x + pmx * 0.3, tgt.y + st.cz * se - pmy * 0.15, tgt.z + st.cz * ce);
        camera.lookAt(tgt);
        camera.updateMatrixWorld();

        world.position.x = st.fx * hw;
        world.scale.setScalar(Math.max(st.s * (1 - 0.1 * intro.v), 0.0001));

        /* mug */
        cupG.visible = gone < 0.99;
        cupG.position.y = ex * 1.3;
        cupG.scale.setScalar(Math.max(1 - gone, 0.0001));
        cupG.rotation.y = st.ry + (reduce ? 0 : Math.sin(t * 0.4) * 0.12) + pmx * 0.2 + intro.v * 1.2 + ex * 3;
        tableG.visible = ex < 0.9;
        tableG.scale.setScalar(Math.max(1 - ex * 1.1, 0.0001));
        shadow.material.opacity = 1 - ex;
        tBeans.scale.setScalar(Math.max(1 - ex * 1.6, 0.0001));
        tBeans.visible = ex < 0.62;

        /* what is pouring right now */
        const arr = clamp01((st.pxo + 3.45) / 3.0);
        const gate = clamp01((arr - 0.75) / 0.25);
        const milkAmt = st.ms * gate;
        const surf = st.lv;
        const topE = st.my - 0.58;
        const hasE = st.es > 0.05 && topE - surf > 0.1;
        const hasM = milkAmt > 0.05;
        const milkLand = st.pxo + MILK_VX * Math.sqrt((2 * Math.max(0.1, 2.55 - surf)) / GRAV);

        /* liquid layers with ripples radiating from the impact point */
        const show = st.lv > 0.12;
        espresso.visible = show;
        milk.visible = show && st.mk > 0.01;
        art.visible = show && st.art > 0.01;
        if (show) {
          const r = innerR(st.lv) - 0.015;
          espresso.position.y = st.lv;
          milk.position.y = st.lv + 0.003;
          art.position.y = st.lv + 0.006;
          [espresso, milk, art].forEach((m) => m.scale.set(r, 1, r));
          milk.material.opacity = st.mk;
          art.material.opacity = st.art;
          const tgtAmp = hasE ? 0.012 : hasM ? 0.016 : 0;
          rip += (tgtAmp - rip) * 0.025;
          if (rip > 0.002) {
            const ox = hasM ? Math.max(-0.35, Math.min(0.35, milkLand)) : 0;
            for (let s = 0; s < 3; s++) {
              const pa = surfs[s].geometry.attributes.position, bb = surfBase[s];
              for (let i = 0; i < pa.count; i++) {
                const x = bb[i * 3], z = bb[i * 3 + 2];
                const d = Math.hypot(x - ox, z);
                pa.setY(i, rip * Math.sin(9 * d * r - t * 3.5) * Math.exp(-2.4 * d) * (1 - 0.4 * d));
              }
              pa.needsUpdate = true;
              surfs[s].geometry.computeVertexNormals();
            }
          } else if (rip > 0) {
            rip = 0;
            surfs.forEach((m) => {
              const pa = m.geometry.attributes.position;
              for (let i = 0; i < pa.count; i++) pa.setY(i, 0);
              pa.needsUpdate = true;
              m.geometry.computeVertexNormals();
            });
          }
        }

        /* portafilter, grounds */
        machine.position.y = st.my;
        machine.visible = st.my < 6.5;
        puck.visible = st.fill > 0.02;
        puck.scale.set(st.fill, 1, st.fill);
        if (st.grind > 0.01 && machine.visible) {
          ground.visible = true;
          ground.material.opacity = st.grind;
          for (let i = 0; i < NG; i++) {
            const f = frac(t * 0.45 + gph[i]);
            const rad = (0.1 + 0.75 * grd[i]) * (0.35 + 0.65 * (1 - f));
            const a = gph[i] * 6.283 + t * 2 + f * 3;
            gpos[i * 3] = Math.cos(a) * rad;
            gpos[i * 3 + 1] = 0.65 + 2.4 * (1 - f);
            gpos[i * 3 + 2] = Math.sin(a) * rad;
          }
          ggeo.attributes.position.needsUpdate = true;
        } else ground.visible = false;

        /* ONE combined espresso stream from the single funnel spout */
        setStream(espS, 0, topE, surf, hasE ? st.es : 0, 0.075, 0, t);

        /* pitcher + milk stream arcing out of the spout */
        pitcherG.position.set(st.pxo, 2.55, 0);
        pitcherG.rotation.z = -st.pt * gate * 0.95;
        pitcherG.visible = st.pxo > -8;
        setStream(milkS, st.pxo, 2.55, surf, milkAmt, 0.09, MILK_VX, t);

        /* splash droplets: ballistic arcs from the impact point */
        const splAmt = Math.max(hasE ? st.es : 0, milkAmt);
        if (splAmt > 0.1 && show) {
          splash.visible = true;
          splash.material.color.setHex(hasM ? 0xfff0dc : 0x4a2410);
          const sx = hasM ? milkLand : 0;
          for (let i = 0; i < NP; i++) {
            const tau = frac(t * 1.5 + pph[i]) * 0.45;
            const hy = pup[i] * tau - 0.5 * 5 * tau * tau;
            const rad = pspd[i] * tau * 2;
            ppos[i * 3] = sx + Math.cos(pang[i]) * rad;
            ppos[i * 3 + 1] = surf + Math.max(0, hy);
            ppos[i * 3 + 2] = Math.sin(pang[i]) * rad;
          }
          pgeo.attributes.position.needsUpdate = true;
        } else splash.visible = false;

        /* beans: simulated physics, they fall, bounce, roll and pile up inside the mug */
        if (st.bsc > 0.02) {
          if (beansOff) {
            B.forEach((b) => spawn(b, true));
            beansOff = false;
          }
          stepBeans(dtP);
          beans.visible = true;
          const k0 = Math.min(1, st.bsc);
          for (let i = 0; i < NB; i++) {
            const b = B[i];
            dummy.position.copy(b.p);
            dummy.quaternion.copy(b.q);
            const k = k0 * b.sz;
            dummy.scale.set(0.115 * k, 0.08 * k, 0.058 * k);
            dummy.updateMatrix();
            beans.setMatrixAt(i, dummy.matrix);
          }
          beans.instanceMatrix.needsUpdate = true;
        } else {
          beans.visible = false;
          beansOff = true;
        }

        /* steam: buoyant, turbulent, only from a filled mug; thins and drifts away on exit */
        const filled = clamp01((st.lv - 0.55) / 0.4);
        const puff = Math.sin(Math.min(1, ex) * Math.PI) * 0.75;
        const sAmt = st.stm * filled * (1 - ex) + puff * filled;
        steam.position.y = MH + ex * 1.3;
        if (sAmt > 0.02) {
          steam.visible = true;
          for (let i = 0; i < NS; i++) {
            const f = frac(t * 0.1 + sph[i]);
            const spread = (0.15 + f * f * 0.6) * (1 + ex * 5);
            const rise = (f + 0.35 * f * f) * (1.4 + ex * 3.5);
            spos[i * 3] = Math.sin(t * 0.6 + sph[i] * 9 + f * 5) * spread + Math.sin(t * 1.7 + sph[i] * 31) * 0.04 * f;
            spos[i * 3 + 1] = rise;
            spos[i * 3 + 2] = Math.cos(t * 0.5 + sph[i] * 7 + f * 4) * spread;
            const c = 0.2 * sAmt * Math.pow(Math.sin(f * Math.PI), 1.3);
            scol[i * 3] = c;
            scol[i * 3 + 1] = c * 0.95;
            scol[i * 3 + 2] = c * 0.88;
          }
          sgeo.attributes.position.needsUpdate = true;
          sgeo.attributes.color.needsUpdate = true;
        } else steam.visible = false;

        motes.rotation.y = t * 0.015;
        motes.position.y = scrollY * 0.0007;

        /* warm halo follows the mug */
        v3.set(world.position.x, 0.7 * st.s, 0);
        v3.project(camera);
        root.style.setProperty("--hx", ((v3.x * 0.5 + 0.5) * 100).toFixed(1) + "%");
        root.style.setProperty("--hy", ((-v3.y * 0.5 + 0.5) * 100).toFixed(1) + "%");

        /* latte-art pins */
        if (st.h > 0.01 && cupG.visible && gone < 0.5) {
          pinsOff = false;
          world.updateMatrixWorld(true);
          for (let i = 0; i < PINS.length; i++) {
            const el = pinEls.current[i];
            if (!el) continue;
            v3.set(PINS[i].p[0], PINS[i].p[1], PINS[i].p[2]);
            cup.localToWorld(v3);
            v3.project(camera);
            el.style.opacity = (st.h * (1 - ex * 2)).toFixed(3);
            el.style.transform = `translate3d(${((v3.x * 0.5 + 0.5) * innerWidth).toFixed(1)}px,${((-v3.y * 0.5 + 0.5) * innerHeight).toFixed(1)}px,0) translate(-50%,-50%)`;
          }
        } else if (!pinsOff) {
          pinsOff = true;
          pinEls.current.forEach((el) => el && (el.style.opacity = "0"));
        }

        /* progress bar + step rail */
        const prog = Math.min(1, Math.max(0, scrollY / metrics.total));
        if (barRef.current) barRef.current.style.transform = `scaleX(${prog.toFixed(4)})`;
        if (railRef.current) railRef.current.style.opacity = String(Math.max(0, 1 - ex * 2.5));
        let k = -1;
        for (let i = 1; i < metrics.pos.length; i++) if (scrollY >= metrics.pos[i] - innerHeight * 0.45) k = i - 1;
        if (k !== lastStep) {
          lastStep = k;
          setStep(k);
        }

        renderer.render(scene, camera);
        if (firstFrame) {
          firstFrame = false;
          setReady(true);
        }
      });

      cleanup = () => {
        renderer.setAnimationLoop(null);
        clearTimeout(rz);
        removeEventListener("pointermove", onMove);
        removeEventListener("resize", resize);
        removeEventListener("load", onLoad);
        document.removeEventListener("visibilitychange", onVis);
        introTween.kill();
        exitTween.scrollTrigger && exitTween.scrollTrigger.kill();
        exitTween.kill();
        if (tl) {
          tl.scrollTrigger && tl.scrollTrigger.kill();
          tl.kill();
        }
        if (tick) gsap.ticker.remove(tick);
        if (lenis) lenis.destroy();
        lenisRef.current = null;
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        });
        texs.forEach((x) => x.dispose());
        renderer.dispose();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  /* ================= Markup ================= */
  return (
    <div ref={rootRef} className={"app " + (nogl ? "nogl " : "") + (ready ? "ready" : "")}>
      <style>{CSS}</style>

      <div id="halo" />
      <canvas id="gl" ref={canvasRef} aria-hidden="true" />
      <div className="pbar" ref={barRef} />

      <div className="pins" aria-hidden="true">
        {PINS.map((_, i) => (
          <div key={i} className="pin" ref={(el) => (pinEls.current[i] = el)}>
            <b>{i + 1}</b>
          </div>
        ))}
      </div>

      <nav className="glass">
        <a className="logo" href="#top" onClick={(e) => go(e, "#top")}>Ember<i>&amp;</i>Crema</a>
        <ul>
          <li><a href="#beans" onClick={(e) => go(e, "#beans")}>The brew</a></li>
          <li><a href="#art" onClick={(e) => go(e, "#art")}>Latte art</a></li>
          <li><a href="#menu" onClick={(e) => go(e, "#menu")}>Menu</a></li>
          <li><a href="#visit" onClick={(e) => go(e, "#visit")}>Visit</a></li>
        </ul>
        <button className="cart" onClick={openCart} aria-label="Your order">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8zM17 10h1.5a2.5 2.5 0 010 5H17M7 3v2M11 3v2M15 3v2" />
          </svg>
          Order · {count}
        </button>
      </nav>

      <div className="rail glass" ref={railRef} aria-hidden="true">
        {RAIL.map((r, i) => (
          <span key={r} className={step === i ? "on" : ""}>{r}</span>
        ))}
      </div>

      <main id="journey">
        <section className="panel hero" id="top">
          <div className="copy glass">
            <p className="eyebrow reveal">Small-batch roastery · Poured by hand</p>
            <h1 className="reveal" style={{ "--d": 1 }}>Every cup has a <em>story.</em></h1>
            <p className="reveal" style={{ "--d": 2 }}>
              Scroll down and watch one being made, from the first bean to the last drop of foam.
            </p>
            <a className="btn reveal" style={{ "--d": 3 }} href="#beans" onClick={(e) => go(e, "#beans")}>
              Start the brew
            </a>
            <div className="hint reveal" style={{ "--d": 4 }}><i /> Scroll to brew</div>
          </div>
        </section>

        {STEPS.map((s) => (
          <section key={s.id} className="panel" id={s.id}>
            <div className={"copy glass " + (s.side === "r" ? "r" : "")}>
              <div className="no reveal">{s.no}</div>
              <h2 className="reveal" style={{ "--d": 1 }}>{s.t} <em>{s.em}</em></h2>
              <p className="reveal" style={{ "--d": 2 }}>{s.p}</p>
              {s.list && (
                <ol className="plist reveal" style={{ "--d": 3 }}>
                  {s.list.map((x, i) => (
                    <li key={x}><b>{i + 1}</b><span>{x}</span></li>
                  ))}
                </ol>
              )}
              <div className="chips reveal" style={{ "--d": 3 }}>
                {s.chips.map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
              {s.cta && (
                <a className="btn reveal" style={{ "--d": 4 }} href="#menu" onClick={(e) => go(e, "#menu")}>
                  See the menu
                </a>
              )}
            </div>
          </section>
        ))}
      </main>

      <section id="menu">
        <div className="mhead">
          <p className="eyebrow reveal">The menu</p>
          <h2 className="reveal" style={{ "--d": 1 }}>Pick your <em>cup.</em></h2>
          <p className="reveal" style={{ "--d": 2 }}>Every drink starts with the same careful steps you just watched.</p>
        </div>
        <div className="mgrid">
          {MENU.map((m, i) => (
            <article key={m.n} className="mcard glass reveal" style={{ "--d": i }}>
              <h3>{m.n}</h3>
              <p>{m.d}</p>
              <div className="mrow">
                <span className="price">${m.p.toFixed(2)}</span>
                <button className="btn" onClick={() => add(m.n)}>Add</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="glass" id="visit">
        <div className="fgrid">
          <div>
            <a className="logo" href="#top" onClick={(e) => go(e, "#top")} style={{ display: "inline-block", marginBottom: "1rem" }}>
              Ember<i>&amp;</i>Crema
            </a>
            <h4>Get a free first coffee</h4>
            <div className="nl">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && join()}
              />
              <button className="btn" onClick={join}>Subscribe</button>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="#beans" onClick={(e) => go(e, "#beans")}>The brew</a>
            <a href="#art" onClick={(e) => go(e, "#art")}>Latte art</a>
            <a href="#menu" onClick={(e) => go(e, "#menu")}>Menu</a>
          </div>
          <div>
            <h4>Follow</h4>
            <a href="https://instagram.com" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com" rel="noopener noreferrer">TikTok</a>
            <a href="https://pinterest.com" rel="noopener noreferrer">Pinterest</a>
          </div>
        </div>
        <p className="legal">© 2026 Ember &amp; Crema. Made slowly, on purpose.</p>
      </footer>

      <div id="toast" className={"glass " + (toast.on ? "on" : "")} role="status" aria-live="polite">
        {toast.msg}
      </div>
    </div>
  );
}