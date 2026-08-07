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
        <div className='h-auto w-full flex relative overflow-x-hidden bg-[#0A0E14]'>
            <div className='bg-[#0D131B] h-screen fixed top-0 w-20 flex flex-col gap-3 items-center text-[#EDEFF2] border-r border-white/[0.06]'>

                <div className='w-full h-16 flex justify-center items-center border-b border-white/[0.06]'>
                    <div className='w-9 h-9 rounded-full border border-[#E8A94C]/30 flex justify-center items-center'>
                        <Grip size={16} className='text-[#E8A94C]' />
                    </div>
                </div>

                <div className='h-full w-full flex justify-center items-center'>
                    <p
                        className='text-[13px] tracking-[0.35em] uppercase text-[#EDEFF2]/80 [writing-mode:vertical-rl] [text-orientation:upright]'
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Dashboard
                    </p>
                </div>

                <div className='w-9 h-9 rounded-full bg-[#E8A94C]/15 border border-[#E8A94C]/30 flex justify-center items-center mb-6'>
                    <LayoutDashboard size={16} className='text-[#E8A94C]' />
                </div>

            </div>


            <Outlet />
        </div>


    )
}

export default Home