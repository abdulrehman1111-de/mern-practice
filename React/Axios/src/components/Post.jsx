import React, { useState } from 'react'
import { useEffect } from "react"
import { deletePost, getPost } from '../api/PostApi'
import Form from './Form'

const Post = () => {

    const [data, setData] = useState([])
    const [updateDataApi, setUpdateDataApi] = useState({})

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

    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id)
            if(res.status === 200){
                const newUpdatedPosts = data.filter((item)=>{
                    return item.id !== id
                })
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

    const handleUpdatePost = (item)=> setUpdateDataApi(item)

    useEffect(() => {
        getPostData()
    }, [])

    return (
        <section className="section-post">

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
                                    <button onClick={()=> handleUpdatePost(item)} className="btn-edit">Edit</button>
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