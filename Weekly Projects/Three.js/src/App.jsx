import { useEffect, useRef, useState, useCallback } from "react";

/* ------------------------------------------------------------------
   AURÉLIE — Nº 7 Eau de Parfum   (v2)
   Single-file React version. Paste into src/App.js.
   Three.js, GSAP, ScrollTrigger and Lenis load from CDNs, no installs.
------------------------------------------------------------------- */

const LIBS = [
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
  "https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js",
];
const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap";

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

const NOTES = [
  { k: "Top", e: "🍊", t: "Calabrian bergamot, pink pepper" },
  { k: "Heart", e: "🌹", t: "Damask rose, Persian saffron" },
  { k: "Base", e: "🪵", t: "Atlas cedar, smoked amber, vanilla" },
];

const CARDS = [
  { no: "Nº 7", name: "Ambre Noir", desc: "Saffron, rose, smoked amber. $210" },
  { no: "Nº 3", name: "Fleur de Sel", desc: "Sea salt, jasmine, white musk. $190" },
  { no: "Nº 12", name: "Santal Brume", desc: "Sandalwood, fig, soft vetiver. $225" },
];

/* Feature callouts pinned to points on the 3D bottle (bottle-local coords).
   g = which close-up they belong to: A = cap and neck, B = base */
const HOTS = [
  { g: "A", p: [0.46, 1.8, 0.0], t: "Weighted gold cap", d: "Brushed champagne gold that closes with a soft magnetic click." },
  { g: "A", p: [0.385, 1.2, 0.0], t: "Fitted collar", d: "Machined to sit flush against the crystal." },
  { g: "A", p: [0.62, 0.35, 0.3], t: "Amber accord", d: "Saffron, rose and smoked amber, seen through thick crystal." },
  { g: "B", p: [0.9, -0.88, 0.2], t: "14 mm crystal base", d: "Hand-poured and weighted so it stands steady." },
  { g: "B", p: [-0.5, -0.88, 0.46], t: "Engraved base", d: "Atelier de Grasse, Nº 7." },
];

