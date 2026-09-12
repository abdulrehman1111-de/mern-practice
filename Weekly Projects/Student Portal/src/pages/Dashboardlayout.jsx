import Sidebar from '../components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { getCurrentUser } from '../Backend/users'

const Dashboardlayout = () => {

  const user = getCurrentUser();
  const isTeacher = user?.role === "teacher";

  return (
    <div className={`flex ${isTeacher ? 'theme-teacher' : ''}`}>
      <Sidebar/>

      <Outlet/>
    </div>
  )
}

export default Dashboardlayout