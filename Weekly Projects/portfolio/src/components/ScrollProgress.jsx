import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll(), reduce = useReducedMotion();
    const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: .001 });
    return <motion.div aria-hidden="true" style={{ scaleX: reduce ? scrollYProgress : spring }} className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-accent will-change-transform" />
}