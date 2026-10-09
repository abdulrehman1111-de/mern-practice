const http = require("http")

const arg = process.argv
const PORT = arg[2]

const server = http.createServer((req, res)=>{
    if(req.url === "/"){
        res.write("Sever running")
        res.end()
    }
})

server.listen(PORT, ()=>{
    console.log("Server listening at port", PORT)
})














