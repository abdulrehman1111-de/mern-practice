const express = require("express")

const app = express()

app.get("/", (req, res)=>{
    res.send("<h1>Hello world!</h1")
})

app.get("/about", (req, res)=>{
    res.send("<h1>Hello about page!</h1")
})

app.get("/contact", (req, res)=>{
    res.send("<h1>Hello contact page!</h1")
})

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server listening at port: ${PORT}`)
})










