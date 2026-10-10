import { motion, useScroll } from 'framer-motion';
export default function ScrollProgress() {
    // 1:1 with the scroll position: no spring on top, so the bar never trails behind your finger.
    const { scrollYProgress } = useScroll();
    return <motion.div aria-hidden="true" style={{ scaleX: scrollYProgress }} className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-accent will-change-transform" />
}