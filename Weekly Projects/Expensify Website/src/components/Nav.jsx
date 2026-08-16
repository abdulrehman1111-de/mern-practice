import React from 'react'
import { FaEye } from "react-icons/fa";

const Nav = ({dark, useToggle}) => {
  return (
    <div className='homeDiv z-100 w-full h-15 text-white flex flex-row justify-center items-center bg-[#002E22] inter gap-3 font-semibold text-sm'>
      <button onClick={useToggle} className='rounded-lg p-2 h-auto border-1 border-green-400 hover:bg-green-400 hover:text-white transition-colors duration-150'>{dark ? "Light mode" : "Dark mode"}</button>
      <FaEye />
      <p>Ask Concierge AI to handle expenses, analyze spend, and more.</p>
      <a href="">Learn more →</a>
    </div>
  )
}

export default Nav
