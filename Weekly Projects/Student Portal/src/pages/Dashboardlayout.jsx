import Sidebar from '../components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router'
import { useEffect } from 'react'
import AOS from 'aos';
import { useLocation } from 'react-router';

const Dashboardlayout = () => {

  const location = useLocation();

  useEffect(() => {
  AOS.refreshHard();
}, [location.pathname]);


  return (
    // Dashboard layout is the main Container, it contains side panel and the outlet for dynamically selecting options This system will persist across every option selection
    <div className='flex'>
      <Sidebar/>

      <Outlet/>
    </div>
  )
}

export default Dashboardlayout
