const http = require("http")
const formHandler = require("./handlers/formhandler.js")
const formSubmit = require("./handlers/formsubmit.js")
const querystring = require("querystring")

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        formHandler(req, res)
    }

    else if (req.url === "/submit") {
        let chunks = []
        req.on("data", (chunk) => {
            chunks.push(chunk)
        })
        req.on("end", () => {
            const stringData = Buffer.concat(chunks).toString()
            const readableData = querystring.parse(stringData)
            formSubmit(req, res, readableData)
        })
    }

    else {
        res.statusCode = 404
        res.setHeader("Content-Type", "text/plain")
        res.write("Page not found")
        res.end()
    }
})

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server listening at PORT`, PORT)
})





