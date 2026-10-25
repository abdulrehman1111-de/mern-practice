import React, { useState } from 'react'
import { useGetPostsQuery, useDeletePostsMutation, useNewPostsMutation, useUpdatePostsMutation } from './redux/api'
import PostCard from './components/PostCard'

const App = () => {

  const {isLoading, error, isError, isSuccess, data} = useGetPostsQuery("")
  console.log(data)

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  // Getting all of the triggers from the first index of the array that we received
  const newPost = useNewPostsMutation()[0]
  const deletePost = useDeletePostsMutation()[0]
  const updatePost = useUpdatePostsMutation()[0]

  if(isLoading) return <h1 className="loading">Loading...</h1>

  const submitHandler = (e)=>{
    e.preventDefault()

    const post = {
      title,
      body,
      userId: Math.random() * 1000,
      id: Math.random() * 1000
    }
    newPost(post)
    setTitle("")
    setBody("")
  }

  return (
    <div className="app">

      <h1 className="app-title">RTK Query</h1>

      <form className="post-form" onSubmit={submitHandler}>
        <input className="input" type="text" name="" id="" placeholder='Title' value={title} onChange={(e)=> setTitle(e.target.value)} />
        <input className="input" type="text" name="" id="" placeholder='Body' value={body} onChange={(e)=> setBody(e.target.value)} />
        <button className="btn btn-primary">Submit</button>
      </form>

      <div className="posts">
        {
          data?.map((item)=>{
            return <PostCard key={item.id} title={item.title} body={item.body} onDelete={()=> deletePost(item.id)} onUpdate={(newTitle, newBody)=> updatePost({id: item.id, title: newTitle, body: newBody})} />
          })
        }
      </div>
    </div>
  )
}

export default App