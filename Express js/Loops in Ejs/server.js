import express from "express"

const app = express()

app.set("view engine", "ejs")

app.get("/users", (req, res)=>{
    const users = ["roman", "reigns", "Braun", "Stroman"]
    res.render("users", {users: users, isLogin: true})
})

app.listen(3000)