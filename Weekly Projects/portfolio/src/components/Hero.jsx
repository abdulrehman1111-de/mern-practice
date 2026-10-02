import {useEffect,useRef,useState} from 'react';
import {motion} from 'framer-motion';
import {SplitText} from './Text';
import {SiReact,SiNodedotjs,SiMongodb,SiExpress,SiJavascript,SiTailwindcss,SiFirebase,SiHtml5,SiCss,SiMysql} from 'react-icons/si';

const chips=[
{n:'React',i:SiReact,c:'#61dafb'},{n:'HTML',i:SiHtml5,c:'#e34f26'},{n:'Node.js',i:SiNodedotjs,c:'#5fa04e'},
{n:'CSS',i:SiCss,c:'#2f9ae0'},{n:'MongoDB',i:SiMongodb,c:'#47a248'},{n:'JavaScript',i:SiJavascript,c:'#f7df1e'},
{n:'Express',i:SiExpress,c:'#e8ecf4'},{n:'MySQL',i:SiMysql,c:'#6aa6cf'},{n:'Tailwind',i:SiTailwindcss,c:'#38bdf8'},{n:'Firebase',i:SiFirebase,c:'#ffca28'}];

const BASE=.29,FAST=1.05;   // radians per second: calm orbit (~22s per lap) and the hover boost (~6s per lap)
const TILT=-10*Math.PI/180;
const ORBIT={cy:.44,rx:.62,ry:.17};   // as fractions of the portrait box

function Chip({c,reg}){
const I=c.i;
return(<div ref={reg} className="absolute left-0 top-0 will-change-transform" style={{opacity:0}}>
<div style={{'--c':c.c}} className="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-white/[.06] px-3 py-2 shadow-xl shadow-black/40 backdrop-blur-md transition-[scale,box-shadow,border-color] duration-300 hover:scale-110 hover:border-transparent hover:shadow-[0_0_14px_var(--c),0_0_42px_var(--c)]">
<span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{background:`linear-gradient(135deg,color-mix(in srgb,${c.c} 55%,white),${c.c} 55%,color-mix(in srgb,${c.c} 70%,black))`}}/>
<span className="absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover:translate-x-[320%]"/>
<I size={22} className="relative text-[color:var(--c)] transition-colors duration-300 group-hover:text-bg"/>
<span className="relative text-xs font-medium transition-colors duration-300 group-hover:font-semibold group-hover:text-bg">{c.n}</span>
</div></div>)}

