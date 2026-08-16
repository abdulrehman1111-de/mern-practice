import { useState } from "react"
import InfoCard from "./InfoCard"
import useToggle from "./useToggle";

function App() {

  const [dark, toggleDark] = useToggle(false);

  return (
    <div>
      <InfoCard useToggle={toggleDark} dark={dark}/>
    </div>
  )
}

export default App
