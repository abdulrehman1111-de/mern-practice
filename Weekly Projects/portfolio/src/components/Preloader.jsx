import {motion} from 'framer-motion';
import {SplitText} from './Text';
export default function Preloader(){
return(<motion.div className="fixed inset-0 z-[100] grid place-items-center bg-bg" exit={{y:'-100%',transition:{duration:.9,ease:[.76,0,.24,1]}}}>
<div className="text-center">
<SplitText inView={false} delay={.2} stagger={.055} className="block font-display text-5xl font-bold tracking-[-.03em] md:text-8xl" parts={[['Abdul',''],['Rehman','font-serif font-normal italic text-accent tracking-normal']]}/>
<motion.div className="mx-auto mt-8 h-px w-48 origin-left bg-accent/70" initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.8,ease:[.65,0,.35,1],delay:.4}}/>
<motion.p className="mt-4 font-mono text-[11px] uppercase tracking-[.3em] text-mute" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.9}}>Full-Stack MERN Developer</motion.p>
</div></motion.div>)}
