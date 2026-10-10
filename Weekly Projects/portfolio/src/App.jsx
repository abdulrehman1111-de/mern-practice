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
    useEffect(() => {
        chunks.forEach(c => c());
        // The intro ends as soon as the page is actually ready, not after a fixed wait: a short minimum so the intro can play,
        // the hero portrait decoded and the fonts loaded. It never waits longer than 3s, and skips the portrait when Data Saver is on.
        let dead = false;
        const done = () => { if (!dead) setLoading(false) };
        const quick = matchMedia('(prefers-reduced-motion: reduce)').matches, save = navigator.connection?.saveData;
        const img = save ? null : new Image(); if (img) img.src = '/portrait.webp';
        const safe = p => Promise.resolve(p).catch(() => { });
        Promise.all([new Promise(r => setTimeout(r, quick ? 300 : 1100)), img ? safe(img.decode?.()) : 0, safe(document.fonts?.ready)]).then(done);
        const cap = setTimeout(done, 3000);
        return () => { dead = true; clearTimeout(cap) }
    }, []);
    // safety net in case the exit animation never reports back
    useEffect(() => { if (loading) return; const t = setTimeout(() => setReady(true), 2000); return () => clearTimeout(t) }, [loading]);
    // the rest of the page mounts once the curtain has finished, when the browser is idle
    const showRest = () => 'requestIdleCallback' in window ? requestIdleCallback(() => setReady(true), { timeout: 500 }) : setTimeout(() => setReady(true), 120);
    return (<>
        <AnimatePresence onExitComplete={showRest}>{loading && <Preloader key="p" />}</AnimatePresence>
        {!loading && <>
            <ScrollProgress />
            {ready ? <Navbar /> : <div className="h-20" />}
            {/* the starfield is a single still drawing now, so it no longer needs to wait for the browser to be idle */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6 }}><Particles /></motion.div>
            <main className="relative z-10"><Hero />
                {ready && <Suspense fallback={null}><ScrollText /><Education /><TechStack /><Projects /><GithubActivity /><Contact /></Suspense>}</main>
            {ready && <Suspense fallback={null}><Footer /></Suspense>}
        </>}
    </>)
}