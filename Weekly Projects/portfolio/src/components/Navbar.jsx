import {useEffect,useRef,useState} from 'react';
import {AnimatePresence,motion,useMotionValueEvent,useScroll} from 'framer-motion';

const links=[['home','Home'],['about','About'],['education','Journey'],['contact','Contact'],['projects','Projects']];
const ease=[.22,1,.36,1];

function useSpy(){
const[a,setA]=useState('home');
useEffect(()=>{const o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setA(e.target.id)),{rootMargin:'-45% 0px -50% 0px'});
links.forEach(([id])=>{const el=document.getElementById(id);el&&o.observe(el)});return()=>o.disconnect()},[]);
return a}

// Live Pakistan time. Updates the text node directly, so the navbar never re-renders for it.
function PKT(){
const r=useRef(null);
useEffect(()=>{
const f=()=>{const d=new Date(Date.now()+5*36e5);r.current.textContent=`${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`};
f();const i=setInterval(f,1000);return()=>clearInterval(i)},[]);
return(<a href="#contact" className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-3.5 py-2 font-mono text-[11px] tracking-wider text-mute transition hover:border-accent/50 hover:text-ink lg:flex">
<span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"/><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"/></span>
<span ref={r}>--:--</span><span className="text-accent">PKT</span></a>)}

// The highlight pill follows your mouse and snaps back to the section you are in when you leave.
function Links({active}){
const[h,setH]=useState(null),lit=h??active;
return(<ul onMouseLeave={()=>setH(null)} className="relative hidden items-center gap-0.5 md:flex">
{links.map(([id,l],i)=><li key={id} onMouseEnter={()=>setH(id)} className="relative">
{lit===id&&<motion.span layoutId="navpill" transition={{type:'spring',stiffness:420,damping:34}} className="absolute inset-0 rounded-full border"
style={{borderColor:'rgba(79,140,255,.45)',background:'linear-gradient(135deg,rgba(79,140,255,.28),rgba(34,211,238,.10))',boxShadow:'0 0 22px rgba(79,140,255,.35),inset 0 0 14px rgba(79,140,255,.12)'}}/>}
<a href={'#'+id} className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${lit===id?'text-ink':'text-mute'}`}>
<span className="hidden font-mono text-[10px] text-accent lg:inline">0{i+1}</span>{l}</a>
{active===id&&<span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"/>}
</li>)}</ul>)}

export default function Navbar(){
const active=useSpy(),[open,setOpen]=useState(false),[hidden,setHidden]=useState(false);
const{scrollY}=useScroll();
// hide while scrolling down, come back as soon as you scroll up
useMotionValueEvent(scrollY,'change',y=>{const d=y-(scrollY.getPrevious()??y);if(y<120||d<-4)setHidden(false);else if(d>4)setHidden(true)});
useEffect(()=>{
document.body.style.overflow=open?'hidden':'';
const k=e=>e.key==='Escape'&&setOpen(false);addEventListener('keydown',k);
return()=>{document.body.style.overflow='';removeEventListener('keydown',k)}},[open]);
return(<>
<div className="h-20"/>
<motion.header initial={{y:-100,opacity:0}} animate={{y:hidden&&!open?-110:0,opacity:1}} transition={{duration:.6,ease}}
className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
<nav className="pointer-events-auto w-full max-w-4xl rounded-full p-px" style={{background:'linear-gradient(120deg,rgba(79,140,255,.55),rgba(255,255,255,.08) 40%,rgba(34,211,238,.4))',boxShadow:'0 12px 50px -12px rgba(79,140,255,.45)'}}>
<div className="flex items-center justify-between gap-4 rounded-full bg-[#060912]/70 py-2 pl-5 pr-2 backdrop-blur-xl md:pr-3">
<a href="#home" onClick={()=>setOpen(false)} className="group flex items-center gap-2.5">
<span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)] transition-transform duration-300 group-hover:scale-150"/>
<span className="font-display text-lg font-bold tracking-[-.02em]">Abdul <span className="font-serif text-[1.15em] font-normal italic tracking-normal text-accent">Rehman</span></span></a>
<Links active={active}/>
<PKT/>
<button aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(o=>!o)} className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.04] md:hidden">
<span className={`absolute h-px w-4 bg-ink transition-transform duration-300 ${open?'rotate-45':'-translate-y-1'}`}/>
<span className={`absolute h-px w-4 bg-ink transition-transform duration-300 ${open?'-rotate-45':'translate-y-1'}`}/></button>
</div></nav></motion.header>
<AnimatePresence>{open&&<motion.div key="menu" initial={{clipPath:'circle(0px at 92% 36px)'}} animate={{clipPath:'circle(1800px at 92% 36px)'}} exit={{clipPath:'circle(0px at 92% 36px)'}} transition={{duration:.7,ease:[.76,0,.24,1]}}
className="fixed inset-0 z-30 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl md:hidden">
<motion.ul initial="hidden" animate="show" variants={{hidden:{},show:{transition:{staggerChildren:.07,delayChildren:.3}}}}>
{links.map(([id,l],i)=><motion.li key={id} variants={{hidden:{opacity:0,y:40},show:{opacity:1,y:0,transition:{duration:.7,ease}}}}>
<a href={'#'+id} onClick={()=>setOpen(false)} className="flex items-baseline gap-4 border-b border-white/10 py-5">
<span className="font-mono text-xs text-accent">0{i+1}</span>
<span className={`font-display text-5xl font-bold tracking-[-.03em] ${active===id?'text-accent':''}`}>{l}</span></a></motion.li>)}
</motion.ul></motion.div>}</AnimatePresence>
</>)}
