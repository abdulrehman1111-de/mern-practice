import { Fragment, useMemo } from 'react';
import { motion } from 'framer-motion';

// Critically damped spring (no bounce): each word or letter settles smoothly with no overshoot.
const REVEAL = { type: 'spring', bounce: 0, duration: .7 };

// Built once instead of on every render. Only transform and opacity change: no filters.
const ITEM = { hidden: { y: '115%', rotate: 5, opacity: 0 }, show: { y: '0%', rotate: 0, opacity: 1, transition: REVEAL } };
const IN_VIEW = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: .6 } }, ON_MOUNT = { initial: 'hidden', animate: 'show' };

// Splits text into words or letters and reveals them with a masked rise.
// parts: [[text, extraClasses], ...] so one heading can mix fonts and colors.
// The animated pieces are hidden from screen readers; one visually hidden copy of the text is read instead
// (an aria-label on a plain <p> or <span> is ignored by many screen readers, which left the text unread).
export function SplitText({ parts, by = 'char', as = 'span', delay = 0, stagger, inView = true, className = '' }) {
    const s = stagger ?? (by === 'char' ? .035 : .07), Tag = motion[as];
    const words = parts.flatMap(([t, c]) => t.split(' ').filter(Boolean).map(w => [w, c]));
    const box = useMemo(() => ({ hidden: {}, show: { transition: { staggerChildren: s, delayChildren: delay } } }), [s, delay]);
    return (<Tag {...(inView ? IN_VIEW : ON_MOUNT)} variants={box} className={className}>
        <span className="sr-only">{words.map(w => w[0]).join(' ')}</span>
        {words.map(([w, c], i) => <Fragment key={i}>
            <span aria-hidden="true" className={`inline-block -mb-[.2em] overflow-hidden pb-[.2em] align-bottom ${c}`}>
                {by === 'char' ? [...w].map((ch, j) => <motion.span key={j} variants={ITEM} className="char inline-block origin-bottom-left">{ch}</motion.span>) : <motion.span variants={ITEM} className="inline-block">{w}</motion.span>}
            </span>{i < words.length - 1 && ' '}</Fragment>)}
    </Tag>)
}