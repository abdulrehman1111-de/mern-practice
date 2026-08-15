import React from 'react'

const Card = ({title, dark}) => {
  return (
    <div className={`w-[30%] h-30 border-1 transition ease-in-out duration-300 p-5 flex justify-center items-center rounded-xl text-center ${dark ? "bg-[#0F3B29] border-green-300/30 hover:border-green-400" : "bg-white border-gray-600/30 hover:border-gray-950"}`}>
        <p className='inter font-semibold'>{title}</p>
    </div>
  )
}

export default Card
