import React, { useState } from 'react'
import { useEffect } from "react"
import { deletePost, getPost } from '../api/PostApi'
import Form from './Form'
import { toast } from 'react-toastify'

const Post = () => {

    // Holds the posts, set data to be empty so that map function doesnt crash
    const [data, setData] = useState([])

    // Code for pagination
    const [page, setPage] = useState(1)
    const itemPerPage = 6
    const lastIndex = itemPerPage * page
    const firstIndex = lastIndex - itemPerPage

    let currentPage = data.slice(firstIndex, lastIndex)

    let totalPage = Math.ceil(data.length / itemPerPage)

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
            if (res.status === 200) {
                // New list without the deleted post 
                const newUpdatedPosts = data.filter((item) => {
                    return item.id !== id
                })
                // Save the updated data
                setData(newUpdatedPosts)
                toast.success("Post deleted successfully!")
            }
            else {
                console.log("Failed to delte the post", res.status)
                toast.error("Failed to delete the post!")
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    // Post being edited; {} means nothing so the form is in add mode
    const [updateDataApi, setUpdateDataApi] = useState({})

    // Save the whole clicked post in the state
    const handleUpdatePost = (item) => setUpdateDataApi(item)

    // Runs once when the page opens
    useEffect(() => {
        getPostData()
    }, [])

    return (
        <section className="section-post">

            {/* Form can change the list only by the data from the parent */}
            <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi} />

            <ul className="post-list">
                {
                    currentPage.map((item) => {
                        const { id, body, title } = item
                        return (
                            <li key={id} className="post-card">
                                <p className="post-number">{id}.</p>
                                <p>Title: {title}</p>
                                <p>News: {body}</p>
                                <div className="post-actions">
                                    {/* Passes the whole post */}
                                    <button onClick={() => handleUpdatePost(item)} className="btn-edit">Edit</button>
                                    {/* Runs on click not when redrawing */}
                                    <button onClick={() => handleDeletePost(id)} className="btn-delete">Delete</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>

            <div className='flex justify-center items-center gap-3 mt-8'>
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-5 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-300"
                    >
                        Prev
                    </button>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPage}
                        className="px-5 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-300"
                    >
                        Next
                    </button>
            </div>
        </section>
    )
}

export default Post