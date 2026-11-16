import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.set("view engine", "ejs");
app.use(express.json());

const dbName = "school";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

let db;
client.connect().then(() => {
  db = client.db(dbName);

  app.get("/", async (req, res) => {
    const collection = db.collection("students");
    const result = await collection.find().toArray();
    res.render("users", { users: result });
  });

  app.post("/students-api", async(req, res) => {
    const collection = db.collection("students");
    const data = req.body

    const {name, age, program} = data
    if(!name || !age || !program){
        res.send({
            "Data sent status": false
        })
        return false
    }
    
    else{
        await collection.insertOne(data)
        res.send({
            "Data sent status": true
        })
    }
  });

  app.listen(3000);
});
