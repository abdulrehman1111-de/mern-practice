import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Home, Inbox, Receipt, Building2, Building } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'
import { Plus } from 'lucide-react'
import Workspaces from '../pages/dashboard/Workspaces'
import Account from '../pages/dashboard/Account'
import { NavLink } from 'react-router-dom'
import Sidepage from '../pages/sidepage/Sidepage'

const Dashboardlayout = ({ dark, useToggle }) => {

  useEffect(() => {
    const sideBtn = document.getElementById("sideBarBtn");
    const sidePage = document.getElementById("sidePage");

    sideBtn.addEventListener("click", () => {

      const grayPages = document.querySelectorAll(".graySelect");

      if (sidePage.classList.contains("sidebar")) {
        sidePage.classList.remove("sidebar")
        grayPages.forEach((item) => {
          item.classList.remove("grayscale");
        })

      }
      else {
        sidePage.classList.add("sidebar");
        grayPages.forEach((item) => {
          item.classList.add("grayscale");
        })
      }
    })
  }, [])

  return (
    <div className='h-screen w-full flex fraunces relative overflow-hidden'>
      <div className={`graySelect h-screen w-20 flex flex-col gap-3 text-white items-center text-white border-r ${dark ? "bg-[#061B09]  border-r-gray-700" : "bg-white border-gray-200"}`}>

        <div className='bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtEE1AQ0rbwqrTVQKkhoFZXXxnR6TI32bADoXmwtdSwA&s)] bg-center bg-cover w-11 h-11 rounded-full shrink-0 mt-5 p-3 mb-2'>
        </div>


        <NavLink to="" end className={({ isActive }) =>
          `flex flex-col justify-center items-center gap-1 w-full p-3 h-auto 
   ${dark ? "hover:bg-green-950" : "hover:bg-gray-100"}
   ${isActive ? (dark ? "bg-green-950" : "bg-gray-100") : ""}`
        }>
          <Home size={22} className="text-green-500" />
          <span className={`text-xs ${dark ? "text-white" : "text-gray-700"}`}>Home</span>
        </NavLink>


        <NavLink to="inbox" className={({ isActive }) =>
          `flex flex-col justify-center items-center gap-1 w-full p-3 h-auto ${dark ? "hover:bg-green-950" : "hover:bg-gray-100"}
   ${isActive ? (dark ? "bg-green-950" : "bg-gray-100") : ""}`
        }>
          <Inbox size={22} className="text-green-500" />
          <span className="text-green-500" />
          <span className={`text-xs ${dark ? "text-white" : "text-gray-700"}`}>Inbox</span>
        </NavLink>

        <NavLink to="spend" className={({ isActive }) =>
          `flex flex-col justify-center items-center gap-1 w-full p-3 h-auto ${dark ? "hover:bg-green-950" : "hover:bg-gray-100"}
   ${isActive ? (dark ? "bg-green-950" : "bg-gray-100") : ""}`
        }>
          <Receipt size={22} className="text-green-500" />
          <span className="text-green-500" />
          <span className={`text-xs ${dark ? "text-white" : "text-gray-700"}`}>Spend</span>
        </NavLink>

        <NavLink to="workspaces" className={({ isActive }) =>
          `flex flex-col justify-center items-center gap-1 w-full p-3 h-auto ${dark ? "hover:bg-green-950" : "hover:bg-gray-100"}
   ${isActive ? (dark ? "bg-green-950" : "bg-gray-100") : ""}`
        }>
          <Building2 size={22} className="text-green-500" />
          <span className="text-green-500" />
          <span className={`text-xs ${dark ? "text-white" : "text-gray-700"}`}>Workspaces</span>
        </NavLink>

        <NavLink to="account" className={({ isActive }) =>
          `flex flex-col justify-center items-center gap-1 w-full p-3 h-auto ${dark ? "hover:bg-green-950" : "hover:bg-gray-100"}
   ${isActive ? (dark ? "bg-green-950" : "bg-gray-100") : ""}`
        }>
          <CircleUserRound size={22} className="text-green-500" />
          <span className="text-green-500" />
          <span className={`text-xs ${dark ? "text-white" : "text-gray-700"}`}>Account</span>
        </NavLink>

        <button onClick={useToggle}>{dark ? "Light mode" : "Dark mode"}</button>

        <div id='sideBarBtn' className='w-10 p-3 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center rounded-full mt-20'>
          <Building2 size={20} className='text-white' />
        </div>
        <div className='w-10 p-3 h-10 rounded-4xl bg-[#1A3D32] hover:bg-[#243f36] flex justify-center items-center rounded-full'>
          <Plus size={20} className='text-white' />
        </div>

      </div>

      <Sidepage dark={dark} />

      <Outlet context={{ dark }} />
    </div>


  )
}

export default Dashboardlayout
