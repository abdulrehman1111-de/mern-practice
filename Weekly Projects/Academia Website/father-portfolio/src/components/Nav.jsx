import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='border-2 border-black bg-cream w-full h-auto p-3 flex justify-between'>
        <div className='fraunces text-navy'><p><i>Dr. [Father's Name]</i></p></div>

        {/* <div className='hidden'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/research">Research</NavLink>
            <NavLink to="/education">Education</NavLink>
            <NavLink to="/teaching">Teaching</NavLink>
            <NavLink to="/publications">Publications</NavLink>
            <NavLink to="/presentations">Presentations</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </div> */}

        <div className='ham flex flex-col gap-1 justify-center items-center'>
            <div className='w-6 h-0.5 bg-[#1B2A41]'></div>
            <div className='w-6 h-0.5 bg-[#1B2A41]'></div>
            <div className='w-6 h-0.5 bg-[#1B2A41]'></div>
        </div>
    </div>
  )
}

export default Nav
