import { createHelpers } from "./helpers";
import { createEnvironment } from "./environment";
import { createTable } from "./table";
import { createMug } from "./mug";
import { createTableProps } from "./tableProps";
import { createLiquid } from "./liquid";
import { createPortafilter } from "./portafilter";
import { createPitcher } from "./pitcher";
import { createStreams } from "./streams";
import { createBeans } from "./beans";
import { createSteam } from "./steam";
import { createCupRing } from "./cupRing";
import { createMotes } from "./motes";
import { createTimeline } from "./timeline";
import { createViewport } from "./viewport";
import { createDomSync } from "./domSync";

/* Builds the whole 3D scene and starts the render loop.
   Returns a dispose() function, or null when WebGL is not available.

   To change how something LOOKS, edit its own file in this folder.
   To change WHEN things happen while scrolling, edit data/keyframes.js. */
export function createScene({ THREE, gsap, ScrollTrigger, canvas, root, pinEls, barRef, railRef, reduce, isMob, onStep, onDesign, onReady }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (e) {}
  if (!renderer) return null;

  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
  const TAN = Math.tan((17.5 * Math.PI) / 180);

  const metalEnv = createEnvironment(THREE, renderer, scene);
  const helpers = createHelpers(THREE);
  const world = new THREE.Group();
  scene.add(world);

  /* soft light from straight above: switches on for the top-down art view so the foam pops */
  const topLight = new THREE.DirectionalLight(0xfff0dc, 0);
  topLight.position.set(0.5, 9, 1.5);
  scene.add(topLight);

  /* ---- objects ---- */
  const { tableG, TOP, TR, shadow } = createTable(THREE, helpers, world);
  const { cupG, cup, MH, outerPts, handleCurve, innerR, creamMat } = createMug(THREE, helpers, world);
  const { props } = createTableProps(THREE, helpers, { tableG, cupG, creamMat, TOP });
  /* a copy of the finished mug + saucer (taken before the liquid goes in) for the ring of cups */
  const proto = cupG.clone(true);
  const shadow2 = shadow.clone();
  shadow2.position.y = -0.086;
  proto.add(shadow2);
  const liquid = createLiquid(THREE, helpers, cup, innerR, renderer);
  const portafilter = createPortafilter(THREE, helpers, world, metalEnv);
  const pitcher = createPitcher(THREE, helpers, world, metalEnv);
  const streams = createStreams(THREE, helpers, world);
  const beans = createBeans(THREE, helpers, world, { cupG, outerPts, MH, handleCurve, TOP, TR });
  const { tBeans } = beans;
  const steam = createSteam(THREE, helpers, world, MH);
  const motes = createMotes(THREE, helpers, scene);
  const ring = createCupRing(THREE, helpers, world, { proto, liquid, MH, LV: 1.06, steam });

  /* ---- scroll timeline, viewport and DOM overlay ---- */
  const timeline = createTimeline({ gsap, reduce, isMob, TAN });
  const { st, metrics, intro, exit } = timeline;
  const viewport = createViewport({ renderer, camera, isMob, ScrollTrigger, rebuild: timeline.build });
  const { pointer } = viewport;
  const dom = createDomSync({ THREE, camera, world, cup, cupG, root, pinEls, barRef, railRef, onStep, onDesign });

  /* ---- render loop ----
     Runs inside GSAP's ticker (one requestAnimationFrame for everything), right AFTER Lenis and
     ScrollTrigger have updated, so the picture always matches the scroll position of the same frame. */
  const tgt = new THREE.Vector3();
  const fr = {}; /* per-frame values shared with every update() */
  const { GRAV, MILK_VX } = streams;
  const { clamp01 } = helpers;
  let firstFrame = true, lastT = 0, pmx = 0, pmy = 0, frameNo = 0;
  /* adaptive resolution: if frames stay slow, render a little less sharp instead of stuttering */
  let ema = 0.0167, slow = 0, fast = 0, nextAdapt = 3;

  const loop = (t) => {
    if (!viewport.isVisible()) return;
    const ex = exit.v;
    const covered = ex > 0.985; /* menu fully covers the scene: half rate is plenty */
    if (covered && frameNo++ % 2) return;
    const raw = t - lastT;
    const dtP = Math.min(0.033, Math.max(0, raw));
    lastT = t;

    if (!covered && !firstFrame && raw > 0 && raw < 0.25) {
      ema += (raw - ema) * 0.08;
      if (t > nextAdapt) {
        if (ema > 0.026) {
          if (++slow > 40 && viewport.adapt(-1)) { slow = 0; ema = 0.017; nextAdapt = t + 2.5; }
        } else slow = 0;
        if (ema < 0.0135) {
          if (++fast > 400 && viewport.adapt(1)) { fast = 0; nextAdapt = t + 4; }
        } else fast = 0;
      }
    }

    const gone = Math.pow(ex, 1.4);
    const k = 1 - Math.exp(-dtP * 3.2); /* same feel at 30, 60 or 144 fps */
    pmx += (pointer.x - pmx) * k;
    pmy += (pointer.y - pmy) * k;

    /* camera (a very slow "breathing" zoom while the art is on show) */
    const hw = st.cz * TAN * camera.aspect;
    const cz = st.cz * (1 + (reduce ? 0 : st.art * 0.012 * Math.sin(t * 0.5)));
    const se = Math.sin(st.el), ce = Math.cos(st.el);
    tgt.set(0, st.ty - ce * st.sy, se * st.sy);
    camera.position.set(tgt.x + pmx * 0.3, tgt.y + cz * se - pmy * 0.15, tgt.z + cz * ce);
    camera.lookAt(tgt);
    camera.updateMatrixWorld();

    /* lighting follows the story: warm top light + a touch more exposure for the art */
    topLight.intensity = st.art * 0.85 * (1 - ex);
    renderer.toneMappingExposure = 1 + 0.07 * st.art;

    world.position.x = st.fx * hw;
    world.scale.setScalar(Math.max(st.s * (1 - 0.1 * intro.v), 0.0001));

    /* mug */
    const hero = ring.update(st, { ex });
    cupG.visible = gone < 0.99;
    cupG.position.set(hero.x, ex * 1.3 + hero.y, hero.z);
    cupG.scale.setScalar(Math.max((1 - gone) * hero.s, 0.0001));
    const spin = st.ry + (reduce ? 0 : Math.sin(t * 0.4) * 0.12) + pmx * 0.2 + intro.v * 1.2 + ex * 3;
    cupG.rotation.y = spin + (hero.rot - spin) * hero.k;
    shadow.position.set(hero.x, -0.086, hero.z);
    shadow.scale.setScalar(hero.s);
    /* things on the table sink out of the way while the cups stand in a ring */
    const away = Math.min(1, st.rg * 2.5);
    props.visible = away < 0.99;
    props.position.y = -0.7 * away;
    tBeans.position.y = -0.7 * away;
    tableG.visible = ex < 0.9;
    tableG.scale.setScalar(Math.max(1 - ex * 1.1, 0.0001));
    shadow.material.opacity = 1 - ex;
    tBeans.scale.setScalar(Math.max(1 - ex * 1.6, 0.0001));
    tBeans.visible = ex < 0.62 && away < 0.99;

    /* what is pouring right now */
    const arr = clamp01((st.pxo + 3.45) / 3.0);
    const gate = clamp01((arr - 0.75) / 0.25);
    const milkAmt = st.ms * gate;
    const surf = st.lv;
    const topE = st.my - 0.58;
    const hasE = st.es > 0.05 && topE - surf > 0.1;
    const hasM = milkAmt > 0.05;
    const milkLand = st.pxo + MILK_VX * Math.sqrt((2 * Math.max(0.1, 2.55 - surf)) / GRAV);

    const show = st.lv > 0.12;

    Object.assign(fr, { t, dtP, ex, gone, gate, milkAmt, surf, topE, hasE, hasM, milkLand, show, hx: hero.x, hy: hero.y, hz: hero.z, hs: hero.s });
    liquid.update(st, fr);
    portafilter.update(st, fr);
    pitcher.update(st, fr);
    streams.update(st, fr);
    beans.update(st, fr);
    steam.update(st, fr);
    motes.update(fr);
    dom.update(st, fr, metrics);

    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      onReady();
    }
  };
  gsap.ticker.add(loop);

  return () => {
    gsap.ticker.remove(loop);
    liquid.dispose();
    viewport.dispose();
    timeline.dispose();
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    });
    helpers.texs.forEach((x) => x.dispose());
    renderer.dispose();
  };
}
