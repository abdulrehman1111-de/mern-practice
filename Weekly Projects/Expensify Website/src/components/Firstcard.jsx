import React from 'react'

const Firstcard = ({icon, title, desc, dark}) => {
  return (
    <div className={`w-full h-53 p-7 rounded-lg flex flex-col gap-3 ${dark ? "text-white bg-[#0F2E23]" : "bg-gray-50 text-gray-900 border border-gray-200"}`}>
        
        <div className='flex gap-3'>
            <div><img src={icon} alt={title} className='w-9 h-9' /></div>
            <div><p className='text-lg font-semibold'>{title}</p></div>
        </div>
        <div>
            {desc}
        </div>
        <a href="/sample"><div>
            <p className='text-blue-600 hover:text-blue-400'>Learn more</p>
        </div></a>
    </div>
  )
}

export default Firstcard
