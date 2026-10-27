import { useEffect, useRef, useState, useCallback } from "react";

/* ------------------------------------------------------------------
   EMBER & CREMA — a coffee that makes itself as you scroll
   Single-file React version. Paste into src/App.js.
   Three.js, GSAP, ScrollTrigger and Lenis load from CDNs, no installs.

   Scroll story: beans > grind > extract > pour > latte art (top view)
   > serve > the cup dissolves into steam before the menu.
   UI language: glassmorphism (frosted cream glass over roasted browns).
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
    p: "Porcelain cup, saucer and spoon. Take a breath before the first sip.",
    chips: ["Porcelain cup", "Made to stay"], cta: true,
  },
];
const RAIL = ["Beans", "Grind", "Extract", "Pour", "Art", "Serve"];

const MENU = [
  { n: "Espresso", d: "A double shot with a golden crema.", p: 3.5 },
  { n: "Flat White", d: "Velvet milk poured over two shots.", p: 4.5 },
  { n: "Latte", d: "Soft and milky, with a heart on top.", p: 5 },
  { n: "Cappuccino", d: "Espresso, steamed milk and a cloud of foam.", p: 4.5 },
];

/* Numbered pins on the latte art (coordinates inside the cup) */
const PINS = [
  { p: [0.0, 0.91, -0.05] },
  { p: [0.86, 0.91, 0.2] },
  { p: [0.0, 0.91, 0.62] },
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
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:40;opacity:.06;
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
   Order: hero, beans, grind, extract, pour, art (top view), serve.
   fx  : horizontal position of the cup as a fraction of half the screen width
   el  : camera elevation (radians), ~1.4 is looking straight down
   bsp/bsc : bean cloud spread / bean size   my : portafilter height
   pxo/pt  : milk pitcher x / tilt           lv : liquid level
   mk/art  : milk layer and latte art fade   grind/fill : coffee grounds
   stm : steam   es/ms : espresso / milk streams   h : latte-art pins */
const D = {
  fx: 0.5, ty: 0.55, cz: 7.4, el: 0.2, sy: 0, s: 1, ry: 0,
  bsp: 4, bsc: 0, bx: 0, by: 1.5,
  my: 7, pxo: -9, pt: 0,
  lv: 0, mk: 0, art: 0, grind: 0, fill: 0, stm: 0, es: 0, ms: 0, h: 0,
};
const FR = [
  { fx: 0.5, ty: 0.5, cz: 7.4, el: 0.22, ry: -0.5, bsp: 4.2, bsc: 0.8, by: 1.5 },
  { fx: -0.5, ty: 0.9, cz: 7, el: 0.28, ry: 0.3, bsp: 1.6, bsc: 1.7, by: 1.9, s: 0.9 },
  { fx: 0.5, ty: 1.7, cz: 9.4, el: 0.22, ry: 0.2, bsp: 0.4, bsc: 0, by: 2.4, my: 3.1, grind: 1, fill: 1, s: 0.9 },
  { fx: -0.5, ty: 1.5, cz: 8.2, el: 0.22, ry: 0.1, my: 2.35, fill: 1, lv: 0.36, es: 1 },
  { fx: 0.5, ty: 1.35, cz: 8.2, el: 0.3, ry: 0, pxo: -0.1, pt: 1, lv: 0.9, mk: 1, ms: 1, stm: 0.45 },
  { fx: -0.35, ty: 0.9, cz: 5.4, el: 1.42, ry: 0, lv: 0.9, mk: 1, art: 1, stm: 0.3, h: 1 },
  { fx: 0.5, ty: 0.55, cz: 7.6, el: 0.2, ry: 0.9, lv: 0.9, mk: 1, art: 1, stm: 1 },
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
        lenis = new Lenis();
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
      renderer.toneMappingExposure = 1.05;
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
      envPanel(9, 4, 0, 6, 0, 0xfff1dc, 5);
      envPanel(2, 8, -6, 1, 3, 0xffe2b8, 5);
      envPanel(2, 8, 6, 1, -2, 0xffd2a0, 3);
      envPanel(10, 3, 0, 0, -7, 0xffc890, 2.5);
      envPanel(4, 5, 3, 2, 6, 0xffffff, 2.5);
      const pm = new THREE.PMREMGenerator(renderer);
      scene.environment = pm.fromScene(es, 0.02).texture;
      pm.dispose();

      const key = new THREE.DirectionalLight(0xffe2bd, 1.5);
      key.position.set(3, 6, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffa860, 1.1);
      rim.position.set(-4, 3, -3);
      scene.add(rim);
      scene.add(new THREE.AmbientLight(0xffffff, 0.14));

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
      const lathe = (pts, seg = 96) =>
        new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), seg);
      const flat = (r, seg = 64) => {
        const g = new THREE.CircleGeometry(r, seg);
        g.rotateX(-Math.PI / 2);
        return g;
      };

      const world = new THREE.Group();
      scene.add(world);

      /* ---- wooden table that fades into the dark ---- */
      const woodTex = mkTex(1024, 1024, (c, w, h) => {
        const g = c.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, "#5a3419");
        g.addColorStop(0.5, "#6d4223");
        g.addColorStop(1, "#4a2a14");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
        for (let i = 0; i < 280; i++) {
          const y = Math.random() * h;
          c.strokeStyle = `rgba(${(20 + Math.random() * 30) | 0},${(10 + Math.random() * 15) | 0},5,${0.05 + Math.random() * 0.14})`;
          c.lineWidth = 0.5 + Math.random() * 2.5;
          c.beginPath();
          c.moveTo(0, y);
          for (let x = 0; x <= w; x += 64) c.lineTo(x, y + Math.sin(x * 0.01 + i) * 6 + Math.random() * 1.5);
          c.stroke();
        }
        c.strokeStyle = "rgba(10,5,2,.55)";
        c.lineWidth = 3;
        [h * 0.33, h * 0.66].forEach((y) => {
          c.beginPath();
          c.moveTo(0, y);
          c.lineTo(w, y);
          c.stroke();
        });
      });
      const fadeTex = mkTex(256, 256, (c, w, h) => {
        const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
        g.addColorStop(0, "#fff");
        g.addColorStop(0.42, "#fff");
        g.addColorStop(1, "#000");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
      }, false);
      const table = new THREE.Mesh(
        flat(7, 64),
        new THREE.MeshStandardMaterial({ map: woodTex, alphaMap: fadeTex, transparent: true, roughness: 0.6, envMapIntensity: 0.5 })
      );
      table.position.y = -0.02;
      world.add(table);

      const shTex = mkTex(256, 256, (c, w, h) => {
        const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
        g.addColorStop(0, "rgba(0,0,0,.75)");
        g.addColorStop(0.55, "rgba(0,0,0,.4)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
      });
      const shadow = new THREE.Mesh(
        flat(2.7, 48),
        new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false })
      );
      shadow.position.y = -0.01;
      world.add(shadow);

      /* ---- the porcelain cup, saucer and spoon ---- */
      const cupG = new THREE.Group();
      world.add(cupG);
      const cup = new THREE.Group();
      cup.position.y = 0.11;
      cupG.add(cup);

      const porcelain = new THREE.MeshPhysicalMaterial({
        color: 0xf6f1e8,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.25,
        side: THREE.DoubleSide,
      });
      const steel = new THREE.MeshStandardMaterial({
        color: 0xdcdce0, metalness: 1, roughness: 0.22, envMapIntensity: 1.5, side: THREE.DoubleSide,
      });

      const body = new THREE.Mesh(
        lathe([
          [0, 0], [0.46, 0], [0.5, 0.025], [0.52, 0.07], [0.62, 0.19], [0.8, 0.5], [0.97, 0.84], [1.045, 0.98], [1.06, 1.0],
          [1.065, 1.012], [1.05, 1.028], [1.02, 1.03], [1.0, 1.015], [0.995, 1.0],
          [0.97, 0.95], [0.84, 0.55], [0.66, 0.22], [0.45, 0.1], [0, 0.08],
        ]),
        porcelain
      );
      cup.add(body);

      const handleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.92, 0.84, 0),
        new THREE.Vector3(1.28, 0.93, 0),
        new THREE.Vector3(1.58, 0.74, 0),
        new THREE.Vector3(1.56, 0.46, 0),
        new THREE.Vector3(1.18, 0.3, 0),
        new THREE.Vector3(0.68, 0.3, 0),
      ]);
      const handle = new THREE.Mesh(new THREE.TubeGeometry(handleCurve, 48, 0.068, 14, false), porcelain);
      handle.scale.z = 0.85;
      cup.add(handle);

      const saucer = new THREE.Mesh(
        lathe([
          [0, 0], [0.75, 0], [1.2, 0.03], [1.62, 0.12], [1.74, 0.18], [1.78, 0.2], [1.74, 0.215], [1.66, 0.2],
          [1.25, 0.11], [0.98, 0.1], [0.82, 0.13], [0.74, 0.115], [0, 0.11],
        ]),
        porcelain
      );
      cupG.add(saucer);

      const spoon = new THREE.Group();
      const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.24, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), steel);
      bowl.rotation.x = Math.PI;
      bowl.scale.set(1.35, 0.8, 1);
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.025, 1.3, 16), steel);
      shaft.rotation.z = -Math.PI / 2;
      shaft.position.set(0.9, 0.02, 0);
      spoon.add(bowl, shaft);
      spoon.position.set(-1.02, 0.31, 0.95);
      spoon.rotation.y = 0.18;
      cupG.add(spoon);

      /* ---- liquid layers inside the cup ---- */
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
        g.addColorStop(0, "#f0d3a8");
        g.addColorStop(0.45, "#e2b883");
        g.addColorStop(0.78, "#c88c52");
        g.addColorStop(0.92, "#9a5a28");
        g.addColorStop(1, "#6e3a16");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
        for (let i = 0; i < 1500; i++) {
          const a = Math.random() * 6.283, r = 195 + Math.random() * 60;
          c.fillStyle = `rgba(70,32,10,${0.15 + Math.random() * 0.25})`;
          c.beginPath();
          c.arc(256 + Math.cos(a) * r, 256 + Math.sin(a) * r, 0.8 + Math.random() * 2, 0, 6.283);
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
        c.filter = "blur(2px)";
        const W = 720, H = 660, cx = 512, cy = 520;
        for (let i = 0; i < 7; i++) {
          const k = 1 - i * 0.135;
          heart(cx, cy, W * k, H * k);
          c.fillStyle = i % 2 === 0 ? "#fff6e8" : "rgba(176,104,50,.92)";
          c.fill();
        }
        c.strokeStyle = "rgba(150,86,40,.92)";
        c.lineWidth = 9;
        c.lineCap = "round";
        c.beginPath();
        c.moveTo(cx, cy - H * 0.3);
        c.lineTo(cx, cy + H * 0.5);
        c.stroke();
        c.filter = "none";
      });

      const espresso = new THREE.Mesh(
        flat(1, 64),
        new THREE.MeshStandardMaterial({ map: espTex, roughness: 0.18, envMapIntensity: 1 })
      );
      const milk = new THREE.Mesh(
        flat(1, 64),
        new THREE.MeshStandardMaterial({ map: milkTex, roughness: 0.3, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 })
      );
      const art = new THREE.Mesh(
        flat(1, 64),
        new THREE.MeshStandardMaterial({ map: artTex, roughness: 0.3, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 })
      );
      milk.renderOrder = 2;
      art.renderOrder = 3;
      cup.add(espresso, milk, art);

      const IN = [[0.1, 0.45], [0.22, 0.66], [0.55, 0.84], [0.95, 0.97], [1.0, 0.995]];
      const innerR = (y) => {
        if (y <= IN[0][0]) return IN[0][1];
        for (let i = 1; i < IN.length; i++) {
          if (y <= IN[i][0]) {
            const a = IN[i - 1], b = IN[i];
            return a[1] + ((b[1] - a[1]) * (y - a[0])) / (b[0] - a[0]);
          }
        }
        return IN[IN.length - 1][1];
      };

      /* ---- portafilter (grind + extraction) ---- */
      const machine = new THREE.Group();
      world.add(machine);
      const dark = new THREE.MeshStandardMaterial({ color: 0x17110d, roughness: 0.5, metalness: 0.2 });
      const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.78, 0.4, 56), steel);
      const basketRim = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.04, 10, 56), steel);
      basketRim.rotation.x = Math.PI / 2;
      basketRim.position.y = 0.2;
      const hdl = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.1, 1.9, 20), dark);
      hdl.rotation.z = -Math.PI / 2;
      hdl.position.set(1.77, 0, 0);
      const spoutA = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.22, 16), steel);
      spoutA.position.set(-0.18, -0.3, 0);
      const spoutB = spoutA.clone();
      spoutB.position.x = 0.18;
      const puck = new THREE.Mesh(
        flat(0.72, 48),
        new THREE.MeshStandardMaterial({ color: 0x3a2012, roughness: 0.9 })
      );
      puck.position.y = 0.205;
      machine.add(basket, basketRim, hdl, spoutA, spoutB, puck);
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

      /* ---- milk pitcher ---- */
      const pitcherG = new THREE.Group();
      world.add(pitcherG);
      const jug = new THREE.Mesh(
        lathe([
          [0, 0], [0.5, 0], [0.6, 0.06], [0.66, 0.4], [0.72, 1.0], [0.74, 1.3], [0.745, 1.32], [0.72, 1.33], [0.7, 1.3],
          [0.66, 1.0], [0.6, 0.4], [0.5, 0.1], [0, 0.08],
        ], 64),
        steel
      );
      const jugHandle = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.045, 10, 28, Math.PI), steel);
      jugHandle.rotation.z = Math.PI / 2;
      jugHandle.position.set(-0.68, 0.65, 0);
      const jugG = new THREE.Group();
      jugG.add(jug, jugHandle);
      jugG.position.set(-0.74, -1.3, 0);
      pitcherG.add(jugG);

      /* ---- streams ---- */
      const mkStream = (color) => {
        const m = new THREE.Mesh(
          new THREE.CylinderGeometry(1, 1, 1, 12, 1, true),
          new THREE.MeshStandardMaterial({ color, roughness: 0.1, envMapIntensity: 1.2, side: THREE.DoubleSide })
        );
        m.visible = false;
        world.add(m);
        return m;
      };
      const espA = mkStream(0x3a1c0c);
      const espB = mkStream(0x3a1c0c);
      const milkS = mkStream(0xf6e8d4);
      const setStream = (m, x, top, bot, amt, r) => {
        if (amt < 0.02 || top - bot < 0.05) {
          m.visible = false;
          return;
        }
        m.visible = true;
        m.position.set(x, bot + (top - bot) / 2, 0);
        m.scale.set(r * amt, top - bot, r * amt);
      };

      /* ---- beans ---- */
      const beanTex = mkTex(256, 128, (c, w, h) => {
        const g = c.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, "#3b2013");
        g.addColorStop(0.5, "#5a3219");
        g.addColorStop(1, "#2e180d");
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
        c.lineCap = "round";
        c.strokeStyle = "#1a0c05";
        c.lineWidth = 7;
        c.beginPath();
        for (let x = 0; x <= w; x += 8) c.lineTo(x, h / 2 + Math.sin((x / w) * Math.PI * 4) * 5);
        c.stroke();
        c.strokeStyle = "rgba(255,190,120,.2)";
        c.lineWidth = 2;
        c.beginPath();
        for (let x = 0; x <= w; x += 8) c.lineTo(x, h / 2 - 7 + Math.sin((x / w) * Math.PI * 4) * 5);
        c.stroke();
      });
      const NB = 110;
      const beans = new THREE.InstancedMesh(
        new THREE.SphereGeometry(1, 20, 14),
        new THREE.MeshStandardMaterial({ map: beanTex, roughness: 0.42, envMapIntensity: 0.9 }),
        NB
      );
      beans.frustumCulled = false;
      const B = [];
      const tmpC = new THREE.Color();
      for (let i = 0; i < NB; i++) {
        const u = Math.random() * 2 - 1, th = Math.random() * 6.283, r = Math.cbrt(Math.random());
        const q = Math.sqrt(1 - u * u);
        B.push({
          x: r * q * Math.cos(th), y: r * u, z: r * q * Math.sin(th),
          rx: Math.random() * 6.283, ry: Math.random() * 6.283, rz: Math.random() * 6.283,
          rr: (Math.random() - 0.5) * 0.7, sp: 0.3 + Math.random() * 0.6, ph: Math.random() * 6.283,
          sz: 0.8 + Math.random() * 0.4,
        });
        const l = 0.75 + Math.random() * 0.5;
        beans.setColorAt(i, tmpC.setRGB(l, l, l));
      }
      beans.instanceColor.needsUpdate = true;
      world.add(beans);
      const dummy = new THREE.Object3D();

      /* ---- steam ---- */
      const NS = 70;
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
          map: dotTex, size: 0.85, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        })
      );
      steam.frustumCulled = false;
      steam.position.y = 1.1;
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
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: "#journey", start: "top top", end: "bottom bottom", scrub: reduce ? true : 1.2 },
        });
        K.slice(1).forEach((k, i) => {
          tl.to(st, { ...k, duration: pos[i + 1] - pos[i] }, pos[i]);
        });
      };
      build();

      const intro = { v: 1 };
      const introTween = gsap.to(intro, { v: 0, duration: reduce ? 0.01 : 2.4, ease: "power3.out", delay: 0.1 });

      /* The cup melts into steam as the menu arrives */
      const exit = { v: 0 };
      const exitTween = gsap.to(exit, {
        v: 1,
        ease: "none",
        scrollTrigger: { trigger: "#menu", start: "top 92%", end: "top 38%", scrub: true },
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
      let firstFrame = true, pinsOff = false, lastStep = -2;
      const root = rootRef.current;
      const frac = (x) => x - Math.floor(x);

      renderer.setAnimationLoop((ms) => {
        if (!vis) return;
        const t = ms / 1000;
        const ex = exit.v;
        const gone = Math.pow(ex, 1.4);
        pmx += (pmtx - pmx) * 0.05;
        pmy += (pmty - pmy) * 0.05;

        /* camera: orbit around a target, elevation el */
        const hw = st.cz * TAN * camera.aspect;
        const se = Math.sin(st.el), ce = Math.cos(st.el);
        tgt.set(0, st.ty - ce * st.sy, se * st.sy);
        camera.position.set(tgt.x + pmx * 0.3, tgt.y + st.cz * se - pmy * 0.15, tgt.z + st.cz * ce);
        camera.lookAt(tgt);
        camera.updateMatrixWorld();

        world.position.x = st.fx * hw;
        world.scale.setScalar(Math.max(st.s * (1 - 0.1 * intro.v), 0.0001));

        /* cup */
        cupG.visible = gone < 0.99;
        cupG.position.y = ex * 1.3;
        cupG.scale.setScalar(Math.max(1 - gone, 0.0001));
        cupG.rotation.y = st.ry + (reduce ? 0 : Math.sin(t * 0.4) * 0.12) + pmx * 0.2 + intro.v * 1.2 + ex * 3;
        table.material.opacity = 1 - ex;
        shadow.material.opacity = 1 - ex;

        /* liquid layers */
        const show = st.lv > 0.12;
        espresso.visible = show;
        milk.visible = show && st.mk > 0.01;
        art.visible = show && st.art > 0.01;
        if (show) {
          const r = innerR(st.lv) - 0.015;
          espresso.position.y = st.lv;
          milk.position.y = st.lv + 0.003;
          art.position.y = st.lv + 0.006;
          espresso.scale.set(r, 1, r);
          milk.scale.set(r, 1, r);
          art.scale.set(r, 1, r);
          milk.material.opacity = st.mk;
          art.material.opacity = st.art;
        }
        const surf = 0.11 + st.lv;

        /* portafilter, grounds, streams */
        machine.position.y = st.my;
        machine.visible = st.my < 6.5;
        puck.visible = st.fill > 0.02;
        puck.scale.set(st.fill, 1, st.fill);
        if (st.grind > 0.01 && machine.visible) {
          ground.visible = true;
          ground.material.opacity = st.grind;
          for (let i = 0; i < NG; i++) {
            const f = frac(t * 0.45 + gph[i]);
            const rad = (0.15 + 0.85 * grd[i]) * (0.35 + 0.65 * (1 - f));
            const a = gph[i] * 6.283 + t * 2 + f * 3;
            gpos[i * 3] = Math.cos(a) * rad;
            gpos[i * 3 + 1] = 0.25 + 2.6 * (1 - f);
            gpos[i * 3 + 2] = Math.sin(a) * rad;
          }
          ggeo.attributes.position.needsUpdate = true;
        } else ground.visible = false;
        setStream(espA, -0.16, st.my - 0.4, surf, st.es, 0.035);
        setStream(espB, 0.16, st.my - 0.4, surf, st.es, 0.035);

        /* pitcher + milk stream */
        pitcherG.position.set(st.pxo, 2.55, 0);
        pitcherG.rotation.z = -st.pt * 0.95;
        pitcherG.visible = st.pxo > -8;
        setStream(milkS, st.pxo, 2.55, surf, st.ms, 0.06);

        /* beans */
        if (st.bsc > 0.02) {
          beans.visible = true;
          const sp = st.bsp;
          const zoff = -0.8 * Math.min(1, Math.max(0, (sp - 1.5) / 2.5));
          for (let i = 0; i < NB; i++) {
            const b = B[i];
            const a = t * b.sp + b.ph;
            dummy.position.set(
              st.bx + b.x * sp * 0.85 + Math.sin(a) * 0.12,
              st.by + b.y * sp * 0.6 + Math.cos(a * 1.3) * 0.1,
              b.z * sp * 0.7 + zoff
            );
            dummy.rotation.set(b.rx + t * b.rr, b.ry + t * b.rr * 0.7, b.rz);
            const k = st.bsc * b.sz;
            dummy.scale.set(0.14 * k, 0.105 * k, 0.075 * k);
            dummy.updateMatrix();
            beans.setMatrixAt(i, dummy.matrix);
          }
          beans.instanceMatrix.needsUpdate = true;
        } else beans.visible = false;

        /* steam */
        const sAmt = Math.min(1, st.stm + ex * 1.2);
        if (sAmt > 0.02) {
          steam.visible = true;
          for (let i = 0; i < NS; i++) {
            const f = frac(t * 0.12 + sph[i]);
            const w = 0.25 * f;
            spos[i * 3] = Math.sin(t * 0.7 + sph[i] * 9) * w;
            spos[i * 3 + 1] = f * 1.7;
            spos[i * 3 + 2] = Math.cos(t * 0.6 + sph[i] * 7) * w;
            const c = 0.34 * sAmt * Math.sin(f * Math.PI);
            scol[i * 3] = c;
            scol[i * 3 + 1] = c * 0.95;
            scol[i * 3 + 2] = c * 0.88;
          }
          sgeo.attributes.position.needsUpdate = true;
          sgeo.attributes.color.needsUpdate = true;
        } else steam.visible = false;

        motes.rotation.y = t * 0.015;
        motes.position.y = scrollY * 0.0007;

        /* warm halo follows the cup */
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