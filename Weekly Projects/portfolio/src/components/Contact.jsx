import { useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaArrowRight, FaCheck, FaGithub, FaLinkedinIn, FaLocationDot, FaRegEnvelope } from 'react-icons/fa6';
import { SplitText } from './Text';

// ------------------------- EDIT THESE -------------------------
const EMAIL = 'abdulrehmanpro6@gmail.com';
const GITHUB = 'https://github.com/abdulrehman1111-de';
const LINKEDIN = 'https://www.linkedin.com/in/-abdulrehman-cs';
const FORMSPREE_ID = '';   // optional: paste a Formspree form id so messages arrive in your inbox directly. Empty = opens the visitor's email app.
// --------------------------------------------------------------

const ease = [.22, 1, .36, 1];
const topics = ['A project', 'An internship', 'A job', 'A collaboration', 'Just saying hi'];
const emailOk = v => /^\S+@\S+\.\S+$/.test(v.trim());
const MSG = { name: 'Please tell me your name.', email: 'Please enter a valid email, like name@example.com.', msg: 'Please write at least 10 characters so I know how to help.' };
const box = 'w-full rounded-xl border bg-white/[.04] px-4 py-3.5 text-lg text-ink outline-none transition duration-300 placeholder:text-mute/60 focus:border-accent focus:bg-white/[.06] focus:shadow-[0_0_0_4px_rgba(79,140,255,.16)]';

function Row({ icon: I, label, value, href, onClick, hint }) {
    const Tag = href ? 'a' : onClick ? 'button' : 'div';
    return (<Tag href={href} onClick={onClick} target={href ? '_blank' : undefined} rel={href ? 'noreferrer' : undefined} type={Tag === 'button' ? 'button' : undefined}
        className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-left transition duration-300 hover:border-accent/50 hover:bg-white/[.06]">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[.04] text-accent transition duration-300 group-hover:scale-110 group-hover:border-transparent group-hover:bg-accent group-hover:text-bg group-hover:shadow-[0_0_24px_var(--color-accent)]"><I size={16} /></span>
        <span className="min-w-0 flex-1"><span className="block font-mono text-[10px] uppercase tracking-[.22em] text-mute">{label}</span><span className="block truncate font-display text-lg font-semibold tracking-tight">{value}</span></span>
        {hint && <span className="font-mono text-[10px] uppercase tracking-[.2em] text-accent">{hint}</span>}
    </Tag>)
}

// One clearly labelled question: numbered badge (turns into a tick when done), label, small hint, and an inline error.
function Field({ id, n, label, hint, error, ok, children }) {
    return (<div>
        <div className="mb-2.5 flex items-center gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-[10px] transition-all duration-300"
                style={ok ? { background: '#4f8cff', color: '#05070d', borderColor: '#4f8cff', boxShadow: '0 0 14px rgba(79,140,255,.6)' } : { borderColor: 'rgba(255,255,255,.2)', color: '#8a93a6' }}>{ok ? <FaCheck size={10} /> : n}</span>
            <label htmlFor={id} className="font-display text-lg font-semibold tracking-tight">{label}</label>
            {hint && <span className="font-mono text-[10px] uppercase tracking-[.18em] text-mute">{hint}</span>}
        </div>
        {children}
        <AnimatePresence>{error && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pt-2 text-sm text-red-400">{error}</motion.p>}</AnimatePresence>
    </div>)
}

function Send({ status }) {
    const mx = useMotionValue(0), my = useMotionValue(0), x = useSpring(mx, { stiffness: 200, damping: 15 }), y = useSpring(my, { stiffness: 200, damping: 15 });
    return (<motion.button type="submit" disabled={status === 'sending'} style={{ x, y, background: 'linear-gradient(135deg,#bcd7ff,#4f8cff 55%,#22d3ee)', boxShadow: '0 0 36px rgba(79,140,255,.45)' }}
        onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left - r.width / 2) * .22); my.set((e.clientY - r.top - r.height / 2) * .35) }} onMouseLeave={() => { mx.set(0); my.set(0) }}
        whileTap={{ scale: .96 }} className="group relative inline-flex shrink-0 items-center gap-4 overflow-hidden rounded-full py-3 pl-8 pr-3 font-display text-lg font-semibold text-bg disabled:opacity-80">
        <span className="absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-white/50 blur-md transition-transform duration-700 group-hover:translate-x-[420%]" />
        <span className="relative">{status === 'sending' ? 'Sending' : 'Send message'}</span>
        <span className="relative grid h-11 w-11 place-items-center rounded-full bg-bg text-accent transition-transform duration-500 group-hover:-rotate-45">
            {status === 'sending' ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" /> : <FaArrowRight size={16} />}</span>
    </motion.button>)
}

