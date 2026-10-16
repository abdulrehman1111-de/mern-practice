const http = require("http")
const fs = require("fs")

const server = http.createServer((req, res) => {

    // Full file paths of the reusable components in every page
    let header = fs.readFileSync("Project/Project/files/header.html", "utf-8")
    let nav = fs.readFileSync("Project/Project/files/nav.html", "utf-8")
    let footer = fs.readFileSync("Project/Project/files/footer.html", "utf-8")

    // Initial file path will be the default homepage
    let file = "/index"

    // if file is other than the homepage
    if (req.url !== "/") {
        file = req.url
    }
    if (file !== "/style.css") {
        fs.readFile("Project/Project/files" + file + ".html", "utf-8", (err, data) => {
            if (err) {
                res.statusCode = 500
                res.setHeader("content-type", "text/plain")
                res.write("Internal server error")
                res.end()
                return
            }
            res.statusCode = 200
            res.setHeader("content-type", "text/html")
            res.write(header + nav + data + footer)
            res.end()
        })
    }
    else {
        fs.readFile("Project/Project/files/style.css", "utf-8", (err, data) => {
            if (err) {
                res.statusCode = 500
                res.setHeader("content-type", "text/plain")
                res.write("Internal server error")
                res.end()
                return
            }

            res.statusCode = 200
            res.setHeader("content-type", "text/css")
            res.write(data)
            res.end()
        })
    }
})

const PORT = 3000
server.listen(PORT, () => {
    console.log("Server listneing at port:", PORT)
})


















