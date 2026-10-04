import React, { useEffect, useState } from 'react'
import { postData, updateData } from '../api/PostApi'

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {

    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setAddData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    let isEmpty = Object.keys(updateDataApi).length === 0

    const addPostData = async () => {
        try {
            const res = await postData(addData)
            console.log("res", res)
            if (res.status === 201) {
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
                setData((prev) => prev.map((item) => item.id === res.data.id ? res.data : item))
                setAddData({ title: "", body: "" })
                setUpdateDataApi({})
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const action = e.nativeEvent.submitter.value
        if (action === "Add") {
            addPostData()
        }
        else if (action === "Edit") {
            updatePostData()
        }
    }

    useEffect(() => {
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || ""
        })
    }, [updateDataApi])

    return (
        <form onSubmit={handleFormSubmit} className="add-post">
            <input value={addData.title} onChange={handleInputChange} type="text" name="title" placeholder="Add Title" />
            <input value={addData.body} onChange={handleInputChange} type="text" name="body" placeholder="Add Post" />
            <button type="submit" value={isEmpty ? "Add" : "Edit"} className="btn-add">
                {isEmpty ? "Add" : "Edit"}
            </button>
        </form>
    )
}

export default Form