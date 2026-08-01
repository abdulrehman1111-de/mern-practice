import React from 'react'

const Graybtn = ({text}) => {
  return (
    <div className='w-[30%] h-8 rounded-4xl bg-[#1A3D32] hover:bg-green-400 flex justify-center items-center text-center font-semibold m-3'>
            <p className='text-xs'>{text}</p>
    </div>
  )
}

export default Graybtn
