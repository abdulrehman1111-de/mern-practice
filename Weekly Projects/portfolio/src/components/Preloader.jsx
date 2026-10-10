import { motion, useReducedMotion } from 'framer-motion';
import { SplitText } from './Text';

// The intro lasts as long as the page needs (see App.jsx), not a fixed time. The line fills in about a second, matching its shortest stay.
// The hero portrait is now fetched by App.jsx, so it is not duplicated here.
export default function Preloader() {
    const reduce = useReducedMotion();
    return (<motion.div className="fixed inset-0 z-[100] grid place-items-center bg-bg px-6 will-change-transform" exit={reduce ? { opacity: 0, transition: { duration: .2 } } : { y: '-100%', transition: { duration: .7, ease: [.76, 0, .24, 1] } }}>
        <div className="text-center">
            <SplitText inView={false} delay={.1} stagger={.055} className="block font-display text-4xl font-bold tracking-[-.03em] min-[380px]:text-5xl sm:text-6xl md:text-8xl" parts={[['Abdul', ''], ['Rehman', 'font-serif font-normal italic text-accent tracking-normal']]} />
            <motion.div className="mx-auto mt-6 h-px w-48 origin-left bg-accent/70 md:mt-8" initial={{ scaleX: reduce ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: .9, ease: [.65, 0, .35, 1], delay: .15 }} />
            <motion.p className="mt-4 font-mono text-[10px] uppercase tracking-[.22em] text-mute sm:text-[11px] sm:tracking-[.3em]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4, delay: .5 }}>Full-Stack Developer</motion.p>
        </div></motion.div>)
}