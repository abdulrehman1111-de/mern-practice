import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SplitText } from './Text';
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiTailwindcss, SiFirebase, SiHtml5, SiCss, SiMysql } from 'react-icons/si';

const chips = [
    { n: 'React', i: SiReact, c: '#61dafb' }, { n: 'HTML', i: SiHtml5, c: '#e34f26' }, { n: 'Node.js', i: SiNodedotjs, c: '#5fa04e' },
    { n: 'CSS', i: SiCss, c: '#2f9ae0' }, { n: 'MongoDB', i: SiMongodb, c: '#47a248' }, { n: 'JavaScript', i: SiJavascript, c: '#f7df1e' },
    { n: 'Express', i: SiExpress, c: '#e8ecf4' }, { n: 'MySQL', i: SiMysql, c: '#6aa6cf' }, { n: 'Tailwind', i: SiTailwindcss, c: '#38bdf8' }, { n: 'Firebase', i: SiFirebase, c: '#ffca28' }];

const BASE = .29, FAST = 1.05;   // radians per second: calm orbit (~22s per lap) and the hover boost (~6s per lap)
const TILT = -10 * Math.PI / 180;
const ORBIT = { cy: .44, rx: .62, ry: .17 };   // as fractions of the portrait box
const rxOf = w => w >= 380 ? ORBIT.rx : .54;    // slightly tighter orbit on narrow boxes so chips don't spill off the screen
// Critically damped spring (no bounce): settles smoothly and can be interrupted mid-flight without a jump.
const SPRING = { type: 'spring', bounce: 0, duration: .4 };

