import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowUp, FaGithub, FaLinkedinIn, FaRegEnvelope } from 'react-icons/fa6';

const EMAIL = 'abdulrehmanpro6@gmail.com';
const GITHUB = 'https://github.com/abdulrehman1111-de';
const LINKEDIN = 'https://www.linkedin.com/in/-abdulrehman-cs';
const SPRING = { type: 'spring', bounce: 0, duration: .5 }; // critically damped: no bounce, interruptible

const nav = [['Home', '#home'], ['Journey', '#education'], ['Stack', '#stack'], ['Projects', '#projects'], ['GitHub', '#github'], ['Contact', '#contact']];
const socials = [[FaGithub, 'GitHub', GITHUB], [FaLinkedinIn, 'LinkedIn', LINKEDIN], [FaRegEnvelope, 'Email', `mailto:${EMAIL}`]];

function useClock() {
    const get = () => new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: true });
    const [t, setT] = useState(get);
    useEffect(() => { const id = setInterval(() => setT(get()), 30000); return () => clearInterval(id) }, []);
    return t;
}

export default function Footer() {
    const time = useClock(), reduce = useReducedMotion();
    const word = 'font-display text-[11.5vw] font-extrabold leading-[.8] tracking-[-.05em] min-[1024px]:text-[12.5vw]';

    return (<footer className="relative z-10 overflow-hidden border-t border-white/10 px-5 pt-14 sm:px-8 md:px-16 md:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[90%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(79,140,255,.15),transparent)] md:h-72 md:w-[70%]" />

        <div className="relative mx-auto max-w-6xl">
            {/* top: pitch + back to top */}
            <div className="flex flex-wrap items-end justify-between gap-6 md:gap-8">
                <motion.div initial={{ opacity: 0, y: reduce ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={SPRING}>
                    <p className="font-mono text-xs uppercase tracking-[.22em] text-accent">( Let's connect )</p>
                    <h3 className="mt-4 max-w-xl font-display text-3xl font-bold leading-[1.02] tracking-[-.03em] sm:text-5xl md:text-6xl">
                        Got an idea? <span className="font-serif font-normal italic text-[1.08em] tracking-normal text-accent">Let's make it real.</span>
                    </h3>
                </motion.div>

                <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })} aria-label="Back to top"
                    className="group inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/[.03] py-2.5 pl-6 pr-2.5 font-mono text-xs uppercase tracking-[.2em] text-mute transition-[scale,border-color,color] duration-150 hover:border-accent/60 hover:text-ink active:scale-[.97] max-sm:w-full max-sm:justify-between">
                    Back to top
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-bg transition-transform duration-200 group-hover:-translate-y-1"><FaArrowUp size={14} /></span>
                </button>
            </div>

            {/* middle: links + socials + status */}
            <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:max-lg:grid-cols-2 sm:gap-10 md:mt-16 md:pt-10 min-[1024px]:grid-cols-3">
                <div>
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[.22em] text-mute">Navigate</p>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                        {nav.map(([l, h]) => <li key={h}><a href={h} className="group relative inline-block py-1 font-display text-lg font-semibold tracking-[-.01em] text-ink/80 transition-colors duration-150 hover:text-accent">
                            {l}<span className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-[scale] duration-200 group-hover:scale-x-100" /></a></li>)}
                    </ul>
                </div>

                <div>
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[.22em] text-mute">Find me</p>
                    <div className="flex gap-3">
                        {socials.map(([I, label, href]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label}
                            className="group grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[.04] text-accent transition-[scale,background-color,border-color,color] duration-200 hover:scale-110 hover:border-transparent hover:bg-accent hover:text-bg active:scale-95"><I size={17} /></a>)}
                    </div>
                    <a href={`mailto:${EMAIL}`} className="mt-4 block truncate py-1 font-mono text-xs tracking-[.08em] text-mute transition-colors hover:text-accent">{EMAIL}</a>
                </div>

                <div className="sm:max-lg:col-span-2">
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[.22em] text-mute">Status</p>
                    <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[.03] px-4 py-2.5 font-mono text-xs uppercase tracking-[.14em]">
                        <span className="relative flex h-2 w-2 shrink-0"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
                        Open to opportunities
                    </div>
                    <p className="mt-4 font-mono text-xs uppercase tracking-[.18em] text-mute">Bahawalpur, PK · <span className="text-ink">{time}</span></p>
                </div>
            </div>
        </div>

        {/* giant name: outlined, fades to a blue fill on hover (desktop/tablet only) */}
        <div aria-hidden="true" className="group relative mx-auto mt-12 max-w-[100vw] select-none overflow-hidden text-center md:mt-16">
            <div className={`${word} whitespace-nowrap`} style={{ color: 'transparent', WebkitTextStroke: '1px rgba(79,140,255,.28)' }}>ABDUL REHMAN</div>
            <div className={`${word} pointer-events-none absolute inset-0 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:hidden`}
                style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', backgroundImage: 'linear-gradient(180deg,#bcd7ff,#4f8cff 60%,transparent)' }}>ABDUL REHMAN</div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
        </div>

        {/* bottom bar */}
        <div className="relative mx-auto max-w-6xl border-t border-white/10 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] text-center font-mono text-[10px] uppercase tracking-[.2em] text-mute md:py-6">
            © {new Date().getFullYear()} Abdul Rehman
        </div>
    </footer>)
}