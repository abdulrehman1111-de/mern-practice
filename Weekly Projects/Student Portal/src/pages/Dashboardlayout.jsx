import Sidebar from '../components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router'
import { useEffect } from 'react'

const Dashboardlayout = () => {

  return (
    // Dashboard layout is the main Container, it contains side panel and the outlet for dynamically selecting options This system will persist across every option selection
    <div className='flex'>
      <Sidebar/>

      <Outlet/>
    </div>
  )
}

export default Dashboardlayout
