import React from 'react'
import { Route, Routes } from 'react-router'
import Signup from './pages/Signup'
import './App.css'
import Login from './pages/Login'
import Dashboardlayout from './pages/Dashboardlayout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboardlayout/>}/>
    </Routes>
  )
}

export default App