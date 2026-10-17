import React from 'react'
import SearchBar from './components/SearchBar'
import ResultGrid from './components/ResultGrid'

const App = () => {
  return (
    <div className='min-h-screen w-full bg-gray-950'>
    <SearchBar/>
    <ResultGrid/>
    </div>
  )
}

export default App
