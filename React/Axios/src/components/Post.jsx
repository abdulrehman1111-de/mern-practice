import React, { useState } from 'react'
import { useEffect } from "react"
import { deletePost, getPost } from '../api/PostApi'
import Form from './Form'

const Post = () => {

    // Holds the posts, set data to be empty so that map function doesnt crash
    const [data, setData] = useState([])

    // Function that waits to get data from the server
    const getPostData = async () => {
        try {
            const res = await getPost()
            console.log(res.data)
            setData(res.data)
        }
        catch (error) {
            console.log(error)
        }
    }   

    // Runs on delete click, gets that post's id
    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id)
            // Only update the screen if the server said okay 
            if(res.status === 200){
                // New list without the deleted post 
                const newUpdatedPosts = data.filter((item)=>{
                    return item.id !== id
                })
                // Save the updated data
                setData(newUpdatedPosts)
            }
            else{
                console.log("Failed to delte the post", res.status)
            }
        }
        catch(error){
            console.log(error)
        }
    }
    
    // Post being edited; {} means nothing so the form is in add mode
    const [updateDataApi, setUpdateDataApi] = useState({})

    // Save the whole clicked post in the state
    const handleUpdatePost = (item)=> setUpdateDataApi(item)

    // Runs once when the page opens
    useEffect(() => {
        getPostData()
    }, [])

    return (
        <section className="section-post">

            {/* Form can change the list only by the data from the parent */}
            <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>

            <ul className="post-list">
                {
                    data.map((item) => {
                        const { id, body, title } = item
                        return (
                            <li key={id} className="post-card">
                                <p className="post-number">{id}.</p>
                                <p>Title: {title}</p>
                                <p>News: {body}</p>
                                <div className="post-actions">
                                    {/* Passes the whole post */}
                                    <button onClick={()=> handleUpdatePost(item)} className="btn-edit">Edit</button>
                                    {/* Runs on click not when redrawing */}
                                    <button onClick={() => handleDeletePost(id)} className="btn-delete">Delete</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default Post