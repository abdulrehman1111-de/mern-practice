import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data';
import { SplitText } from './Text';
import { SiReact, SiVite, SiTailwindcss, SiFirebase, SiReactrouter, SiHtml5, SiCss, SiJavascript, SiNetlify } from 'react-icons/si';
import { FaFire, FaWandMagicSparkles, FaHardDrive } from 'react-icons/fa6';
const pad = n => String(n).padStart(2, '0');
const N = projects.length;
// Critically damped spring (no bounce): settles smoothly and can be interrupted mid-flight without a jump.
const SPRING = { type: 'spring', bounce: 0, duration: .4 };

function useMq(q) {
    const [m, setM] = useState(() => typeof window !== 'undefined' && matchMedia(q).matches);
    useEffect(() => { const mq = matchMedia(q), f = () => setM(mq.matches); f(); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f) }, [q]);
    return m;
}

/* ================= Mini-UIs shown inside each browser frame (only used when a project has no screenshot) =================
   Static on purpose: looping animations in several cards at once were a constant cost for no information. */
const M0 = ({ t }) => <div className="flex h-full"><div className="w-11 space-y-2 border-r border-white/10 p-2">{[0, 1, 2, 3].map(i => <div key={i} className="h-7 rounded-md" style={{ background: i ? '#ffffff14' : t.a }} />)}</div>
    <div className="flex-1 p-4"><div className="grid grid-cols-3 gap-2">{[0, 1, 2].map(i => <div key={i} className="rounded-lg border border-white/10 bg-white/[.04] p-2"><div className="h-1.5 w-8 rounded bg-white/25" /><div className="mt-2 h-3 w-12 rounded" style={{ background: t.a, opacity: .85 - i * .2 }} /></div>)}</div>
        <svg viewBox="0 0 200 70" className="mt-4 w-full"><defs><linearGradient id="g0" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={t.a} stopOpacity=".35" /><stop offset="1" stopColor={t.a} stopOpacity="0" /></linearGradient></defs>
            <path d="M0 55C25 50 40 20 70 30S120 60 150 25 185 10 200 15V70H0Z" fill="url(#g0)" />
            <path d="M0 55C25 50 40 20 70 30S120 60 150 25 185 10 200 15" fill="none" stroke={t.a} strokeWidth="2.5" strokeLinecap="round" /></svg></div></div>;
const M1 = ({ t }) => <div className="flex h-full items-center gap-6 p-5"><svg viewBox="0 0 100 100" className="w-2/5 shrink-0" style={{ transform: 'rotate(-90deg)' }}>
    {[[0, .45, t.a], [.5, .3, t.c], [.85, .11, '#ffffff66']].map(([s, l, c], i) => <circle key={i} cx="50" cy="50" r="36" fill="none" stroke={c} strokeWidth="12" strokeLinecap="round" pathLength="1" strokeDasharray={`${l} 1`} strokeDashoffset={-s} />)}</svg>
    <div className="flex-1 space-y-3">{['70%', '45%', '85%', '55%'].map((w, i) => <div key={i} className="flex items-center gap-2"><div className="h-5 w-5 rounded-full" style={{ background: t.a + '55' }} /><div className="h-2 rounded" style={{ width: w, background: i % 2 ? t.c : t.a }} /></div>)}</div></div>;
const M2 = ({ t }) => <div className="p-4"><div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5"><div className="h-2 w-2 rounded-full" style={{ background: t.a }} /><span className="text-[10px] text-mute">search dresses</span><span className="h-3 w-px bg-ink" /></div>
    <div className="mt-3 grid grid-cols-3 gap-2">{[0, 1, 2, 3, 4, 5].map(i => <div key={i}><div className="h-16 rounded-md" style={{ backgroundImage: `linear-gradient(${140 + i * 25}deg,${t.a}${['55', '33', '77'][i % 3]},#ffffff10)` }} />
        <div className="mt-1 flex justify-between"><span className="h-1.5 w-8 rounded bg-white/20" /><span className="h-1.5 w-4 rounded" style={{ background: t.a }} /></div></div>)}</div></div>;
