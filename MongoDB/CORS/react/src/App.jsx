import React from 'react'
import {useEffect} from 'react'

const App = () => {
   
  useEffect(()=>{
    fetchApi()
  }, [])

  async function fetchApi(){
    let data = await fetch("http://localhost:3000/")
    data = await data.json()
    console.log(data)
  }

  return (
    <div>
      
    </div>
  )
}

export default App
