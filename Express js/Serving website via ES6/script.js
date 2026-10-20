// Serving html and css files with ES6 Format
import express from "express"
import path from "path"

const app = express()

// Define the absolute path since ES6 only accepts absolute one
const absolutePath = path.resolve("Project/Project/files")
console.log(absolutePath)

// Middleware to server files automatically 
app.use(express.static(absolutePath))

// Routes defined manually
app.get("/", (req, res)=>{
    res.sendFile(absolutePath + "/index.html")
})
app.get("/about", (req, res)=>{
    res.sendFile(absolutePath + "/about.html")
})
app.get("/contact", (req, res)=>{
    res.sendFile(absolutePath + "/contact.html")
})
app.get("/portfolio", (req, res)=>{
    res.sendFile(absolutePath + "/portfolio.html")
})
app.get("/pricing", (req, res)=>{
    res.sendFile(absolutePath + "/pricing.html")
})
app.get("/services", (req, res)=>{
    res.sendFile(absolutePath + "/services.html")
})

// Builtin function for serving 404 pages
app.use((req, res)=>{
    res.status(404).sendFile(absolutePath + "/404.html")
})


app.listen(3000)

