const M3 = ({ t }) => <div className="flex h-full items-center justify-around p-5"><div className="relative grid h-36 w-36 place-items-center">
    {[0, 1, 2].map(i => <span key={i} className="absolute inset-0 rounded-full border" style={{ borderColor: t.a, opacity: .5 - i * .15, transform: `scale(${.55 + i * .3})` }} />)}
    <div className="h-16 w-16 rounded-full" style={{ background: `radial-gradient(circle at 35% 30%,#fff,${t.a})` }} /></div>
    <div className="space-y-2">{[0, 1, 2, 3].map(i => <div key={i} className="w-20 rounded-md border border-white/10 bg-white/[.04] p-2"><div className="h-1.5 w-10 rounded bg-white/25" /><div className="mt-1.5 h-1.5 w-6 rounded" style={{ background: t.a, opacity: .8 }} /></div>)}</div></div>;
const MOCKS = [M0, M1, M2, M3];
const pattern = (i, a) => [
    { backgroundImage: `linear-gradient(${a}26 1px,transparent 1px),linear-gradient(90deg,${a}26 1px,transparent 1px)`, backgroundSize: '34px 34px' },
    { backgroundImage: `radial-gradient(${a}66 1.3px,transparent 1.6px)`, backgroundSize: '20px 20px' },
    { backgroundImage: `repeating-linear-gradient(135deg,${a}22 0 1px,transparent 1px 16px)` },
    { backgroundImage: `repeating-radial-gradient(circle at 75% 55%,${a}26 0 1px,transparent 1px 28px)` }][i % 4];

/* ================= Tool icons placed around each preview (static: they show what the project uses) ================= */
const TOOLS = {
    React: [SiReact, '#61dafb'], Vite: [SiVite, '#9f8bff'], Tailwind: [SiTailwindcss, '#38bdf8'], Firebase: [SiFirebase, '#ffca28'], Firestore: [FaFire, '#ff9100'], 'React Router': [SiReactrouter, '#f44250'],
    HTML: [SiHtml5, '#e34f26'], CSS: [SiCss, '#2f9ae0'], JavaScript: [SiJavascript, '#f7df1e'], Netlify: [SiNetlify, '#2ee6d6'], AOS: [FaWandMagicSparkles, '#f472b6'], localStorage: [FaHardDrive, '#fbbf24']
};
const SLOTS = ['-left-7 top-[6%]', '-right-7 top-[16%]', '-right-8 bottom-[22%]', '-left-8 bottom-[10%]', 'left-[30%] -bottom-9', 'right-[30%] -top-9'];
function Orb({ name, slot }) {
    const [I, c] = TOOLS[name] || []; if (!I) return null;
    return (<span role="img" title={name} aria-label={name} className={`absolute z-20 grid h-12 w-12 place-items-center rounded-2xl border ${slot}`}
        style={{ borderColor: c + '77', background: `color-mix(in srgb,${c} 14%,#070b14)` }}><I size={22} style={{ color: c }} /></span>)
}

/* ================= Card =================
   mode: 'lg' = desktop layout, 'md' = tablet (less padding), 'swipe' = compact phone card
   active: this is the card the carousel is on. Highlighting it only changes opacity and scale (no glows, no spinning borders). */
