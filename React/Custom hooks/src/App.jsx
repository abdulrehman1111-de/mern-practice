import useToggle from "./useToggle"

function App() {

  const [value, toggleValue] = useToggle(true);

  return (
    <div>
      <button onClick={toggleValue}>Toggle heading</button>
      <button onClick={()=> toggleValue(true)}>show heading</button>
      <button onClick={()=> toggleValue(false)}>hide heading</button>
      
      {
        value ? <h1>Custom hooks in react js</h1> : null
      }
    </div>
  )
}

export default App
