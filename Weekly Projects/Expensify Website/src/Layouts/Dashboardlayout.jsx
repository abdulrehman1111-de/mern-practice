import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Home, Inbox, Receipt, Building2, Building } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'

const Dashboardlayout = () => {
  return (
    <div className='h-[100vh] w-full flex fraunces'>
      <div className='bg-[#061B09] h-screen w-20 flex flex-col gap-3 text-white items-center text-white border-r border-r-gray-700'>

        <div className='bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtEE1AQ0rbwqrTVQKkhoFZXXxnR6TI32bADoXmwtdSwA&s)] bg-center bg-cover w-11 h-11 rounded-full mt-5 p-3 mb-2'>
        </div>


        <Link to="" className='flex flex-col justify-center items-center gap-1 hover:bg-green-950 w-full p-3 h-auto'>
          <Home size={22} className="text-green-500" />
          <span className='text-xs'>Home</span>
        </Link>


        <Link to="inbox" className='flex flex-col justify-center items-center gap-1 hover:bg-green-950 w-full p-3 h-auto'>
          <Inbox size={22} className="text-green-500" />
          <span className='text-xs'>Inbox</span>
        </Link>

        <Link to="spend" className='flex flex-col justify-center items-center gap-1 hover:bg-green-950 w-full p-3 h-auto'>
          <Receipt size={22} className="text-green-500" />
          <span className='text-xs'>Spend</span>
        </Link>

        <Link to="workspaces" className='flex flex-col justify-center items-center gap-1 hover:bg-green-950 w-full p-3 h-auto'>
          <Building2 size={22} className="text-green-500" />
          <span className='text-xs'>Workspaces</span>
        </Link>

        <Link to="account" className='flex flex-col justify-center items-center gap-1 hover:bg-green-950 w-full p-3 h-auto'>
          <CircleUserRound size={22} className="text-green-500" />
          <span className='text-xs'>Account</span>
        </Link>

      </div>

      <Outlet />
    </div>


  )
}

export default Dashboardlayout
