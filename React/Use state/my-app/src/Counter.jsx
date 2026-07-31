import React, { useState } from 'react'

const Counter = () => {

    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);

    return (
        <div className='max-w-md mx-auto my-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col items-center gap-6 text-white font-sans'>

            <h2 className='text-xl font-bold tracking-wide text-slate-200'>Counter Control</h2>

            <div className='flex flex-col sm:flex-row gap-4 w-full justify-center items-center'>
             
                <div className='flex-1 w-full bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 flex flex-col items-center justify-center min-h-[90px]'>
                    <span className='text-xs uppercase tracking-wider text-slate-400 font-medium mb-1'>Step Size</span>
                    <p className='text-2xl font-bold text-emerald-400'>{step}</p>
                </div>

                <div className='flex-1 w-full bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 flex flex-col items-center justify-center min-h-[90px]'>
                    <span className='text-xs uppercase tracking-wider text-slate-400 font-medium mb-1'>Current Count</span>
                    <p className='text-3xl font-extrabold text-white'>{count}</p>
                </div>
            </div>

            <div className='flex items-center gap-2 w-full justify-center bg-slate-950/50 p-2 rounded-xl border border-slate-800/80'>
                <span className='text-xs text-slate-400 font-medium mr-1 pl-2'>Select Step:</span>
                
                <button onClick={() => {
                    setStep(1);
                }} className='px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 active:scale-95 transition-all'>Step 1</button>

                <button onClick={() => {
                    setStep(5);
                }} className='px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 active:scale-95 transition-all'>Step 5</button>

                <button onClick={() => {
                    setStep(10);
                }} className='px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 active:scale-95 transition-all'>Step 10</button>
            </div>

            <div className='flex items-center justify-between gap-3 w-full pt-2'>
                <button onClick={() => {
                    if (count - step < 0) {
                        alert("Minimum limit reached!");
                        return;
                    }
                    setCount(count - step);
                }} className='flex-1 py-3 text-2xl font-bold bg-rose-600/90 hover:bg-rose-500 active:scale-95 text-white rounded-xl shadow-lg shadow-rose-600/20 border border-rose-500/50 transition-all'>-</button>

                <button onClick={() => {
                    setCount(0);
                    setStep(1);
                }} className='px-5 py-3 text-sm font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 rounded-xl border border-slate-700 transition-all'>Reset</button>

                <button onClick={() => {
                    if (count + step > 100) {
                        alert("Maximum limit reached!");
                        return;
                    }
                    setCount(count + step);
                }} className='flex-1 py-3 text-2xl font-bold bg-emerald-600/90 hover:bg-emerald-500 active:scale-95 text-white rounded-xl shadow-lg shadow-emerald-600/20 border border-emerald-500/50 transition-all'>+</button>
            </div>

        </div>
    )
}

export default Counter