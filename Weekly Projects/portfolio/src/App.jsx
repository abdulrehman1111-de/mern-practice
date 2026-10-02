import {useEffect,useState} from 'react';import {AnimatePresence} from 'framer-motion';
import Preloader from './components/Preloader';import ScrollProgress from './components/ScrollProgress';
import Particles from './components/Particles';import Navbar from './components/Navbar';import Hero from './components/Hero';
import ScrollText from './components/ScrollText';import Education from './components/Education';
import Clock from './components/Clock';import Projects from './components/Projects';
export default function App(){
const[loading,setLoading]=useState(true);
useEffect(()=>{const t=setTimeout(()=>setLoading(false),2800);return()=>clearTimeout(t)},[]);
return(<>
<AnimatePresence>{loading&&<Preloader key="p"/>}</AnimatePresence>
{!loading&&<>
<ScrollProgress/><Particles/><Navbar/>
<main className="relative z-10"><Hero/><ScrollText/><Education/><Clock/><Projects/></main>
<footer className="relative z-10 py-10 text-center text-sm text-mute">© {new Date().getFullYear()} Abdul Rehman</footer>
</>}
</>)}
