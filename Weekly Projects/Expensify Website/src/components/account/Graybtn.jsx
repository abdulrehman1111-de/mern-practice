import React from 'react'

const Graybtn = ({text, dark}) => {
  return (
    <div className={`w-[30%] h-8 rounded-4xl flex justify-center items-center text-center font-semibold m-3 ${dark ? "bg-[#1A3D32] hover:bg-green-400" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}>
            <p className='text-xs'>{text}</p>
    </div>
  )
}

export default Graybtn
