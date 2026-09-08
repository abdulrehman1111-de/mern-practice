import React from 'react'
import { LayoutGrid } from 'lucide-react';
import { Book } from 'lucide-react';
import { Calendar, CheckSquare, User, Settings } from 'lucide-react';
import { NavLink } from 'react-router';

const Sidebar = () => {
    return (
        <div className='border border-border min-h-screen w-[20%] bg-panel p-5'>

            <div className='flex items-center gap-3'>
                <div className='w-7 h-7 rounded-md bg-linear-to-r from-accent2 to-accent'></div>
                <p className='space font-semibold text-text'>Student Portal</p>
            </div>

            <div className='flex flex-col mt-10 gap-1'>

            {/* Placing end* here makes the default option go un-selected when some other option in the sidepanel is selected */}
                <NavLink end to="/dashboard"
                    className={({ isActive }) =>
                        `w-full flex gap-3 items-center mr-auto p-1.5 rounded-lg group hover:bg-[#182735] hover:text-text hover:transition-all hover:duration-100 ${isActive ? 'bg-active text-text' : 'text-dim'}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <LayoutGrid className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-text/60 group-hover:text-text'}`} />
                            <p className={isActive ? 'text-text' : 'text-text/60 group-hover:text-text'}>Overview</p>
                        </>
                    )}

                </NavLink>

                <NavLink to="/dashboard/courses"
                    className={({ isActive }) =>
                        `w-full flex gap-3 items-center mr-auto p-1.5 rounded-lg group hover:bg-[#182735] hover:text-text hover:transition-all hover:duration-100 ${isActive ? 'bg-active text-text' : 'text-dim'}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <Book className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-text/60 group-hover:text-text'}`} />
                            <p className={isActive ? 'text-text' : 'text-text/60 group-hover:text-text'}>Courses</p>
                        </>
                    )}

                </NavLink>

                <NavLink to="/dashboard/timetable"
                    className={({ isActive }) =>
                        `w-full flex gap-3 items-center mr-auto p-1.5 rounded-lg group hover:bg-[#182735] hover:text-text hover:transition-all hover:duration-100 ${isActive ? 'bg-active text-text' : 'text-dim'}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <Calendar className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-text/60 group-hover:text-text'}`} />
                            <p className={isActive ? 'text-text' : 'text-text/60 group-hover:text-text'}>Timetable</p>
                        </>
                    )}

                </NavLink>

                <NavLink to="/dashboard/grades"
                    className={({ isActive }) =>
                        `w-full flex gap-3 items-center mr-auto p-1.5 rounded-lg group hover:bg-[#182735] hover:text-text hover:transition-all hover:duration-100 ${isActive ? 'bg-active text-text' : 'text-dim'}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <CheckSquare className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-text/60 group-hover:text-text'}`} />
                            <p className={isActive ? 'text-text' : 'text-text/60 group-hover:text-text'}>Grades</p>
                        </>
                    )}

                </NavLink>

                <NavLink to="/dashboard/profile"
                    className={({ isActive }) =>
                        `w-full flex gap-3 items-center mr-auto p-1.5 rounded-lg group hover:bg-[#182735] hover:text-text hover:transition-all hover:duration-100 ${isActive ? 'bg-active text-text' : 'text-dim'}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <User className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-text/60 group-hover:text-text'}`} />
                            <p className={isActive ? 'text-text' : 'text-text/60 group-hover:text-text'}>Profile</p>
                        </>
                    )}

                </NavLink>

                <NavLink to="/dashboard/settings"
                    className={({ isActive }) =>
                        `w-full flex gap-3 items-center mr-auto p-1.5 rounded-lg group hover:bg-[#182735] hover:text-text hover:transition-all hover:duration-100 ${isActive ? 'bg-active text-text' : 'text-dim'}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <Settings className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-text/60 group-hover:text-text'}`} />
                            <p className={isActive ? 'text-text' : 'text-text/60 group-hover:text-text'}>Settings</p>
                        </>
                    )}

                </NavLink>

            </div>

        </div>
    )
}

export default Sidebar
