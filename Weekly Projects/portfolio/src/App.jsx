import { lazy, Suspense, useEffect, useState } from 'react'; import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './components/Preloader'; import ScrollProgress from './components/ScrollProgress';
import Particles from './components/Particles'; import Navbar from './components/Navbar'; import Hero from './components/Hero';

// Below-the-fold sections are separate files that download while the preloader plays.
const chunks = [
    () => import('./components/ScrollText'), () => import('./components/Education'), () => import('./components/TechStack'),
    () => import('./components/Projects'), () => import('./components/GithubActivity'), () => import('./components/Contact'), () => import('./components/Footer')];
const [ScrollText, Education, TechStack, Projects, GithubActivity, Contact, Footer] = chunks.map(c => lazy(c));

export default function App() {
    const [loading, setLoading] = useState(true), [ready, setReady] = useState(false);
    useEffect(() => { chunks.forEach(c => c()); const t = setTimeout(() => setLoading(false), 2800); return () => clearTimeout(t) }, []);
    // safety net in case the exit animation never reports back
    useEffect(() => { if (loading) return; const t = setTimeout(() => setReady(true), 2000); return () => clearTimeout(t) }, [loading]);
    // the rest of the page mounts once the curtain has finished, when the browser is idle
    const showRest = () => 'requestIdleCallback' in window ? requestIdleCallback(() => setReady(true), { timeout: 500 }) : setTimeout(() => setReady(true), 120);
    return (<>
        <AnimatePresence onExitComplete={showRest}>{loading && <Preloader key="p" />}</AnimatePresence>
        {!loading && <>
            <ScrollProgress />
            {ready ? <Navbar /> : <div className="h-20" />}
            {ready && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}><Particles /></motion.div>}
            <main className="relative z-10"><Hero />
                {ready && <Suspense fallback={null}><ScrollText /><Education /><TechStack /><Projects /><GithubActivity /><Contact /></Suspense>}</main>
            {ready && <Suspense fallback={null}><Footer /></Suspense>}
        </>}
    </>)
}