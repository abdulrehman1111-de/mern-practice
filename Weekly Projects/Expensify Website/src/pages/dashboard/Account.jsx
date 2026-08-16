import React from 'react'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { Sun, Moon } from 'lucide-react'

const Account = ({ dark, useToggle }) => {
  return (
    <div className={`graySelect w-full h-[100vh] flex ${dark ? "bg-[#061B09] text-white" : "bg-white text-gray-900"}`}>
      <div className='w-[35%] h-full border-1 border-gray-700 p-5 flex flex-col items-center'>

        <p className='text-2xl'>Account</p>
        <div className='w-full h-30 flex justify-center items-center'>

          <div className='w-full h-15 flex gap-2'>

            <div className='mr-auto h-full w-[15%] flex justify-center items-center'>
              <div><UserCircle2 size={37} className='text-green-500' /></div>
            </div>

            <div className='h-full w-[85%] mr-auto flex justify-center flex-col'>
              <p className={`inter font-semibold ${dark ? "text-white/90" : "text-gray-900"}`}>Abdul Rehman</p>
              <p className={`text-xs ${dark ? "text-white/80" : "text-gray-500"}`}>abdulrehmanpro6@gmail.com</p>
            </div>

          </div>

        </div>

        <div className='w-full h-70 flex flex-col gap-3'>
          <p className='text-lg text-white/80'>Account</p>

          <NavLink to="" end className={({ isActive }) =>
            `pl-3 pt-2 pb-2 rounded-xl ${isActive ? (dark ? 'bg-green-950 hover:bg-green-950' : "bg-gray-100") : ""}`
          }
          >
            <div className='flex items-center gap-3'>
              <div><UserCircle2 size={22} className='text-green-500' /></div>
              <div>Profile</div>
            </div>
          </NavLink>

          <NavLink to="wallet" className={({ isActive }) =>
            `pl-3 pt-2 pb-2 rounded-xl ${isActive ? (dark ? 'bg-green-950 hover:bg-green-950' : "bg-gray-100") : ""}`
          }>
            <div className='flex items-center gap-3'>
              <div><Mail size={22} className='text-green-500' /></div>
              <div>Wallet</div>
            </div>
          </NavLink>

          <NavLink to="expense" className={({ isActive }) =>
            `pl-3 pt-2 pb-2 rounded-xl ${isActive ? (dark ? 'bg-green-950 hover:bg-green-950' : "bg-gray-100") : ""}`
          }>
            <div className='flex items-center gap-3'>
              <div><Zap size={22} className='text-green-500' /></div>
              <div>Expense Rules</div>
            </div>
          </NavLink>

          <NavLink to="agents" className={({ isActive }) =>
            `pl-3 pt-2 pb-2 rounded-xl ${isActive ? (dark ? 'bg-green-950 hover:bg-green-950' : "bg-gray-100") : ""}`
          }>
            <div className='flex items-center gap-3'>
              <div><Wand2 size={22} className='text-green-500' /></div>
              <div>Agents</div>
            </div>
          </NavLink>

          <button onClick={useToggle}>
            {dark ?
              <>
                <div className='flex gap-3 items-center pl-3'>
                  <Sun size={22} className="text-green-500" />
                  <span>Enable Light mode</span>
                </div>
              </>
              : <>
                <div className='flex gap-3 items-center pl-3'>
                  <Moon size={22} className="text-green-500" />
                  <span className={dark ? "" : "text-gray-900"}>Enable Dark mode</span>
                </div>
              </>
            }
          </button>

          <NavLink to="/" className={({ isActive }) =>
            `pl-3 pt-2 pb-2 rounded-xl ${isActive ? (dark ? 'bg-green-950 hover:bg-green-950' : "bg-gray-100") : ""}`
          }>
            <div className='flex items-center gap-3'>
              <div><LogOut size={22} className='text-green-500' /></div>
              <div>Sign out</div>
            </div>
          </NavLink>

        </div>
      </div>

      <Outlet context={{ dark }} />
    </div>
  )
}

export default Account
