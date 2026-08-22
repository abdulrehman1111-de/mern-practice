import React from 'react'

const Posts = ({title, body}) => {
  return (
    <div className='w-full bg-[#FFFFFF] text-[#1B1F24] rounded-xl p-5 h-auto flex flex-col gap-1 border-1 border-gray-300'>
      
        <p className='text-md font-semibold'>{title}</p>
        <p className='text-[#6B7280] text-sm'>{body}</p>

    </div>
  )
}

export default Posts
