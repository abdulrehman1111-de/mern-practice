import express from "express";
import mongoose from "mongoose";
import studentModel from "./model/studentModel.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

await mongoose.connect("mongodb://localhost:27017/school").then(() => {
  console.log("Database connected!");
});

const statusPage = (message, success) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${message}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f4f6;
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    }
    .box {
      width: 100%;
      max-width: 380px;
      margin: 16px;
      padding: 28px;
      text-align: center;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-top: 4px solid ${success ? "#16a34a" : "#dc2626"};
      border-radius: 10px;
    }
    h1 {
      margin: 0 0 18px;
      font-size: 20px;
      font-weight: 600;
      color: ${success ? "#16a34a" : "#dc2626"};
    }
    a {
      display: inline-block;
      padding: 9px 16px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      background: #2563eb;
      border-radius: 6px;
      text-decoration: none;
    }
    a:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="box">
    <h1>${message}</h1>
    <a href="/">Back to students</a>
  </div>
</body>
</html>`;

app.get("/api", async (req, res) => {
  const result = await studentModel.find();
  if (result) {
    res.send({
      message: "Student data fetched!",
      success: true,
      result: result,
    });
  } else {
    res.send({
      message: "Student data not fetched!",
      success: false,
      result: null,
    });
  }
});

app.get("/", async (req, res) => {
  const result = await studentModel.find();
  res.render("users", { users: result });
});

app.post("/submit/api", async (req, res) => {
  const { name, age, email } = req.body || {};
  if (!req.body || !name || !age || !email) {
    res.send({
      message: "Student data not submitted!",
      success: false,
      result: result,
    });
    return;
  } else {
    const result = await studentModel.create(req.body);
    res.send({
      message: "Student data submitted!",
      success: true,
      result: result,
    });
  }
});

app.get("/form", (req, res) => {
  res.render("userForm");
});

app.post("/form/submit", async (req, res) => {
  const { name, age, email } = req.body || {};
  if (!req.body || !name || !age || !email) {
    res.send(statusPage("Student data not submitted", false));
    return;
  } else {
    const result = await studentModel.create(req.body);
    if (result) {
      res.send(statusPage("Student data submitted", true));
    }
  }
});

app.delete("/delete/api/:id", async (req, res) => {
  const id = req.params.id;

  const result = await studentModel.findByIdAndDelete(id);
  if (result) {
    res.send({
      message: "Student data deleted!",
      success: true,
      result: result,
    });
  } else {
    res.send({
      message: "Student data not deleted!",
      success: false,
      result: null,
    });
  }
});

app.get("/ui/delete/:id", async (req, res) => {
  const id = req.params.id;

  const result = await studentModel.findByIdAndDelete(id);
  if (result) {
    res.send(statusPage("Student data deleted successfully!", true));
  } else {
    res.send(statusPage("Student data not deleted!", false));
  }
});

app.put("/update/api/:id", async (req, res) => {
  const id = req.params.id;
  const studentData = req.body;
  const { name, age, email } = req.body || {};
  if (!studentData || !name || !age || !email) {
    res.send({
      message: "Student data not updated!",
      success: false,
      result: null,
    });
    return
  }

  const result = await studentModel.findByIdAndUpdate(id, {...studentData});
  if(result){
    res.send({
      message: "Student data updated successfully!",
      success: true,
      result: studentData,
    });
  }
});

app.get("/ui/update/:id", async(req, res)=>{
    const id = req.params.id

    const studentData = await studentModel.findOne({_id: id})
    console.log(studentData)
    res.render("updateForm", {user: studentData})

})

app.post("/ui/update/submit", async(req, res)=>{
    const studentData = req.body
    const {id, name, age, email} = req.body || {}
    if(!studentData || !name || !age || !email ||!id){
        res.send(statusPage("Student data not updated!", false));
        return
    }
    else{
        const result = await studentModel.findByIdAndUpdate(id, {...studentData})
        if(result){
            res.send(statusPage("Student data updated successfully!", true));
        }
        else{
            res.send(statusPage("Student data not updated!", false));
        }
    }
})

app.listen(3000);