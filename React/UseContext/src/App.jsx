import { useState } from "react"
import Button from "./components/Button"
import Component1 from "./components/Component1"
import Navbar from "./components/Navbar"
import { countContext } from "./components/context"

function App() {

  const [count, setCount] = useState(0);


  return (
    <>
    <countContext.Provider value={{count, setCount}}>
    <Navbar/>
    {count}
    <button onClick={()=> setCount(count + 1)}>Click app</button>
    </countContext.Provider>
    </>
  )
}

export default App
