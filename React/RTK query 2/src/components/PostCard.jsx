import React, { useState } from 'react'

const PostCard = ({ title, body, onDelete, onUpdate }) => {

  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const [newBody, setNewBody] = useState(body)

  // if the component is in editing mode then this block runs
  if (editing) return (
    <div className="card card-edit">
      <input className="input" type="text" name="" id="" placeholder='Enter title' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <input className="input" type="text" name="" id="" placeholder='Enter body' value={newBody} onChange={(e) => setNewBody(e.target.value)} />
      <button className="btn btn-save" onClick={() => {
        onUpdate(newTitle, newBody)
        setEditing(false)
      }}>Save</button>
    </div>
  )

  // IF it is not in the editing mode then this block runs
  else {
    return (
      <div className="card">
        <h4 className="card-title">{title}</h4>
        <p className="card-body">{body}</p>
        <div className="card-actions">
          <button className="btn btn-edit" onClick={() => setEditing(true)}>Edit</button>
          <button className="btn btn-delete" onClick={() => onDelete()}>Delete</button>
        </div>
      </div>
    )
  }
}

export default PostCard