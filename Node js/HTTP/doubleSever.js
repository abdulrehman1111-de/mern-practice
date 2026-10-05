const http = require("http")

const http2 = require("http")

const server1 = http.createServer((req, res)=>{
    res.write("Server response 1")
    res.end()
})

const PORT1 = 3000
server1.listen(PORT1, ()=>{
    console.log("Server listening at port:", PORT1)
})

const server2 = http2.createServer((req, res)=>{
    res.write("Server response 2")
    res.end()
})

const PORT2 = 3001
server2.listen(PORT2, ()=>{
    console.log("Server listening at port:", PORT2)
})













