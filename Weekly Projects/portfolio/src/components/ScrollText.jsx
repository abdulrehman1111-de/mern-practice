import { useEffect, useRef, useState } from 'react'; import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
// [text, 1 = highlighted in serif italic]
const parts = [['I turn ', 0], ['ideas', 1], [' into working ', 0], ['products.', 1], [' I care about clean code, calm interfaces, and shipping things that people actually use.', 0]];
const words = parts.flatMap(([t, k]) => t.split(' ').filter(Boolean).map(w => ({ w, k })));

// true on tablets and up (matches Tailwind's md breakpoint)
function useMd() {
    const q = '(min-width: 768px)';
    const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
    useEffect(() => { const mq = window.matchMedia(q), f = () => setM(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f) }, []);
    return m
}

const cls = k => `mr-[.28em] inline-block ${k ? 'font-serif text-[1.12em] font-normal italic text-accent' : ''}`;

// tablets + desktop: fade, lift and un-blur as each word is "read"
function Word({ w, k, p, a, b }) {
    const o = useTransform(p, [a, b], [.12, 1]), bl = useTransform(p, [a, b], [8, 0]), y = useTransform(p, [a, b], [14, 0]);
    const filter = useMotionTemplate`blur(${bl}px)`;
    return <motion.span style={{ opacity: o, filter, y }} className={cls(k)}>{w}</motion.span>
}

// phones: same effect without the blur (animating a blur filter on every word each scroll frame is too heavy for phones)
function WordLite({ w, k, p, a, b }) {
    const o = useTransform(p, [a, b], [.12, 1]), y = useTransform(p, [a, b], [14, 0]);
    return <motion.span style={{ opacity: o, y }} className={cls(k)}>{w}</motion.span>
}

export default function ScrollText() {
    const ref = useRef(null), md = useMd(), reduce = useReducedMotion(), W = md ? Word : WordLite;
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
    return (<section id="about" ref={ref} className="grid min-h-[60svh] place-items-center px-5 py-14 sm:px-8 md:min-h-[80vh] md:px-16 md:py-0">
        <div className="max-w-5xl"><p className="mb-6 font-mono text-xs uppercase tracking-[.22em] text-accent md:mb-8">( About )</p>
            <p className="font-display text-3xl font-semibold leading-[1.08] tracking-[-.025em] min-[380px]:text-4xl sm:text-5xl lg:text-7xl">
                {words.map((x, i) => reduce ? <span key={i} className={cls(x.k)}>{x.w}</span> : <W key={i} {...x} p={scrollYProgress} a={i / words.length} b={(i + 1) / words.length} />)}</p></div></section>)
}