const http = require("http")
const fs = require("fs")

// Taking the dynamic port via the command line input
const arg = process.argv
const PORT = arg[2]

// Serving html file by using the fs module
const server = http.createServer((req, res)=>{
    if(req.url === "/"){
        fs.readFile("html/index.html", "utf-8", (err, data)=>{
            if(err){
                res.statusCode = 404
                res.setHeader("Content-Type", "text/plain")
                res.write("No page found")
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
        res.setHeader("Content-Type", "text/plain")
        res.write("No page found")
        res.end()
    }
})

// Using the dynamic port here 
server.listen(PORT, ()=>{
    console.log("Server listening at port", PORT)
})













