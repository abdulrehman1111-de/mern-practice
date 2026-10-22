// Serving html and css files with ES6 Format
import express from "express"
import path from "path"

const app = express()

// Define the absolute path since ES6 only accepts absolute one
const absolutePath = path.resolve("Project/Project/files")

// Middleware to server files automatically 
app.use(express.static(absolutePath))

const renderFunction = (res, fileName)=>{
    res.sendFile(absolutePath + fileName)
}

// Routes defined manually
app.get("/", (req, res)=> renderFunction(res, "/index.html"))
app.get("/about", (req, res)=> renderFunction(res, "/about.html"))
app.get("/contact", (req, res)=> renderFunction(res, "/contact.html"))
app.get("/portfolio", (req, res)=> renderFunction(res, "/portfolio.html"))
app.get("/pricing", (req, res)=> renderFunction(res, "/pricing.html"))
app.get("/services", (req, res)=> renderFunction(res, "/services.html"))

// Builtin function for serving 404 pages
app.use((req, res)=>{
    res.status(404).sendFile(absolutePath + "/404.html")
})

app.listen(3000)

















