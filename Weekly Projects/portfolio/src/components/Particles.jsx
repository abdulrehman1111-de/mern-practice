import { useEffect, useRef } from 'react';
const COLORS = ['#4f8cff', '#22d3ee', '#818cf8', '#bcd7ff'];
const sprite = c => {
    const s = document.createElement('canvas'); s.width = s.height = 48; const g = s.getContext('2d');
    const r = g.createRadialGradient(24, 24, 0, 24, 24, 24); r.addColorStop(0, '#ffffff'); r.addColorStop(.12, c); r.addColorStop(.35, c + '66'); r.addColorStop(1, c + '00');
    g.fillStyle = r; g.fillRect(0, 0, 48, 48); return s
};

export default function Particles() {
    const ref = useRef(null);
    useEffect(() => {
        const cv = ref.current, ctx = cv.getContext('2d'), sp = COLORS.map(sprite);
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        let w, h, dpr, raf, last = performance.now(), lastY = scrollY, P = [], S = [], nextStar = last + 2500;
        const m = { x: -9999, y: -9999, px: 0, py: 0 };
        const init = () => {
            dpr = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const n = Math.min(w < 768 ? 55 : 130, Math.round(w * h / 11000));
            P = Array.from({ length: n }, () => {
                const z = [.35, .6, 1][Math.random() * 3 | 0];
                return { x: Math.random() * w, y: Math.random() * h, z, vx: (Math.random() - .5) * .25 * z, vy: (Math.random() - .5) * .25 * z, c: Math.random() * COLORS.length | 0, ph: Math.random() * 6.28 }
            })
        };
        init();
        const frame = (now) => {
            const dt = Math.min((now - last) / 16.67, 3); last = now;
            if (document.hidden) { raf = requestAnimationFrame(frame); return }
            const sy = scrollY, sv = (sy - lastY) * .5; lastY = sy;
            m.px += (m.x - m.px) * .05; m.py += (m.y - m.py) * .05;
            ctx.clearRect(0, 0, w, h);
            const ox = (m.px / w - .5) * -40, oy = (m.py / h - .5) * -40, pos = [];
            for (const p of P) {
                p.x += p.vx * dt; p.y += (p.vy - sv * p.z * .15) * dt;
                const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy);
                if (d < 170 && d > 1) { p.x -= dx / d * (170 - d) * .012 * dt; p.y -= dy / d * (170 - d) * .012 * dt }
                if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20; if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
                const x = p.x + ox * p.z, y = p.y + oy * p.z; pos.push(x, y);
                const s = (1.5 + p.z * 3) * (.75 + .25 * Math.sin(now * .0016 + p.ph));
                ctx.globalAlpha = .35 + p.z * .55; ctx.drawImage(sp[p.c], x - s * 3, y - s * 3, s * 6, s * 6)
            }
            ctx.lineWidth = .7;
            for (let i = 0; i < P.length; i++) {
                const a = P[i]; if (a.z < .6) continue;
                for (let j = i + 1; j < P.length; j++) {
                    const b = P[j]; if (b.z < .6) continue;
                    const d = Math.hypot(pos[i * 2] - pos[j * 2], pos[i * 2 + 1] - pos[j * 2 + 1]);
                    if (d < 130) { ctx.globalAlpha = (1 - d / 130) * .22; ctx.strokeStyle = '#4f8cff'; ctx.beginPath(); ctx.moveTo(pos[i * 2], pos[i * 2 + 1]); ctx.lineTo(pos[j * 2], pos[j * 2 + 1]); ctx.stroke() }
                }
                const dm = Math.hypot(pos[i * 2] - m.x, pos[i * 2 + 1] - m.y);
                if (dm < 170) { ctx.globalAlpha = (1 - dm / 170) * .5; ctx.strokeStyle = '#22d3ee'; ctx.beginPath(); ctx.moveTo(pos[i * 2], pos[i * 2 + 1]); ctx.lineTo(m.x, m.y); ctx.stroke() }
            }
            if (now > nextStar) { nextStar = now + 4000 + Math.random() * 5000; const a = Math.random() * .5 + .35; S.push({ x: Math.random() * w * .8, y: Math.random() * h * .4, vx: Math.cos(a) * 11, vy: Math.sin(a) * 11, l: 0 }) }
            S = S.filter(t => t.l < 55);
            for (const t of S) {
                t.x += t.vx * dt; t.y += t.vy * dt; t.l += dt;
                const g = ctx.createLinearGradient(t.x, t.y, t.x - t.vx * 9, t.y - t.vy * 9); g.addColorStop(0, 'rgba(188,215,255,.9)'); g.addColorStop(1, 'rgba(79,140,255,0)');
                ctx.globalAlpha = 1 - t.l / 55; ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(t.x, t.y); ctx.lineTo(t.x - t.vx * 9, t.y - t.vy * 9); ctx.stroke()
            }
            ctx.globalAlpha = 1;
            raf = requestAnimationFrame(frame)
        };
        const mv = e => { m.x = e.clientX; m.y = e.clientY };
        const lv = () => { m.x = m.y = -9999 };
        if (reduce) { m.px = w / 2; m.py = h / 2; frame(performance.now()); cancelAnimationFrame(raf) } else raf = requestAnimationFrame(frame);
        addEventListener('resize', init); addEventListener('pointermove', mv); document.addEventListener('pointerleave', lv);
        return () => { cancelAnimationFrame(raf); removeEventListener('resize', init); removeEventListener('pointermove', mv); document.removeEventListener('pointerleave', lv) }
    }, []);
    return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}