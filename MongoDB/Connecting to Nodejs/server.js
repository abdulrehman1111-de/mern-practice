import express from "express"
import { MongoClient } from "mongodb"

const dbName = "school"
const url = "mongodb://localhost:27017"

const client = new MongoClient(url)
let result;
let collection;
async function createConnection(){
    await client.connect()
    const db = client.db(dbName)
    collection = db.collection("students")

    result = await collection.find().toArray()
    console.log(result)
}

createConnection()
const app = express()

app.set("view engine", "ejs")

app.get("/users", (req, res)=>{
    res.render("users", {users: result})
})

app.get("/users/:name", async (req, res)=>{
    console.log(req.params.name)
    const userName = req.params.name

    const user = await collection.findOne({name: userName})
    res.render("user", {user: user})
})

app.listen(3000)









