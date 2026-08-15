import React from 'react'

const Transparentbtn = ({text, dark}) => {
  return (
    <div className={`border-1 transition delay-100 ease-in-out w-auto p-6 h-12 flex justify-center items-center text-center rounded-4xl ${dark ? "border-white/20 hover:bg-green-900 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}><p className='text-md inter font-bold'>{text}</p></div>
  )
}

export default Transparentbtn
