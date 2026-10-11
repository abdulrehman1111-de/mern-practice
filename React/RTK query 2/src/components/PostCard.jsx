import React from 'react'

const PostCard = ({title, body}) => {
  return (
    <div>
    <h4>{title}</h4>
    <p>{body}</p>
    </div>
  )
}

export default PostCard