function Chip({ c, reg }) {
    const I = c.i;
    // No backdrop blur, glow shadows or shine sweep: these chips move every frame, so each of those would be repainted every frame.
    return (<div ref={reg} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
        <div style={{ '--c': c.c }} className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-[#0a1226]/90 px-2.5 py-1.5 transition-[scale,border-color] duration-150 hover:scale-110 hover:border-transparent sm:px-3 sm:py-2">
            <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100" style={{ background: `linear-gradient(135deg,color-mix(in srgb,${c.c} 55%,white),${c.c} 55%,color-mix(in srgb,${c.c} 70%,black))` }} />
            <I size={22} className="relative text-[color:var(--c)] transition-colors duration-150 group-hover:text-bg" />
            <span className="relative text-xs font-medium transition-colors duration-150 group-hover:text-bg">{c.n}</span>
        </div></div>)
}

function Portrait() {
    const box = useRef(null), els = useRef([]), dims = useRef({ w: 0, h: 0 }), hotRef = useRef(false);
    const [hot, setHot] = useState(false), [size, setSize] = useState({ w: 0, h: 0 });
    const set = v => { hotRef.current = v; setHot(v) };
    const mouse = e => e.pointerType === 'mouse';   // touch taps shouldn't trigger the hover state

    useEffect(() => {
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf = 0, running = false, inView = true, last = performance.now(), ang = 0, speed = BASE; const t0 = last + 900;
        const ct = Math.cos(TILT), st = Math.sin(TILT);

        // Puts every chip on the orbit for the current angle. Only transform, opacity and z-index are written: no filters.
        const place = intro => {
            const { w, h } = dims.current, sizeK = Math.min(1, Math.max(.62, w / 460)), rxf = rxOf(w);
            for (let i = 0; i < chips.length; i++) {
                const el = els.current[i]; if (!el) continue;
                const th = ang + i * 2 * Math.PI / chips.length, s = Math.sin(th), co = Math.cos(th);
                const ex = w * rxf * co, ey = h * ORBIT.ry * s;
                const x = w / 2 + ex * ct - ey * st, y = h * ORBIT.cy + ex * st + ey * ct;
                const front = Math.max(0, s), f = front * front * (3 - 2 * front);
                const overlap = Math.min(1, Math.max(0, 1 - (Math.abs(ex) - .18 * w) / (.3 * w)));   // 1 when the chip is over the face/body
                const op = s >= 0 ? 1 - .8 * overlap * f : .55 + .45 * (1 + s);                              // see-through in front of the photo, dimmer behind it
                el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${(.78 + .42 * (s + 1) / 2) * sizeK})`;
                el.style.opacity = (op * intro).toFixed(3);
                el.style.zIndex = s >= 0 ? 30 : 5;
            }
        };

        const tick = now => {
            const dt = Math.max(0, Math.min((now - last) / 1000, .05)); last = now;
            speed += ((hotRef.current ? FAST : BASE) - speed) * Math.min(1, dt * 2.5);   // eased speed change, so hover never jerks the orbit
            ang += speed * dt;
            place(Math.min(1, Math.max(0, (now - t0) / 1200)));
            raf = requestAnimationFrame(tick)
        };

        const ro = new ResizeObserver(([e]) => {
            const w = e.contentRect.width, h = e.contentRect.height; dims.current = { w, h }; setSize({ w, h });
            if (reduce) place(1);   // reduced motion: no animation loop at all, just place the chips once (and again on resize)
        });
        ro.observe(box.current);

        // run the loop only while the hero is on screen and the tab is visible (never under reduced motion)
        const start = () => { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(tick) };
        const stop = () => { running = false; cancelAnimationFrame(raf) };
        const sync = () => !reduce && inView && !document.hidden ? start() : stop();
        const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync() });
        io.observe(box.current);
        document.addEventListener('visibilitychange', sync);
        sync();
        return () => { stop(); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', sync) }
    }, []);

    const { w, h } = size, cx = w / 2, cy = h * ORBIT.cy, rx = w * rxOf(w), ry = h * ORBIT.ry;
    const ring = (cls, front) => <svg className={`pointer-events-none absolute inset-0 overflow-visible ${cls}`} width={w} height={h}>
        {front && <defs><clipPath id="nearHalf"><rect x={-w} y={cy} width={3 * w} height={h} /></clipPath></defs>}
        <g transform={`rotate(-10 ${cx} ${cy})`} clipPath={front ? 'url(#nearHalf)' : undefined}>
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#4f8cff" strokeWidth="1.2" strokeDasharray="2 9" strokeLinecap="round"
                style={{ strokeOpacity: front ? (hot ? .45 : .15) : (hot ? .7 : .3), transition: 'stroke-opacity .3s' }} /></g></svg>;

    return (<div ref={box} onPointerEnter={e => mouse(e) && set(true)} onPointerLeave={e => mouse(e) && set(false)} className="relative mx-auto w-fit max-w-full">
        {/* soft light behind the portrait: a plain radial gradient (no big blur), brightened with opacity and scale only */}
        <div className={`absolute inset-x-[10%] bottom-0 z-0 h-3/4 bg-[radial-gradient(closest-side,rgba(79,140,255,.5),transparent)] transition-[opacity,scale] duration-300 ${hot ? 'scale-110 opacity-100' : 'opacity-50'}`} />
        {w > 0 && ring('z-[4]', false)}
        {hot && <motion.span className="pointer-events-none absolute left-1/2 z-[3] aspect-square w-[70%] -translate-x-1/2 rounded-full border border-accent/60" style={{ top: `${ORBIT.cy * 100 - 35}%` }} initial={{ scale: .6, opacity: .7 }} animate={{ scale: 1.45, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }} />}
        <motion.img src="/portrait.webp" alt="Abdul Rehman" width={848} height={1321} decoding="async" className="relative z-10 block h-auto max-h-[46svh] sm:max-h-[58svh] md:max-h-[82vh]" style={{ maxWidth: '100%', width: 'auto', transformOrigin: '50% 100%' }}
            animate={{ scale: hot ? 1.03 : 1 }} transition={SPRING} />
        {w > 0 && ring('z-20', true)}
        {chips.map((c, i) => <Chip key={c.n} c={c} reg={el => (els.current[i] = el)} />)}
        <motion.p className="pointer-events-none absolute -top-7 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[.25em] text-accent"
            initial={false} animate={{ opacity: hot ? 1 : 0, y: hot ? 0 : 8 }} transition={SPRING}>My stack · {chips.length} technologies</motion.p>
    </div>)
}

export default function Hero() {
    return (<section id="home" className="flex items-center overflow-x-clip px-5 pb-12 pt-4 sm:px-8 md:min-h-[90vh] md:px-16 md:py-10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 min-[1024px]:gap-16">
            <Portrait />
            <div>
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[.22em] text-mute"><span className="h-px w-10 bg-accent" />Hi, I'm</p>
                <SplitText as="h1" inView={false} delay={.7} stagger={.045} className="hover-chars mt-4 block font-display text-5xl font-extrabold leading-[.95] tracking-[-.035em] sm:text-7xl md:mt-5 min-[1024px]:text-8xl" parts={[['Abdul', ''], ['Rehman', 'font-serif font-normal italic tracking-normal text-accent']]} />
                <SplitText as="h2" by="word" inView={false} delay={1.4} className="mt-5 block font-display text-xl font-medium tracking-[-.015em] sm:text-2xl md:mt-6 min-[1024px]:text-3xl" parts={[['Full-Stack', ''], ['MERN', 'font-serif font-normal italic text-[1.15em] text-accent'], ['Developer', '']]} />
                <SplitText as="p" by="word" variant="mask" inView={false} delay={1.8} stagger={.025} className="mt-6 block max-w-md leading-relaxed text-mute md:mt-8" parts={[["I'm a computer science student at the Islamia University of Bahawalpur who builds full-stack web apps with MongoDB, Express, React and Node. I have deployed several projects, and I care about clean code and interfaces that stay out of the user's way.", '']]} />
            </div></div></section>)
}