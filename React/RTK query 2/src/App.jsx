import React, { useState } from 'react'
import { useGetItemsQuery, useDeleteItemsMutation, useNewItemsMutation, useUpdateItemsMutation } from './redux/api'
import PostCard from './components/PostCard'
import UserCard from './components/UserCard'

const App = () => {

  // State to select the source of the data
  const [resource, setResource] = useState("posts")

  const { isLoading, error, isError, isSuccess, data } = useGetItemsQuery(resource)
  console.log(data)

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  // Getting all of the triggers from the first index of the array that we received
  const newPost = useNewItemsMutation()[0]
  const deletePost = useDeleteItemsMutation()[0]
  const updatePost = useUpdateItemsMutation()[0]

  if (isLoading) return <h1 className="loading">Loading...</h1>

  const submitHandler = (e) => {
    e.preventDefault()

    let post
    if (resource === "posts") {
      post = {
        title,
        body,
        userId: Math.random() * 1000,
      }
    }
    else {
      post = {
        name,
        email,
        userId: Math.random() * 1000,
      }
    }
    newPost({ resource, data: post })
    setTitle("")
    setBody("")
    setName("")
    setEmail("")
  }

  return (
    <div className="app">

      <h1 className="app-title">RTK Query</h1>

      <div className="switch">
        <button className={`switch-btn ${resource === "posts" ? "active" : ""}`} onClick={() => setResource("posts")}>Posts</button>
        <button className={`switch-btn ${resource === "users" ? "active" : ""}`} onClick={() => setResource("users")}>Users</button>
      </div>

      <form className="post-form" onSubmit={submitHandler}>
        {
          resource === "posts" ?
            <>
              <input className="input" type="text" name="" id="" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
              <input className="input" type="text" name="" id="" placeholder='Body' value={body} onChange={(e) => setBody(e.target.value)} />
              <button className="btn btn-primary">Submit</button>
            </> :
            <>
              <input className="input" type="text" name="" id="" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
              <input className="input" type="email" name="" id="" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn btn-primary">Submit</button>
            </>
        }
      </form>

      <div className="posts">
        {
          data?.map((item) => {

            if (resource === "posts") {
              return <PostCard key={item.id} title={item.title} body={item.body} onDelete={() => deletePost({ resource, id: item.id })} onUpdate={(newTitle, newBody) => updatePost({ resource, id: item.id, title: newTitle, body: newBody })} />
            }

            else {
              return <UserCard key={item.id} name={item.name} email={item.email} onDelete={() => deletePost({ resource, id: item.id })} onUpdate={(newName, newEmail) => updatePost({ resource, id: item.id, name: newName, email: newEmail })} />
            }
          })
        }
      </div>
    </div>
  )
}

export default App