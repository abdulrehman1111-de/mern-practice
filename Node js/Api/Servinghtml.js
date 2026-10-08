const http = require("http")
const fs = require("fs")
const path = require("path")

const server = http.createServer((req, res) => {

    const filepath = path.join(__dirname, "index.html")

    if (req.url === "/") {
        fs.readFile(filepath, "utf-8", (err, data) => {
            if (err) {
                res.statusCode = 404
                res.setHeader("Content-Type", "text/plain")
                res.write("No html found")
                res.end()
                return
            }

            res.statusCode = 200
            res.setHeader("Content-Type", "text/html")
            res.write(data)
            res.end()
        })
    }
    else{
        res.statusCode = 404
        res.write("Page not found")
        res.end()
    }

})

const PORT = 8000
server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})

















