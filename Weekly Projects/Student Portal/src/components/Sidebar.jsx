import React from 'react'
import { LayoutGrid } from 'lucide-react';
import { Book } from 'lucide-react';
import { Calendar, CheckSquare, User, Settings } from 'lucide-react';
import { NavLink } from 'react-router';

const Sidebar = () => {
    return (
        <div className='border border-border h-screen fixed w-[17%] bg-panel p-5'>

            <div className='flex items-center gap-3'>
                <div className='w-7 h-7 rounded-md bg-linear-to-r from-accent2 to-accent'></div>
                <p className='space font-semibold text-text'>Student Portal</p>
            </div>

            <div className='flex flex-col gap-3 mt-10'>

                <NavLink className={({isActive})=>{
                    `flex gap-3 justify-center items-center mr-auto` ${isActive ? 'bg-accent' : ""}
                }}>
                    <LayoutGrid className="w-4 h-4 text-text/60" />
                    <p className='text-text/60'>Overview</p>
                </NavLink>

                <NavLink className='flex gap-3 justify-center items-center mr-auto'>
                    <Book className="w-4 h-4 text-text/60" />
                    <p className='text-text/60'>Courses</p>
                </NavLink>

                <NavLink className='flex gap-3 justify-center items-center mr-auto'>
                    <Calendar className="w-4 h-4 text-text/60" />
                    <p className='text-text/60'>Timetable</p>
                </NavLink>

                <NavLink className='flex gap-3 justify-center items-center mr-auto'>
                    <CheckSquare className="w-4 h-4 text-text/60" />
                    <p className='text-text/60'>Grades</p>
                </NavLink>

                <NavLink className='flex gap-3 justify-center items-center mr-auto'>
                    <User className="w-4 h-4 text-text/60" />
                    <p className='text-text/60'>Profile</p>
                </NavLink>

                <NavLink className='flex gap-3 justify-center items-center mr-auto'>
                    <Settings className="w-4 h-4 text-text/60" />
                    <p className='text-text/60'>Settings</p>
                </NavLink>

            </div>

        </div>
    )
}

export default Sidebar
