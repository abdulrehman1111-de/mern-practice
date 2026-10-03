import { Fragment, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
const ease = [.22, 1, .36, 1];

// Built once instead of on every render.
const ITEM = {
    mask: { hidden: { y: '115%', rotate: 5, opacity: 0 }, show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: .9, ease } } },
    blur: { hidden: { opacity: 0, y: 10, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .8, ease } } }
};
const IN_VIEW = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: .6 } }, ON_MOUNT = { initial: 'hidden', animate: 'show' };

// Splits text into words or letters and reveals them with a masked rise ("mask") or a soft blur-in ("blur").
// parts: [[text, extraClasses], ...] so one heading can mix fonts and colors.
export function SplitText({ parts, by = 'char', variant = 'mask', as = 'span', delay = 0, stagger, inView = true, className = '' }) {
    const s = stagger ?? (by === 'char' ? .035 : .07), Tag = motion[as], mask = variant === 'mask', item = mask ? ITEM.mask : ITEM.blur, ref = useRef(null);
    const words = parts.flatMap(([t, c]) => t.split(' ').filter(Boolean).map(w => [w, c]));
    const box = useMemo(() => ({ hidden: {}, show: { transition: { staggerChildren: s, delayChildren: delay } } }), [s, delay]);
    // A leftover blur(0px) keeps every word on its own filter layer, so clear it once the reveal has finished.
    const done = () => ref.current?.querySelectorAll('span').forEach(n => { if (n.style.filter) n.style.filter = '' });
    return (<Tag ref={ref} {...(inView ? IN_VIEW : ON_MOUNT)} variants={box} onAnimationComplete={mask ? undefined : done} className={className} aria-label={words.map(w => w[0]).join(' ')}>
        {words.map(([w, c], i) => <Fragment key={i}>
            <span aria-hidden="true" className={`inline-block ${mask ? '-mb-[.2em] overflow-hidden pb-[.2em] align-bottom' : ''} ${c}`}>
                {by === 'char' ? [...w].map((ch, j) => <motion.span key={j} variants={item} className="char inline-block origin-bottom-left">{ch}</motion.span>) : <motion.span variants={item} className="inline-block">{w}</motion.span>}
            </span>{i < words.length - 1 && ' '}</Fragment>)}
    </Tag>)
}