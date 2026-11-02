import React, { useState } from 'react'

const UserCard = ({ name, email, onDelete, onUpdate }) => {

  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState(name)
  const [newEmail, setNewEmail] = useState(email)

  // if the component is in editing mode then this block runs
  if (editing) return (
    <div className="card card-edit">
      <input className="input" type="text" name="" id="" placeholder='Enter title' value={newName} onChange={(e) => setNewName(e.target.value)} />
      <input className="input" type="text" name="" id="" placeholder='Enter body' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      <button className="btn btn-save" onClick={() => {
        onUpdate(newName, newEmail)
        setEditing(false)
      }}>Save</button>
    </div>
  )

  // IF it is not in the editing mode then this block runs
  else {
    return (
      <div className="card">
        <h4 className="card-title">{name}</h4>
        <p className="card-body">{email}</p>
        <div className="card-actions">
          <button className="btn btn-edit" onClick={() => setEditing(true)}>Edit</button>
          <button className="btn btn-delete" onClick={() => onDelete()}>Delete</button>
        </div>
      </div>
    )
  }
}

export default UserCard