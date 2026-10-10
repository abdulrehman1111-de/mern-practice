import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { SplitText } from './Text';
import { SiGithub } from 'react-icons/si';

const USER = 'abdulrehman1111-de';
const PROFILE = `https://github.com/${USER}`;

const ACC = '#4f8cff';
const SOFT = '#a9c9ff';

const LV = ['rgba(255,255,255,.055)', '#15305f', '#1f56b8', '#4f8cff', '#a9c9ff'];

// GitHub language colors
const LANG = ['#4f8cff', '#6fa0ff', '#8fb8ff', '#b3d0ff', '#d6e6ff'];
const BRAND = { JavaScript: '#f1e05a', HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219' };
const col = (name, i) => BRAND[name] || LANG[i];

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ease = [.22, 1, .36, 1];
// Critically damped spring (no bounce): settles smoothly and can be interrupted mid-flight without a jump.
const SPRING = { type: 'spring', bounce: 0, duration: .5 };

const P = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) };
const fmt = s => P(s).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });


/* -------------------------------------------------------
   GITHUB DATA (cached in the browser for 30 minutes so
   repeat visits are instant and don't burn API rate limit)
   ------------------------------------------------------- */

const CACHE_KEY = 'gh-activity-v1', CACHE_TTL = 30 * 60 * 1000;

const readCache = () => {
    try {
        const c = JSON.parse(localStorage.getItem(CACHE_KEY));
        if (c && Date.now() - c.t < CACHE_TTL && c.d?.days?.length) return { status: 'ok', ...c.d };
    } catch { }
    return null;
};

// `enabled` stays false until the section is close to the screen, so the many API requests
// don't compete with the page's first load.
function useGithub(enabled) {
    const [s, set] = useState(() => readCache() || { status: 'load' });

    useEffect(() => {
        if (!enabled || s.status === 'ok') return; // wait until near the screen, or fresh cache already loaded
        let dead = false;

        const j = async url => {
            const r = await fetch(url, { headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } });
            if (!r.ok) throw new Error(`GitHub API ${r.status}`);
            return r.json();
        };

        // GitHub returns max 100 repos per request, so keep requesting pages until there are no more.
        const getAllRepos = async () => {
            const all = [];
            let page = 1;
            while (true) {
                const repos = await j(`https://api.github.com/users/${USER}/repos?per_page=100&page=${page}&type=owner`);
                if (!repos.length) break;
                all.push(...repos);
                if (repos.length < 100) break;
                page++;
            }
            return all;
        };

        const load = async () => {
            try {
                const [contributionData, userData, repositories] = await Promise.all([
                    j(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`),
                    j(`https://api.github.com/users/${USER}`),
                    getAllRepos()
                ]);
                if (dead) return;

                if (!contributionData.contributions || !contributionData.contributions.length) throw new Error('No contribution data');

                // Forked repos are excluded so their language stats don't inflate the percentages.
                const ownRepos = repositories.filter(repo => !repo.fork);

                // /languages returns bytes of code per language, e.g. { JavaScript: 50000, HTML: 20000 }
                const languageResults = await Promise.all(ownRepos.map(repo => j(repo.languages_url)));
                if (dead) return;

                const bytes = {};
                languageResults.forEach(languageData => {
                    Object.entries(languageData).forEach(([language, value]) => { bytes[language] = (bytes[language] || 0) + value });
                });

                // Only the top 5 are displayed.
                const langs = Object.entries(bytes).sort((a, b) => b[1] - a[1]).slice(0, 5);
                const d = { days: contributionData.contributions, repos: userData.public_repos, langs };

                try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d })) } catch { }
                if (!dead) set({ status: 'ok', ...d });
            } catch (err) {
                console.error('GitHub data error:', err);
                if (!dead) set({ status: 'err', error: err.message });
            }
        };

        load();
        return () => { dead = true };
    }, [enabled]);

    return s;
}


/* -------------------------------------------------------
   CONTRIBUTION CALCULATIONS
   ------------------------------------------------------- */

function calc(days) {
    let total = 0, active = 0, best = { count: 0 }, run = 0, longest = 0;

    days.forEach(d => {
        total += d.count;
        if (d.count) {
            active++; run++;
            longest = Math.max(longest, run);
            if (d.count > best.count) best = d;
        } else run = 0;
    });

    let cur = 0, i = days.length - 1;
    // Today may not have any contribution yet
    if (i >= 0 && !days[i].count) i--;
    for (; i >= 0 && days[i].count; i--) cur++;

    return { total, active, best, longest, cur };
}


/* -------------------------------------------------------
   HEATMAP
   ------------------------------------------------------- */

