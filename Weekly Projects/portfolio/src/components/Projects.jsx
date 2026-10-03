import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { projects } from '../data';
import { SplitText } from './Text';
import { SiReact, SiVite, SiTailwindcss, SiFirebase, SiReactrouter, SiHtml5, SiCss, SiJavascript, SiNetlify } from 'react-icons/si';
import { FaFire, FaWandMagicSparkles, FaHardDrive } from 'react-icons/fa6';
const pad = n => String(n).padStart(2, '0');
const N = projects.length;
const loop = (d, x = {}) => ({ duration: d, repeat: Infinity, ease: 'easeInOut', ...x });

function useMq(q) {
    const [m, setM] = useState(() => typeof window !== 'undefined' && matchMedia(q).matches);
    useEffect(() => { const mq = matchMedia(q), f = () => setM(mq.matches); f(); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f) }, [q]);
    return m;
}

/* ================= MOTOR: appears only while the projects are scrolling (desktop only) ================= */
function Motor({ progress, color, idx }) {
    const [on, setOn] = useState(false);
    useMotionValueEvent(progress, 'change', v => setOn(v > .03 && v < .97));
    const vis = useTransform(progress, [0, .04, .96, 1], [0, 1, 1, 0]);
    const sx = useTransform(progress, [0, .04, .96, 1], [-90, 0, 0, -90]);
    const sc = useTransform(progress, [0, .04, .96, 1], [.6, 1, 1, .6]);
    const rotor = useSpring(useTransform(progress, [0, 1], [0, 2880]), { stiffness: 70, damping: 18, mass: .8 });
    const field = useTransform(rotor, v => -v * 1.8);
    return (<motion.div style={{ opacity: vis, x: sx, scale: sc, pointerEvents: on ? 'auto' : 'none' }} className="absolute left-[5rem] top-1/2 z-30 hidden -translate-y-1/2 md:block">
        <div className="w-36 transition-opacity duration-300 hover:opacity-35" style={{ color, filter: `drop-shadow(0 0 18px ${color}88)` }}>
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" style={{ transition: 'color .6s' }}>
                <g strokeWidth="1.5" opacity=".45">{Array.from({ length: 48 }, (_, i) => <line key={i} x1="100" y1="3" x2="100" y2={i % 4 ? 8 : 14} transform={`rotate(${i * 7.5} 100 100)`} />)}</g>
                <g transform="rotate(-90 100 100)"><circle cx="100" cy="100" r="86" strokeWidth="4" opacity=".15" /><motion.circle cx="100" cy="100" r="86" strokeWidth="4" strokeLinecap="round" style={{ pathLength: progress }} /></g>
                <circle cx="100" cy="100" r="74" fill="#060a14" strokeWidth="2" />
                {Array.from({ length: 12 }, (_, i) => <rect key={i} x="93" y="31" width="14" height="17" rx="3" fill="currentColor" fillOpacity=".08" strokeWidth="1.5" transform={`rotate(${i * 30} 100 100)`} />)}
                <motion.g style={{ rotate: field }}><circle cx="100" cy="100" r="70" stroke="none" />{[0, 120, 240].map(a => <rect key={a} x="93" y="31" width="14" height="17" rx="3" fill="currentColor" fillOpacity=".95" stroke="none" transform={`rotate(${a} 100 100)`} />)}</motion.g>
                <motion.g style={{ rotate: rotor }}><circle cx="100" cy="100" r="46" fill="#0a1020" strokeWidth="2" />
                    {Array.from({ length: 8 }, (_, i) => <rect key={i} x="95.5" y="60" width="9" height="22" rx="4.5" fill="currentColor" fillOpacity=".35" strokeWidth="1" transform={`rotate(${i * 45} 100 100)`} />)}
                    <circle cx="100" cy="57" r="4" fill="#fff" stroke="none" /></motion.g>
                <circle cx="100" cy="100" r="22" fill="#05070d" strokeWidth="2.5" />
                <text x="100" y="106" textAnchor="middle" fill="currentColor" stroke="none" fontSize="17" fontWeight="700" className="font-display">{pad(idx + 1)}</text>
            </svg>
        </div></motion.div>)
}

