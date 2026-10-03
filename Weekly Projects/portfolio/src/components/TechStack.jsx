import {motion} from 'framer-motion';
import {SplitText} from './Text';
import {SiReact,SiNodedotjs,SiMongodb,SiExpress,SiJavascript,SiTailwindcss,SiFirebase,SiHtml5,SiCss,SiMysql} from 'react-icons/si';
import {FaJava} from 'react-icons/fa6';

// n: name, k: label, c: brand color, d: official docs link
const stack=[
{n:'HTML',k:'MARKUP',i:SiHtml5,c:'#e34f26',d:'https://developer.mozilla.org/en-US/docs/Web/HTML'},
{n:'CSS',k:'STYLING',i:SiCss,c:'#2f9ae0',d:'https://developer.mozilla.org/en-US/docs/Web/CSS'},
{n:'JavaScript',k:'LANGUAGE',i:SiJavascript,c:'#f7df1e',d:'https://developer.mozilla.org/en-US/docs/Web/JavaScript'},
{n:'Java',k:'LANGUAGE',i:FaJava,c:'#f89820',d:'https://docs.oracle.com/en/java/javase/'},
{n:'React',k:'LIBRARY',i:SiReact,c:'#61dafb',d:'https://react.dev/learn'},
{n:'Tailwind',k:'FRAMEWORK',i:SiTailwindcss,c:'#38bdf8',d:'https://tailwindcss.com/docs'},
{n:'Node.js',k:'RUNTIME',i:SiNodedotjs,c:'#5fa04e',d:'https://nodejs.org/docs/latest/api/'},
{n:'Express',k:'FRAMEWORK',i:SiExpress,c:'#e8ecf4',d:'https://expressjs.com/'},
{n:'MongoDB',k:'DATABASE',i:SiMongodb,c:'#47a248',d:'https://www.mongodb.com/docs/'},
{n:'MySQL',k:'DATABASE',i:SiMysql,c:'#6aa6cf',d:'https://dev.mysql.com/doc/'},
{n:'Firebase',k:'PLATFORM',i:SiFirebase,c:'#ffca28',d:'https://firebase.google.com/docs'}];

function Pill({t,k,tab}){
const I=t.i,mix=(p,w)=>`color-mix(in srgb,${t.c} ${p}%,${w})`;
return(<a href={t.d} target="_blank" rel="noopener noreferrer" aria-label={`${t.n} documentation`} tabIndex={tab} style={{'--c':t.c}}
className="group/p relative block shrink-0 rounded-full p-[1.5px] transition-[scale,box-shadow] duration-300 hover:scale-[1.08] hover:shadow-[0_0_16px_var(--c),0_0_44px_var(--c)]">
<span className="absolute inset-0 rounded-full bg-white/10"/>
<span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/p:opacity-100" style={{background:`linear-gradient(135deg,${mix(60,'white')},${t.c})`}}/>
<span className="ts-run absolute inset-0 rounded-full" style={{background:`conic-gradient(from var(--ts),transparent 0 55%,${t.c} 80%,#fff 92%,transparent)`,animationDelay:`-${k*.45}s`}}/>
<span className="relative flex items-center gap-3 overflow-hidden rounded-full py-3 pl-3 pr-6" style={{background:`linear-gradient(135deg,${mix(26,'#0a0f1c')},#070b14 75%)`}}>
<span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/p:opacity-100" style={{background:`linear-gradient(135deg,${mix(60,'white')},${t.c} 55%,${mix(70,'black')})`}}/>
<span className="absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-white/50 blur-sm transition-transform duration-700 group-hover/p:translate-x-[320%]"/>
<span className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.06] transition-colors duration-300 group-hover/p:border-black/10 group-hover/p:bg-black/10"><I size={22} className="text-[color:var(--c)] transition-colors duration-300 group-hover/p:text-bg"/></span>
<span className="relative leading-tight"><span className="block font-display text-lg font-semibold transition-colors duration-300 group-hover/p:text-bg">{t.n}</span>
<span className="block font-mono text-[10px] tracking-[.2em] text-mute transition-colors duration-300 group-hover/p:text-bg/70">{t.k}</span></span>
<span className="relative -ml-1 -translate-x-2 text-bg opacity-0 transition duration-300 group-hover/p:translate-x-0 group-hover/p:opacity-100">↗</span>
</span></a>)}

export default function TechStack(){
return(<section id="stack" className="relative py-24">
<style>{`@property --ts{syntax:'<angle>';inherits:false;initial-value:0deg}@keyframes tsspin{to{--ts:360deg}}@keyframes tsmarq{to{transform:translateX(-50%)}}
.ts-run{animation:tsspin 5s linear infinite}.ts-track{display:flex;width:max-content;animation:tsmarq 32s linear infinite}.ts-row:hover .ts-track{animation-play-state:paused}
@media(prefers-reduced-motion:reduce){.ts-run{animation:none}.ts-track{animation:none;width:auto;flex-wrap:wrap;justify-content:center}.ts-dup{display:none}}`}</style>
<div className="mx-auto w-full max-w-6xl px-6 md:px-16">
<p className="font-mono text-xs tracking-[.22em] text-accent">THE STACK</p>
<SplitText as="h2" parts={[['Tools','' ],['I','' ],['build','' ],['with','font-serif font-normal italic text-accent']]} className="mt-2 block font-display text-5xl font-bold tracking-[-.03em] md:text-7xl"/>
</div>
<motion.div initial={{opacity:0,y:36}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} transition={{duration:.9,ease:[.22,1,.36,1]}}
className="ts-row mt-8 overflow-hidden py-14" style={{maskImage:'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',WebkitMaskImage:'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)'}}>
<div className="ts-track">
<div className="flex shrink-0 gap-4 pr-4">{stack.map((t,k)=><Pill key={t.n} t={t} k={k} tab={0}/>)}</div>
<div className="ts-dup flex shrink-0 gap-4 pr-4" aria-hidden="true">{stack.map((t,k)=><Pill key={t.n} t={t} k={k} tab={-1}/>)}</div>
</div></motion.div>
</section>)}
