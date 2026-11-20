import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

app.get("/", (req, res)=>{
    const data = {
        "name": "Demo", 
        "age": 50,
        "role": "Developer"
    }
    res.send(data)
})

app.listen(3000)