/* ================= Animated mini-UIs shown inside each browser frame ================= */
const M0 = ({ t }) => <div className="flex h-full"><div className="w-11 space-y-2 border-r border-white/10 p-2">{[0, 1, 2, 3].map(i => <div key={i} className="h-7 rounded-md" style={{ background: i ? '#ffffff14' : t.a }} />)}</div>
    <div className="flex-1 p-4"><div className="grid grid-cols-3 gap-2">{[0, 1, 2].map(i => <div key={i} className="rounded-lg border border-white/10 bg-white/[.04] p-2"><div className="h-1.5 w-8 rounded bg-white/25" /><div className="mt-2 h-3 w-12 rounded" style={{ background: t.a, opacity: .85 - i * .2 }} /></div>)}</div>
        <svg viewBox="0 0 200 70" className="mt-4 w-full"><defs><linearGradient id="g0" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={t.a} stopOpacity=".35" /><stop offset="1" stopColor={t.a} stopOpacity="0" /></linearGradient></defs>
            <path d="M0 55C25 50 40 20 70 30S120 60 150 25 185 10 200 15V70H0Z" fill="url(#g0)" />
            <motion.path d="M0 55C25 50 40 20 70 30S120 60 150 25 185 10 200 15" fill="none" stroke={t.a} strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={loop(2.4, { repeatType: 'reverse' })} /></svg></div></div>;
const M1 = ({ t }) => <div className="flex h-full items-center gap-6 p-5"><motion.svg viewBox="0 0 100 100" className="w-2/5 shrink-0" animate={{ rotate: [-90, 270] }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
    {[[0, .45, t.a], [.5, .3, t.c], [.85, .11, '#ffffff66']].map(([s, l, c], i) => <circle key={i} cx="50" cy="50" r="36" fill="none" stroke={c} strokeWidth="12" strokeLinecap="round" pathLength="1" strokeDasharray={`${l} 1`} strokeDashoffset={-s} />)}</motion.svg>
    <div className="flex-1 space-y-3">{[0, 1, 2, 3].map(i => <div key={i} className="flex items-center gap-2"><div className="h-5 w-5 rounded-full" style={{ background: t.a + '55' }} /><motion.div className="h-2 rounded" style={{ background: i % 2 ? t.c : t.a }} animate={{ width: ['25%', '80%', '25%'] }} transition={loop(3 + i)} /></div>)}</div></div>;
const M2 = ({ t }) => <div className="p-4"><div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5"><div className="h-2 w-2 rounded-full" style={{ background: t.a }} /><span className="text-[10px] text-mute">search dresses</span><motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="h-3 w-px bg-ink" /></div>
    <div className="mt-3 grid grid-cols-3 gap-2">{[0, 1, 2, 3, 4, 5].map(i => <div key={i}><motion.div className="h-16 rounded-md" style={{ backgroundImage: `linear-gradient(${140 + i * 25}deg,${t.a}${['55', '33', '77'][i % 3]},#ffffff10)`, backgroundSize: '250% 250%' }} animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }} transition={loop(6 + i)} />
        <div className="mt-1 flex justify-between"><span className="h-1.5 w-8 rounded bg-white/20" /><span className="h-1.5 w-4 rounded" style={{ background: t.a }} /></div></div>)}</div></div>;
