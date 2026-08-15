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


const Inbox = ({dark}) => {
  return (

    <div className='w-full h-auto flex'>
      <div className={`graySelect text-white w-[35%] h-full overflow-y-auto border-gray-600 p-5 flex flex-col gap-6 ${dark ? "bg-[#061B09]" : "text-white"}`}>

        <p className={`fraunces text-2xl ${dark ? "" : "text-gray-900"}`}>Inbox</p>
        <div className='flex'>
          <div className={`w-full h-9 rounded-4xl flex justify-center items-center text-center font-semibold ${dark ? "bg-[#1A3D32] hover:bg-green-400" : "bg-gray-100 hover:bg-gray-200 text-gray-900 "}`}>
            <p className='text-xs'>All</p>
          </div>
          <div className={`w-full h-9 rounded-4xl flex justify-center items-center text-center font-semibold ${dark ? "bg-[#1A3D32] hover:bg-green-400" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}>
            <p className='text-xs'>Unread</p>
          </div>
          <div className={`w-full h-9 rounded-4xl flex justify-center items-center text-center font-semibold ${dark ? "bg-[#1A3D32] hover:bg-green-400" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}>
            <p className='text-xs'>To-dos</p>
          </div>
        </div>

        <div className={`w-full h-15 rounded-xl flex ${dark ? "bg-[#1A3D32]" : "bg-gray-50 border border-gray-200"}`}>
          <div className={`w-[17%] h-full flex justify-center items-center ${dark ? "" : "text-gray-500"}`}>
            <Bot />
          </div>
          <div className='w-[70%] h-full inter p-1.5 flex flex-col'>
            <p className={dark ? "text-white/80" : "text-gray-900"}>Concierge</p>
            <p className={`text-sm ${dark ? "text-white/80" : "text-gray-500"}`}>Hi!</p>
          </div>
          <div className='w-[13%] h-full flex justify-center items-center'>
            <Pin size={22} className={dark ? "text-white/70" : "text-gray-500"} />
          </div>
        </div>


        
      </div>
      <Outlet context={{dark}}/>
    </div>


  )
}

export default Inbox