const toWeeks = days => {
    const cells = [...Array(P(days[0].date).getDay()).fill(null), ...days];
    const w = [];
    for (let i = 0; i < cells.length; i += 7) w.push(cells.slice(i, i + 7));
    return w;
};

const monthLabels = weeks => {
    const L = [];
    let prev = -1;
    weeks.forEach((w, i) => {
        const m = P(w.find(Boolean).date).getMonth();
        if (m !== prev) { L.push([i, MON[m]]); prev = m }
    });
    return L.filter(([i], k) => k === L.length - 1 || L[k + 1][0] - i >= 3);
};


/* -------------------------------------------------------
   COUNT ANIMATION
   ------------------------------------------------------- */

function Count({ to, go }) {
    const [v, setV] = useState(0), reduce = useReducedMotion();

    useEffect(() => {
        if (!go || to == null) return;
        if (reduce) { setV(to); return }   // reduced motion: show the final number straight away
        const a = animate(0, to, { duration: 1.6, ease, onUpdate: x => setV(Math.round(x)) });
        return () => a.stop();
    }, [go, to, reduce]);

    return <span className="tabular-nums">{to == null ? '—' : v.toLocaleString()}</span>;
}


/* -------------------------------------------------------
   HEATMAP CELLS (memoized so hovering a cell only updates
   the tooltip instead of re-rendering all ~370 cells)
   ------------------------------------------------------- */

const Cells = memo(function Cells({ grid, weeks, go, status, onShow, onHide }) {
    const sq = { width: 'var(--s)', height: 'var(--s)' };
    // The whole grid fades in (or pulses while loading) as one piece. No per-cell animation or glow:
    // ~370 cells animating or shadowed at once is a lot of work for a phone.
    return (<div className={`flex transition-opacity duration-300 ${!weeks && status === 'load' ? 'animate-pulse' : ''}`} style={{ gap: 'var(--g)', opacity: go || !weeks ? 1 : 0 }}>
        {grid.map((w, i) => (
            <div key={i} className="flex flex-col" style={{ gap: 'var(--g)' }}>
                {w.map((d, j) => (
                    !weeks ? (
                        <span key={j} className="rounded-[3px] bg-white/[.06]" style={sq} />
                    ) : d ? (
                        <span key={j} onMouseEnter={e => onShow(e, d)} onMouseLeave={onHide}
                            className="relative block rounded-[3px] transition-[scale] duration-150 hover:z-10 hover:scale-150"
                            style={{ ...sq, background: LV[d.level], border: d.level ? 'none' : '1px solid rgba(255,255,255,.09)' }} />
                    ) : (
                        <span key={j} style={sq} />
                    )
                ))}
            </div>
        ))}
    </div>)
});


/* -------------------------------------------------------
   HEATMAP COMPONENT
   ------------------------------------------------------- */

