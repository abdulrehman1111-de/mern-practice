import express from "express"

const app = express()

app.use(express.urlencoded({extended: false}))

const checkUrl = (req, res, next) => {
    console.log(req.url)
    next()
}

app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>")
})

app.get("/about", checkUrl, (req, res) => {
    res.send(`
        <form action="/submit" method="post">
        <input type="email" name="email" id="" placeholder="Enter email">
        <input type="text" name="password" id="" placeholder="Enter password">
        <button type="submit">Submit</button>
    </form>
        `)
})

app.post("/submit", (req, res) => {
    res.send("<h1>Form submitted</h1>")
    console.log(req.body)
})

app.get("/contact", (req, res) => {
    res.send("<h1>Contact page</h1>")
})

app.listen(3000)











