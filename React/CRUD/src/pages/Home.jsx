import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Inbox, Receipt, Building2, Building } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Grip } from 'lucide-react'
import { LayoutDashboard } from 'lucide-react'

const Home = () => {

    return (
        <div className='h-screen w-full flex relative overflow-x-hidden'>
            <div className='bg-[#0F2A3D] h-screen w-20 flex flex-col gap-3 text-white items-center text-white border-r border-r-gray-700'>

                <div className='w-full h-15 p-3 flex justify-center items-center bg-[#1A3E54]'>
                    <div className='w-11 h-11 rounded-full mt-5 p-3 mb-2 relative bottom-2'>
                        <Grip size={25} className='text-white' />
                    </div>
                </div>

                <div className='h-full w-full flex justify-center items-center'>
                    <p className='fraunces text-4xl [writing-mode:vertical-rl] [text-orientation:upright]'>Dashboard</p>
                </div>

                <div className='w-10 p-3 h-10 rounded-4xl bg-[#1A3E54] flex justify-center items-center rounded-full mb-5 mt-auto'>
                    <LayoutDashboard size={20} className='text-white' />
                </div>

            </div>


            <Outlet />
        </div>


    )
}

export default Home
