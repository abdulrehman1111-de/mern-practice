import React from 'react'
import { fetchPhotos } from './api/mediaApi'

const App = () => {

  return (
    <div className='h-screen w-full bg-gray-950'>

      <button className='text-white bg-green-500 px-4 py-2 m-5' onClick={async() => {
        const data = await fetchPhotos("cat")
        console.log(data.results)

      }}>Get Photos</button>
    </div>
  )
}

export default App
