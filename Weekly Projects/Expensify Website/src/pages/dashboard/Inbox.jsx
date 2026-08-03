import React from 'react'
import { Search, Bot } from 'lucide-react'
import Accountnav from '../../components/account/Accountnav'
import Graybtn from '../../components/account/Graybtn'
import Expensepic from '../../assets/Expensepic.png'
import Dashboardhomepic from '../../assets/Dashboardhomepic.png'
import { MessageSquare, MessageCircle, MessagesSquare, Mail } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { Pin } from 'lucide-react'
import { Link } from 'react-router-dom'


const Inbox = () => {
  return (

    <div className='w-full h-auto flex'>
      <div className='bg-[#061B09] graySelect text-white w-[35%] h-full overflow-y-auto border-gray-600 p-5 flex flex-col gap-6'>

        <p className='fraunces text-2xl'>Inbox</p>
        <div className='flex'>
          <div className='w-full h-9 rounded-4xl bg-[#1A3D32] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
            <p className='text-xs'>All</p>
          </div>
          <div className='w-full h-9 rounded-4xl bg-[#1A3D32] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
            <p className='text-xs'>Unread</p>
          </div>
          <div className='w-full h-9 rounded-4xl bg-[#1A3D32] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
            <p className='text-xs'>To-dos</p>
          </div>
        </div>

        <div className='w-full h-15 rounded-xl bg-[#1A3D32] flex'>
          <div className='w-[17%] h-full flex justify-center items-center'>
            <Bot />
          </div>
          <div className='w-[70%] h-full inter p-1.5 flex flex-col'>
            <p className='text-white/80'>Concierge</p>
            <p className='text-white/80 text-sm'>Hi!</p>
          </div>
          <div className='w-[13%] h-full flex justify-center items-center'>
            <Pin size={22} className='text-white/70' />
          </div>
        </div>


        
      </div>
      <Outlet />
    </div>


  )
}

export default Inbox
