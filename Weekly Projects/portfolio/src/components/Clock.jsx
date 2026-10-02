import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const C = 200;
const pt = (r, i, n) => { const a = i / n * 2 * Math.PI; return [C + r * Math.sin(a), C - r * Math.cos(a)] };
const dateFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', weekday: 'long', day: 'numeric', month: 'long' });
const pad = n => String(n).padStart(2, '0');

export default function Clock() {
    const hr = useRef(), mn = useRef(), sc = useRef(), dg = useRef(), dt = useRef();

    // Everything updates through refs, so React never re-renders this component.
    useEffect(() => {
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf, last = -1;
        const rot = (el, d) => el.setAttribute('transform', `rotate(${d} ${C} ${C})`);
        const tick = () => {
            const d = new Date(Date.now() + 5 * 36e5); // PKT = UTC+5, no daylight saving
            const ws = d.getUTCSeconds();
            const s = reduce ? ws : ws + d.getUTCMilliseconds() / 1000;
            const m = d.getUTCMinutes() + s / 60;
            const h = d.getUTCHours() % 12 + m / 60;
            rot(sc.current, s * 6); rot(mn.current, m * 6); rot(hr.current, h * 30);
            if (ws !== last) {
                last = ws; const H = d.getUTCHours();
                dg.current.textContent = `${pad(H % 12 || 12)}:${pad(d.getUTCMinutes())}:${pad(ws)} ${H < 12 ? 'AM' : 'PM'}`;
                dt.current.textContent = dateFmt.format(Date.now());
            }
            raf = requestAnimationFrame(tick);
        };
        tick();
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <section id="time" className="grid min-h-[85vh] place-items-center px-6 py-24">
            <motion.div initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .9, ease: 'easeOut' }} className="relative text-center">
                <div className="absolute left-1/2 top-[38%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
                <svg viewBox="0 0 400 400" className="relative mx-auto w-[min(70vw,25rem)]">
                    <defs>
                        <linearGradient id="bezel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e8ecf4" /><stop offset=".5" stopColor="#5b6578" /><stop offset="1" stopColor="#e8ecf4" /></linearGradient>
                        <radialGradient id="face" cx=".5" cy=".4" r=".7"><stop offset="0" stopColor="#0f1b33" /><stop offset="1" stopColor="#03050a" /></radialGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    </defs>
                    <circle cx={C} cy={C} r="194" fill="none" stroke="url(#bezel)" strokeWidth="6" />
                    <circle cx={C} cy={C} r="186" fill="url(#face)" stroke="#4f8cff" strokeOpacity=".35" />
                    {Array.from({ length: 60 }, (_, i) => {
                        const big = i % 5 === 0, [x1, y1] = pt(176, i, 60), [x2, y2] = pt(big ? 156 : 167, i, 60);
                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={big ? '#e8ecf4' : '#8a93a6'} strokeWidth={big ? 3 : 1} strokeLinecap="round" />;
                    })}
                    {Array.from({ length: 12 }, (_, i) => {
                        const [x, y] = pt(128, i, 12), q = i % 3 === 0;
                        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central" className="font-display" fill={q ? '#e8ecf4' : '#8a93a6'} fontSize={q ? 30 : 20} fontWeight={q ? 700 : 500}>{i || 12}</text>;
                    })}
                    <text x={C} y="262" textAnchor="middle" className="font-display" fill="#4f8cff" fontSize="11" letterSpacing="4">PKT · UTC+5</text>
                    <g ref={hr}><polygon points="193,208 207,208 203,112 197,112" fill="#e8ecf4" /></g>
                    <g ref={mn}><polygon points="195,212 205,212 202.5,62 197.5,62" fill="#e8ecf4" /></g>
                    <g ref={sc} filter="url(#glow)"><line x1={C} y1="232" x2={C} y2="44" stroke="#4f8cff" strokeWidth="2" strokeLinecap="round" /><circle cx={C} cy="80" r="5" fill="#4f8cff" /></g>
                    <circle cx={C} cy={C} r="10" fill="#05070d" stroke="#4f8cff" strokeWidth="3" /><circle cx={C} cy={C} r="3" fill="#4f8cff" />
                </svg>
                <p ref={dg} className="relative mt-4 font-mono text-3xl tabular-nums md:text-4xl">--:--:--</p>
                <p ref={dt} className="relative mt-2 text-mute">&nbsp;</p>
            </motion.div>
        </section>);
}