import express from "express"
import { MongoClient } from "mongodb"

const dbName = "school"
const url = "mongodb+srv://abdulrehmanpro6_db_user:shahidXpro123@cluster0.edjrnus.mongodb.net/"

const client = new MongoClient(url)
const app = express()

client.connect().then(()=>{
    console.log("Database connected")
})

async function dbConnetion(){
    const db = client.db(dbName)
    const collection = db.collection("students")
    const result = await collection.find().toArray()
    console.log(result)
}

dbConnetion()

app.listen(3000)




