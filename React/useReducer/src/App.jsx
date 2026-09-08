import React, { useReducer, useState } from 'react'

// Object defined to get rid of writing the type again and again
const ACTIONS ={
  INCREMENT: 'increment',
  DECREMENT: 'decrement'
}

// reducer function takes the current state as input and what action we asked for
function reducer(state, action){

  // Chooses to perform one of the actions depending on the type
  switch(action.type){
    case ACTIONS.INCREMENT:
      return {count: state.count + 1} 
    case ACTIONS.DECREMENT:
      return {count: state.count - 1}
    default:
      return state
  }

}

const App = () => {

  const [count, setCount] = useState(0);

  // useReduce syntax
  const [state, dispatch] = useReducer(reducer, {count: 0})

  function increment(){
    // setCount(prevCount => prevCount + 1);

    // Runs like a vending machine button giving you the thing you want
    dispatch({type: 'increment'});
  }

  function decrement(){
    // setCount(prevCount => prevCount - 1);
    dispatch({type: 'decrement'})
  }

  return (
    <div className='text-white bg-black min-h-screen flex gap-3 justify-center items-center'>

      <p onClick={increment} className='text-5xl text-white'>+</p>
      {/* Getting the value of your state */}
      <p className='text-5xl text-white'>{state.count}</p>
      <p onClick={decrement} className='text-5xl text-white'>-</p>
      
    </div>
  )
}

export default App
