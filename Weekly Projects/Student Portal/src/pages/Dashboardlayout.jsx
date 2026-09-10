import Sidebar from '../components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { getUser } from '../Backend/auth'

const Dashboardlayout = () => {

  const user = getUser();
  const isTeacher = user?.role === "teacher";

  return (
    <div className={`flex ${isTeacher ? 'theme-teacher' : ''}`}>
      <Sidebar/>

      <Outlet/>
    </div>
  )
}

export default Dashboardlayout