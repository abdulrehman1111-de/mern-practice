import React from 'react'
import { FaEye } from "react-icons/fa";

const Nav = () => {
  return (
    <div className='homeDiv z-100 w-full h-15 text-white flex flex-row justify-center items-center bg-[#002E22] inter gap-3 font-semibold text-sm'>
      <FaEye />
      <p>Ask Concierge AI to handle expenses, analyze spend, and more.</p>
      <a href="">Learn more →</a>
    </div>
  )
}

export default Nav
