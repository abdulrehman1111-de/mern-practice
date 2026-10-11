const http = require("http")
const fs = require("fs")
const queryString = require("querystring")

const realUsername = "abdul"
const realPassword = 123

const server = http.createServer((req, res) => {

    // Reading html file
    fs.readFile("html/form.html", "utf-8", (error, data) => {
        if (error) {
            res.statusCode = 500
            res.setHeader("Content-Type", "text/plain")
            res.write("Internal server error")
            res.end()
            return
        }

        // Form filling
        if (req.url === "/") {
            res.statusCode = 200
            res.setHeader("Content-Type", "text/html")
            res.write(data)
            res.end()
        }

        // Form submission
        else if (req.url === "/submit") {
            res.statusCode = 200
            res.setHeader("Content-Type", "text/html")

            // While filling form, data comes in chunks so we need to store them in array chunk by chunk 
            let chunks = []
            req.on("data", (chunk)=>{
                chunks.push(chunk)
            })
            // On ending take those chunks, concat them and the convert to readable format using querystring
            req.on("end", () => {
                let stringData = Buffer.concat(chunks).toString()
                let readableData = queryString.parse(stringData)

                // Validation
                if (readableData.username === realUsername && parseInt(readableData.password) === realPassword) {
                    res.setHeader("Content-Type", "text/html")
                    res.write("<h1>Login successful!</h1>")
                    res.end()
                }
                else {
                    res.setHeader("Content-Type", "text/html")
                    res.write("<h1>Login Failed!</h1>")
                    res.end()
                }

                res.end()
            })

        }

        else {
            res.statusCode = 404
            res.setHeader("Content-Type", "text/plain")
            res.write("Page not found")
            res.end()
        }
    })
})

const PORT = 3000
server.listen(PORT, () => {
    console.log("Server listening at PORT", PORT)
})












