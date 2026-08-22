import React from 'react'

const Comments = ({name, email, body}) => {
  return (
    <div className='w-full text-[#1B1F24] rounded-xl p-5 h-auto flex flex-col gap-1'>
      
        <p className='text-sm font-semibold text-[#6B7280]'>{name}</p>
        <p className='text-[#6B7280] text-sm'>{email}</p>
        <p className='text-sm pb-2'>{body}</p>
        <hr className='opacity-10' />

    </div>
  )
}

export default Comments
