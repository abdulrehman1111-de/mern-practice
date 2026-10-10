import { useEffect, useRef } from 'react';
const COLORS = ['#4f8cff', '#22d3ee', '#818cf8', '#bcd7ff'];
const sprite = c => {
    const s = document.createElement('canvas'); s.width = s.height = 48; const g = s.getContext('2d');
    const r = g.createRadialGradient(24, 24, 0, 24, 24, 24); r.addColorStop(0, '#ffffff'); r.addColorStop(.12, c); r.addColorStop(.35, c + '66'); r.addColorStop(1, c + '00');
    g.fillStyle = r; g.fillRect(0, 0, 48, 48); return s
};

// A still starfield, drawn once (and again only if the window width changes). There is no animation loop,
// no mouse or scroll reaction and no link lines, so it costs nothing while you scroll and nothing in the background.
export default function Particles() {
    const ref = useRef(null);
    useEffect(() => {
        const cv = ref.current, ctx = cv.getContext('2d'), sp = COLORS.map(sprite);
        let rt = 0, lastW = innerWidth, lastH = innerHeight;
        const draw = () => {
            const w = innerWidth, h = innerHeight, dpr = Math.min(devicePixelRatio || 1, 1.5);   // the stars are soft, so no need for a huge canvas
            cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);     // resizing a canvas also clears it
            const n = Math.min(w < 768 ? 55 : 130, Math.round(w * h / 11000));
            for (let i = 0; i < n; i++) {
                const z = [.35, .6, 1][Math.random() * 3 | 0], s = 1.5 + z * 3;   // z = depth: nearer stars are bigger and brighter
                ctx.globalAlpha = .35 + z * .55;
                ctx.drawImage(sp[Math.random() * sp.length | 0], Math.random() * w - s * 3, Math.random() * h - s * 3, s * 6, s * 6)
            }
            ctx.globalAlpha = 1
        };
        draw();

        // debounced; on phones the browser fires resize when the address bar shows/hides, so small height-only changes are ignored
        const onResize = () => {
            clearTimeout(rt);
            rt = setTimeout(() => {
                const nw = innerWidth, nh = innerHeight;
                if (nw < 768 && nw === lastW && Math.abs(nh - lastH) < 160) return;
                lastW = nw; lastH = nh; draw()
            }, 150)
        };
        addEventListener('resize', onResize);
        return () => { clearTimeout(rt); removeEventListener('resize', onResize) }
    }, []);
    return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}