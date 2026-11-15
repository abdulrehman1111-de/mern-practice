import express from "express";
import { MongoClient } from "mongodb";
import multer from "multer";
const upload = multer({ dest: "public/uploads" });

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const dbName = "company";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
let db;

client.connect().then((connection) => {
  db = connection.db(dbName);

  app.get("/api", async (req, res) => {
    const collection = db.collection("employees");
    const data = await collection.find().toArray();
    console.log(data);
    res.send(data);
  });

  app.get("/", async (req, res) => {
    const collection = db.collection("employees");
    const data = await collection.find().toArray();
    console.log(data);
    res.render("data", { users: data });
  });
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/response", upload.any(), async (req, res) => {
  console.log(req.body);
  res.send("Form data entered!");

  const image = req.files.find((f) => f.fieldname === "image");
  const file = req.files.find((f) => f.fieldname === "file");

  const collection = db.collection("employees");
  collection.insertOne({
    ...req.body,
    image: image ? `/uploads/${image.filename}` : null,
    file: file ? `/uploads/${file.filename}` : null,
  });
});
app.listen(3000);