const M3 = ({ t }) => <div className="flex h-full items-center justify-around p-5"><div className="relative grid h-36 w-36 place-items-center">
    {[0, 1, 2].map(i => <motion.span key={i} className="absolute inset-0 rounded-full border" style={{ borderColor: t.a }} animate={{ scale: [.5, 1.4], opacity: [.6, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: 'easeOut' }} />)}
    <motion.div className="h-16 w-16 rounded-full" style={{ background: `radial-gradient(circle at 35% 30%,#fff,${t.a})` }} animate={{ scale: [1, 1.25, 1] }} transition={loop(4)} /></div>
    <div className="space-y-2">{[0, 1, 2, 3].map(i => <div key={i} className="w-20 rounded-md border border-white/10 bg-white/[.04] p-2"><div className="h-1.5 w-10 rounded bg-white/25" /><div className="mt-1.5 h-1.5 w-6 rounded" style={{ background: t.a, opacity: .8 }} /></div>)}</div></div>;
const MOCKS = [M0, M1, M2, M3];
const pattern = (i, a) => [
    { backgroundImage: `linear-gradient(${a}26 1px,transparent 1px),linear-gradient(90deg,${a}26 1px,transparent 1px)`, backgroundSize: '34px 34px' },
    { backgroundImage: `radial-gradient(${a}66 1.3px,transparent 1.6px)`, backgroundSize: '20px 20px' },
    { backgroundImage: `repeating-linear-gradient(135deg,${a}22 0 1px,transparent 1px 16px)` },
    { backgroundImage: `repeating-radial-gradient(circle at 75% 55%,${a}26 0 1px,transparent 1px 28px)` }][i % 4];

/* ================= Floating tool icons around each preview ================= */
const TOOLS = {
    React: [SiReact, '#61dafb'], Vite: [SiVite, '#9f8bff'], Tailwind: [SiTailwindcss, '#38bdf8'], Firebase: [SiFirebase, '#ffca28'], Firestore: [FaFire, '#ff9100'], 'React Router': [SiReactrouter, '#f44250'],
    HTML: [SiHtml5, '#e34f26'], CSS: [SiCss, '#2f9ae0'], JavaScript: [SiJavascript, '#f7df1e'], Netlify: [SiNetlify, '#2ee6d6'], AOS: [FaWandMagicSparkles, '#f472b6'], localStorage: [FaHardDrive, '#fbbf24']
};
const SLOTS = ['-left-7 top-[6%]', '-right-7 top-[16%]', '-right-8 bottom-[22%]', '-left-8 bottom-[10%]', 'left-[30%] -bottom-9', 'right-[30%] -top-9'];
function Orb({ name, slot, k, blur }) {
    const [I, c] = TOOLS[name] || []; if (!I) return null;
    return (<motion.span title={name} aria-label={name} className={`absolute z-20 grid h-12 w-12 place-items-center rounded-2xl border transition-[scale,box-shadow] duration-300 hover:scale-125 ${blur ? 'backdrop-blur-md' : ''} ${slot}`}
        style={{ borderColor: c + '77', background: `color-mix(in srgb,${c} 14%,#070b14)`, boxShadow: `0 12px 32px -8px ${c}99` }}
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }} transition={loop(3.6 + k * .6, { delay: k * .4 })}><I size={22} style={{ color: c }} /></motion.span>)
}

/* ================= Card =================
   mode: 'lg' = your original desktop layout, 'md' = tablet (no motor dial, less padding), 'swipe' = compact phone card
   near: this card is the active one or next to it, so its preview animations should run
   anim: this card is the active one and on screen, so its border sweep + blobs should run */
