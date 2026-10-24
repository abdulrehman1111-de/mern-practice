import React, { useState } from 'react'

const PostCard = ({title, body, onDelete, onUpdate}) => {

  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const [newBody, setNewBody] = useState(body)

  if(editing) return (
    <div>
    <input type="text" name="" id="" placeholder='Enter title' value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} />
    <input type="text" name="" id="" placeholder='Enter body' value={newBody} onChange={(e)=> setNewBody(e.target.value)} />
    <button onClick={()=>{
      onUpdate(newTitle, newBody)
      setEditing(false)
    }}>Save</button>
    </div>
  )

  return (
    <div>
    <h4>{title}</h4>
    <p>{body}</p>
    <button onClick={()=> setEditing(true)}>Edit</button>
    <button onClick={()=> onDelete()}>Delete</button>
    </div>
)
}

export default PostCard