const CSS = `
:root{
  --ink:#0a0807;--ivory:#f3ead9;--gold:#c9a45c;--smoke:#a39a8e;--amber:#b87a3a;
  color-scheme:dark;box-sizing:border-box;
  padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)
}
*,*::before,*::after{box-sizing:inherit}
html{scroll-padding-top:env(safe-area-inset-top,0px);background:var(--ink)}
body{margin:0;background:transparent;color:var(--ivory);font:300 1rem/1.7 Inter,system-ui,sans-serif;overflow-x:hidden}
#bg{position:fixed;inset:0;z-index:-2;background:#0a0807}
#gl{position:fixed;inset:0;width:100%;height:100%;z-index:-1;opacity:0;transition:opacity 1.6s ease}
.ready #gl{opacity:1}
body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:5;opacity:.05;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")}

nav{position:fixed;top:0;left:0;right:0;z-index:10;display:flex;justify-content:space-between;align-items:center;
  padding:calc(1.2rem + env(safe-area-inset-top,0px)) 6vw 1.2rem}
nav::before{content:"";position:absolute;left:0;right:0;top:0;bottom:-1.6rem;z-index:-1;pointer-events:none;
  background:linear-gradient(rgba(10,8,7,.92),rgba(10,8,7,.6) 55%,rgba(10,8,7,0))}
.logo{font:600 1.4rem/1 "Cormorant Garamond",Georgia,serif;letter-spacing:.35em;color:var(--ivory);text-decoration:none}
nav ul{display:flex;gap:2.2rem;list-style:none;margin:0;padding:0}
nav a,.bag{color:var(--ivory);text-decoration:none;font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;opacity:.8;transition:opacity .3s,color .3s}
nav a:hover,.bag:hover{opacity:1;color:var(--gold)}
.bag{background:none;border:0;cursor:pointer;display:flex;gap:.5rem;align-items:center;font-family:inherit}
a:focus-visible,button:focus-visible,input:focus-visible{outline:2px solid var(--gold);outline-offset:4px}

.panel{min-height:100vh;min-height:100svh;display:grid;align-items:center;padding:0 6vw;position:relative}
.copy{max-width:30rem;text-shadow:0 2px 28px rgba(0,0,0,.7)}
.right{margin-left:auto}
.eyebrow{font-size:.72rem;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin:0 0 1.2rem}
h1,h2{font:400 clamp(2.2rem,5.5vw,5rem)/1 "Cormorant Garamond",Georgia,serif;margin:0 0 1.4rem;letter-spacing:.02em}
h1{font-size:clamp(2.4rem,5.4vw,6rem);line-height:.95;text-transform:uppercase}
h2 em{font-style:italic;color:var(--gold)}
p{margin:0 0 1.2rem;color:#d8cfbf}
.btn{display:inline-block;border:1px solid var(--gold);background:transparent;color:var(--ivory);padding:1rem 2.2rem;
  font:400 .72rem Inter,sans-serif;letter-spacing:.28em;text-transform:uppercase;cursor:pointer;transition:background .4s,color .4s;text-decoration:none;text-shadow:none}
.btn:hover{background:var(--gold);color:var(--ink)}

.hero{align-items:center;text-align:left}
.hero .copy{max-width:min(46vw,42rem);margin:0}
.hero p{max-width:26rem;margin:0 0 2rem}
.scroll{display:block;margin:2.5rem 0 0;width:1px;height:56px;background:linear-gradient(var(--gold),transparent);animation:drop 2s infinite}
@keyframes drop{
  0%{transform:scaleY(0);transform-origin:top}
  50%{transform:scaleY(1);transform-origin:top}
  51%{transform-origin:bottom}
  100%{transform:scaleY(0);transform-origin:bottom}
}
.notes{list-style:none;padding:0;margin:0 0 1rem;display:grid;gap:.9rem}
.notes li{display:flex;gap:1rem;align-items:center;border-bottom:1px solid rgba(201,164,92,.25);padding-bottom:.8rem}
.notes b{font-weight:500;color:var(--gold);min-width:4.5rem;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase}

.tall{min-height:230vh;align-items:start}
.tall .copy{position:sticky;top:30vh;max-width:24rem}
.price{font:400 2rem "Cormorant Garamond",Georgia,serif;color:var(--gold);margin-bottom:1.2rem}

.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;align-self:end;padding-bottom:7vh}
.card{border:1px solid rgba(201,164,92,.3);padding:1.4rem;background:rgba(10,8,7,.62);backdrop-filter:blur(8px)}
.card h3{font:400 1.5rem "Cormorant Garamond",Georgia,serif;margin:.2rem 0}
.card p{font-size:.85rem;margin:0 0 1rem}
.card .btn{padding:.7rem 1.2rem;font-size:.65rem}
.final{align-items:end;text-align:center;padding-bottom:9vh}
.final .copy{margin:0 auto;max-width:48rem}

/* Feature callouts */
.hots{position:fixed;inset:0;pointer-events:none;z-index:4}
.hot{position:absolute;left:0;top:0;opacity:0;will-change:transform}
.hot .dot{position:absolute;left:-5px;top:-5px;width:10px;height:10px;border-radius:50%;background:var(--gold);
  box-shadow:0 0 0 4px rgba(201,164,92,.25),0 0 18px rgba(201,164,92,.7)}
.hot .stem{position:absolute;left:5px;top:0;width:54px;height:1px;background:linear-gradient(90deg,var(--gold),rgba(201,164,92,.35))}
.hot .tag{position:absolute;left:66px;top:-1.05rem;width:13.5rem;text-shadow:0 2px 18px rgba(0,0,0,.8)}
.hot .tag b{display:block;font:600 1.15rem/1.2 "Cormorant Garamond",Georgia,serif;color:var(--ivory);letter-spacing:.02em}
.hot .tag span{display:block;font-size:.78rem;line-height:1.5;color:#cfc4b0;margin-top:.25rem}
.hot.flip .stem{left:auto;right:5px;background:linear-gradient(270deg,var(--gold),rgba(201,164,92,.35))}
.hot.flip .tag{left:auto;right:66px;text-align:right}

footer{position:relative;z-index:6;background:linear-gradient(#130f0b,var(--ink) 40%);padding:6rem 6vw 3rem;
  border-radius:2.4rem 2.4rem 0 0;box-shadow:0 -40px 90px rgba(0,0,0,.75)}
footer::before{content:"";position:absolute;left:12%;right:12%;top:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.fgrid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem}
footer h4{font-size:.72rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin:0 0 1rem;font-weight:400}
footer a{display:block;color:var(--smoke);text-decoration:none;margin-bottom:.5rem;font-size:.9rem}
footer a:hover{color:var(--ivory)}
footer a.logo{color:var(--ivory);font-size:1.4rem;margin-bottom:1rem}
.nl{display:flex;gap:.6rem;flex-wrap:wrap}
.nl input{flex:1;min-width:12rem;background:transparent;border:0;border-bottom:1px solid var(--smoke);color:var(--ivory);padding:.8rem 0;font:inherit}
.legal{margin-top:4rem;font-size:.75rem;color:var(--smoke)}
.legal a{display:inline;font-size:inherit}

.reveal{opacity:0;transform:translateY(34px);
  transition:opacity 1.1s cubic-bezier(.2,.7,.2,1),transform 1.1s cubic-bezier(.2,.7,.2,1);
  transition-delay:calc(var(--d,0)*.12s)}
.reveal.in{opacity:1;transform:none}
#toast{position:fixed;left:50%;bottom:2rem;transform:translate(-50%,20px);background:var(--gold);color:var(--ink);
  padding:.8rem 1.6rem;font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;opacity:0;pointer-events:none;transition:.4s;z-index:20}
#toast.on{opacity:1;transform:translate(-50%,0)}
.nogl #gl{display:none}
.nogl .panel::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 70% 45%,rgba(184,122,58,.28),transparent 55%);z-index:-1}

@media (max-width:1000px){.hots{display:none}}
@media (max-width:760px){
  nav ul{display:none}
  .panel{align-items:end;padding-bottom:9vh}
  .panel.tall{align-items:start;padding-bottom:0}
  .tall .copy{top:46vh;max-width:none}
  .copy{max-width:none;background:linear-gradient(transparent,rgba(10,8,7,.82) 30%);padding:3rem 0 0}
  h1{font-size:clamp(2.1rem,10vw,3.4rem)}
  .hero{text-align:center}
  .hero .copy{max-width:none;margin:0 auto}
  .hero p{margin:0 auto 2rem}
  .scroll{margin:2rem auto 0}
  .cards{grid-template-columns:1fr;gap:.6rem;padding-bottom:4vh}
  .card{padding:.9rem 1rem}
  .card p{display:none}
  .fgrid{grid-template-columns:1fr}
  footer{border-radius:1.6rem 1.6rem 0 0}
}
@media (prefers-reduced-motion:reduce){
  .reveal{transition:none;opacity:1;transform:none}
  .scroll{animation:none}
}
`;

