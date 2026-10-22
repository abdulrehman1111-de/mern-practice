import express from "express"
import path from "path"

const app = express()

const absoulutePath = path.resolve("Project")

app.use((req, res, next)=>{
    const ip = req.ip
    console.log(ip)

    if(ip === "::ffff:192.168.1.75" || ip === "::1"){
        res.send("You cannot access this website")
    }
    else{
        next()
    }
})

app.get("", (req, res)=>{
    res.sendFile(absoulutePath + "/index.html")
})

app.listen(3000)























