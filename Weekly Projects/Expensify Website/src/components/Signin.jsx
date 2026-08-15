import React from 'react'
import { X } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import Googlebtn from './Googlebtn'
import { FaApple } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Signin = ({dark}) => {

  return (
    <div id='signInDiv' className={`none absolute translate-x-70 p-5 z-100 w-[45%] h-[80vh] rounded-3xl flex flex-col gap-7 items-center ${dark ? "bg-[#07271F]" : "bg-white"}`}>

      <div className='flex justify-around items-center pt-5 w-[85%]'>
        <p className='mr-auto text-3xl font-bold inter text-[#03D47C]'>Expensify</p>
        <div id='crossBtn'><X size={22} className={dark ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-gray-400"} /></div>
      </div>

      <p className={`text-2xl fraunces ${dark ? "text-white" : "text-gray-900"}`}>Welcome! How would you like to connect?</p>

      <div className='flex flex-col gap-3 w-full justify-center items-center'>
        <div className={`w-[85%] h-10 rounded-4xl flex justify-around items-center text-center font-semibold pl-5 pr-5 ${dark ? "bg-[#1A3D32] hover:bg-[#2C6755]" : "bg-gray-100 hover:bg-gray-200"}`}>
          <p className='text-md mr-auto inter'>Email</p>
          <ChevronRight size={30} className='text-green-500' />
        </div>

        <div className={`w-[85%] h-10 rounded-4xl flex justify-around items-center text-center font-semibold pl-5 pr-5 ${dark ? "bg-[#1A3D32] hover:bg-[#2C6755]" : "bg-gray-100 hover:bg-gray-200"}`}>
          <p className='text-md mr-auto inter'>Phone number</p>
          <ChevronRight size={30} className='text-green-500' />
        </div>
      </div>

      <div className='flex gap-3'>
        <Link to="/dashboard"><div><Googlebtn /></div></Link>
        <div className='w-8 h-8 bg-white rounded-full flex justify-center items-center'>
          <FaApple size={28} className='text-black' />
        </div>
      </div>

      <p className={`text-2xl fraunces ${dark ? "text-white" : "text-gray-900"}`}>Want to talk to our sales team instead?</p>

      <div className={`w-[85%] h-10 rounded-4xl flex justify-around items-center text-center font-semibold pl-5 pr-5 ${dark ? "bg-[#1A3D32] hover:bg-[#2C6755]" : "bg-gray-100 hover:bg-gray-200"}`}>
        <p className='text-md mr-auto inter'>Contact Sales</p>
        <ChevronRight size={30} className='text-green-white' />
      </div>

      <p className={`text-xs ${dark ? "text-white" : "text-gray-500"}`}>By logging in, you agree to our <span className='text-blue-400'>terms of service</span> and <span className='text-blue-400'>privacy policy</span>.</p>

    </div>
  )
}

export default Signin
