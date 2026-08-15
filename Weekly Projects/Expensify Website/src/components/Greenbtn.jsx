import React from 'react'

const Greenbtn = ({dark}) => {
  return (
    <div className={`w-[16%] h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold ml-auto mr-10`}>
      <p className='text-sm'>Sign in</p>
    </div>
  )
}

export default Greenbtn
