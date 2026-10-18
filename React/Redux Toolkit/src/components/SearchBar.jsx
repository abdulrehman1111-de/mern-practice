import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'

const SearchBar = () => {

    const [text, setText] = useState("")

    const dispatch = useDispatch()
    
    const submitHandler = (e)=>{
        e.preventDefault()
        console.log(text)
        dispatch(setQuery(text))
    }

  return (
    <div>
      <form onSubmit={(e)=> submitHandler(e)} className='flex gap-5 p-10 bg-gray-900'>
        <input value={text} onChange={(e)=> setText(e.target.value)} required className='border-2 px-4 py-2 text-xl rounded outline-none text-white border-white w-full' type="text" name="" id="" placeholder='Search anything...' />
        <button className='border-2 px-4 py-2 text-xl rounded outline-none text-white border-white cursor-pointer active:scale-95'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
