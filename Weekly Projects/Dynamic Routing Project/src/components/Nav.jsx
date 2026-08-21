import React from 'react'

const Nav = () => {
  return (
    <div className='border-1 border-gray-200 h-auto p-3 pl-11 pr-11 w-full flex items-center justify-between'>

      <div className='flex gap-2 items-center'>
        <div className='w-2 h-2 rounded-full bg-[#3D5AFE]'></div>
        <span className='inter text-xl sora font-bold'>User Directory</span>
      </div>

      <div className='bg-[#EEF1FF] text-[#3D5AFE] h-auto p-1 pr-2 pl-2 flex justify-center items-center text-center rounded-2xl text-nowrap text-sm font-semibold'>10 users</div>

    </div>
  )
}

export default Nav
