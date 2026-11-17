import express from "express";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}))
app.use(express.json())

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

  app.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const db = client.db(dbName);
    const collection = db.collection("students");
    const result = await collection.deleteOne({_id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.send({
        message: "Student record deleted successfully!",
        success: true,
      });
    } else {
      res.send({
        message: "Student record not deleted!",
        success: false,
      });
    }
  });

  app.get("/:id", async(req, res) => {
    const id = req.params.id;
    const db = client.db(dbName);
    const collection = db.collection("students");
    const result = await collection.deleteOne({_id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.send("<h1>Student record deleted successfully</h1>")
    } else {
      res.send("<h1>Student record deletion error</h1>")
    }
  });

  app.get("/ui/update/:id", async(req, res) => {
    const id = req.params.id;
    const db = client.db(dbName);
    const collection = db.collection("students");
    const result = await collection.findOne({_id: new ObjectId(id) });
    res.render("user", {user: result})
  });

  app.get("/update/:id", async(req, res) => {
    const id = req.params.id;
    const db = client.db(dbName);
    const collection = db.collection("students");
    const result = await collection.findOne({_id: new ObjectId(id) });
    if (result) {
      res.send({
        "Operation": "Data fetched",
        "Success": true,
        "result": result
      })
    } else {
      res.send({
        "Operation": "Data not fetched",
        "Success": false,
        "result": null
      })
    }
  });

  app.post("/ui/update/:id", async(req, res) => {
    const id = req.params.id;
    const data = req.body
    const db = client.db(dbName);
    const collection = db.collection("students");
    const result = await collection.updateOne({_id: new ObjectId(id) }, {$set: data});
    if (result) {
      res.send("<h1>Data updated</h1>")
    } else {
        res.send("<h1>Data updated</h1>")
    }
  });

  app.put("/update/:id", async(req, res) => {
    const id = req.params.id;
    const data = req.body
    const db = client.db(dbName);
    const collection = db.collection("students");
    const result = await collection.updateOne({_id: new ObjectId(id) }, {$set: data});
    if (result.modifiedCount > 0) {
      res.send({
        "Operation": "Data updation done successfully",
        "Success": true
      })
    } else {
        res.send({
        "Operation": "Data updation failed",
        "Success": false
      })
    }
  });

  app.listen(3000);
});
