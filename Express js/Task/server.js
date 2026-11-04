import express from "express"
import { controlUser } from "./controller/controller.js"
import { controlIndiviualUser } from "./controller/controller.js"

const app = express()

app.set("view engine", "ejs")

app.get("/users", (req, res)=>{
    controlUser(req, res)
})

app.get("/users/:id", (req, res)=>{
    controlIndiviualUser(req, res)
})

app.listen(3000)














