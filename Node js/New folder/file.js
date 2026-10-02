// const fs = require("fs")
// fs.writeFileSync("file.txt", "Hello world")

// fs.writeFileSync("script.js", "")
// fs.writeFileSync("hello.js", "")
// fs.writeFileSync("sample.js", "")
// fs.writeFileSync("demo.js", "")

const http = require("http")
const server = http.createServer((req, res)=>{
    res.end("Server response")
})

server.listen(4800, ()=>{
    console.log("Server listening at port 4800")
})




