import express from "express";
import { MongoClient } from "mongodb";

const app = express();

app.set("view engine", "ejs");
app.use(express.json());

const dbName = "school";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
client.connect().then(() => {
  app.get("/", async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection("students");
    const result = await collection.find().toArray();
    res.render("users", { users: result });
  });

  app.post("/student", (req, res) => {
    const data = req.body;
    const { name, age, program } = data;
    if (!name || !age || !program) {
      res.send({
        "Data sent status": false,
      });
    } else {
      const db = client.db(dbName);
      const collection = db.collection("students");
      collection.insertOne(data)
      res.send({
        "Data sent status": true
      })
    }
  });

  app.listen(3000);
});
