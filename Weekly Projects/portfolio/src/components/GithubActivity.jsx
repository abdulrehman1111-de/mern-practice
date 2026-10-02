import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { SplitText } from './Text';
import { SiGithub } from 'react-icons/si';

const USER = 'abdulrehman1111-de';
const PROFILE = `https://github.com/${USER}`;

const ACC = '#4f8cff';
const SOFT = '#a9c9ff';

const LV = [
    'rgba(255,255,255,.055)',
    '#15305f',
    '#1f56b8',
    '#4f8cff',
    '#a9c9ff'
];

const GLOW = [
    'none',
    'none',
    '0 0 6px #1f56b866',
    '0 0 9px #4f8cff99',
    '0 0 13px #a9c9ffcc'
];

// GitHub language colors
const LANG = [
    '#4f8cff',
    '#6fa0ff',
    '#8fb8ff',
    '#b3d0ff',
    '#d6e6ff'
];

const BRAND = {
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219'
};

const col = (name, i) => BRAND[name] || LANG[i];

const MON = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const ease = [.22, 1, .36, 1];

const P = s => {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
};

const fmt = s =>
    P(s).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });


/* -------------------------------------------------------
   GITHUB DATA
   ------------------------------------------------------- */

function useGithub() {
    const [s, set] = useState({
        status: 'load'
    });

    useEffect(() => {
        let dead = false;

        const j = async url => {
            const r = await fetch(url, {
                headers: {
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            if (!r.ok) {
                throw new Error(`GitHub API ${r.status}`);
            }

            return r.json();
        };


        /* -------------------------------------------------------
           Get ALL public repositories

           GitHub returns max 100 repositories per request,
           so we keep requesting pages until there are no more.
        ------------------------------------------------------- */

        const getAllRepos = async () => {
            const all = [];
            let page = 1;

            while (true) {
                const repos = await j(
                    `https://api.github.com/users/${USER}/repos?per_page=100&page=${page}&type=owner`
                );

                if (!repos.length) {
                    break;
                }

                all.push(...repos);

                if (repos.length < 100) {
                    break;
                }

                page++;
            }

            return all;
        };


        /* -------------------------------------------------------
           Load GitHub data
        ------------------------------------------------------- */

        const load = async () => {
            try {

                const [
                    contributionData,
                    userData,
                    repositories
                ] = await Promise.all([
                    j(
                        `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`
                    ),

                    j(
                        `https://api.github.com/users/${USER}`
                    ),

                    getAllRepos()
                ]);


                if (dead) return;


                if (
                    !contributionData.contributions ||
                    !contributionData.contributions.length
                ) {
                    throw new Error('No contribution data');
                }


                /* -------------------------------------------------------
                   Only repositories owned by the user.

                   Forked repositories are excluded so their language
                   statistics don't inflate the user's percentages.
                ------------------------------------------------------- */

                const ownRepos = repositories.filter(
                    repo => !repo.fork
                );


                /* -------------------------------------------------------
                   Get language byte statistics for EVERY repository.

                   GitHub's /languages endpoint returns something like:

                   {
                       "JavaScript": 50000,
                       "HTML": 20000,
                       "CSS": 15000
                   }

                   These numbers represent bytes of code.
                ------------------------------------------------------- */

                const languageResults = await Promise.all(
                    ownRepos.map(repo =>
                        j(repo.languages_url)
                    )
                );


                if (dead) return;


                /* -------------------------------------------------------
                   Combine language bytes from all repositories.
                ------------------------------------------------------- */

                const bytes = {};

                languageResults.forEach(languageData => {

                    Object.entries(languageData).forEach(
                        ([language, value]) => {

                            bytes[language] =
                                (bytes[language] || 0) + value;

                        }
                    );

                });


                /* -------------------------------------------------------
                   Sort languages by total code size.

                   Only the top 5 are displayed.
                ------------------------------------------------------- */

                const langs = Object.entries(bytes)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5);


                const d = {
                    days: contributionData.contributions,

                    repos: userData.public_repos,

                    langs
                };


                if (!dead) {
                    set({
                        status: 'ok',
                        ...d
                    });
                }

            } catch (err) {

                console.error(
                    'GitHub data error:',
                    err
                );

                if (!dead) {
                    set({
                        status: 'err',
                        error: err.message
                    });
                }
            }
        };


        load();


        return () => {
            dead = true;
        };

    }, []);


    return s;
}


/* -------------------------------------------------------
   CONTRIBUTION CALCULATIONS
   ------------------------------------------------------- */

function calc(days) {

    let total = 0;
    let active = 0;

    let best = {
        count: 0
    };

    let run = 0;
    let longest = 0;


    days.forEach(d => {

        total += d.count;


        if (d.count) {

            active++;

            run++;

            longest = Math.max(
                longest,
                run
            );


            if (d.count > best.count) {
                best = d;
            }

        } else {

            run = 0;

        }

    });


    let cur = 0;

    let i = days.length - 1;


    // Today may not have any contribution yet
    if (i >= 0 && !days[i].count) {
        i--;
    }


    for (
        ;
        i >= 0 && days[i].count;
        i--
    ) {
        cur++;
    }


    return {
        total,
        active,
        best,
        longest,
        cur
    };
}


/* -------------------------------------------------------
   HEATMAP
   ------------------------------------------------------- */

const toWeeks = days => {

    const cells = [
        ...Array(
            P(days[0].date).getDay()
        ).fill(null),

        ...days
    ];


    const w = [];


    for (
        let i = 0;
        i < cells.length;
        i += 7
    ) {

        w.push(
            cells.slice(i, i + 7)
        );

    }


    return w;
};


const monthLabels = weeks => {

    const L = [];

    let prev = -1;


    weeks.forEach((w, i) => {

        const m =
            P(
                w.find(Boolean).date
            ).getMonth();


        if (m !== prev) {

            L.push([
                i,
                MON[m]
            ]);

            prev = m;
        }

    });


    return L.filter(
        ([i], k) =>
            k === L.length - 1 ||
            L[k + 1][0] - i >= 3
    );
};


/* -------------------------------------------------------
   COUNT ANIMATION
   ------------------------------------------------------- */

function Count({ to, go }) {

    const [v, setV] = useState(0);


    useEffect(() => {

        if (!go || to == null) {
            return;
        }


        const a = animate(
            0,
            to,
            {
                duration: 1.6,

                ease,

                onUpdate: x =>
                    setV(
                        Math.round(x)
                    )
            }
        );


        return () =>
            a.stop();

    }, [go, to]);


    return (
        <span className="tabular-nums">
            {to == null
                ? '—'
                : v.toLocaleString()}
        </span>
    );
}


/* -------------------------------------------------------
   HEATMAP COMPONENT
   ------------------------------------------------------- */

function Heat({
    weeks,
    go,
    status
}) {

    const wrap = useRef(null);

    const [tip, setTip] =
        useState(null);


    useEffect(() => {

        const e = wrap.current;

        if (e) {
            e.scrollLeft =
                e.scrollWidth;
        }

    }, [weeks]);


    const labels = useMemo(
        () =>
            weeks
                ? monthLabels(weeks)
                : [],
        [weeks]
    );


    const show = (e, d) => {

        const el =
            e.currentTarget;


        setTip({
            x:
                el.offsetLeft +
                el.offsetWidth / 2,

            y:
                el.offsetTop,

            d
        });

    };


    const grid =
        weeks ||
        Array.from(
            {
                length: 53
            },
            () =>
                Array(7).fill(0)
        );


    const sq = {
        width: 'var(--s)',
        height: 'var(--s)'
    };


    return (
        <div
            ref={wrap}
            className="gh-scroll overflow-x-auto pb-2 pt-14"
            style={{
                '--s': '13px',
                '--g': '4px'
            }}
        >

            <div className="relative mx-auto flex w-max gap-3">

                <div
                    className="flex flex-col pt-5 font-mono text-[10px] text-mute"
                    style={{
                        gap: 'var(--g)'
                    }}
                >

                    {[
                        '',
                        'Mon',
                        '',
                        'Wed',
                        '',
                        'Fri',
                        ''
                    ].map((l, i) => (

                        <span
                            key={i}
                            style={{
                                height:
                                    'var(--s)',
                                lineHeight:
                                    'var(--s)'
                            }}
                        >
                            {l}
                        </span>

                    ))}

                </div>


                <div>

                    <div
                        className="relative mb-1 h-4 font-mono text-[10px] text-mute"
                    >

                        {labels.map(
                            ([i, m]) => (

                                <span
                                    key={i}
                                    className="absolute whitespace-nowrap"
                                    style={{
                                        left:
                                            `calc(${i} * (var(--s) + var(--g)))`
                                    }}
                                >
                                    {m}
                                </span>

                            )
                        )}

                    </div>


                    <div
                        className="flex"
                        style={{
                            gap:
                                'var(--g)'
                        }}
                    >

                        {grid.map(
                            (w, i) => (

                                <div
                                    key={i}
                                    className="flex flex-col"
                                    style={{
                                        gap:
                                            'var(--g)'
                                    }}
                                >

                                    {w.map(
                                        (d, j) => (

                                            !weeks ? (

                                                <span
                                                    key={j}
                                                    className={`rounded-[3px] bg-white/[.06] ${status === 'load'
                                                            ? 'animate-pulse'
                                                            : ''
                                                        }`}
                                                    style={{
                                                        ...sq,
                                                        animationDelay:
                                                            `${i * 30}ms`
                                                    }}
                                                />

                                            ) : d ? (

                                                <span
                                                    key={j}
                                                    onMouseEnter={e =>
                                                        show(e, d)
                                                    }
                                                    onMouseLeave={() =>
                                                        setTip(null)
                                                    }
                                                    className={`gh-cell relative block rounded-[3px] transition-[scale] duration-150 hover:z-10 hover:scale-150 ${go
                                                            ? 'gh-in'
                                                            : ''
                                                        }`}
                                                    style={{
                                                        ...sq,

                                                        background:
                                                            LV[
                                                            d.level
                                                            ],

                                                        boxShadow:
                                                            GLOW[
                                                            d.level
                                                            ],

                                                        border:
                                                            d.level
                                                                ? 'none'
                                                                : '1px solid rgba(255,255,255,.09)',

                                                        animationDelay:
                                                            `${i * 14 + j * 20}ms`
                                                    }}
                                                />

                                            ) : (

                                                <span
                                                    key={j}
                                                    style={sq}
                                                />

                                            )

                                        )
                                    )}

                                </div>

                            )
                        )}

                    </div>

                </div>


                {tip && (

                    <div
                        className="pointer-events-none absolute z-30 -mt-2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-accent/40 bg-[#0a1226] px-3 py-1.5 font-mono text-[11px] shadow-[0_0_24px_rgba(79,140,255,.35)]"
                        style={{
                            left: tip.x,
                            top: tip.y
                        }}
                    >

                        <b className="text-ink">
                            {tip.d.count}{' '}
                            contribution
                            {tip.d.count === 1
                                ? ''
                                : 's'}
                        </b>

                        <span className="text-mute">
                            {' · '}
                            {fmt(
                                tip.d.date
                            )}
                        </span>

                    </div>

                )}

            </div>

        </div>
    );
}


/* -------------------------------------------------------
   STAT CARD
   ------------------------------------------------------- */

function Stat({
    label,
    value,
    sub,
    go,
    k
}) {

    return (

        <motion.div
            initial={{
                opacity: 0,
                y: 28
            }}

            animate={
                go
                    ? {
                        opacity: 1,
                        y: 0
                    }
                    : {}
            }

            transition={{
                duration: .8,
                ease,
                delay:
                    .15 + k * .1
            }}

            className="group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-[border-color,box-shadow,translate] duration-500 hover:-translate-y-1.5 hover:border-accent/70 hover:shadow-[0_0_0_1px_rgba(79,140,255,.25),0_0_44px_rgba(79,140,255,.28)]"

            style={{
                background:
                    'linear-gradient(135deg,rgba(79,140,255,.13),rgba(10,18,38,.55) 55%,rgba(5,7,13,.8))'
            }}
        >

            <span
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-12 bg-white/[.07] blur-md transition-transform duration-1000 group-hover:translate-x-[520%]"
            />

            <span
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-40"
            />


            <p className="relative font-mono text-[11px] tracking-[.22em] text-mute">
                {label}
            </p>


            <p
                className="relative mt-3 font-display text-5xl font-bold tracking-[-.03em]"
                style={{
                    backgroundImage:
                        `linear-gradient(100deg,#fff 30%,${ACC})`,

                    WebkitBackgroundClip:
                        'text',

                    backgroundClip:
                        'text',

                    color:
                        'transparent'
                }}
            >
                {value}
            </p>


            <p className="relative mt-1 text-sm text-mute">
                {sub}
            </p>

        </motion.div>

    );
}


/* -------------------------------------------------------
   MAIN GITHUB ACTIVITY COMPONENT
   ------------------------------------------------------- */

export default function GithubActivity() {

    const ref = useRef(null);


    const go = useInView(
        ref,
        {
            once: true,
            amount: .2
        }
    );


    const g = useGithub();

    const ok =
        g.status === 'ok';


    const st = useMemo(
        () =>
            ok
                ? calc(g.days)
                : null,
        [g, ok]
    );


    const weeks = useMemo(
        () =>
            ok
                ? toWeeks(g.days)
                : null,
        [g, ok]
    );


    /*
       Total number of language bytes.

       Example:

       JavaScript = 1000
       HTML       = 500
       CSS        = 500

       Total = 2000

       JavaScript = 1000 / 2000 * 100
                  = 50%
    */

    const totalLanguageBytes =
        ok && g.langs?.length
            ? g.langs.reduce(
                (total, [, bytes]) =>
                    total + bytes,
                0
            )
            : 0;


    const sweep =
        `conic-gradient(from var(--gh),transparent 0 55%,${ACC} 78%,#fff 90%,${SOFT} 96%,transparent)`;


    return (

        <section
            id="github"
            ref={ref}
            className="relative px-6 py-24 md:px-16"
        >

            <style>{`

                @property --gh {
                    syntax:'<angle>';
                    inherits:false;
                    initial-value:0deg
                }

                @keyframes ghspin {
                    to {
                        --gh:360deg
                    }
                }

                @keyframes ghcell {
                    from {
                        opacity:0;
                        transform:scale(.2)
                    }

                    to {
                        opacity:1;
                        transform:none
                    }
                }

                .gh-cell {
                    opacity:0
                }

                .gh-in {
                    animation:
                        ghcell .55s
                        cubic-bezier(.22,1,.36,1)
                        both
                }

                .gh-scroll {
                    scrollbar-width:thin;
                    scrollbar-color:
                        rgba(79,140,255,.45)
                        transparent
                }

                @media(prefers-reduced-motion:reduce) {

                    .gh-cell {
                        opacity:1
                    }

                    .gh-in {
                        animation:none
                    }

                }

            `}</style>


            <div className="mx-auto max-w-6xl">

                <p className="font-mono text-xs tracking-[.22em] text-accent">
                    OPEN SOURCE
                </p>


                <SplitText
                    as="h2"
                    parts={[
                        ['GitHub', ''],
                        [
                            'activity',
                            'font-serif font-normal italic text-accent'
                        ]
                    ]}
                    className="mt-2 block font-display text-5xl font-bold tracking-[-.03em] md:text-7xl"
                />


                <motion.div
                    initial={{
                        opacity: 0,
                        y: 36
                    }}

                    animate={
                        go
                            ? {
                                opacity: 1,
                                y: 0
                            }
                            : {}
                    }

                    transition={{
                        duration: .9,
                        ease
                    }}

                    className="group relative mt-12 rounded-[28px] p-[1.5px]"
                >

                    <div
                        className="pointer-events-none absolute -inset-2 rounded-[36px] opacity-25 blur-2xl transition-opacity duration-700 group-hover:opacity-90 group-hover:[animation:ghspin_6s_linear_infinite]"
                        style={{
                            background: sweep
                        }}
                    />


                    <div className="absolute inset-0 rounded-[28px] bg-white/10" />


                    <div
                        className="absolute inset-0 rounded-[28px] opacity-25 transition-opacity duration-700 group-hover:opacity-100"
                        style={{
                            background:
                                `linear-gradient(135deg,${ACC},${SOFT} 50%,${ACC})`
                        }}
                    />


                    <div
                        className="absolute inset-0 rounded-[28px]"
                        style={{
                            background: sweep,
                            animation:
                                'ghspin 6s linear infinite'
                        }}
                    />


                    <div
                        className="relative overflow-hidden rounded-[27px] p-6 md:p-10"
                        style={{
                            background:
                                'linear-gradient(135deg,#0b1530,#04060b)'
                        }}
                    >

                        <div
                            className="absolute inset-0 opacity-60"
                            style={{
                                backgroundImage:
                                    `radial-gradient(${ACC}55 1.2px,transparent 1.5px)`,

                                backgroundSize:
                                    '22px 22px',

                                WebkitMaskImage:
                                    'radial-gradient(ellipse at 85% 10%,#000,transparent 65%)',

                                maskImage:
                                    'radial-gradient(ellipse at 85% 10%,#000,transparent 65%)'
                            }}
                        />


                        <motion.div
                            className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-accent opacity-25 blur-3xl"

                            animate={{
                                x: [0, -50, 0],
                                y: [0, 40, 0]
                            }}

                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />


                        <div className="relative flex flex-wrap items-end justify-between gap-6">

                            <div>

                                <p
                                    className="font-display text-5xl font-bold tracking-[-.03em] md:text-7xl"

                                    style={{
                                        backgroundImage:
                                            `linear-gradient(100deg,#fff 30%,${ACC})`,

                                        WebkitBackgroundClip:
                                            'text',

                                        backgroundClip:
                                            'text',

                                        color:
                                            'transparent'
                                    }}
                                >
                                    <Count
                                        to={st?.total}
                                        go={go}
                                    />
                                </p>


                                <p className="mt-1 text-lg text-mute">
                                    contributions in the last year
                                </p>

                            </div>


                            <a
                                href={PROFILE}
                                target="_blank"
                                rel="noopener noreferrer"

                                className="group/b relative inline-flex items-center gap-3 overflow-hidden rounded-full py-3 pl-5 pr-6 font-semibold text-bg transition hover:scale-105"

                                style={{
                                    background:
                                        `linear-gradient(135deg,${SOFT},${ACC})`,

                                    boxShadow:
                                        '0 0 28px rgba(79,140,255,.5)'
                                }}
                            >

                                <span
                                    className="absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover/b:translate-x-[320%]"
                                />

                                <SiGithub
                                    size={20}
                                    className="relative"
                                />

                                <span className="relative">
                                    @{USER}
                                </span>

                                <span className="relative transition-transform duration-300 group-hover/b:translate-x-1">
                                    ↗
                                </span>

                            </a>

                        </div>


                        <div className="relative mt-4">

                            {g.status === 'err' && (

                                <p className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center text-mute">

                                    Couldn't load live data right now.

                                    {' '}

                                    <a
                                        href={PROFILE}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent underline underline-offset-4"
                                    >
                                        View the graph on GitHub ↗
                                    </a>

                                </p>

                            )}


                            <div
                                className={
                                    g.status === 'err'
                                        ? 'opacity-30'
                                        : ''
                                }
                            >

                                <Heat
                                    weeks={weeks}
                                    go={go}
                                    status={g.status}
                                />

                            </div>

                        </div>


                        <div className="relative mt-2 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[.12em] text-mute">

                            <span>
                                {g.repos != null
                                    ? `${g.repos} PUBLIC REPOS`
                                    : 'LIVE FROM GITHUB'}
                            </span>


                            <span className="flex items-center gap-2">

                                LESS

                                {LV.map(
                                    (c, i) => (

                                        <i
                                            key={i}
                                            className="block h-3 w-3 rounded-[3px]"
                                            style={{
                                                background: c,
                                                boxShadow:
                                                    GLOW[i],
                                                border:
                                                    i
                                                        ? 'none'
                                                        : '1px solid rgba(255,255,255,.09)'
                                            }}
                                        />

                                    )
                                )}

                                MORE

                            </span>

                        </div>

                    </div>

                </motion.div>


                {/* -------------------------------------------------------
                    STAT CARDS
                ------------------------------------------------------- */}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <Stat
                        k={0}
                        go={go}
                        label="CURRENT STREAK"
                        value={
                            st
                                ? st.cur
                                : '—'
                        }
                        sub="days in a row"
                    />


                    <Stat
                        k={1}
                        go={go}
                        label="LONGEST STREAK"
                        value={
                            st
                                ? st.longest
                                : '—'
                        }
                        sub="days in the last year"
                    />


                    <Stat
                        k={2}
                        go={go}
                        label="ACTIVE DAYS"
                        value={
                            st
                                ? st.active
                                : '—'
                        }
                        sub={
                            st
                                ? `out of ${g.days.length} days`
                                : 'with at least one contribution'
                        }
                    />


                    <Stat
                        k={3}
                        go={go}
                        label="BUSIEST DAY"
                        value={
                            st
                                ? st.best.count
                                : '—'
                        }
                        sub={
                            st &&
                                st.best.count
                                ? fmt(
                                    st.best.date
                                )
                                : 'contributions in a day'
                        }
                    />

                </div>


                {/* -------------------------------------------------------
                    LIVE GITHUB LANGUAGES
                ------------------------------------------------------- */}

                {ok &&
                    g.langs?.length > 0 &&
                    totalLanguageBytes > 0 && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 28
                            }}

                            animate={
                                go
                                    ? {
                                        opacity: 1,
                                        y: 0
                                    }
                                    : {}
                            }

                            transition={{
                                duration: .8,
                                ease,
                                delay: .55
                            }}

                            className="mt-4 rounded-2xl border border-white/10 p-6"

                            style={{
                                background:
                                    'linear-gradient(135deg,rgba(79,140,255,.1),rgba(5,7,13,.8))'
                            }}
                        >

                            <p className="font-mono text-[11px] tracking-[.22em] text-mute">
                                MOST USED LANGUAGES · BY CODE SIZE
                            </p>


                            {/* -------------------------------------------------------
                                LANGUAGE BAR
                            ------------------------------------------------------- */}

                            <div className="mt-4 flex h-3 overflow-hidden rounded-full">

                                {g.langs.map(
                                    ([name, bytes], i) => {

                                        const percentage =
                                            (
                                                bytes /
                                                totalLanguageBytes
                                            ) * 100;


                                        return (

                                            <motion.span
                                                key={name}
                                                className="block h-full first:rounded-l-full last:rounded-r-full"

                                                style={{
                                                    background:
                                                        col(name, i),

                                                    boxShadow:
                                                        `0 0 12px ${col(name, i)},0 0 28px ${col(name, i)}88`
                                                }}

                                                initial={{
                                                    width: 0
                                                }}

                                                animate={
                                                    go
                                                        ? {
                                                            width:
                                                                `${percentage}%`
                                                        }
                                                        : {}
                                                }

                                                transition={{
                                                    duration: 1.2,
                                                    ease,
                                                    delay:
                                                        .7 +
                                                        i * .1
                                                }}
                                            />

                                        );

                                    }
                                )}

                            </div>


                            {/* -------------------------------------------------------
                                LANGUAGE PERCENTAGES
                            ------------------------------------------------------- */}

                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">

                                {g.langs.map(
                                    ([name, bytes], i) => {

                                        const percentage =
                                            (
                                                bytes /
                                                totalLanguageBytes
                                            ) * 100;


                                        return (

                                            <span
                                                key={name}
                                                className="flex items-center gap-2"
                                            >

                                                <i
                                                    className="block h-2.5 w-2.5 rounded-full"

                                                    style={{
                                                        background:
                                                            col(name, i),

                                                        boxShadow:
                                                            `0 0 8px ${col(name, i)}`
                                                    }}
                                                />


                                                {name}


                                                <span className="font-mono text-xs text-mute">
                                                    {percentage.toFixed(2)}%
                                                </span>

                                            </span>

                                        );

                                    }
                                )}

                            </div>

                        </motion.div>

                    )}

            </div>

        </section>

    );
}