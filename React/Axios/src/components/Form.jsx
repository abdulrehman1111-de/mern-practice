import React, { useEffect, useState } from 'react'
import { postData, updateData } from '../api/PostApi'

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {

    // This state holds the data that is typed in the form 
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })

    const handleInputChange = (e) => {
        // Which input fired and what is the type
        const name = e.target.name
        const value = e.target.value

        // Copy old values, overwrite only the changed field
        setAddData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    // Length is zero means nothing to change so it remains in add mode
    let isEmpty = Object.keys(updateDataApi).length === 0

    const addPostData = async () => {
        try {
            const res = await postData(addData)
            console.log("res", res)
            if (res.status === 201) {
                // Old post plus new post data
                setData([...data, res.data])
                setAddData({ title: "", body: "" })
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const updatePostData = async () => {
        try {
            const res = await updateData(updateDataApi.id, addData)
            console.log("res", res)
            if (res.status === 200) {
                // New list: Swap in the saved post, keep all others
                setData((prev) => prev.map((item) => item.id === res.data.id ? res.data : item))
                // Empty all the inputs
                setAddData({ title: "", body: "" })
                // Leave edit mode button goes back to add
                setUpdateDataApi({})
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (isEmpty) {
            addPostData()
        }
        else{
            updatePostData()
        }
    }

    // Runs whenever the chosen post changes; copies its text into the inputs
    useEffect(() => {
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || ""
        })
    }, [updateDataApi])

    return (
        <form onSubmit={handleFormSubmit} className="add-post">
            {/* Value = state; onchange keeps state updated */}
            <input value={addData.title} onChange={handleInputChange} type="text" name="title" placeholder="Add Title" />
            <input value={addData.body} onChange={handleInputChange} type="text" name="body" placeholder="Add Post" />
            {/* Text and value switch between add and edit; Handle form submit reads the value */}
            <button type="submit" value={isEmpty ? "Add" : "Edit"} className="btn-add">
                {isEmpty ? "Add" : "Edit"}
            </button>
        </form>
    )
}

export default Form