function Card({ p, i, active, mode, near, anim }) {
    const full = mode !== 'swipe', lg = mode === 'lg';
    const [w1, ...wr] = p.title.split(' ');
    const t = p.theme, M = MOCKS[i % 4], x = useMotionValue(0), y = useMotionValue(0);
    const rx = useSpring(useTransform(y, [-.5, .5], [7, -7]), { stiffness: 150, damping: 20 });
    const ry = useSpring(useTransform(x, [-.5, .5], [-9, 9]), { stiffness: 150, damping: 20 });
    const move = e => {
        const r = e.currentTarget.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        x.set(px - .5); y.set(py - .5); e.currentTarget.style.setProperty('--x', px * 100 + '%'); e.currentTarget.style.setProperty('--y', py * 100 + '%')
    };
    const leave = () => { x.set(0); y.set(0) };
    const host = p.live.startsWith('http') ? p.live.replace(/^https?:\/\//, '').replace(/\/$/, '') : p.title.toLowerCase().replace(/\s+/g, '') + '.app';
    const sweep = `conic-gradient(from var(--a),transparent 0 55%,${t.a} 78%,#fff 90%,${t.c} 96%,transparent)`;
    const grid = lg ? 'gap-10 p-8 md:min-h-[min(31rem,62vh)] md:grid-cols-[1fr_1.15fr] md:py-12 md:pl-44 md:pr-12'
        : full ? 'gap-8 p-8 md:min-h-[min(31rem,62vh)] md:grid-cols-[1fr_1.15fr] md:px-10 md:py-12'
            : 'gap-5 p-5 sm:p-6';
    const ttl = lg ? 'text-4xl md:text-5xl lg:text-6xl' : full ? 'text-4xl' : 'text-3xl sm:text-4xl';
    return (<motion.article onMouseMove={full ? move : undefined} onMouseLeave={full ? leave : undefined} animate={{ opacity: active ? 1 : full ? .35 : .55, scale: active ? 1 : .94 }} transition={{ duration: .5 }}
        className={`group relative shrink-0 rounded-[28px] p-[1.5px] transition-shadow duration-700 [--x:50%] [--y:50%] ${full ? 'w-[min(94vw,78rem)]' : 'w-[86vw] max-w-[36rem] snap-start'}`}
        style={{ boxShadow: active ? (full ? `0 0 0 1px ${t.a}22,0 0 70px ${t.a}40` : `0 0 0 1px ${t.a}22,0 0 24px ${t.a}33`) : '0 0 0 0 transparent' }}>
        {full && <div className="pointer-events-none absolute -inset-2 rounded-[36px] opacity-25 blur-2xl transition-opacity duration-700 group-hover:opacity-90 group-hover:[animation:spinborder_6s_linear_infinite]" style={{ background: sweep }} />}
        <div className="absolute inset-0 rounded-[28px] bg-white/10" />
        <div className="absolute inset-0 rounded-[28px] opacity-30 transition-opacity duration-700 group-hover:opacity-100" style={{ background: `linear-gradient(135deg,${t.a},${t.c} 50%,${t.a})` }} />
        <div className="absolute inset-0 rounded-[28px]" style={{ background: sweep, animation: anim ? 'spinborder 6s linear infinite' : 'none' }} />
        <div className="relative overflow-hidden rounded-[27px]" style={{ background: `linear-gradient(135deg,${t.b},#04060b)` }}>
            <div className="absolute inset-0 opacity-70" style={{ ...pattern(i, t.a), WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%,#000,transparent 70%)', maskImage: 'radial-gradient(ellipse at 70% 40%,#000,transparent 70%)' }} />
            <motion.div className={`absolute -right-20 -top-24 rounded-full ${full ? 'h-80 w-80 blur-3xl' : 'h-52 w-52 blur-2xl'}`} style={{ background: t.a, opacity: .28 }}
                animate={anim ? { x: [0, -60, 0], y: [0, 50, 0] } : { x: 0, y: 0 }} transition={anim ? loop(9) : { duration: .6 }} />
            {full && <motion.div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full blur-3xl" style={{ background: t.c, opacity: .2 }}
                animate={anim ? { x: [0, 70, 0], y: [0, -40, 0] } : { x: 0, y: 0 }} transition={anim ? loop(11) : { duration: .6 }} />}
            {full && <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(560px circle at var(--x) var(--y),${t.a}2e,transparent 60%)` }} />}
            <div className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-100" style={{ background: `linear-gradient(135deg,${t.a}2e,${t.c}12 45%,transparent 75%)` }} />
            {full && <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 skew-x-12 bg-white/[.07] blur-md transition-transform duration-[1400ms] ease-out group-hover:translate-x-[600%]" />}
            <span className={`pointer-events-none absolute select-none font-display font-bold leading-none ${full ? '-bottom-24 right-4 text-[18rem]' : '-bottom-8 right-2 text-[9rem]'}`} style={{ color: 'transparent', WebkitTextStroke: `1px ${t.a}2a` }}>{pad(i + 1)}</span>
            <div className={`relative grid items-center ${grid}`}>
                <div className={`relative z-10 flex h-full flex-col justify-between ${full ? 'gap-6' : 'gap-5'}`}>
                    <p className="font-mono text-xs tracking-[.22em]" style={{ color: t.a }}>{pad(i + 1)} — {p.type.toUpperCase()}</p>
                    <div><h3 className={`font-display ${ttl} font-bold leading-[1.05] tracking-[-.03em]`} style={{ backgroundImage: `linear-gradient(100deg,#fff 30%,${t.a})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{w1}{wr.length > 0 && <em className="font-serif text-[1.1em] font-normal italic tracking-normal"> {wr.join(' ')}</em>}</h3><p className={`${full ? 'mt-5' : 'mt-3 text-sm'} max-w-md leading-relaxed text-mute`}>{p.desc}</p></div>
                    <div><div className={`flex flex-wrap gap-2 ${full ? 'mb-5' : 'mb-4'}`}>{p.stack.map(s => <span key={s} className="rounded-full border px-3 py-1 font-mono text-xs" style={{ color: t.a, borderColor: t.a + '66' }}>{s}</span>)}</div>
                        <div className="flex items-center gap-3 text-sm"><a href={p.live} target="_blank" rel="noopener noreferrer" className="rounded-full px-6 py-3 font-semibold text-bg transition hover:scale-105" style={{ background: `linear-gradient(135deg,${t.a},${t.c})`, boxShadow: `0 0 28px ${t.a}77` }}>Live site ↗</a>
                            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-6 py-3 transition hover:text-ink" onMouseEnter={e => e.currentTarget.style.borderColor = t.a} onMouseLeave={e => e.currentTarget.style.borderColor = ''}>Source code</a></div></div>
                </div>
                {full && <div className="relative hidden md:block">
                    <div className="absolute inset-6 rounded-full blur-3xl" style={{ background: t.a, opacity: .35 }} />
                    {near && <motion.svg viewBox="0 0 100 100" className="absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}><circle cx="50" cy="50" r="49" fill="none" stroke={t.a} strokeOpacity=".45" strokeDasharray="1 3" strokeWidth=".5" /></motion.svg>}
                    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, boxShadow: `0 40px 90px -25px ${t.a}77` }} className="relative z-10 aspect-[16/9.5] overflow-hidden rounded-xl border border-white/15 bg-bg">
                        <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/[.04] px-4">
                            {[0, 1, 2].map(d => <span key={d} className="h-2.5 w-2.5 rounded-full bg-white/20" />)}
                            <span className="ml-3 truncate rounded bg-white/[.06] px-3 py-0.5 text-[11px] text-mute">{host}</span></div>
                        <div className="relative h-[calc(100%-2.25rem)] overflow-hidden" style={{ background: `linear-gradient(135deg,${t.b},#05070d)` }}>
                            {p.image ? <img src={p.image} alt={p.title} decoding="async" loading={i < 2 ? 'eager' : 'lazy'} className="h-full w-full object-cover object-top transition-[object-position] duration-[5s] ease-in-out group-hover:object-bottom" /> : near ? <M t={t} /> : null}
                            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(320px circle at var(--x) var(--y),rgba(255,255,255,.13),transparent 60%)' }} /></div>
                    </motion.div>
                    {near && p.tools.slice(0, SLOTS.length).map((n, k) => <Orb key={n} name={n} slot={SLOTS[k]} k={k} blur={lg} />)}
                </div>}
            </div></div></motion.article>)
}

/* ================= Tablet + desktop: vertical scroll pins the view and drives horizontal travel ================= */
function Pinned({ mode }) {
    const sec = useRef(null), track = useRef(null), [maxX, setMaxX] = useState(0), [idx, setIdx] = useState(0);
    const live = useInView(sec, { margin: '200px 0px 200px 0px' }), reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: sec, offset: ['start start', 'end end'] });
    const xv = useTransform(scrollYProgress, [0, 1], [0, -maxX]);
    useEffect(() => {
        const m = () => setMaxX((N - 1) * (track.current.firstElementChild.offsetWidth + 24));
        m(); const ro = new ResizeObserver(m); ro.observe(track.current); addEventListener('resize', m);
        return () => { ro.disconnect(); removeEventListener('resize', m) }
    }, []);
    useMotionValueEvent(scrollYProgress, 'change', v => setIdx(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))))));
    const go = d => {
        const n = Math.min(N - 1, Math.max(0, idx + d));
        scrollTo({ top: sec.current.getBoundingClientRect().top + scrollY + (n / (N - 1)) * maxX, behavior: 'smooth' })
    };
    const col = projects[idx].theme.a;
    return (<section id="projects" ref={sec} style={{ height: `calc(100vh + ${maxX}px)` }}>
        <style>{`@property --a{syntax:'<angle>';inherits:false;initial-value:0deg}@keyframes spinborder{to{--a:360deg}}`}</style>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-6 pt-24">
            <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-16">
                <p className="font-mono text-xs tracking-[.22em] text-accent">SELECTED WORK</p>
                <SplitText as="h2" parts={[['Projects', '']]} className="mt-2 block font-display text-5xl font-bold tracking-[-.03em] md:text-7xl" /></div>
            <div className="relative z-10 mt-8">
                {mode === 'lg' && <Motor progress={scrollYProgress} color={col} idx={idx} />}
                <motion.div ref={track} style={{ x: xv }} className="flex w-max gap-6 px-6 md:px-16">
                    {projects.map((p, i) => <Card key={p.title} p={p} i={i} active={i === idx} mode={mode} near={live && Math.abs(i - idx) <= 1} anim={live && i === idx && !reduce} />)}
                </motion.div></div>
            <div className="relative z-10 mx-auto mt-8 w-full max-w-6xl px-6 md:px-16">
                <div className="h-px bg-white/10"><motion.div style={{ scaleX: scrollYProgress, background: col }} className="h-px origin-left" /></div>
                <div className="mt-4 flex items-center justify-between"><span className="font-mono tabular-nums text-mute">{pad(idx + 1)} / {pad(N)}</span>
                    <div className="flex gap-3">{[['←', -1], ['→', 1]].map(([l, d]) => <button key={l} onClick={() => go(d)} aria-label={d < 0 ? 'Previous' : 'Next'} className="h-11 w-11 rounded-full border border-white/20 transition hover:border-accent hover:bg-accent hover:text-bg">{l}</button>)}</div></div>
            </div></div></section>)
}

