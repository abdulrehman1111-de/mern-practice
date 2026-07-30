// import React, {useState} from 'react'

// const App = () => {

//    const [count, setCount] = useState(4); 

//    const [open, setOpen] = useState(false);

//   return (
//     <>
//         <button onClick={()=> setCount(count - 1)} className='p-10 h-auto w-[20%] text-9xl bg-gray-400'>-</button>
//         <span className='text-9xl'>{count}</span>
//         <button onClick={()=> setCount(count + 1)} className='p-10 h-auto w-[20%] text-9xl bg-gray-400'>+</button>

//         <button onClick={()=> setOpen(!open)} className='bg-amber-300 p-10'>
//             {open ? "Close para":"Open para"}
//         </button>

//         {open && (
//             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam est eius error! Officiis, vitae culpa.</p>
//         )
        
//         }
//     </>
//   )
// }

// export default App

import React, {useState} from 'react'

const App = () => {

   const [state, setState] = useState(0);

  return (
    <>
        <button onClick={()=> setState(state = 1)} className='bg-gray-400 text-3xl p-5'>1</button>
        <button onClick={()=> setState(state = 2)} className='bg-gray-400 text-3xl p-5'>2</button>
        <button onClick={()=> setState(state = 3)} className='bg-gray-400 text-3xl p-5'>3</button>
        <button onClick={()=> setState(state = 4)} className='bg-gray-400 text-3xl p-5'>4</button>
        <button onClick={()=> setState(state = 5)} className='bg-gray-400 text-3xl p-5'>5</button>

        <button onClick={()=> setState(state = 0)} className='bg-gray-400 text-3xl p-5'>reset</button>
    </>
  )
}

export default App

