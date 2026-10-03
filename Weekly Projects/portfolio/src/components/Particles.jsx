import { useEffect, useRef } from 'react';
const COLORS = ['#4f8cff', '#22d3ee', '#818cf8', '#bcd7ff'];
const sprite = c => {
    const s = document.createElement('canvas'); s.width = s.height = 48; const g = s.getContext('2d');
    const r = g.createRadialGradient(24, 24, 0, 24, 24, 24); r.addColorStop(0, '#ffffff'); r.addColorStop(.12, c); r.addColorStop(.35, c + '66'); r.addColorStop(1, c + '00');
    g.fillStyle = r; g.fillRect(0, 0, 48, 48); return s
};

const NB = 8, MAXD = 130, MAXD2 = MAXD * MAXD, MR = 170, MR2 = MR * MR; // line brightness buckets, link distance, mouse radius

export default function Particles() {
    const ref = useRef(null);
    useEffect(() => {
        const cv = ref.current, ctx = cv.getContext('2d'), sp = COLORS.map(sprite);
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        let w, h, dpr, raf = 0, rt = 0, lite = false, last = performance.now(), lastY = scrollY, P = [], S = [], pos = new Float32Array(0), nextStar = last + 2500;
        let lastW = innerWidth, lastH = innerHeight;
        const m = { x: -9999, y: -9999, px: 0, py: 0 };
        const init = () => {
            lite = innerWidth < 768; // phones get lighter settings
            dpr = Math.min(devicePixelRatio || 1, lite ? 1.5 : 2); w = innerWidth; h = innerHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const n = Math.min(w < 768 ? 55 : 130, Math.round(w * h / 11000));
            pos = new Float32Array(n * 2);
            P = Array.from({ length: n }, () => {
                const z = [.35, .6, 1][Math.random() * 3 | 0];
                return { x: Math.random() * w, y: Math.random() * h, z, vx: (Math.random() - .5) * .25 * z, vy: (Math.random() - .5) * .25 * z, c: Math.random() * COLORS.length | 0, ph: Math.random() * 6.28 }
            })
        };
        init(); m.px = w / 2; m.py = h / 2;

        const frame = now => {
            // phones: skip every other frame (about 30fps). Movement is time-based, so speed stays the same.
            if (lite && !reduce && now - last < 30) { raf = requestAnimationFrame(frame); return }
            const dt = Math.min((now - last) / 16.67, 3); last = now;
            const sy = scrollY, sv = (sy - lastY) * .5 / (lite ? Math.max(dt, 1) : 1); lastY = sy;
            // parallax follows the cursor, and eases back to the center when there is no cursor (always the case on touch screens)
            const hasM = m.x > -9000;
            m.px += ((hasM ? m.x : w / 2) - m.px) * .05; m.py += ((hasM ? m.y : h / 2) - m.py) * .05;
            ctx.clearRect(0, 0, w, h);
            const ox = (m.px / w - .5) * -40, oy = (m.py / h - .5) * -40;
            for (let i = 0; i < P.length; i++) {
                const p = P[i];
                p.x += p.vx * dt; p.y += (p.vy - sv * p.z * .15) * dt;
                const dx = p.x - m.x, dy = p.y - m.y, d2 = dx * dx + dy * dy;
                if (d2 < MR2 && d2 > 1) { const d = Math.sqrt(d2), k = (MR - d) * .012 * dt / d; p.x -= dx * k; p.y -= dy * k }
                if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20; if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
                const x = p.x + ox * p.z, y = p.y + oy * p.z; pos[i * 2] = x; pos[i * 2 + 1] = y;
                const s = (1.5 + p.z * 3) * (.75 + .25 * Math.sin(now * .0016 + p.ph));
                ctx.globalAlpha = .35 + p.z * .55; ctx.drawImage(sp[p.c], x - s * 3, y - s * 3, s * 6, s * 6)
            }
            // links between nearby particles: batched into NB brightness buckets (NB strokes per frame instead of one per line)
            ctx.lineWidth = .7;
            const paths = Array.from({ length: NB }, () => new Path2D());
            for (let i = 0; i < P.length; i++) {
                if (P[i].z < .6) continue;
                const ax = pos[i * 2], ay = pos[i * 2 + 1];
                for (let j = i + 1; j < P.length; j++) {
                    if (P[j].z < .6) continue;
                    const bx = pos[j * 2], by = pos[j * 2 + 1], dx = ax - bx, dy = ay - by, d2 = dx * dx + dy * dy;
                    if (d2 < MAXD2) { const k = Math.min(NB - 1, (Math.sqrt(d2) / MAXD * NB) | 0); paths[k].moveTo(ax, ay); paths[k].lineTo(bx, by) }
                }
                const mx = ax - m.x, my = ay - m.y, m2 = mx * mx + my * my;
                if (m2 < MR2) { const dm = Math.sqrt(m2); ctx.globalAlpha = (1 - dm / MR) * .5; ctx.strokeStyle = '#22d3ee'; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(m.x, m.y); ctx.stroke() }
            }
            ctx.strokeStyle = '#4f8cff';
            for (let k = 0; k < NB; k++) { ctx.globalAlpha = (1 - (k + .5) / NB) * .22; ctx.stroke(paths[k]) }

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

        // reduced motion: draw a single still frame (and redraw it after a resize)
        const still = () => { m.px = w / 2; m.py = h / 2; frame(performance.now()); cancelAnimationFrame(raf) };

        // mouse only: touches would otherwise leave a "ghost cursor" at the last tap point
        const mv = e => { if (e.pointerType === 'touch') return; m.x = e.clientX; m.y = e.clientY };
        const lv = () => { m.x = m.y = -9999 };

        // debounced; on phones the browser fires resize when the address bar shows/hides, so small height-only changes are ignored
        const onResize = () => {
            clearTimeout(rt);
            rt = setTimeout(() => {
                const nw = innerWidth, nh = innerHeight;
                if (nw < 768 && nw === lastW && Math.abs(nh - lastH) < 160) return;
                lastW = nw; lastH = nh; init(); if (reduce) still()
            }, 150)
        };

        // fully stop the loop while the tab is hidden
        const vis = () => {
            cancelAnimationFrame(raf);
            if (!document.hidden && !reduce) { last = performance.now(); lastY = scrollY; raf = requestAnimationFrame(frame) }
        };

        if (reduce) still(); else raf = requestAnimationFrame(frame);
        addEventListener('resize', onResize); addEventListener('pointermove', mv); document.addEventListener('pointerleave', lv); document.addEventListener('visibilitychange', vis);
        return () => { cancelAnimationFrame(raf); clearTimeout(rt); removeEventListener('resize', onResize); removeEventListener('pointermove', mv); document.removeEventListener('pointerleave', lv); document.removeEventListener('visibilitychange', vis) }
    }, []);
    return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}