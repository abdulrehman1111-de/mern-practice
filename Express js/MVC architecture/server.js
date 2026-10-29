import express from "express"
import { handleUser } from "./controller/handleUser.js"

const app = express()

app.set("view engine", "ejs")

app.get("/", handleUser)

app.listen(3000)










