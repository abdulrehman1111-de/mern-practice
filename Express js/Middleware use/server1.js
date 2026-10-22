import express from "express"

const app = express()

const checkRoute = (req, res, next)=>{
    console.log("User is accessing " + req.url + " page");
    next()
}

// const checkAge = (req, res, next)=>{
//     if(!req.query.age || req.query.age < 18){
//         res.send("You cannot access this page")
//     }
//     else{
//         next()
//     }
// }

const ipCheck = (req, res, next)=>{
    const ip = req.socket.remoteAddress
    console.log(ip)

    if(ip.includes("::ffff:192.168.1.2")){
        res.send("You cannot access this page!")
    }
    else{
        next()
    }
}

app.use(checkRoute)
// app.use(checkAge)
app.use(ipCheck)

app.get("/", (req, res)=>{
    res.send("Homepage")
})

app.get("/users", (req, res)=>{
    res.send("users page")
})

app.get("/products", (req, res)=>{
    res.send("products page")
})

app.listen(3000)









