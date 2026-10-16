const express = require("express")

const app = express()

app.get("/", (req, res)=>{
    res.send("<h1>Welcome to the homepage</h1>")
})

app.get("/submit", (req, res)=>{
    res.send("<h1>This is the submit page</h1>")
})

app.get("/products", (req, res)=>{
    res.send("<h1>This is the products page</h1>")
})


app.listen(3000)









