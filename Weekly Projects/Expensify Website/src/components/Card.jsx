import React from 'react'

const Card = ({title}) => {
  return (
    <div className='w-[30%] h-30 border-1 border-green-300/30 hover:border-green-400 transition ease-in-out duration-300 p-5 flex justify-center items-center rounded-xl bg-[#0F3B29] text-center'>
        <p className='inter font-semibold'>{title}</p>
    </div>
  )
}

export default Card
