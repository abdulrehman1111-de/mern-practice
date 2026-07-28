import React from 'react'

const Firstcard = ({icon, title, desc}) => {
  return (
    <div className='text-white w-full h-53 p-7 border-1 border-white rounded-lg flex flex-col gap-3 bg-[#0F2E23]'>
        
        <div className='flex gap-3'>
            <div><img src={icon} alt={title} className='w-9 h-9' /></div>
            <div><p className='text-lg font-semibold'>{title}</p></div>
        </div>
        <div>
            {desc}
        </div>
        <div>
            <a href=""><p className='text-blue-600'>Learn more</p></a>
        </div>
    </div>
  )
}

export default Firstcard
