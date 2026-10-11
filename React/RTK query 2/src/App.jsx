import React from 'react'
import { useGetPostsQuery } from './api'
import PostCard from './components/PostCard'

const App = () => {

  const {isLoading, isError, error, data, isSuccess} = useGetPostsQuery("")
  console.log(data)

  if(isLoading) return <h1>Loading</h1>

  return (
    <div>
      {
        data?.map((item)=>{
          return <PostCard key={item.id} title={item.title} body={item.body} />
        })
      }
    </div>
  )
}

export default App
