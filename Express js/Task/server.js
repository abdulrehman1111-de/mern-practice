import express from "express"
import { showUsers } from "./controller/controller.js"
import { showIndiviualUsers } from "./controller/controller.js"

const app = express()

app.set("view engine", 'ejs')

app.get("/users", (req, res)=>{
    showUsers(req, res)
})

app.get("/users/:id", (req, res)=>{
    showIndiviualUsers(req, res)
})

app.listen(3000)











