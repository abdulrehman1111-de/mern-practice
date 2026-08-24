import React from 'react'
import { createContext } from 'react'
import { useContext } from 'react'
import { countContext } from './context'

const Component1 = () => {

    const {count} = useContext(countContext);

  return (
    <div>
      {count}
    </div>
  )
}

export default Component1
