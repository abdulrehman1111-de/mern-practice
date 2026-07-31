import About from "./components/About"
import Home from "./components/Home"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import Students from "./components/Students"

function App() {

  
  return (
    <div>
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/about" element = {<About/>}>
          <Route path="student" element = {<Students/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
