import { useRef } from 'react'; import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
// [text, 1 = highlighted in serif italic]
const parts = [['I turn ', 0], ['ideas', 1], [' into working ', 0], ['products.', 1], [' I care about clean code, calm interfaces, and shipping things that people actually use.', 0]];
const words = parts.flatMap(([t, k]) => t.split(' ').filter(Boolean).map(w => ({ w, k })));

const cls = k => `mr-[.28em] inline-block ${k ? 'font-serif text-[1.12em] font-normal italic text-accent' : ''}`;

// Each word fades in and lifts slightly as it is "read", tied 1:1 to scroll. No blur filter: animating a blur on every word
// each scroll frame was by far the most expensive part, and the fade and lift carry the same idea.
function Word({ w, k, p, a, b }) {
    const o = useTransform(p, [a, b], [.12, 1]), y = useTransform(p, [a, b], [14, 0]);
    return <motion.span style={{ opacity: o, y }} className={cls(k)}>{w}</motion.span>
}

export default function ScrollText() {
    const ref = useRef(null), reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
    return (<section id="about" ref={ref} className="grid min-h-[60svh] place-items-center px-5 py-14 sm:px-8 md:min-h-[80vh] md:px-16 md:py-0">
        <div className="max-w-5xl"><p className="mb-6 font-mono text-xs uppercase tracking-[.22em] text-accent md:mb-8">( About )</p>
            <p className="font-display text-3xl font-semibold leading-[1.08] tracking-[-.02em] min-[380px]:text-4xl sm:text-5xl sm:tracking-[-.025em] lg:text-7xl lg:tracking-[-.03em]">
                {words.map((x, i) => reduce ? <span key={i} className={cls(x.k)}>{x.w}</span> : <Word key={i} {...x} p={scrollYProgress} a={i / words.length} b={(i + 1) / words.length} />)}</p></div></section>)
}