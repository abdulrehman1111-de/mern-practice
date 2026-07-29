import React from 'react'

const Transparentbtn = ({text}) => {
  return (
    <div className='border-1 border-white/20 hover:bg-green-900 transition delay-100 ease-in-out w-auto p-6 h-12 flex justify-center items-center text-center rounded-4xl'><p className='text-md inter font-bold text-white'>{text}</p></div>
  )
}

export default Transparentbtn
