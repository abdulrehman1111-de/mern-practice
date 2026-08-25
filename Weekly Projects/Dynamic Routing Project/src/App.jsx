import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import DetailedUser from "./pages/DetailedUser"
import { Provider } from "react-redux"
import { store } from "./components/store"

function App() {

  return (
    <>

    <Provider store={store}>
      <Routes>  
      
      {/* // Both routes redirecting to the same component */}
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>

      {/* // Way of doing dynamic Routing */}
      <Route path="/home/:id" element={<DetailedUser/>}/>

    </Routes>
    </Provider>
    </>
  )
}

export default App
