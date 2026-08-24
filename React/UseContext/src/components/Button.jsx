import React from 'react'
import Component1 from './Component1'
import { useContext } from 'react'
import { countContext } from './context'

const Button = () => {

    const {count, setCount} = useContext(countContext);

  return (
    <div>
        <Component1/>
      <button onClick={()=> setCount(count + 1)}>CLick me</button>
    </div>
  )
}

export default Button