export default function Contact() {
    const sec = useRef(null), refs = { name: useRef(null), email: useRef(null), msg: useRef(null) }, shake = useAnimationControls();
    const [name, setName] = useState(''), [email, setEmail] = useState(''), [topic, setTopic] = useState(null), [msg, setMsg] = useState('');
    const [err, setErr] = useState({}), [status, setStatus] = useState('idle'), [copied, setCopied] = useState(false), [trap, setTrap] = useState('');
    const { scrollYProgress } = useScroll({ target: sec, offset: ['start end', 'end start'] });
    const bx = useTransform(scrollYProgress, [0, 1], ['8%', '-38%']);
    const ok = { name: name.trim().length > 1, email: emailOk(email), msg: msg.trim().length >= 10 };
    const done = Object.values(ok).filter(Boolean).length;
    const clear = (k, valid) => valid && err[k] && setErr(e => ({ ...e, [k]: '' }));

    const copy = () => { navigator.clipboard?.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800) };
    const reset = () => { setName(''); setEmail(''); setTopic(null); setMsg(''); setErr({}); setStatus('idle') };
    const submit = async e => {
        e.preventDefault();
        const bad = Object.keys(ok).filter(k => !ok[k]);
        if (bad.length) {
            setErr(Object.fromEntries(bad.map(k => [k, MSG[k]])));
            shake.start({ x: [0, -10, 10, -8, 8, 0], transition: { duration: .5 } });
            refs[bad[0]].current?.focus(); return
        }
        setErr({});
        if (trap) { setStatus('sent'); return }
        setStatus('sending');
        const subject = `Portfolio message: ${topic ?? 'Just saying hi'}`;
        try {
            if (FORMSPREE_ID) {
                const r = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name, email, topic, message: msg, _subject: subject }) });
                if (!r.ok) throw new Error('send failed'); setStatus('sent');
            } else {
                location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${msg}\n\n— ${name} (${email})`)}`;
                setTimeout(() => setStatus('sent'), 700);
            }
        } catch { setStatus('error') }
    };

    const corner = 'pointer-events-none absolute h-5 w-5 border-accent transition-all duration-500 group-focus-within:h-7 group-focus-within:w-7 group-hover:h-7 group-hover:w-7';
    const ring = k => err[k] ? 'border-red-400/80' : 'border-white/15';
    return (<section id="contact" ref={sec} className="relative overflow-hidden px-6 py-28 md:px-16">
        <motion.div style={{ x: bx, color: 'transparent', WebkitTextStroke: '1px rgba(79,140,255,.16)' }} aria-hidden="true" className="pointer-events-none absolute left-0 top-[6%] select-none whitespace-nowrap font-display text-[22vw] font-extrabold leading-none">SAY HELLO · SAY HELLO · SAY HELLO</motion.div>
        <div className="relative mx-auto max-w-6xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[.22em] text-accent">( Contact )</p>
            <SplitText as="h2" by="word" className="hover-chars block font-display text-5xl font-bold leading-[.98] tracking-[-.035em] md:text-8xl" parts={[["Let's build something", ''], ['together.', 'font-serif font-normal italic text-[1.08em] tracking-normal text-accent']]} />
            <p className="mt-6 max-w-lg leading-relaxed text-mute">Have a project, an opportunity or a question? Fill in the form and send it, or reach me directly using the links on the left.</p>

            <div className="mt-16 grid gap-10 lg:grid-cols-[.8fr_1.4fr]">
                <div className="space-y-3">
                    <Row icon={FaRegEnvelope} label="Email" value={EMAIL} onClick={copy} hint={copied ? 'Copied ✓' : 'Click to copy'} />
                    <Row icon={FaGithub} label="GitHub" value="abdulrehman1111-de" href={GITHUB} />
                    <Row icon={FaLinkedinIn} label="LinkedIn" value="in/-abdulrehman-cs" href={LINKEDIN} />
                    <Row icon={FaLocationDot} label="Based in" value="Bahawalpur, Pakistan" />
                </div>

                <motion.div animate={shake} className="group relative">
                    <div className="absolute -inset-6 -z-10 rounded-[40px] bg-accent/15 blur-3xl" />
                    <span className={`${corner} -left-2 -top-2 border-l-2 border-t-2`} /><span className={`${corner} -right-2 -top-2 border-r-2 border-t-2`} />
                    <span className={`${corner} -bottom-2 -left-2 border-b-2 border-l-2`} /><span className={`${corner} -bottom-2 -right-2 border-b-2 border-r-2`} />
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070b14]/75 backdrop-blur-xl"
                        onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--x', e.clientX - r.left + 'px'); e.currentTarget.style.setProperty('--y', e.clientY - r.top + 'px') }}>
                        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(rgba(79,140,255,.22) 1px,transparent 1.4px)', backgroundSize: '22px 22px', WebkitMaskImage: 'radial-gradient(420px circle at var(--x,50%) var(--y,0%),#000,transparent 70%)', maskImage: 'radial-gradient(420px circle at var(--x,50%) var(--y,0%),#000,transparent 70%)' }} />
                        <AnimatePresence mode="wait">
                            {status === 'sent' ?
                                <motion.div key="sent" initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5, ease }} className="relative grid min-h-[32rem] place-items-center p-8 text-center">
                                    <div><svg viewBox="0 0 52 52" className="mx-auto h-24 w-24" fill="none" stroke="#4f8cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 12px #4f8cff)' }}>
                                        <motion.circle cx="26" cy="26" r="24" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .8, ease }} />
                                        <motion.path d="M15 27l8 8 14-16" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .5, delay: .6, ease }} /></svg>
                                        <h3 className="mt-8 font-display text-4xl font-bold tracking-[-.03em] md:text-5xl">Thank <span className="font-serif font-normal italic text-accent">you</span>, {name.trim().split(' ')[0]}.</h3>
                                        <p className="mx-auto mt-4 max-w-sm leading-relaxed text-mute">{FORMSPREE_ID ? `Your message is on its way. I'll reply to ${email.trim()}.` : 'Your email app should have opened with the message ready. Just press send there and it is done.'}</p>
                                        <button type="button" onClick={reset} className="mt-8 font-mono text-xs uppercase tracking-[.2em] text-accent underline-offset-4 hover:underline">Write another message</button></div>
                                </motion.div> :
                                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="relative p-6 md:p-10">
                                    <h3 className="font-display text-3xl font-bold tracking-[-.03em] md:text-4xl">Send me a <span className="font-serif font-normal italic text-accent">message</span></h3>
                                    <p className="mt-2 text-mute">Fill in the three required fields, then press send. It takes about a minute.</p>
                                    <div className="mt-5 flex items-center gap-4"><div className="flex flex-1 gap-1.5">{[0, 1, 2].map(i => <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10"><motion.span className="block h-full origin-left bg-accent shadow-[0_0_10px_var(--color-accent)]" animate={{ scaleX: i < done ? 1 : 0 }} transition={{ duration: .5, ease }} /></span>)}</div>
                                        <span className="font-mono text-[10px] uppercase tracking-[.18em] text-mute">{done} of 3 done</span></div>
                                    <input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} className="hidden" aria-hidden="true" />

                                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                                        <Field id="cf-name" n="1" label="Your name" hint="Required" error={err.name} ok={ok.name}>
                                            <input ref={refs.name} id="cf-name" type="text" autoComplete="name" placeholder="e.g. Ali Khan" value={name} onChange={e => { setName(e.target.value); clear('name', e.target.value.trim().length > 1) }} className={`${box} ${ring('name')}`} /></Field>
                                        <Field id="cf-email" n="2" label="Your email" hint="So I can reply" error={err.email} ok={ok.email}>
                                            <input ref={refs.email} id="cf-email" type="email" autoComplete="email" placeholder="e.g. ali@example.com" value={email} onChange={e => { setEmail(e.target.value); clear('email', emailOk(e.target.value)) }}
                                                onBlur={() => email && !emailOk(email) && setErr(x => ({ ...x, email: MSG.email }))} className={`${box} ${ring('email')}`} /></Field>
                                    </div>

                                    <div className="mt-6" role="group" aria-labelledby="cf-topic">
                                        <div className="mb-2.5 flex items-center gap-3"><span className={`grid h-6 w-6 place-items-center rounded-full border font-mono text-[10px] transition-all duration-300 ${topic ? 'border-accent text-accent' : 'border-white/20 text-mute'}`}>{topic ? <FaCheck size={10} /> : '+'}</span>
                                            <span id="cf-topic" className="font-display text-lg font-semibold tracking-tight">What is it about?</span><span className="font-mono text-[10px] uppercase tracking-[.18em] text-mute">Optional, tap one</span></div>
                                        <div className="flex flex-wrap gap-2">
                                            {topics.map(t => <button type="button" key={t} aria-pressed={topic === t} onClick={() => setTopic(topic === t ? null : t)} className={`relative rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[.12em] transition-colors duration-300 ${topic === t ? 'border-transparent text-bg' : 'border-white/15 text-mute hover:border-accent/60 hover:text-ink'}`}>
                                                {topic === t && <motion.span layoutId="topic" transition={{ type: 'spring', stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg,#bcd7ff,#4f8cff)', boxShadow: '0 0 22px rgba(79,140,255,.55)' }} />}
                                                <span className="relative">{t}</span></button>)}</div></div>

                                    <div className="mt-6"><Field id="cf-msg" n="3" label="Your message" hint="Required" error={err.msg} ok={ok.msg}>
                                        <textarea ref={refs.msg} id="cf-msg" rows={5} maxLength={600} placeholder="Tell me what you have in mind: what you need, your timeline, anything that helps." value={msg} onChange={e => { setMsg(e.target.value); clear('msg', e.target.value.trim().length >= 10) }} className={`${box} resize-none leading-relaxed ${ring('msg')}`} /></Field>
                                        <p className="mt-1.5 text-right font-mono text-[10px] uppercase tracking-[.2em] text-mute">{msg.length} / 600</p></div>

                                    <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                                        <Send status={status} />
                                        <p className="max-w-xs text-sm leading-relaxed text-mute">{status === 'error' ? <span className="text-red-400">Something went wrong. Please try again, or email me directly.</span> : Object.values(err).some(Boolean) ? <span className="text-red-400">Some fields need attention. They are marked above.</span> : FORMSPREE_ID ? 'Your message goes straight to my inbox.' : 'Pressing send opens your email app with this message ready. Just press send there.'}</p>
                                    </div>
                                </motion.form>}
                        </AnimatePresence>
                    </div></motion.div>
            </div></div></section>)
}