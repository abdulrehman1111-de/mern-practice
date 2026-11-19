import mongoose from "mongoose";
import express from "express"
import studentModel from "./model/studentModel.js";

const app = express()
app.set("view engine", "ejs")

await mongoose.connect("mongodb://localhost:27017/school").then(()=>{
    console.log("Database connected!")
})

app.get("/", async(req, res)=>{

    const result = await studentModel.find()
    console.log(result)
    res.render("users", {users: result})
})

app.listen(3000)