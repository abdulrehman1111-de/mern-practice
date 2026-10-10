import {useEffect,useRef,useState} from 'react';
import {AnimatePresence,motion,useMotionValueEvent,useReducedMotion,useScroll} from 'framer-motion';

// Same order as the sections on the page, so the nav always matches what you scroll through.
const links=[['home','Home'],['about','About'],['education','Journey'],['projects','Projects'],['contact','Contact']];
// Critically damped spring (no bounce): settles smoothly and can be interrupted mid-flight without a jump.
const SPRING={type:'spring',bounce:0,duration:.35};

function useSpy(){
const[a,setA]=useState('home');
useEffect(()=>{const o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setA(e.target.id)),{rootMargin:'-45% 0px -50% 0px'});
links.forEach(([id])=>{const el=document.getElementById(id);el&&o.observe(el)});return()=>o.disconnect()},[]);
return a}

// Live Pakistan time. Updates the text node directly, so the navbar never re-renders for it.
// Only the minute is shown, so it updates once per minute, right when the minute changes.
function PKT(){
const r=useRef(null);
useEffect(()=>{
let t;
const f=()=>{const d=new Date(Date.now()+5*36e5);r.current.textContent=`${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`;t=setTimeout(f,60000-Date.now()%60000+50)};
f();return()=>clearTimeout(t)},[]);
return(<a href="#contact" className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-3.5 py-2 font-mono text-[11px] tracking-wider text-mute transition-colors duration-150 hover:border-accent/50 hover:text-ink lg:flex">
<span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping"/><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"/></span>
<span ref={r}>--:--</span><span className="text-accent">PKT</span></a>)}

// The highlight pill follows your mouse (or keyboard focus) and settles back on the section you are in when you leave.
function Links({active}){
const[h,setH]=useState(null),lit=h??active;
return(<ul onMouseLeave={()=>setH(null)} onBlur={e=>!e.currentTarget.contains(e.relatedTarget)&&setH(null)} className="relative hidden items-center gap-0.5 md:flex">
{links.map(([id,l],i)=><li key={id} onMouseEnter={()=>setH(id)} onFocus={()=>setH(id)} className="relative">
{lit===id&&<motion.span layoutId="navpill" transition={SPRING} className="absolute inset-0 border"
style={{borderRadius:9999,borderColor:'rgba(79,140,255,.45)',background:'linear-gradient(135deg,rgba(79,140,255,.28),rgba(34,211,238,.10))'}}/>}
<a href={'#'+id} className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${lit===id?'text-ink':'text-mute'}`}>
<span className="hidden font-mono text-[10px] text-accent lg:inline">0{i+1}</span>{l}</a>
{active===id&&<span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"/>}
</li>)}</ul>)}

export default function Navbar(){
const active=useSpy(),[open,setOpen]=useState(false),[hidden,setHidden]=useState(false),reduce=useReducedMotion();
const{scrollY}=useScroll();
// hide while scrolling down, come back as soon as you scroll up
useMotionValueEvent(scrollY,'change',y=>{const d=y-(scrollY.getPrevious()??y);if(y<120||d<-4)setHidden(false);else if(d>4)setHidden(true)});
useEffect(()=>{
document.body.style.overflow=open?'hidden':'';
const k=e=>e.key==='Escape'&&setOpen(false);addEventListener('keydown',k);
return()=>{document.body.style.overflow='';removeEventListener('keydown',k)}},[open]);
// rotating a phone or resizing to desktop width: close the mobile menu so the page doesn't stay locked
useEffect(()=>{const mq=matchMedia('(min-width: 768px)'),f=()=>mq.matches&&setOpen(false);mq.addEventListener('change',f);return()=>mq.removeEventListener('change',f)},[]);
return(<>
<div className="h-20"/>
<motion.header initial={{y:-100,opacity:0}} animate={{y:hidden&&!open?-110:0,opacity:1}} transition={reduce?{duration:0}:SPRING}
className="pointer-events-none fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-40 flex justify-center px-4">
<nav className="pointer-events-auto w-full max-w-4xl rounded-full p-px" style={{background:'linear-gradient(120deg,rgba(79,140,255,.55),rgba(255,255,255,.08) 40%,rgba(34,211,238,.4))',boxShadow:'0 10px 30px -14px rgba(0,0,0,.6)'}}>
<div className="flex items-center justify-between gap-4 rounded-full bg-[#060912]/90 py-2 pl-5 pr-2 md:bg-[#060912]/70 md:pr-3 md:backdrop-blur-lg [@media(prefers-reduced-transparency:reduce)]:bg-[#060912] [@media(prefers-reduced-transparency:reduce)]:backdrop-blur-none">
<a href="#home" onClick={()=>setOpen(false)} className="group flex items-center gap-2.5">
<span className="h-2.5 w-2.5 rounded-full bg-accent transition-transform duration-150 group-hover:scale-150"/>
<span className="font-display text-lg font-bold tracking-[-.02em]">Abdul <span className="font-serif text-[1.15em] font-normal italic tracking-normal text-accent">Rehman</span></span></a>
<Links active={active}/>
<PKT/>
<button aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(o=>!o)} className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.04] transition-[scale] duration-150 active:scale-90 md:hidden">
<span className={`absolute h-px w-4 bg-ink transition-transform duration-200 ${open?'rotate-45':'-translate-y-1'}`}/>
<span className={`absolute h-px w-4 bg-ink transition-transform duration-200 ${open?'-rotate-45':'translate-y-1'}`}/></button>
</div></nav></motion.header>
{/* The menu grows out of the hamburger and shrinks back into it (same path both ways), using only scale and opacity. */}
<AnimatePresence>{open&&<motion.div key="menu" initial={{opacity:0,scale:reduce?1:.96}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:reduce?1:.96}} transition={reduce?{duration:.01}:SPRING} style={{transformOrigin:'92% 36px'}}
className="fixed inset-0 z-30 flex flex-col overflow-y-auto overscroll-contain bg-bg/[.98] px-8 py-24 md:hidden">
<motion.ul className="my-auto" initial="hidden" animate="show" variants={{hidden:{},show:{transition:{staggerChildren:.04,delayChildren:.05}}}}>
{links.map(([id,l],i)=><motion.li key={id} variants={{hidden:{opacity:0,y:reduce?0:16},show:{opacity:1,y:0,transition:SPRING}}}>
<a href={'#'+id} onClick={()=>setOpen(false)} className="flex items-baseline gap-4 border-b border-white/10 py-4 transition-opacity duration-100 active:opacity-60 sm:py-5">
<span className="font-mono text-xs text-accent">0{i+1}</span>
<span className={`font-display text-4xl font-bold tracking-[-.03em] min-[400px]:text-5xl ${active===id?'text-accent':''}`}>{l}</span></a></motion.li>)}
</motion.ul></motion.div>}</AnimatePresence>
</>)}