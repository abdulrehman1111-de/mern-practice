import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SplitText } from './Text';
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiTailwindcss, SiFirebase, SiHtml5, SiCss, SiMysql } from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';

// Critically damped spring (no bounce): settles smoothly and can be interrupted mid-flight without a jump.
const SPRING = { type: 'spring', bounce: 0, duration: .5 };

// n: name, k: label, c: brand color, d: official docs link
const stack = [
    { n: 'HTML', k: 'MARKUP', i: SiHtml5, c: '#e34f26', d: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { n: 'CSS', k: 'STYLING', i: SiCss, c: '#2f9ae0', d: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { n: 'JavaScript', k: 'LANGUAGE', i: SiJavascript, c: '#f7df1e', d: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { n: 'Java', k: 'LANGUAGE', i: FaJava, c: '#f89820', d: 'https://docs.oracle.com/en/java/javase/' },
    { n: 'React', k: 'LIBRARY', i: SiReact, c: '#61dafb', d: 'https://react.dev/learn' },
    { n: 'Tailwind', k: 'FRAMEWORK', i: SiTailwindcss, c: '#38bdf8', d: 'https://tailwindcss.com/docs' },
    { n: 'Node.js', k: 'RUNTIME', i: SiNodedotjs, c: '#5fa04e', d: 'https://nodejs.org/docs/latest/api/' },
    { n: 'Express', k: 'FRAMEWORK', i: SiExpress, c: '#e8ecf4', d: 'https://expressjs.com/' },
    { n: 'MongoDB', k: 'DATABASE', i: SiMongodb, c: '#47a248', d: 'https://www.mongodb.com/docs/' },
    { n: 'MySQL', k: 'DATABASE', i: SiMysql, c: '#6aa6cf', d: 'https://dev.mysql.com/doc/' },
    { n: 'Firebase', k: 'PLATFORM', i: SiFirebase, c: '#ffca28', d: 'https://firebase.google.com/docs' }];

// No spinning gradient borders, glow shadows or shine sweeps: there are 22 pills moving at once, so each of those
// would have been repainted every frame. The brand color now sits in a still border, and hover fills the pill.
function Pill({ t, tab }) {
    const I = t.i, mix = (p, w) => `color-mix(in srgb,${t.c} ${p}%,${w})`;
    return (<a href={t.d} target="_blank" rel="noopener noreferrer" aria-label={`${t.n} documentation`} tabIndex={tab} style={{ '--c': t.c }}
        className="group/p relative block shrink-0 rounded-full p-[1.5px] transition-[scale] duration-150 hover:scale-[1.06] active:scale-[.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <span className="absolute inset-0 rounded-full bg-white/10" />
        <span className="absolute inset-0 rounded-full" style={{ background: mix(35, 'transparent') }} />
        <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-150 group-hover/p:opacity-100 max-md:hidden" style={{ background: `linear-gradient(135deg,${mix(60, 'white')},${t.c})` }} />
        <span className="relative flex items-center gap-2.5 overflow-hidden rounded-full py-2.5 pl-2.5 pr-5 md:gap-3 md:py-3 md:pl-3 md:pr-6" style={{ background: `linear-gradient(135deg,${mix(26, '#0a0f1c')},#070b14 75%)` }}>
            <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/p:opacity-100 max-md:hidden" style={{ background: `linear-gradient(135deg,${mix(60, 'white')},${t.c} 55%,${mix(70, 'black')})` }} />
            <span className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.06] transition-colors duration-150 group-hover/p:border-black/10 group-hover/p:bg-black/10 md:h-11 md:w-11"><I size={22} className="text-[color:var(--c)] transition-colors duration-150 group-hover/p:text-bg" /></span>
            <span className="relative leading-tight"><span className="block font-display text-base font-semibold transition-colors duration-150 group-hover/p:text-bg md:text-lg">{t.n}</span>
                <span className="block font-mono text-[10px] tracking-[.2em] text-mute transition-colors duration-150 group-hover/p:text-bg/70">{t.k}</span></span>
            <span className="relative -ml-1 -translate-x-2 text-bg opacity-0 transition-[opacity,translate] duration-200 group-hover/p:translate-x-0 group-hover/p:opacity-100 max-md:hidden">↗</span>
        </span></a>)
}

export default function TechStack() {
    const row = useRef(null), live = useInView(row, { margin: '150px 0px' });   // the reel pauses while it is off-screen
    return (<section id="stack" className="relative py-16 md:py-24">
        <style>{`@keyframes tsmarq{to{transform:translateX(-50%)}}
.ts-track{display:flex;width:max-content;animation:tsmarq 32s linear infinite;will-change:transform}
@media(hover:hover){.ts-row:hover .ts-track{animation-play-state:paused}}
.ts-row:focus-within .ts-track{animation-play-state:paused}
.ts-off .ts-track{animation-play-state:paused}
@media(max-width:767px){.ts-track{animation-duration:27s}}
@media(prefers-reduced-motion:reduce){.ts-track{animation:none;width:auto;flex-wrap:wrap;justify-content:center}.ts-dup{display:none}}`}</style>
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-16">
            <p className="font-mono text-xs tracking-[.22em] text-accent">THE STACK</p>
            <SplitText as="h2" parts={[['Tools', ''], ['I', ''], ['build', ''], ['with', 'font-serif font-normal italic text-accent']]} className="mt-2 block font-display text-4xl font-bold tracking-[-.03em] sm:text-5xl md:text-7xl" />
        </div>
        <motion.div ref={row} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={SPRING}
            className={`ts-row mt-6 overflow-hidden py-10 md:mt-8 md:py-14 ${live ? '' : 'ts-off'}`} style={{ maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}>
            <div className="ts-track">
                <div className="flex shrink-0 gap-4 pr-4">{stack.map(t => <Pill key={t.n} t={t} tab={0} />)}</div>
                <div className="ts-dup flex shrink-0 gap-4 pr-4" aria-hidden="true">{stack.map(t => <Pill key={t.n} t={t} tab={-1} />)}</div>
            </div></motion.div>
    </section>)
}