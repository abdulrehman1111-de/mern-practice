import axios from "axios";

// Axios instance: Base url set once
const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

// Get request for all posts
export const getPost = ()=>{
    return api.get("/posts")
}

// Delete request to the server; id is used to pick the post for deletion
export const deletePost = (id)=>{
    return api.delete(`/posts/${id}`)
}

// Post request; second argument is the data to send
export const postData = (post)=>{
    return api.post("/posts", post)
}

// Put request; id picks the post, and the second argument is the actual post to be updated
export const updateData = (id, post)=>{
    return api.put(`/posts/${id}`, post)
}








