import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Presentations from './pages/Presentations'
import Publications from './pages/Publications'
import Research from './pages/Research'
import Teaching from './pages/Teaching'

function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={Home} />
        <Route path='/about' element={About} />
        <Route path='/contact' element={Contact}/>
        <Route path='/education' element={Education}/>
        <Route path='/presentations' element={Presentations}/>
        <Route path='/publications' element={Publications}/>
        <Route path='/research' element={Research}/>
        <Route path='/teaching' element={Teaching}/>

      </Routes>
    </>
  )
}

export default App
