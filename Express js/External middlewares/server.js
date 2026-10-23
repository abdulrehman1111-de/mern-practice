import express from "express"
import morgan from "morgan"

const app = express()

app.use(morgan("dev"))


app.get("/", (req, res, next)=>{
    // res.send("Home page")

    const artificialError = new Error("Some error")
    next(artificialError)
})

app.get("/error", (req, res, next)=>{

    const someError = new Error("some error")
    next(someError)
})

const errorFunction = (err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send("Try again later")
}

app.use(errorFunction)

app.listen(3000)













