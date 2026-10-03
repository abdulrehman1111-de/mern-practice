import React from 'react'
import { useDeletePostMutation, useEditPostMutation } from './JsonPlaceholderApi'

const Posts = ({ title, body, id, userId }) => {

  let array = useDeletePostMutation()
  let deletePost = array[0]

  let array2 = useEditPostMutation()
  let editPost = array2[0]

  return (
    <div className='w-full bg-[#FFFFFF] text-[#1B1F24] rounded-xl p-5 h-auto flex flex-col gap-1 border-1 border-gray-300'>

      <p className='text-md font-semibold'>{title}</p>
      <p className='text-[#6B7280] text-sm'>{body}</p>
      <button onClick={() => deletePost({ id: id, userId: userId })}>Delete post</button>
      <button onClick={()=> editPost({id: id, body: {title: "Edited text"}})}>Edit post</button>
    </div>
  )
}

export default Posts