/* ================= Phones: native swipe carousel (no pinned scrolling, no height limits) ================= */
function Swipe() {
    const box = useRef(null), bar = useRef(null), raf = useRef(0), [idx, setIdx] = useState(0), reduce = useReducedMotion();
    useEffect(() => () => cancelAnimationFrame(raf.current), []);
    const onScroll = () => {
        if (raf.current) return;
        raf.current = requestAnimationFrame(() => {
            raf.current = 0;
            const el = box.current; if (!el) return;
            const max = el.scrollWidth - el.clientWidth;
            bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, el.scrollLeft / max) : 0})`;
            const c = el.scrollLeft + el.clientWidth / 2; let b = 0, bd = 1e9;
            for (let i = 0; i < el.children.length; i++) { const ch = el.children[i], d = Math.abs(ch.offsetLeft + ch.offsetWidth / 2 - c); if (d < bd) { bd = d; b = i } }
            setIdx(b)
        })
    };
    const go = d => {
        const el = box.current, n = Math.min(N - 1, Math.max(0, idx + d));
        el.scrollTo({ left: el.children[n].offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: reduce ? 'auto' : 'smooth' })
    };
    const col = projects[idx].theme.a;
    return (<section id="projects" className="pb-14 pt-20 sm:pb-16">
        <div className="px-5 sm:px-8">
            <p className="font-mono text-xs tracking-[.22em] text-accent">SELECTED WORK</p>
            <SplitText as="h2" parts={[['Projects', '']]} className="mt-2 block font-display text-4xl font-bold tracking-[-.03em] sm:text-5xl" /></div>
        <div ref={box} onScroll={onScroll} role="region" aria-label="Projects"
            className="relative mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 py-5 scroll-px-5 [scrollbar-width:none] sm:px-8 sm:scroll-px-8 [&::-webkit-scrollbar]:hidden">
            {projects.map((p, i) => <Card key={p.title} p={p} i={i} active={i === idx} mode="swipe" near={false} anim={false} />)}
        </div>
        <div className="mt-2 px-5 sm:px-8">
            <div className="h-px bg-white/10"><div ref={bar} style={{ background: col, transform: 'scaleX(0)' }} className="h-px origin-left" /></div>
            <div className="mt-4 flex items-center justify-between"><span className="font-mono tabular-nums text-mute">{pad(idx + 1)} / {pad(N)}</span>
                <div className="flex gap-3">{[['←', -1], ['→', 1]].map(([l, d]) => <button key={l} onClick={() => go(d)} aria-label={d < 0 ? 'Previous' : 'Next'} className="h-11 w-11 rounded-full border border-white/20 transition active:bg-accent active:text-bg">{l}</button>)}</div></div>
        </div></section>)
}

export default function Projects() {
    // tablets and desktop get the pinned horizontal scroll; phones (and very short landscape screens) get the swipe carousel
    const pin = useMq('(min-width: 768px) and (min-height: 561px)'), lg = useMq('(min-width: 1024px)');
    return pin ? <Pinned mode={lg ? 'lg' : 'md'} /> : <Swipe />
}