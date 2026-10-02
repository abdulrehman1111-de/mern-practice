import {useRef} from 'react';import {motion,useMotionTemplate,useScroll,useTransform} from 'framer-motion';
// [text, 1 = highlighted in serif italic]
const parts=[['I turn ',0],['ideas',1],[' into working ',0],['products.',1],[' I care about clean code, calm interfaces, and shipping things that people actually use.',0]];
const words=parts.flatMap(([t,k])=>t.split(' ').filter(Boolean).map(w=>({w,k})));
function Word({w,k,p,a,b}){
const o=useTransform(p,[a,b],[.12,1]),bl=useTransform(p,[a,b],[8,0]),y=useTransform(p,[a,b],[14,0]);
const filter=useMotionTemplate`blur(${bl}px)`;
return <motion.span style={{opacity:o,filter,y}} className={`mr-[.28em] inline-block ${k?'font-serif text-[1.12em] font-normal italic text-accent':''}`}>{w}</motion.span>}
export default function ScrollText(){
const ref=useRef(null);
const{scrollYProgress}=useScroll({target:ref,offset:['start 0.85','end 0.5']});
return(<section id="about" ref={ref} className="grid min-h-[80vh] place-items-center px-6 md:px-16">
<div className="max-w-5xl"><p className="mb-8 font-mono text-xs uppercase tracking-[.22em] text-accent">( About )</p>
<p className="font-display text-4xl font-semibold leading-[1.08] tracking-[-.025em] md:text-7xl">
{words.map((x,i)=><Word key={i} {...x} p={scrollYProgress} a={i/words.length} b={(i+1)/words.length}/>)}</p></div></section>)}
