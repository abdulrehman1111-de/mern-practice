import express from "express"
import { MongoClient } from "mongodb"

const dbName = "company"
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const app = express()
app.set("view engine", "ejs")

app.get("/", async(req, res)=>{
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection("employees")
    const resultSet = await collection.find().toArray()

    res.render("users.ejs", {resultSet: resultSet})
})

app.listen(3000)