function Heat({ weeks, go, status }) {
    const wrap = useRef(null);
    const [tip, setTip] = useState(null);

    useEffect(() => {
        const e = wrap.current;
        if (e) e.scrollLeft = e.scrollWidth;
    }, [weeks]);

    const labels = useMemo(() => (weeks ? monthLabels(weeks) : []), [weeks]);

    const show = useCallback((e, d) => {
        const el = e.currentTarget;
        setTip({ x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop, d });
    }, []);
    const hide = useCallback(() => setTip(null), []);

    const grid = useMemo(() => weeks || Array.from({ length: 53 }, () => Array(7).fill(0)), [weeks]);

    return (
        <div>
            <div ref={wrap} className="gh-scroll overflow-x-auto overscroll-x-contain pb-2 pt-14" style={{ '--s': '13px', '--g': '4px' }}>
                <div className="relative mx-auto flex w-max gap-3">
                    <div className="flex flex-col pt-5 font-mono text-[10px] text-mute" style={{ gap: 'var(--g)' }}>
                        {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((l, i) => (
                            <span key={i} style={{ height: 'var(--s)', lineHeight: 'var(--s)' }}>{l}</span>
                        ))}
                    </div>

                    <div>
                        <div className="relative mb-1 h-4 font-mono text-[10px] text-mute">
                            {labels.map(([i, m]) => (
                                <span key={i} className="absolute whitespace-nowrap" style={{ left: `calc(${i} * (var(--s) + var(--g)))` }}>{m}</span>
                            ))}
                        </div>
                        <Cells grid={grid} weeks={weeks} go={go} status={status} onShow={show} onHide={hide} />
                    </div>

                    {tip && (
                        <div className="pointer-events-none absolute z-30 -mt-2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-accent/40 bg-[#0a1226] px-3 py-1.5 font-mono text-[11px]"
                            style={{ left: tip.x, top: tip.y }}>
                            <b className="text-ink">{tip.d.count} contribution{tip.d.count === 1 ? '' : 's'}</b>
                            <span className="text-mute">{' · '}{fmt(tip.d.date)}</span>
                        </div>
                    )}
                </div>
            </div>
            {weeks && <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[.18em] text-mute/70 md:hidden">← Swipe to explore →</p>}
        </div>
    );
}


/* -------------------------------------------------------
   STAT CARD
   (display only, so no hover effects: it shouldn't look clickable)
   ------------------------------------------------------- */

function Stat({ label, value, sub, go, k }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SPRING, delay: k * .06 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 p-4 sm:p-6"
            style={{ background: 'linear-gradient(135deg,rgba(79,140,255,.13),rgba(10,18,38,.55) 55%,rgba(5,7,13,.8))' }}
        >
            <span className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 bg-[radial-gradient(closest-side,rgba(79,140,255,.18),transparent)] md:-right-8 md:-top-8 md:h-28 md:w-28" />

            <p className="relative font-mono text-[11px] tracking-[.14em] text-mute sm:tracking-[.22em]">{label}</p>

            <p className="relative mt-3 font-display text-4xl font-bold tracking-[-.03em] sm:text-5xl"
                style={{ backgroundImage: `linear-gradient(100deg,#fff 30%,${ACC})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {value}
            </p>

            <p className="relative mt-1 text-sm text-mute">{sub}</p>
        </motion.div>
    );
}


/* -------------------------------------------------------
   MAIN GITHUB ACTIVITY COMPONENT
   ------------------------------------------------------- */

export default function GithubActivity() {
    const ref = useRef(null);
    const go = useInView(ref, { once: true, amount: .2 });
    const near = useInView(ref, { once: true, margin: '600px 0px 600px 0px' }); // start loading just before the section arrives
    const g = useGithub(near);
    const ok = g.status === 'ok';

    const st = useMemo(() => (ok ? calc(g.days) : null), [g, ok]);
    const weeks = useMemo(() => (ok ? toWeeks(g.days) : null), [g, ok]);

    // Total language bytes, so each language % = its bytes / total * 100
    const totalLanguageBytes = ok && g.langs?.length ? g.langs.reduce((total, [, bytes]) => total + bytes, 0) : 0;

    return (
        <section id="github" ref={ref} className="relative px-5 py-16 sm:px-8 md:px-16 md:py-24">

            <style>{`.gh-scroll { scrollbar-width:thin; scrollbar-color: rgba(79,140,255,.45) transparent }`}</style>

            <div className="mx-auto max-w-6xl">

                <p className="font-mono text-xs tracking-[.22em] text-accent">OPEN SOURCE</p>

                <SplitText
                    as="h2"
                    parts={[['GitHub', ''], ['activity', 'font-serif font-normal italic text-accent']]}
                    className="mt-2 block font-display text-4xl font-bold tracking-[-.03em] sm:text-6xl md:text-7xl"
                />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={go ? { opacity: 1, y: 0 } : {}}
                    transition={SPRING}
                    className="relative mt-10 rounded-[28px] p-[1.5px] md:mt-12"
                >

                    {/* static border: no spinning gradient or blurred halo, which repainted every frame */}
                    <div className="absolute inset-0 rounded-[28px] bg-white/10" />

                    <div className="absolute inset-0 rounded-[28px] opacity-50"
                        style={{ background: `linear-gradient(135deg,${ACC},${SOFT} 50%,${ACC})` }} />

                    <div className="relative overflow-hidden rounded-[27px] p-4 sm:p-6 md:p-10"
                        style={{ background: 'linear-gradient(135deg,#0b1530,#04060b)' }}>

                        <div className="absolute inset-0 opacity-60"
                            style={{
                                backgroundImage: `radial-gradient(${ACC}55 1.2px,transparent 1.5px)`,
                                backgroundSize: '22px 22px',
                                WebkitMaskImage: 'radial-gradient(ellipse at 85% 10%,#000,transparent 65%)',
                                maskImage: 'radial-gradient(ellipse at 85% 10%,#000,transparent 65%)'
                            }} />

                        {/* static soft light: a plain gradient instead of a big blurred, endlessly moving blob */}
                        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 bg-[radial-gradient(closest-side,rgba(79,140,255,.25),transparent)] md:-right-24 md:-top-28 md:h-80 md:w-80" />

                        <div className="relative flex flex-wrap items-end justify-between gap-5 md:gap-6">

                            <div>
                                <p className="font-display text-4xl font-bold tracking-[-.03em] sm:text-5xl md:text-7xl"
                                    style={{ backgroundImage: `linear-gradient(100deg,#fff 30%,${ACC})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                                    <Count to={st?.total} go={go} />
                                </p>
                                <p className="mt-1 text-base text-mute sm:text-lg">contributions in the last year</p>
                            </div>

                            <a href={PROFILE} target="_blank" rel="noopener noreferrer"
                                className="group/b inline-flex items-center gap-3 rounded-full py-3 pl-5 pr-6 font-semibold text-bg transition-[scale] duration-150 hover:scale-[1.03] active:scale-[.97] max-sm:w-full max-sm:justify-center"
                                style={{ background: `linear-gradient(135deg,${SOFT},${ACC})` }}>
                                <SiGithub size={20} />
                                <span>@{USER}</span>
                                <span className="transition-transform duration-200 group-hover/b:translate-x-1">↗</span>
                            </a>

                        </div>

                        <div className="relative mt-4">

                            {g.status === 'err' && (
                                <p className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-2 text-center text-mute">
                                    Couldn't load live data right now.{' '}
                                    <a href={PROFILE} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
                                        View the graph on GitHub ↗
                                    </a>
                                </p>
                            )}

                            <div className={g.status === 'err' ? 'opacity-30' : ''}>
                                <Heat weeks={weeks} go={go} status={g.status} />
                            </div>

                        </div>

                        <div className="relative mt-2 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[.12em] text-mute">

                            <span>{g.repos != null ? `${g.repos} PUBLIC REPOS` : 'LIVE FROM GITHUB'}</span>

                            <span className="flex items-center gap-2">
                                LESS
                                {LV.map((c, i) => (
                                    <i key={i} className="block h-3 w-3 rounded-[3px]"
                                        style={{ background: c, border: i ? 'none' : '1px solid rgba(255,255,255,.09)' }} />
                                ))}
                                MORE
                            </span>

                        </div>

                    </div>

                </motion.div>


                {/* STAT CARDS */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                    <Stat k={0} go={go} label="CURRENT STREAK" value={st ? st.cur : '—'} sub="days in a row" />
                    <Stat k={1} go={go} label="LONGEST STREAK" value={st ? st.longest : '—'} sub="days in the last year" />
                    <Stat k={2} go={go} label="ACTIVE DAYS" value={st ? st.active : '—'} sub={st ? `out of ${g.days.length} days` : 'with at least one contribution'} />
                    <Stat k={3} go={go} label="BUSIEST DAY" value={st ? st.best.count : '—'} sub={st && st.best.count ? fmt(st.best.date) : 'contributions in a day'} />
                </div>


                {/* LIVE GITHUB LANGUAGES */}
                {ok && g.langs?.length > 0 && totalLanguageBytes > 0 && (

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={go ? { opacity: 1, y: 0 } : {}}
                        transition={{ ...SPRING, delay: .25 }}
                        className="mt-4 rounded-2xl border border-white/10 p-4 sm:p-6"
                        style={{ background: 'linear-gradient(135deg,rgba(79,140,255,.1),rgba(5,7,13,.8))' }}
                    >

                        <p className="font-mono text-[11px] tracking-[.14em] text-mute sm:tracking-[.22em]">MOST USED LANGUAGES · BY CODE SIZE</p>

                        {/* LANGUAGE BAR: widths are fixed; the whole bar grows in with a transform instead of animating widths (which re-lays-out every frame) */}
                        <div className="mt-4 h-3 overflow-hidden rounded-full">
                            <motion.div
                                className="flex h-full w-full origin-left"
                                initial={{ scaleX: 0 }}
                                animate={go ? { scaleX: 1 } : {}}
                                transition={{ duration: .9, ease, delay: .35 }}
                            >
                                {g.langs.map(([name, bytes], i) => (
                                    <span key={name} className="block h-full" style={{ width: `${(bytes / totalLanguageBytes) * 100}%`, background: col(name, i) }} />
                                ))}
                            </motion.div>
                        </div>

                        {/* LANGUAGE PERCENTAGES */}
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 text-sm sm:gap-x-6">
                            {g.langs.map(([name, bytes], i) => {
                                const percentage = (bytes / totalLanguageBytes) * 100;
                                return (
                                    <span key={name} className="flex items-center gap-2">
                                        <i className="block h-2.5 w-2.5 rounded-full" style={{ background: col(name, i) }} />
                                        {name}
                                        <span className="font-mono text-xs text-mute">{percentage.toFixed(2)}%</span>
                                    </span>
                                );
                            })}
                        </div>

                    </motion.div>

                )}

            </div>

        </section>
    );
}