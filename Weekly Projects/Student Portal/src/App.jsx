import React from 'react'
import { Route } from 'react-router'
import Signup from './pages/Signup'
import { Routes } from 'react-router'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Signup/>} />
    </Routes>
    </>
  )
}

export default App
