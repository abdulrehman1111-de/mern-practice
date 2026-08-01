import React from 'react'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Account = () => {
  return (
    <div className='bg-[#061B09] text-white w-full h-[100vh] flex'>
      <div className='w-[35%] h-full border-1 border-gray-700 p-5 flex flex-col items-center'>

        <p className='text-2xl'>Account</p>
        <div className='w-full h-30 flex justify-center items-center'>

            <div className='w-full h-15 flex gap-2'>

              <div className='mr-auto h-full w-[15%] flex justify-center items-center'>
                  <div><UserCircle2 size={37} className='text-green-500' /></div>
              </div>

              <div className='h-full w-[85%] mr-auto flex justify-center flex-col'>
                  <p className='inter font-semibold text-white/90'>Abdul Rehman</p>
                  <p className='text-xs text-white/80'>abdulrehmanpro6@gmail.com</p>
              </div>

            </div>

        </div>

        <div className='w-full h-70 flex flex-col gap-3'>
          <p className='text-lg text-white/80'>Account</p>

          <NavLink to="" end className={({isActive})=>
            `hover:bg-green-950 pl-3 pt-2 pb-2 rounded-xl ${isActive?'bg-green-950':""}`
          }>
            <div className='flex items-center gap-3'>
              <div><UserCircle2 size={22} className='text-green-500' /></div>
              <div>Profile</div>
            </div>
          </NavLink>

          <NavLink to="wallet" className={({isActive})=>
            `hover:bg-green-950 pl-3 pt-2 pb-2 rounded-xl ${isActive?'bg-green-950':""}`
          }>
            <div className='flex items-center gap-3'>
              <div><Mail size={22} className='text-green-500' /></div>
              <div>Wallet</div>
            </div>
          </NavLink>

          <NavLink to="expense" className={({isActive})=>
            `hover:bg-green-950 pl-3 pt-2 pb-2 rounded-xl ${isActive?'bg-green-950':""}`
          }>
            <div className='flex items-center gap-3'>
              <div><Zap size={22} className='text-green-500' /></div>
              <div>Expense Rules</div>
            </div>
          </NavLink>

          <NavLink to="agents" className={({isActive})=>
            `hover:bg-green-950 pl-3 pt-2 pb-2 rounded-xl ${isActive?'bg-green-950':""}`
          }>
            <div className='flex items-center gap-3'>
              <div><Wand2 size={22} className='text-green-500' /></div>
              <div>Agents</div>
            </div>
          </NavLink>

        </div>
      </div>

      <Outlet/>
    </div>
  )
}

export default Account
