import {useRef} from 'react';
import {motion,useInView,useScroll,useSpring,useTransform} from 'framer-motion';
import {SplitText} from './Text';

const ease=[.22,1,.36,1];
const rise={hidden:{opacity:0,y:60},show:{opacity:1,y:0,transition:{duration:.9,ease}}};

// Edit the copy here. Each card's colors (border, glow, gradient) come from its photo.
const items=[
{school:['Rangers','Public School'],level:'Matriculation',years:'2020 — 2022',img:'/education/rpc.webp',pos:'50% 55%',
blurb:'Where the foundation was built: the study habits and curiosity that carried into everything after.',
t:{a:'#9af0b4',label:'#9af0b4',glow:'rgba(134,239,172,.38)',fill:'linear-gradient(135deg,rgba(134,239,172,.30),rgba(74,222,128,.10) 45%,rgba(5,7,13,.25))'}},
{school:['Punjab College','Bahawalpur'],level:'Higher Secondary',years:'2022 — 2024',img:'/education/pgc.webp',pos:'50% 45%',
blurb:'Two focused years of higher secondary that set up the move into computer science.',
t:{a:'#ffffff',label:'#ffffff',glow:'rgba(255,255,255,.32)',fill:'linear-gradient(135deg,rgba(255,255,255,.26),rgba(255,255,255,.07) 45%,rgba(5,7,13,.25))'}},
{school:['Islamia University','of Bahawalpur'],level:'BS Computer Science',years:'2025 — Present',now:true,img:'/education/iub.webp',pos:'50% 60%',
blurb:'Studying computer science while shipping real projects alongside coursework, including a structured MERN stack course at Code Lab Bahawalpur.',
t:{a:'#1f9d55',label:'#3fcf80',glow:'rgba(21,128,61,.6)',fill:'linear-gradient(135deg,rgba(21,128,61,.5),rgba(6,78,59,.22) 50%,rgba(5,7,13,.25))'}}];

function Card({it,i}){
const ref=useRef(null),t=it.t,flip=i%2===1;
// "active" = the card is crossing the middle band of the screen
const active=useInView(ref,{margin:'-35% 0px -35% 0px'});
const{scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
const y=useTransform(scrollYProgress,[0,1],['-7%','7%']);
return(<div className="relative">
<span className="absolute -left-[1.75rem] top-12 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 transition-all duration-700 md:-left-[2.75rem]"
style={{borderColor:active?t.a:'#ffffff30',background:active?t.a:'#05070d',boxShadow:active?`0 0 18px ${t.glow},0 0 40px ${t.glow}`:'none'}}/>
<motion.article ref={ref} variants={rise} initial="hidden" whileInView="show" viewport={{once:true,amount:.2}}
className="relative rounded-[28px] p-[1.5px] transition-shadow duration-700"
style={{'--c':t.label,boxShadow:active?`0 0 0 1px ${t.a}33,0 0 60px ${t.glow},0 30px 120px -30px ${t.glow}`:'0 0 0 0 transparent'}}>
<div className="absolute inset-0 rounded-[28px] bg-white/10"/>
<div className="absolute inset-0 rounded-[28px] transition-opacity duration-700" style={{opacity:active?1:0,background:`linear-gradient(135deg,${t.a},${t.a}33 35%,${t.a}33 65%,${t.a})`}}/>
<div className="relative overflow-hidden rounded-[26.5px] bg-[#070b14]">
<div className="absolute inset-0 transition-opacity duration-700" style={{opacity:active?1:0,background:t.fill}}/>
<div className={`relative grid items-center gap-8 p-5 md:p-8 ${flip?'md:grid-cols-[1fr_1.05fr]':'md:grid-cols-[1.05fr_1fr]'}`}>
<div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${flip?'md:order-2':''}`}>
<motion.img src={it.img} alt={it.school.join(' ')} className="absolute -top-[9%] left-0 h-[118%] w-full object-cover transition-[filter] duration-700"
style={{y,objectPosition:it.pos,filter:active?'none':'grayscale(.7) brightness(.65)'}}/>
<div className="absolute inset-0 transition-opacity duration-700" style={{background:`linear-gradient(to top,${t.glow},transparent 55%)`,opacity:active?.8:.2}}/>
<div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 font-mono text-xs backdrop-blur-md">
{it.now&&<span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{background:t.label}}/><span className="relative inline-flex h-2 w-2 rounded-full" style={{background:t.label}}/></span>}
{it.years}</div>
</div>
<div className={flip?'md:order-1':''}>
<p className="font-mono text-xs uppercase tracking-[.22em] text-[color:var(--c)]">( 0{i+1} ) {it.level}</p>
<SplitText as="h3" by="word" className="mt-4 block font-display text-4xl font-bold leading-[1.02] tracking-[-.03em] md:text-5xl"
parts={[[it.school[0],''],[it.school[1],'font-serif font-normal italic text-[1.1em] tracking-normal text-[color:var(--c)]']]}/>
<p className="mt-5 max-w-md leading-relaxed text-mute">{it.blurb}</p>
</div>
</div></div></motion.article></div>)}

export default function Education(){
const ref=useRef(null);
const{scrollYProgress}=useScroll({target:ref,offset:['start 0.6','end 0.6']});
const sp=useSpring(scrollYProgress,{stiffness:90,damping:25});
return(<section id="education" className="px-6 py-24 md:px-16">
<div className="mx-auto max-w-6xl">
<p className="mb-4 font-mono text-xs uppercase tracking-[.22em] text-accent">( Journey )</p>
<SplitText as="h2" className="block font-display text-5xl font-bold tracking-[-.03em] md:text-7xl" parts={[['Education',''],['&','font-serif font-normal italic text-accent'],['Journey','']]}/>
<div ref={ref} className="relative mt-16 space-y-10 pl-10 md:space-y-14 md:pl-16">
<div className="absolute bottom-0 left-3 top-0 w-px bg-white/10 md:left-5"/>
<motion.div style={{scaleY:sp,background:'linear-gradient(to bottom,#9af0b4,#ffffff,#1f9d55)',boxShadow:'0 0 12px #9af0b488'}} className="absolute bottom-0 left-3 top-0 w-px origin-top md:left-5"/>
{items.map((it,i)=><Card key={it.years} it={it} i={i}/>)}
</div></div></section>)}