import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import IndiviualPage from "./components/IndiviualPage"

function App() {

  return (
    <>
    <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/home/:id" element={<IndiviualPage/>} />

    </Routes>
    </>
  )
}

export default App