export default function App() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const footerRef = useRef(null);
  const lenisRef = useRef(null);
  const toastTimer = useRef(null);
  const hotEls = useRef([]);

  const [count, setCount] = useState(0);
  const [toast, setToast] = useState({ msg: "", on: false });
  const [email, setEmail] = useState("");
  const [nogl, setNogl] = useState(false);
  const [ready, setReady] = useState(false);

  const say = useCallback((msg) => {
    setToast({ msg, on: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 2200);
  }, []);

  const add = (name) => {
    setCount((c) => c + 1);
    say(name + " added to bag");
  };

  const openBag = () =>
    say(count ? count + " item" + (count > 1 ? "s" : "") + " in your bag" : "Your bag is empty");

  const join = () => {
    if (/^\S+@\S+\.\S+$/.test(email)) {
      say("Welcome to the inner circle");
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

  /* Fonts + title */
  useEffect(() => {
    document.title = "AURÉLIE — Nº 7 Eau de Parfum";
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_URL;
    document.head.appendChild(l);
    return () => l.remove();
  }, []);

  /* Text reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
      { threshold: 0.3 }
    );
    rootRef.current.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* 3D scene + scroll choreography */
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

      /* Smooth scroll */
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

      /* Renderer */
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
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

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.outputEncoding = THREE.sRGBEncoding;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0807).convertSRGBToLinear();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
      camera.position.z = 7;
      const TAN = Math.tan((17.5 * Math.PI) / 180);

      /* Studio environment for reflections */
      const es = new THREE.Scene();
      es.background = new THREE.Color(0x0c0a08);
      const envPanel = (w, h, x, y, z, c, k) => {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide })
        );
        m.position.set(x, y, z);
        m.lookAt(0, 0, 0);
        es.add(m);
      };
      envPanel(8, 3, 0, 6, 0, 0xffffff, 5);
      envPanel(1.6, 9, -6, 0, 2, 0xfff1d6, 7);
      envPanel(1.6, 9, 6, 0, -2, 0xcfe0ff, 4);
      envPanel(10, 2, 0, -1, -7, 0xffe0b0, 3);
      envPanel(3, 6, 4, 1, 6, 0xffffff, 2.5);
      envPanel(2, 6, -4, 0, 6, 0xffd9a0, 2);
      const pm = new THREE.PMREMGenerator(renderer);
      scene.environment = pm.fromScene(es, 0.02).texture;
      pm.dispose();

      const key = new THREE.DirectionalLight(0xffe6c0, 1.5);
      key.position.set(3, 4, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffb060, 1.3);
      rim.position.set(-4, 2, -3);
      scene.add(rim);
      scene.add(new THREE.AmbientLight(0xffffff, 0.1));

      /* Warm halo behind the bottle (opaque, so the glass refracts it) */
      const gc = document.createElement("canvas");
      gc.width = gc.height = 512;
      const g2 = gc.getContext("2d");
      const grad = g2.createRadialGradient(256, 256, 0, 256, 256, 256);
      grad.addColorStop(0, "#744619");
      grad.addColorStop(0.12, "#4a2d12");
      grad.addColorStop(0.26, "#22160b");
      grad.addColorStop(0.45, "#0e0a07");
      grad.addColorStop(1, "#0a0807");
      g2.fillStyle = grad;
      g2.fillRect(0, 0, 512, 512);
      const gtex = new THREE.CanvasTexture(gc);
      gtex.encoding = THREE.sRGBEncoding;
      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 30),
        new THREE.MeshBasicMaterial({ map: gtex, toneMapped: false })
      );
      glow.position.z = -6;
      scene.add(glow);

      /* ---------- Bottle ---------- */
      const rr = (w, h, r) => {
        const s = new THREE.Shape(), x = w / 2, y = h / 2;
        s.moveTo(-x + r, -y);
        s.lineTo(x - r, -y);
        s.quadraticCurveTo(x, -y, x, -y + r);
        s.lineTo(x, y - r);
        s.quadraticCurveTo(x, y, x - r, y);
        s.lineTo(-x + r, y);
        s.quadraticCurveTo(-x, y, -x, y - r);
        s.lineTo(-x, -y + r);
        s.quadraticCurveTo(-x, -y, -x + r, -y);
        return s;
      };
      const ext = (w, h, r, d, b) => {
        const geo = new THREE.ExtrudeGeometry(rr(w, h, r), {
          depth: d,
          bevelEnabled: true,
          bevelThickness: b,
          bevelSize: b,
          bevelSegments: 8,
          curveSegments: 14,
        });
        geo.center();
        return geo;
      };
      const lathe = (pts) => new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), 96);

      const bottle = new THREE.Group();
      const inner = new THREE.Group();
      bottle.add(inner);
      inner.position.y = -0.5;

      /* Brushed-metal roughness map (fine rings, like turned gold) */
      const bc = document.createElement("canvas");
      bc.width = 64;
      bc.height = 256;
      const b2 = bc.getContext("2d");
      for (let y = 0; y < 256; y++) {
        const v = 150 + Math.random() * 105;
        b2.fillStyle = `rgb(${v},${v},${v})`;
        b2.fillRect(0, y, 64, 1);
      }
      const brushed = new THREE.CanvasTexture(bc);
      brushed.wrapS = brushed.wrapT = THREE.RepeatWrapping;

      const goldMat = new THREE.MeshPhysicalMaterial({
        color: 0xd9b36a,
        metalness: 1,
        roughness: 0.38,
        roughnessMap: brushed,
        clearcoat: 0.35,
        clearcoatRoughness: 0.2,
        envMapIntensity: 1.7,
        side: THREE.DoubleSide,
      });
      const darkMat = new THREE.MeshStandardMaterial({ color: 0x2b1f0e, roughness: 0.6, metalness: 0.6 });

      /* Thick crystal body: transmission gives real refraction */
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.02,
        transparent: true,
        depthWrite: false,
        transmission: 0.88,
        thickness: 1.6,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 0.6,
        envMapIntensity: 1.9,
      });
      const baseGlassMat = new THREE.MeshPhysicalMaterial({
        color: 0xeaf2ff,
        metalness: 0,
        roughness: 0.03,
        transparent: true,
        depthWrite: false,
        transmission: 0.8,
        thickness: 2.2,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 0.6,
        envMapIntensity: 2,
      });
      const shell = new THREE.Mesh(ext(1.7, 2.1, 0.28, 0.7, 0.1), glassMat);
      const base = new THREE.Mesh(ext(1.8, 0.34, 0.1, 0.76, 0.07), baseGlassMat);
      base.position.y = -0.88;

      /* Amber juice, opaque so it shows through the glass */
      const liquid = new THREE.Mesh(
        ext(1.38, 1.55, 0.22, 0.38, 0.06),
        new THREE.MeshPhysicalMaterial({
          color: 0xc2711f,
          emissive: 0x7a3d08,
          emissiveIntensity: 0.55,
          roughness: 0.15,
          clearcoat: 1,
          envMapIntensity: 0.9,
        })
      );
      liquid.position.y = -0.05;

      const tube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 1.95, 12),
        new THREE.MeshStandardMaterial({ color: 0xf0e4c8, roughness: 0.25, emissive: 0x6b4a20, emissiveIntensity: 0.4 })
      );
      tube.position.set(0.32, 0.17, 0);

      /* Gold collar, cap, seam */
      const collar = new THREE.Mesh(
        lathe([[0, 0], [0.4, 0], [0.405, 0.02], [0.36, 0.05], [0.34, 0.07], [0.34, 0.27], [0.37, 0.29], [0.385, 0.31], [0.385, 0.36], [0.36, 0.38], [0, 0.38]]),
        goldMat
      );
      collar.position.y = 1.02;
      const cap = new THREE.Mesh(
        lathe([[0, 0], [0.43, 0], [0.46, 0.03], [0.46, 0.12], [0.452, 0.14], [0.46, 0.16], [0.46, 0.74], [0.452, 0.76], [0.46, 0.78], [0.46, 0.84], [0.43, 0.88], [0.4, 0.9], [0, 0.9]]),
        goldMat
      );
      cap.position.y = 1.34;
      const seam = new THREE.Mesh(new THREE.TorusGeometry(0.458, 0.01, 8, 96), darkMat);
      seam.rotation.x = Math.PI / 2;
      seam.position.y = 1.345;

      /* Gold-foil label printed on the glass */
      const LW = 1024, LH = 880;
      const lc = document.createElement("canvas");
      lc.width = LW;
      lc.height = LH;
      const L = lc.getContext("2d");
      const roundRect = (ctx, x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
      };
      const spaced = (ctx, px) => {
        if ("letterSpacing" in ctx) ctx.letterSpacing = px + "px";
      };
      const drawLabel = () => {
        L.clearRect(0, 0, LW, LH);
        const gold = "#e8cb8c";
        L.strokeStyle = gold;
        L.fillStyle = gold;
        L.lineWidth = 5;
        roundRect(L, 28, 28, LW - 56, LH - 56, 30);
        L.stroke();
        L.lineWidth = 2;
        roundRect(L, 56, 56, LW - 112, LH - 112, 18);
        L.stroke();
        L.textAlign = "center";
        spaced(L, 14);
        L.font = '600 150px "Cormorant Garamond", Georgia, serif';
        L.fillText("AURÉLIE", LW / 2 + 7, 300);
        spaced(L, 0);
        L.lineWidth = 2;
        L.beginPath();
        L.moveTo(250, 372);
        L.lineTo(460, 372);
        L.moveTo(564, 372);
        L.lineTo(774, 372);
        L.stroke();
        L.beginPath();
        L.moveTo(512, 352);
        L.lineTo(532, 372);
        L.lineTo(512, 392);
        L.lineTo(492, 372);
        L.closePath();
        L.fill();
        L.font = 'italic 400 96px "Cormorant Garamond", Georgia, serif';
        L.fillText("Nº 7", LW / 2, 500);
        spaced(L, 12);
        L.font = "400 36px Inter, Arial, sans-serif";
        L.fillText("EAU DE PARFUM", LW / 2 + 6, 626);
        L.font = "400 30px Inter, Arial, sans-serif";
        L.fillText("50 ML · 1.7 FL OZ", LW / 2 + 6, 692);
        spaced(L, 0);
      };
      drawLabel();
      const labelTex = new THREE.CanvasTexture(lc);
      labelTex.anisotropy = 8;
      labelTex.encoding = THREE.sRGBEncoding;
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 1.03),
        new THREE.MeshStandardMaterial({
          map: labelTex,
          transparent: true,
          metalness: 0.9,
          roughness: 0.32,
          envMapIntensity: 1.3,
          polygonOffset: true,
          polygonOffsetFactor: -2,
        })
      );
      label.position.set(0, 0.15, 0.453);

      /* Engraving on the crystal base */
      const EW = 1024, EH = 128;
      const ec = document.createElement("canvas");
      ec.width = EW;
      ec.height = EH;
      const E = ec.getContext("2d");
      const drawEngrave = () => {
        E.clearRect(0, 0, EW, EH);
        E.fillStyle = "#e8cb8c";
        E.textAlign = "center";
        spaced(E, 8);
        E.font = '400 46px "Cormorant Garamond", Georgia, serif';
        E.fillText("ATELIER DE GRASSE · Nº 7 · MMXXVI", EW / 2 + 4, 78);
        spaced(E, 0);
      };
      drawEngrave();
      const engTex = new THREE.CanvasTexture(ec);
      engTex.anisotropy = 8;
      engTex.encoding = THREE.sRGBEncoding;
      const engrave = new THREE.Mesh(
        new THREE.PlaneGeometry(1.3, 0.1625),
        new THREE.MeshStandardMaterial({
          map: engTex,
          transparent: true,
          metalness: 0.9,
          roughness: 0.3,
          envMapIntensity: 1.3,
          polygonOffset: true,
          polygonOffsetFactor: -2,
        })
      );
      engrave.position.set(0, -0.88, 0.453);

      if (document.fonts && document.fonts.load) {
        Promise.all([
          document.fonts.load('600 40px "Cormorant Garamond"'),
          document.fonts.load('italic 400 40px "Cormorant Garamond"'),
          document.fonts.load("400 40px Inter"),
        ])
          .then(() => {
            drawLabel();
            drawEngrave();
            labelTex.needsUpdate = true;
            engTex.needsUpdate = true;
          })
          .catch(() => {});
      }

      /* Warm light living inside the juice */
      const amber = new THREE.PointLight(0xff9a3c, 1.3, 5);
      amber.position.set(0, 0, 0);

      shell.renderOrder = 2;
      base.renderOrder = 2;
      label.renderOrder = 3;
      engrave.renderOrder = 3;
      inner.add(shell, base, liquid, tube, collar, cap, seam, label, engrave, amber);
      scene.add(bottle);

      /* Dust */
      const N = 260;
      const pp = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pp[i * 3] = (Math.random() - 0.5) * 12;
        pp[i * 3 + 1] = (Math.random() - 0.5) * 14;
        pp[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      }
      const pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
      const dust = new THREE.Points(
        pg,
        new THREE.PointsMaterial({ color: 0xe8c98a, size: 0.025, transparent: true, opacity: 0.55, depthWrite: false })
      );
      scene.add(dust);

      /* ---------- Scroll keyframes ----------
         fx = horizontal position as a fraction of half the screen width,
         so the bottle always sits beside the text, never behind it.
         Order: hero, story, notes, craft close-up (cap), craft close-up (base), collection, final */
      const frames = () => {
        const T = Math.PI * 2;
        if (isMob())
          return [
            { fx: 0, y: 1.05, s: 0.62, ry: -0.3, cz: 8.6, hotA: 0, hotB: 0, glow: 0.8 },
            { fx: 0, y: 1.05, s: 0.6, ry: 0.7, cz: 8.6, hotA: 0, hotB: 0, glow: 0.7 },
            { fx: 0, y: 1.05, s: 0.6, ry: -0.6, cz: 8.6, hotA: 0, hotB: 0, glow: 0.7 },
            { fx: 0, y: -0.2, s: 1.1, ry: 0.3, cz: 8, hotA: 0, hotB: 0, glow: 1 },
            { fx: 0, y: 2.8, s: 1.1, ry: 0.1, cz: 8, hotA: 0, hotB: 0, glow: 0.9 },
            { fx: 0, y: 1.1, s: 0.5, ry: T, cz: 8.6, hotA: 0, hotB: 0, glow: 0.6 },
            { fx: 0, y: 1.0, s: 0.55, ry: T, cz: 8.4, hotA: 0, hotB: 0, glow: 0.8 },
          ];
        return [
          { fx: 0.5, y: 0.05, s: 0.86, ry: -0.35, cz: 7, hotA: 0, hotB: 0, glow: 0.85 },
          { fx: 0.5, y: 0, s: 0.9, ry: 0.55, cz: 6.8, hotA: 0, hotB: 0, glow: 0.7 },
          { fx: -0.5, y: 0, s: 0.9, ry: -0.45, cz: 6.8, hotA: 0, hotB: 0, glow: 0.7 },
          { fx: 0.18, y: -1.3, s: 1.35, ry: 0.4, cz: 6, hotA: 1, hotB: 0, glow: 1 },
          { fx: 0.18, y: 1.96, s: 1.35, ry: 0.15, cz: 6, hotA: 0, hotB: 1, glow: 0.9 },
          { fx: 0, y: 0.9, s: 0.55, ry: T, cz: 7.6, hotA: 0, hotB: 0, glow: 0.6 },
          { fx: 0, y: 0.55, s: 0.6, ry: T, cz: 7, hotA: 0, hotB: 0, glow: 0.85 },
        ];
      };

      const st = { fx: 0.5, y: 0.05, s: 0.86, ry: -0.35, cz: 7, hotA: 0, hotB: 0, glow: 0.85 };
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
        const vh = innerHeight;
        const total = Math.max(1, jr.offsetHeight - vh);
        const craftTop = topOf("craft");
        const craftH = document.getElementById("craft").offsetHeight;
        const pos = [
          0,
          topOf("story"),
          topOf("notes"),
          craftTop,
          craftTop + Math.max(60, (craftH - vh) * 0.55),
          topOf("collection"),
          total,
        ];
        for (let i = 1; i < pos.length; i++) if (pos[i] <= pos[i - 1]) pos[i] = pos[i - 1] + 1;

        tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: "#journey",
            start: "top top",
            end: "bottom bottom",
            scrub: reduce ? true : 1.2,
          },
        });
        K.slice(1).forEach((k, i) => {
          tl.to(st, { ...k, duration: pos[i + 1] - pos[i] }, pos[i]);
        });
      };
      build();

      /* Intro: bottle turns in from the side and settles */
      const intro = { v: 1 };
      const introTween = gsap.to(intro, { v: 0, duration: reduce ? 0.01 : 2.6, ease: "power3.out", delay: 0.15 });

      /* Exit: as the footer slides up, the bottle lifts, shrinks and dissolves,
         so the footer never overlaps it */
      const exit = { v: 0 };
      const exitTween = gsap.to(exit, {
        v: 1,
        ease: "none",
        scrollTrigger: { trigger: footerRef.current, start: "top 95%", end: "top 50%", scrub: true },
      });

      let mx = 0, my = 0, tx = 0, ty = 0;
      const onMove = (e) => {
        tx = e.clientX / innerWidth - 0.5;
        ty = e.clientY / innerHeight - 0.5;
      };
      addEventListener("pointermove", onMove, { passive: true });

      let lastW = innerWidth;
      let wasMob = isMob();
      let rz;
      const sizeNow = () => {
        const w = innerWidth, h = innerHeight;
        renderer.setPixelRatio(Math.min(devicePixelRatio, isMob() ? 1.5 : 2));
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
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
      let firstFrame = true;

      renderer.setAnimationLoop((ms) => {
        if (!vis) return;
        const t = ms / 1000;
        const mob = isMob();
        const ex = exit.v;
        const p = Math.min(1, scrollY / (innerHeight * 0.8));
        const sway = reduce ? 0 : Math.sin(t * 0.45) * 0.4 * (1 - p);
        mx += (tx - mx) * 0.05;
        my += (ty - my) * 0.05;

        const hw = st.cz * TAN * camera.aspect;
        const gone = Math.pow(ex, 1.4);
        const sc = st.s * (1 - 0.12 * intro.v) * (1 - gone);

        bottle.visible = sc > 0.01;
        bottle.position.set(
          st.fx * hw,
          st.y + (reduce ? 0 : Math.sin(t * 1.1) * 0.07) + ex * 1.4,
          0
        );
        bottle.rotation.set(my * 0.12, st.ry + sway + mx * 0.25 + intro.v * 1.4 + ex * 3, 0);
        bottle.scale.setScalar(Math.max(sc, 0.0001));

        camera.position.set(mx * 0.3, -my * 0.2, st.cz);
        camera.lookAt(0, 0, 0);

        const gl = (0.25 + 0.75 * st.glow) * (1 - ex);
        glow.material.color.setRGB(gl, gl, gl);
        glow.position.set(bottle.position.x * 0.55, bottle.position.y * 0.4, -6);

        amber.intensity = 1.3 + Math.sin(t * 1.7) * 0.15;
        dust.rotation.y = t * 0.02;
        dust.position.y = scrollY * 0.0008;
        dust.material.opacity = 0.55 + ex * 0.4;
        dust.material.size = 0.025 + ex * 0.03;
        key.position.x = 3 + Math.sin(t * 0.4) * 2;

        /* Pin the feature callouts to points on the bottle */
        if (!mob) {
          bottle.updateMatrixWorld(true);
          camera.updateMatrixWorld();
          for (let i = 0; i < HOTS.length; i++) {
            const el = hotEls.current[i];
            if (!el) continue;
            const o = HOTS[i].g === "A" ? st.hotA : st.hotB;
            if (o < 0.01) {
              if (el.style.opacity !== "0") el.style.opacity = "0";
              continue;
            }
            v3.set(HOTS[i].p[0], HOTS[i].p[1], HOTS[i].p[2]);
            inner.localToWorld(v3);
            v3.project(camera);
            const x = (v3.x * 0.5 + 0.5) * innerWidth;
            const y = (-v3.y * 0.5 + 0.5) * innerHeight;
            el.style.opacity = o.toFixed(3);
            el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
            el.classList.toggle("flip", x > innerWidth * 0.6);
          }
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
        [labelTex, engTex, gtex, brushed].forEach((x) => x.dispose());
        renderer.dispose();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={rootRef} className={(nogl ? "nogl " : "") + (ready ? "ready" : "")}>
      <style>{CSS}</style>

      <div id="bg" />
      <canvas id="gl" ref={canvasRef} aria-hidden="true" />

      <div className="hots" aria-hidden="true">
        {HOTS.map((h, i) => (
          <div key={h.t} className="hot" ref={(el) => (hotEls.current[i] = el)}>
            <i className="dot" />
            <span className="stem" />
            <div className="tag">
              <b>{h.t}</b>
              <span>{h.d}</span>
            </div>
          </div>
        ))}
      </div>

      <nav>
        <a className="logo" href="#top" onClick={(e) => go(e, "#top")}>AURÉLIE</a>
        <ul>
          {[["story", "Story"], ["notes", "Notes"], ["craft", "Craft"], ["collection", "Collection"]].map(([id, label]) => (
            <li key={id}>
              <a href={"#" + id} onClick={(e) => go(e, "#" + id)}>{label}</a>
            </li>
          ))}
        </ul>
        <button className="bag" aria-label="Shopping bag" onClick={openBag}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 016 0v2" />
          </svg>
          <span>{count}</span>
        </button>
      </nav>

      <main id="journey">
        <section className="panel hero" id="top">
          <div className="copy">
            <p className="eyebrow reveal">Aurélie · Nº 7 Eau de Parfum</p>
            <h1 className="reveal" style={{ "--d": 1 }}>Scent is an experience.</h1>
            <p className="reveal" style={{ "--d": 2 }}>
              Discover a fragrance crafted to leave an unforgettable impression.
            </p>
            <a className="btn reveal" style={{ "--d": 3 }} href="#story" onClick={(e) => go(e, "#story")}>
              Discover the collection
            </a>
            <span className="scroll" aria-hidden="true" />
          </div>
        </section>

        <section className="panel" id="story">
          <div className="copy">
            <p className="eyebrow reveal">The story</p>
            <h2 className="reveal" style={{ "--d": 1 }}>A memory <em>you can wear.</em></h2>
            <p className="reveal" style={{ "--d": 2 }}>
              Nº 7 began in a Grasse workshop at dusk: warm amber, torn petals, cedar smoke. We chased the exact
              moment a room goes quiet because someone just walked in.
            </p>
            <p className="reveal" style={{ "--d": 3 }}>
              Every curve of the flacon is cut to catch light the way skin does.
            </p>
          </div>
        </section>

        <section className="panel" id="notes">
          <div className="copy right">
            <p className="eyebrow reveal">Ingredients</p>
            <h2 className="reveal" style={{ "--d": 1 }}>Three acts, <em>one accord.</em></h2>
            <ul className="notes">
              {NOTES.map((n, i) => (
                <li key={n.k} className="reveal" style={{ "--d": i + 2 }}>
                  <b>{n.k}</b>{n.e} {n.t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="panel tall" id="craft">
          <div className="copy">
            <p className="eyebrow reveal">Craftsmanship</p>
            <h2 className="reveal" style={{ "--d": 1 }}>Glass, gold, <em>patience.</em></h2>
            <p className="reveal" style={{ "--d": 2 }}>
              Hand-poured crystal with a 14 mm base. A weighted cap in brushed champagne gold that closes with a
              soft magnetic click. 50 ml.
            </p>
            <div className="price reveal" style={{ "--d": 3 }}>$210</div>
            <button className="btn reveal" style={{ "--d": 3 }} onClick={() => add("Nº 7 Ambre Noir")}>
              Add to bag
            </button>
          </div>
        </section>

        <section className="panel" id="collection">
          <div
            className="copy reveal"
            style={{ maxWidth: "26rem", alignSelf: "start", paddingTop: "18vh", background: "none" }}
          >
            <p className="eyebrow">The collection</p>
            <h2>Find your <em>signature.</em></h2>
          </div>
          <div className="cards">
            {CARDS.map((card, i) => (
              <article key={card.name} className="card reveal" style={{ "--d": i }}>
                <p className="eyebrow">{card.no}</p>
                <h3>{card.name}</h3>
                <p>{card.desc}</p>
                <button className="btn" onClick={() => add(card.name)}>Add to bag</button>
              </article>
            ))}
          </div>
        </section>

        <section className="panel final" id="final">
          <div className="copy">
            <p className="eyebrow reveal">Nº 7 Eau de Parfum</p>
            <h2 className="reveal" style={{ "--d": 1 }}>Your signature. <em>Your scent.</em></h2>
            <button className="btn reveal" style={{ "--d": 2 }} onClick={() => add("Nº 7 Ambre Noir")}>
              Shop the fragrance
            </button>
          </div>
        </section>
      </main>

      <footer ref={footerRef}>
        <div className="fgrid">
          <div>
            <a className="logo" href="#top" onClick={(e) => go(e, "#top")}>AURÉLIE</a>
            <h4>Join the inner circle</h4>
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
            <a href="#story" onClick={(e) => go(e, "#story")}>Story</a>
            <a href="#notes" onClick={(e) => go(e, "#notes")}>Notes</a>
            <a href="#collection" onClick={(e) => go(e, "#collection")}>Collection</a>
          </div>
          <div>
            <h4>Follow</h4>
            <a href="https://instagram.com" rel="noopener noreferrer">Instagram</a>
            <a href="https://pinterest.com" rel="noopener noreferrer">Pinterest</a>
            <a href="https://tiktok.com" rel="noopener noreferrer">TikTok</a>
          </div>
        </div>
        <p className="legal">
          © 2026 Aurélie Parfums · <a href="#top" onClick={(e) => go(e, "#top")}>Privacy</a> ·{" "}
          <a href="#top" onClick={(e) => go(e, "#top")}>Terms</a>
        </p>
      </footer>

      <div id="toast" className={toast.on ? "on" : ""} role="status" aria-live="polite">
        {toast.msg}
      </div>
    </div>
  );
}