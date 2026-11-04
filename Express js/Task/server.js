import express from "express"
import { controlUser } from "./controller/controller.js"
import { controlIndiviualUser } from "./controller/controller.js"
import path from "path"

const app = express()

app.set("view engine", "ejs")

app.use(express.static(path.resolve("public")))

app.get("/users", (req, res)=>{
    controlUser(req, res)
})

app.get("/users/:id", (req, res)=>{
    controlIndiviualUser(req, res)
})

app.use((req, res)=>{
    res.status(404).sendFile(path.resolve("public/index.html"))
})

app.listen(3000)














