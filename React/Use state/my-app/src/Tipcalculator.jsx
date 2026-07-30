import React, { useState } from 'react'

const Tipcalculator = () => {

    const [basePrice, setBasePrice] = useState(50);
    const [tipPercent, setTipPercent] = useState(10);
    const [isExpress, setIsExpress] = useState(false);

    let tipAmount = 0;
    let deliveryCost = 0;
    let total = 0;

    tipAmount = basePrice * (tipPercent / 100);
    if(isExpress){
        deliveryCost = 5;
    }
    total = basePrice + tipAmount + deliveryCost;

  return (
    <div className='max-w-md mx-auto my-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-6 text-white font-sans'>
      <h2 className='text-xl font-bold tracking-wide text-slate-200 text-center'>Order & Tip Summary</h2>

      {/* Tip Selection Buttons - Static CSS */}
      <div className='flex flex-col gap-2'>
        <span className='text-xs uppercase tracking-wider text-slate-400 font-medium'>Select Tip Percentage:</span>
        <div className='grid grid-cols-3 gap-2'>
          <button onClick={()=> setTipPercent(10)} className='p-3 text-sm font-semibold bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl border border-slate-700 transition-all'>Tip percent 10</button>

          <button onClick={()=> setTipPercent(15)} className='p-3 text-sm font-semibold bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl border border-slate-700 transition-all'>Tip percent 15</button>

          <button onClick={()=> setTipPercent(20)} className='p-3 text-sm font-semibold bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl border border-slate-700 transition-all'>Tip percent 20</button>
        </div>
      </div>

      {/* Express Delivery Toggle Button - Static CSS */}
      <button onClick={()=> {
        setIsExpress(!isExpress);
      }} className='p-3.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl shadow-lg shadow-indigo-600/20 border border-indigo-500/50 transition-all'>Express Delivery</button>

      {/* Display Summary Box */}
      <div className='flex flex-col gap-3 bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 text-base'>
        <p className='flex justify-between items-center text-slate-300'>Subtotal: <span className='font-semibold text-white'>${basePrice}</span></p>
        <p className='flex justify-between items-center text-slate-300'>Tip Amount: <span className='font-semibold text-emerald-400'>+${tipAmount}</span></p>
        <p className='flex justify-between items-center text-slate-300'>Delivery fee: <span className='font-semibold text-white'>${deliveryCost}</span></p>
        <hr className='border-slate-800 my-1' />
        <p className='flex justify-between items-center text-lg font-bold text-white'>Final Total: <span className='text-emerald-400 text-xl'>${total}</span></p>
      </div>

    </div>
  )
}

export default Tipcalculator