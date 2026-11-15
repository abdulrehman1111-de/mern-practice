import express from "express"
import { MongoClient } from "mongodb"
import multer from "multer"
const upload = multer()

const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

const dbName = "company"
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
let db

client.connect().then(()=>{
    db = client.db(dbName)
})

app.get("/", async(req, res)=>{
    const collection = db.collection("employees")
    const data = await collection.find().toArray()
    console.log(data)
    res.render("data", {users: data})
})

app.get("/form", (req, res)=>{
    res.render("form")
})

app.post("/response", upload.single("image"), async(req, res)=>{
    console.log(req.body)
    res.send("Form data entered!")
    const collection = db.collection("employees")
    collection.insertOne({
        ...req.body,
        image: req.file ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}` : null
    })
})
app.listen(3000)