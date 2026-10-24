import express from "express"
import morgan from "morgan"

const app = express()

// Use of external middleware
app.use(morgan("dev"))

// Checking whether morgan('dev') measures correct time
app.get("/wait", (req, res)=>{
    setTimeout(() => {
        res.send("Result after one minute")
    }, 1000);
})

app.get("/", (req, res, next)=>{
    res.send("Home page")
})

// Creating some custom error on a route
app.get("/error", (req, res, next)=>{

    const someError = new Error("some error")
    next(someError)
})

// Function to handle the erros 
const errorFunction = (err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send("Try again later")
}

app.use(errorFunction)

app.listen(3000)