function Card({ p, i, active, mode }) {
    const full = mode !== 'swipe', lg = mode === 'lg';
    const [w1, ...wr] = p.title.split(' ');
    const t = p.theme, M = MOCKS[i % 4];
    const host = p.live.startsWith('http') ? p.live.replace(/^https?:\/\//, '').replace(/\/$/, '') : p.title.toLowerCase().replace(/\s+/g, '') + '.app';
    const grid = lg ? 'gap-10 p-8 md:min-h-[min(31rem,62vh)] md:grid-cols-[1fr_1.15fr] md:px-12 md:py-12'
        : full ? 'gap-8 p-8 md:min-h-[min(31rem,62vh)] md:grid-cols-[1fr_1.15fr] md:px-10 md:py-12'
            : 'gap-5 p-5 sm:p-6';
    const ttl = lg ? 'text-4xl md:text-5xl lg:text-6xl' : full ? 'text-4xl' : 'text-3xl sm:text-4xl';
    return (<motion.article animate={{ opacity: active ? 1 : full ? .35 : .55, scale: active ? 1 : .94 }} transition={SPRING}
        className={`group/card relative shrink-0 rounded-[28px] p-[1.5px] ${full ? 'w-[min(94vw,78rem)]' : 'w-[86vw] max-w-[36rem] snap-start'}`}>
        <div className="absolute inset-0 rounded-[28px] bg-white/10" />
        <div className="absolute inset-0 rounded-[28px] transition-opacity duration-300" style={{ opacity: active ? .8 : .2, background: `linear-gradient(135deg,${t.a},${t.c} 50%,${t.a})` }} />
        <div className="relative overflow-hidden rounded-[27px]" style={{ background: `linear-gradient(135deg,${t.b},#04060b)` }}>
            <div className="absolute inset-0 opacity-70" style={{ ...pattern(i, t.a), WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%,#000,transparent 70%)', maskImage: 'radial-gradient(ellipse at 70% 40%,#000,transparent 70%)' }} />
            {/* soft colored light: plain gradients instead of big blurred, endlessly moving blobs */}
            <div className={`pointer-events-none absolute -right-20 -top-24 ${full ? 'h-80 w-80' : 'h-52 w-52'}`} style={{ background: `radial-gradient(closest-side,${t.a}48,transparent)` }} />
            {full && <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72" style={{ background: `radial-gradient(closest-side,${t.c}33,transparent)` }} />}
            <div className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={{ opacity: active ? .9 : .4, background: `linear-gradient(135deg,${t.a}2e,${t.c}12 45%,transparent 75%)` }} />
            <span className={`pointer-events-none absolute select-none font-display font-bold leading-none ${full ? '-bottom-24 right-4 text-[18rem]' : '-bottom-8 right-2 text-[9rem]'}`} style={{ color: 'transparent', WebkitTextStroke: `1px ${t.a}2a` }}>{pad(i + 1)}</span>
            <div className={`relative grid items-center ${grid}`}>
                <div className={`relative z-10 flex h-full flex-col justify-between ${full ? 'gap-6' : 'gap-5'}`}>
                    <p className="font-mono text-xs tracking-[.22em]" style={{ color: t.a }}>{pad(i + 1)} — {p.type.toUpperCase()}</p>
                    <div><h3 className={`font-display ${ttl} font-bold leading-[1.05] tracking-[-.03em]`} style={{ backgroundImage: `linear-gradient(100deg,#fff 30%,${t.a})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{w1}{wr.length > 0 && <em className="font-serif text-[1.1em] font-normal italic tracking-normal"> {wr.join(' ')}</em>}</h3><p className={`${full ? 'mt-5' : 'mt-3 text-sm'} max-w-md leading-relaxed text-mute`}>{p.desc}</p></div>
                    <div><div className={`flex flex-wrap gap-2 ${full ? 'mb-5' : 'mb-4'}`}>{p.stack.map(s => <span key={s} className="rounded-full border px-3 py-1 font-mono text-xs" style={{ color: t.a, borderColor: t.a + '66' }}>{s}</span>)}</div>
                        <div className="flex items-center gap-3 text-sm"><a href={p.live} target="_blank" rel="noopener noreferrer" className="rounded-full px-6 py-3 font-semibold text-bg transition-[scale] duration-150 hover:scale-[1.03] active:scale-[.97]" style={{ background: `linear-gradient(135deg,${t.a},${t.c})` }}>Live site ↗</a>
                            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-6 py-3 transition-[scale,border-color,color] duration-150 hover:border-[color:var(--ac)] hover:text-ink active:scale-[.97]" style={{ '--ac': t.a }}>Source code</a></div></div>
                </div>
                {full && <div className="relative hidden md:block">
                    <div className="absolute inset-6 rounded-full" style={{ background: `radial-gradient(closest-side,${t.a}59,transparent)` }} />
                    <div className="relative z-10 aspect-[16/9.5] overflow-hidden rounded-xl border border-white/15 bg-bg" style={{ boxShadow: `0 30px 60px -30px ${t.a}77` }}>
                        <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/[.04] px-4">
                            {[0, 1, 2].map(d => <span key={d} className="h-2.5 w-2.5 rounded-full bg-white/20" />)}
                            <span className="ml-3 truncate rounded bg-white/[.06] px-3 py-0.5 text-[11px] text-mute">{host}</span></div>
                        <div className="relative h-[calc(100%-2.25rem)] overflow-hidden [container-type:size]" style={{ background: `linear-gradient(135deg,${t.b},#05070d)` }}>
                            {/* On hover the screenshot scrolls from top to bottom with a transform (cheap), instead of animating object-position (repaints every frame). */}
                            {p.image ? <img src={p.image} alt={p.title} decoding="async" loading={i < 2 ? 'eager' : 'lazy'} className="block min-h-full w-full object-cover object-top transition-[translate] duration-[4s] ease-in-out group-hover/card:[translate:0_min(0px,calc(100cqh_-_100%))]" /> : <M t={t} />}
                        </div>
                    </div>
                    {p.tools.slice(0, SLOTS.length).map((n, k) => <Orb key={n} name={n} slot={SLOTS[k]} />)}
                </div>}
            </div></div></motion.article>)
}

/* ================= Tablet + desktop: vertical scroll pins the view and drives horizontal travel =================
   The motor dial was removed: it repeated the progress bar and the counter, and it re-drew an SVG with a glow filter on every scroll frame. */
function Pinned({ mode }) {
    const sec = useRef(null), track = useRef(null), [maxX, setMaxX] = useState(0), [idx, setIdx] = useState(0), reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: sec, offset: ['start start', 'end end'] });
    const xv = useTransform(scrollYProgress, [0, 1], [0, -maxX]);   // 1:1 with scroll, no smoothing layer on top
    useEffect(() => {
        const m = () => setMaxX((N - 1) * (track.current.firstElementChild.offsetWidth + 24));
        m(); const ro = new ResizeObserver(m); ro.observe(track.current); addEventListener('resize', m);
        return () => { ro.disconnect(); removeEventListener('resize', m) }
    }, []);
    useMotionValueEvent(scrollYProgress, 'change', v => setIdx(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))))));
    const go = d => {
        const n = Math.min(N - 1, Math.max(0, idx + d));
        scrollTo({ top: sec.current.getBoundingClientRect().top + scrollY + (n / (N - 1)) * maxX, behavior: reduce ? 'auto' : 'smooth' })
    };
    const col = projects[idx].theme.a;
    return (<section id="projects" ref={sec} style={{ height: `calc(100vh + ${maxX}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-6 pt-24">
            <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-16">
                <p className="font-mono text-xs tracking-[.22em] text-accent">SELECTED WORK</p>
                <SplitText as="h2" parts={[['Projects', '']]} className="mt-2 block font-display text-5xl font-bold tracking-[-.03em] md:text-7xl" /></div>
            <div className="relative z-10 mt-8">
                <motion.div ref={track} style={{ x: xv }} className="flex w-max gap-6 px-6 md:px-16">
                    {projects.map((p, i) => <Card key={p.title} p={p} i={i} active={i === idx} mode={mode} />)}
                </motion.div></div>
            <div className="relative z-10 mx-auto mt-8 w-full max-w-6xl px-6 md:px-16">
                <div className="h-px bg-white/10"><motion.div style={{ scaleX: scrollYProgress, background: col }} className="h-px origin-left" /></div>
                <div className="mt-4 flex items-center justify-between"><span className="font-mono tabular-nums text-mute">{pad(idx + 1)} / {pad(N)}</span>
                    <div className="flex gap-3">{[['←', -1], ['→', 1]].map(([l, d]) => <button key={l} onClick={() => go(d)} aria-label={d < 0 ? 'Previous' : 'Next'} className="h-11 w-11 rounded-full border border-white/20 transition-[scale,background-color,border-color,color] duration-150 hover:border-accent hover:bg-accent hover:text-bg active:scale-90">{l}</button>)}</div></div>
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
            {projects.map((p, i) => <Card key={p.title} p={p} i={i} active={i === idx} mode="swipe" />)}
        </div>
        <div className="mt-2 px-5 sm:px-8">
            <div className="h-px bg-white/10"><div ref={bar} style={{ background: col, transform: 'scaleX(0)' }} className="h-px origin-left" /></div>
            <div className="mt-4 flex items-center justify-between"><span className="font-mono tabular-nums text-mute">{pad(idx + 1)} / {pad(N)}</span>
                <div className="flex gap-3">{[['←', -1], ['→', 1]].map(([l, d]) => <button key={l} onClick={() => go(d)} aria-label={d < 0 ? 'Previous' : 'Next'} className="h-11 w-11 rounded-full border border-white/20 transition-[scale,background-color,color] duration-100 active:scale-90 active:bg-accent active:text-bg">{l}</button>)}</div></div>
        </div></section>)
}

export default function Projects() {
    // tablets and desktop get the pinned horizontal scroll; phones (and very short landscape screens) get the swipe carousel
    const pin = useMq('(min-width: 768px) and (min-height: 561px)'), lg = useMq('(min-width: 1024px)');
    return pin ? <Pinned mode={lg ? 'lg' : 'md'} /> : <Swipe />
}