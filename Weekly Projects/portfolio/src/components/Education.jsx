import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll } from 'framer-motion';
import { SplitText } from './Text';

// Critically damped spring (no bounce): settles smoothly and can be interrupted mid-flight without a jump.
const SPRING = { type: 'spring', bounce: 0, duration: .5 };

// Edit the copy here. Each card's colors (border, glow, gradient) come from its photo.
const items = [
    {
        school: ['Rangers', 'Public School'], level: 'Matriculation', years: '2020 — 2022', img: '/education/rpc.webp', pos: '50% 55%',
        href: 'https://punjabrangerseducationsystem.com/about-us/',
        blurb: 'Where the foundation was built: the study habits and curiosity that carried into everything after.',
        t: { a: '#9af0b4', label: '#9af0b4', glow: 'rgba(134,239,172,.38)', fill: 'linear-gradient(135deg,rgba(134,239,172,.30),rgba(74,222,128,.10) 45%,rgba(5,7,13,.25))' }
    },
    {
        school: ['Punjab College', 'Bahawalpur'], level: 'Higher Secondary', years: '2022 — 2024', img: '/education/pgc.webp', pos: '50% 45%',
        href: 'https://pgc.edu/campus/bahawalpur/',
        blurb: 'Two focused years of higher secondary that set up the move into computer science.',
        t: { a: '#ffffff', label: '#ffffff', glow: 'rgba(255,255,255,.32)', fill: 'linear-gradient(135deg,rgba(255,255,255,.26),rgba(255,255,255,.07) 45%,rgba(5,7,13,.25))' }
    },
    {
        school: ['Islamia University', 'of Bahawalpur'], level: 'BS Computer Science', years: '2025 — Present', now: true, img: '/education/iub.webp', pos: '50% 60%',
        href: 'https://www.iub.edu.pk/',
        blurb: 'Studying computer science while shipping real projects alongside coursework, including a structured MERN stack course at Code Lab Bahawalpur.',
        t: { a: '#1f9d55', label: '#3fcf80', glow: 'rgba(21,128,61,.6)', fill: 'linear-gradient(135deg,rgba(21,128,61,.5),rgba(6,78,59,.22) 50%,rgba(5,7,13,.25))' }
    }];

// true on tablets and up (matches Tailwind's md breakpoint)
function useMd() {
    const q = '(min-width: 768px)';
    const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
    useEffect(() => { const mq = window.matchMedia(q), f = () => setM(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f) }, []);
    return m;
}

// The active highlight only changes opacity, color and scale (all cheap). No animated box-shadows or filters, and no parallax.
function Card({ it, i, md, reduce }) {
    const ref = useRef(null), t = it.t, flip = i % 2 === 1;
    const rise = { hidden: { opacity: 0, y: reduce ? 0 : 24 }, show: { opacity: 1, y: 0, transition: SPRING } };
    // "active" = the card is crossing the middle band of the screen
    const active = useInView(ref, { margin: '-35% 0px -35% 0px' });
    return (<div className="relative">
        <span className={`absolute -left-[1.5rem] top-10 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 transition-[background-color,border-color,scale] duration-300 sm:-left-[1.75rem] sm:top-12 md:-left-[2.75rem] ${active ? 'scale-125' : ''}`}
            style={{ borderColor: active ? t.a : '#ffffff30', background: active ? t.a : '#05070d' }} />
        <motion.article ref={ref} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }}
            className="relative rounded-[28px] p-[1.5px]"
            style={{ '--c': t.label }}>
            <div className="absolute inset-0 rounded-[28px] bg-white/10" />
            <div className="absolute inset-0 rounded-[28px] transition-opacity duration-300" style={{ opacity: active ? 1 : 0, background: `linear-gradient(135deg,${t.a},${t.a}33 35%,${t.a}33 65%,${t.a})` }} />
            <div className="relative overflow-hidden rounded-[26.5px] bg-[#070b14]">
                <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: active ? 1 : 0, background: t.fill }} />
                <div className={`relative grid items-center gap-6 p-4 sm:p-5 md:gap-8 md:p-8 ${flip ? 'md:grid-cols-[1fr_1.05fr]' : 'md:grid-cols-[1.05fr_1fr]'}`}>
                    <a href={it.href} target="_blank" rel="noreferrer" aria-label={`Visit ${it.school.join(' ')} website`}
                        className={`group/img relative block aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl ${flip ? 'md:order-2' : ''}`}>
                        <img src={it.img} alt={it.school.join(' ')} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: it.pos }} />
                        {/* Dims inactive photos with a plain opacity layer instead of an animated grayscale filter. */}
                        <div className="absolute inset-0 bg-[#05070d] transition-opacity duration-300" style={{ opacity: !md || active ? 0 : .5 }} />
                        <div className="absolute inset-0 transition-opacity duration-300" style={{ background: `linear-gradient(to top,${t.glow},transparent 55%)`, opacity: active ? .8 : .2 }} />
                        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 font-mono text-xs md:left-4 md:top-4">
                            {it.now && <span className="relative flex h-2 w-2"><span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${active ? 'motion-safe:animate-ping' : 'hidden'}`} style={{ background: t.label }} /><span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: t.label }} /></span>}
                            {it.years}</div>
                        <div className="absolute bottom-4 right-4 translate-y-2 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.18em] text-white opacity-0 transition-[opacity,translate] duration-200 group-hover/img:translate-y-0 group-hover/img:opacity-100 max-md:hidden">Visit site ↗</div>
                    </a>
                    <div className={flip ? 'md:order-1' : ''}>
                        <p className="font-mono text-xs uppercase tracking-[.22em] text-[color:var(--c)]">( 0{i + 1} ) {it.level}</p>
                        <SplitText as="h3" by="word" className="mt-3 block font-display text-3xl font-bold leading-[1.02] tracking-[-.03em] sm:text-4xl md:mt-4 md:text-5xl"
                            parts={[[it.school[0], ''], [it.school[1], 'font-serif font-normal italic text-[1.1em] tracking-normal text-[color:var(--c)]']]} />
                        <p className="mt-4 max-w-md leading-relaxed text-mute md:mt-5">{it.blurb}</p>
                    </div>
                </div></div></motion.article></div>)
}

export default function Education() {
    const ref = useRef(null), md = useMd(), reduce = useReducedMotion();
    // The line fills 1:1 with scroll. No spring smoothing on top, so it never lags behind the finger.
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.6'] });
    return (<section id="education" className="px-5 py-16 sm:px-8 md:px-16 md:py-24">
        <div className="mx-auto max-w-6xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[.22em] text-accent">( Journey )</p>
            <SplitText as="h2" className="block font-display text-4xl font-bold tracking-[-.03em] sm:text-6xl md:text-7xl" parts={[['Education', ''], ['&', 'font-serif font-normal italic text-accent'], ['Journey', '']]} />
            <div ref={ref} className="relative mt-12 space-y-8 pl-8 sm:pl-10 md:mt-16 md:space-y-14 md:pl-16">
                <div className="absolute bottom-0 left-2 top-0 w-px bg-white/10 sm:left-3 md:left-5" />
                <motion.div style={{ scaleY: scrollYProgress, background: 'linear-gradient(to bottom,#9af0b4,#ffffff,#1f9d55)' }} className="absolute bottom-0 left-2 top-0 w-px origin-top sm:left-3 md:left-5" />
                {items.map((it, i) => <Card key={it.years} it={it} i={i} md={md} reduce={reduce} />)}
            </div></div></section>)
}