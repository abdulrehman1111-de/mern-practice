import React, { useState } from 'react'
import { useGetPostsQuery, useNewPostsMutation, useDeletePostsMutation, useUpdatePostsMutation } from './redux/api'
import PostCard from './components/PostCard'

const App = () => {

  const {isLoading, isError, error, data, isSuccess} = useGetPostsQuery("")
  console.log(data)

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const newPost = useNewPostsMutation()[0]
  const deletePost = useDeletePostsMutation()[0]
  const updatePost = useUpdatePostsMutation()[0]

  if(isLoading) return <h1>Loading</h1>

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
    <div>

      <h1>My App</h1>

      <form onSubmit={submitHandler}>
        <input type="text" name="" id="" placeholder='title' value={title} onChange={(e)=> setTitle(e.target.value)} />
        <input type="text" name="" id="" placeholder='body' value={body} onChange={(e)=> setBody(e.target.value)} />
        <button>Submit</button>
      </form>

      {
        data?.map((item)=>{
          return <PostCard key={item.id} title={item.title} body={item.body} onDelete={()=> deletePost(item.id)} onUpdate={(newTitle, newBody)=> updatePost({id: item.id, title: newTitle, body: newBody})} />
        })
      }
    </div>
  )
}

export default App
