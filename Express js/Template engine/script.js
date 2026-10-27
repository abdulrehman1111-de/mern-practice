import express from "express"

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.get("/", (req, res)=>{
    res.render("home", {name: "Abdul Rehman", className: "BSCS", age: 20})
})

app.get("/add-user", (req, res)=>{
    res.render("addUser")
})

app.post("/submit-user", (req, res)=>{
    res.render("submitUser", req.body)
    console.log(req.body)
})


app.listen(3000)












