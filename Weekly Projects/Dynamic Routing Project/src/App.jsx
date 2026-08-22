import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import DetailedUser from "./pages/DetailedUser"

function App() {

  return (
    <>

    <Routes>
      
      <Route path="/home" element={<Home/>}/>
      <Route path="/home/:id" element={<DetailedUser/>}/>

    </Routes>
    </>
  )
}

export default App