function Portrait(){
const box=useRef(null),els=useRef([]),dims=useRef({w:0,h:0}),hotRef=useRef(false);
const[hot,setHot]=useState(false),[size,setSize]=useState({w:0,h:0});
const set=v=>{hotRef.current=v;setHot(v)};

useEffect(()=>{
const ro=new ResizeObserver(([e])=>{const w=e.contentRect.width,h=e.contentRect.height;dims.current={w,h};setSize({w,h})});
ro.observe(box.current);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let raf,last=performance.now(),ang=0,speed=BASE;const t0=last+900;
const ct=Math.cos(TILT),st=Math.sin(TILT);
const tick=now=>{
const dt=Math.min((now-last)/1000,.05);last=now;
speed+=((hotRef.current?FAST:BASE)-speed)*Math.min(1,dt*2.5);   // eased speed change
if(!reduce)ang+=speed*dt;
const{w,h}=dims.current,k=(speed-BASE)/(FAST-BASE),sizeK=Math.min(1,Math.max(.62,w/460));
const intro=Math.min(1,Math.max(0,(now-t0)/1200));
const al=Math.round((.22+.5*k)*255).toString(16).padStart(2,'0');
for(let i=0;i<chips.length;i++){
const el=els.current[i];if(!el)continue;
const th=ang+i*2*Math.PI/chips.length,s=Math.sin(th),co=Math.cos(th);
const ex=w*ORBIT.rx*co,ey=h*ORBIT.ry*s;
const x=w/2+ex*ct-ey*st,y=h*ORBIT.cy+ex*st+ey*ct;
const front=Math.max(0,s),f=front*front*(3-2*front);
const overlap=Math.min(1,Math.max(0,1-(Math.abs(ex)-.18*w)/(.3*w)));   // 1 when the chip is over the face/body
const op=s>=0?1-.8*overlap*f:.55+.45*(1+s);                              // see-through in front of the photo, dimmer behind it
el.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${(.78+.42*(s+1)/2)*sizeK})`;
el.style.opacity=(op*intro).toFixed(3);
el.style.zIndex=s>=0?30:5;
el.style.filter=`blur(${(1.6*overlap*front).toFixed(2)}px) drop-shadow(0 0 ${(6+18*k).toFixed(1)}px ${chips[i].c}${al})`;}
raf=requestAnimationFrame(tick)};
raf=requestAnimationFrame(tick);
return()=>{cancelAnimationFrame(raf);ro.disconnect()}},[]);

const{w,h}=size,cx=w/2,cy=h*ORBIT.cy,rx=w*ORBIT.rx,ry=h*ORBIT.ry;
const ring=(cls,front)=><svg className={`pointer-events-none absolute inset-0 overflow-visible ${cls}`} width={w} height={h}>
{front&&<defs><clipPath id="nearHalf"><rect x={-w} y={cy} width={3*w} height={h}/></clipPath></defs>}
<g transform={`rotate(-10 ${cx} ${cy})`} clipPath={front?'url(#nearHalf)':undefined}>
<ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#4f8cff" strokeWidth="1.2" strokeDasharray="2 9" strokeLinecap="round"
style={{strokeOpacity:front?(hot?.45:.15):(hot?.7:.3),transition:'stroke-opacity .6s'}}/></g></svg>;

return(<div ref={box} onPointerEnter={()=>set(true)} onPointerLeave={()=>set(false)} className="relative mx-auto w-fit max-w-full">
<div className={`absolute inset-x-[10%] bottom-0 z-0 h-3/4 rounded-full blur-3xl transition-all duration-700 ${hot?'scale-110 bg-accent/50':'bg-accent/25'}`}/>
{w>0&&ring('z-[4]',false)}
{hot&&<motion.span className="pointer-events-none absolute left-1/2 z-[3] aspect-square w-[70%] -translate-x-1/2 rounded-full border border-accent/60" style={{top:`${ORBIT.cy*100-35}%`}} initial={{scale:.6,opacity:.7}} animate={{scale:1.45,opacity:0}} transition={{duration:1.6,repeat:Infinity,ease:'easeOut'}}/>}
<motion.img src="/portrait.webp" alt="Abdul Rehman" className="relative z-10 block" style={{maxHeight:'82vh',maxWidth:'100%',width:'auto',transformOrigin:'50% 100%'}}
animate={{scale:hot?1.03:1}} transition={{type:'spring',stiffness:140,damping:18}}/>
{w>0&&ring('z-20',true)}
{chips.map((c,i)=><Chip key={c.n} c={c} reg={el=>(els.current[i]=el)}/>)}
<motion.p className="pointer-events-none absolute -top-7 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[.25em] text-accent"
initial={false} animate={{opacity:hot?1:0,y:hot?0:8}} transition={{duration:.4}}>My stack · {chips.length} technologies</motion.p>
</div>)}

export default function Hero(){
return(<section id="home" className="flex min-h-[90vh] items-center overflow-x-clip px-6 py-10 md:px-16">
<div className="mx-auto grid w-full max-w-6xl items-center gap-16 md:grid-cols-2">
<Portrait/>
<div>
<p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[.22em] text-mute"><span className="h-px w-10 bg-accent"/>Hi, I'm</p>
<SplitText as="h1" inView={false} delay={.7} stagger={.045} className="hover-chars mt-5 block font-display text-6xl font-extrabold leading-[.95] tracking-[-.035em] md:text-8xl" parts={[['Abdul',''],['Rehman','font-serif font-normal italic tracking-normal text-accent']]}/>
<SplitText as="h2" by="word" inView={false} delay={1.4} className="mt-6 block font-display text-xl font-medium tracking-tight md:text-3xl" parts={[['Full-Stack',''],['MERN','font-serif font-normal italic text-[1.15em] text-accent'],['Developer','']]}/>
<SplitText as="p" by="word" variant="blur" inView={false} delay={1.8} stagger={.025} className="mt-8 block max-w-md leading-relaxed text-mute" parts={[["I'm a computer science student at the Islamia University of Bahawalpur who builds full-stack web apps with MongoDB, Express, React and Node. I have deployed several projects, and I care about clean code and interfaces that stay out of the user's way.",'']]}/>
</div></div></section>)}