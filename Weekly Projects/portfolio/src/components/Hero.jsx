import {motion,useMotionValue,useSpring,useTransform} from 'framer-motion';
import {SplitText} from './Text';
import {SiReact,SiNodedotjs,SiMongodb,SiExpress,SiJavascript,SiTailwindcss,SiFirebase} from 'react-icons/si';

const chips=[
{n:'React',i:SiReact,c:'#61dafb',l:'-12%',t:'10%',d:18,s:5,o:0},
{n:'Node.js',i:SiNodedotjs,c:'#5fa04e',l:'78%',t:'4%',d:26,s:6,o:.8},
{n:'MongoDB',i:SiMongodb,c:'#47a248',l:'-18%',t:'44%',d:14,s:5.5,o:1.6},
{n:'Express',i:SiExpress,c:'#e8ecf4',l:'84%',t:'32%',d:22,s:4.8,o:.4},
{n:'JavaScript',i:SiJavascript,c:'#f7df1e',l:'-6%',t:'74%',d:30,s:6.2,o:1.2},
{n:'Tailwind',i:SiTailwindcss,c:'#38bdf8',l:'80%',t:'60%',d:16,s:5.2,o:2},
{n:'Firebase',i:SiFirebase,c:'#ffca28',l:'50%',t:'-4%',d:12,s:6.5,o:2.4}];

function Chip({c,mx,my}){
const x=useTransform(mx,[-1,1],[-c.d,c.d]),y=useTransform(my,[-1,1],[-c.d,c.d]),I=c.i;
const fill=`linear-gradient(135deg,color-mix(in srgb,${c.c} 55%,white),${c.c} 55%,color-mix(in srgb,${c.c} 70%,black))`;
return(<motion.div style={{left:c.l,top:c.t,x,y}} className="absolute z-20">
<motion.div animate={{y:[0,-14,0],rotate:[-2,2,-2]}} transition={{repeat:Infinity,duration:c.s,delay:c.o,ease:'easeInOut'}} whileHover={{scale:1.18}}
style={{'--c':c.c}}
className="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-white/[.06] px-3 py-2 shadow-xl shadow-black/40 backdrop-blur-md transition-[box-shadow,border-color] duration-300 hover:border-transparent hover:shadow-[0_0_14px_var(--c),0_0_42px_var(--c)]">
<span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{background:fill}}/>
<span className="absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover:translate-x-[320%]"/>
<I size={22} className="relative text-[color:var(--c)] transition-colors duration-300 group-hover:text-bg"/>
<span className="relative text-xs font-medium transition-colors duration-300 group-hover:font-semibold group-hover:text-bg">{c.n}</span>
</motion.div></motion.div>)}

export default function Hero(){
const bx=useMotionValue(0),by=useMotionValue(0);
const mx=useSpring(bx,{stiffness:60,damping:15}),my=useSpring(by,{stiffness:60,damping:15});
return(<section id="home" onMouseMove={e=>{bx.set((e.clientX/innerWidth-.5)*2);by.set((e.clientY/innerHeight-.5)*2)}}
className="flex min-h-[90vh] items-center overflow-x-clip px-6 py-10 md:px-16">
<div className="mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-2">
<div className="relative mx-auto w-fit max-w-full">
<div className="absolute inset-x-[10%] bottom-0 z-0 h-3/4 rounded-full bg-accent/25 blur-3xl"/>
<img src="/portrait.webp" alt="Abdul Rehman" className="relative z-10 block" style={{maxHeight:'82vh',maxWidth:'100%',width:'auto'}}/>
{chips.map(c=><Chip key={c.n} c={c} mx={mx} my={my}/>)}
</div>
<div>
<p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[.22em] text-mute"><span className="h-px w-10 bg-accent"/>Hi, I'm</p>
<SplitText as="h1" inView={false} delay={.7} stagger={.045} className="hover-chars mt-5 block font-display text-6xl font-extrabold leading-[.95] tracking-[-.035em] md:text-8xl" parts={[['Abdul',''],['Rehman','font-serif font-normal italic tracking-normal text-accent']]}/>
<SplitText as="h2" by="word" inView={false} delay={1.4} className="mt-6 block font-display text-xl font-medium tracking-tight md:text-3xl" parts={[['Full-Stack',''],['MERN','font-serif font-normal italic text-[1.15em] text-accent'],['Developer','']]}/>
<SplitText as="p" by="word" variant="blur" inView={false} delay={1.8} stagger={.025} className="mt-8 block max-w-md leading-relaxed text-mute" parts={[["I'm a computer science student at the Islamia University of Bahawalpur who builds full-stack web apps with MongoDB, Express, React and Node. I have deployed several projects, and I care about clean code and interfaces that stay out of the user's way.",'']]}/>
</div></div></section>)}
