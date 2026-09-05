import React from 'react'
import { Route, Routes } from 'react-router'
import Signup from './pages/Signup'
import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Signup />} />
    </Routes>
  )
}

export default App