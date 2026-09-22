import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import './App.css'
import Login from './pages/Login'
import Dashboardlayout from './pages/Dashboardlayout'
import Overview from './pages/DashboardPages/Overview'
import Courses from './pages/DashboardPages/Courses'
import Grades from './pages/DashboardPages/Grades'
import Profile from './pages/DashboardPages/Profile'
import Settings from './pages/DashboardPages/Settings'
import Timetable from './pages/DashboardPages/Timetable'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboardlayout />
          </ProtectedRoute>
        }>

          <Route index element={<Overview />} />
          <Route path='courses' element={<Courses />} />
          <Route path='grades' element={<Grades />} />
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Settings />} />
          <Route path='timetable' element={<Timetable />} />

        </Route>
      </Routes>
    </>
  )
}

export default App