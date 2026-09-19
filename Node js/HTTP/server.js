// Importing the http module
const http = require('http')

// Creating a server ==> Equivalent to Event emitter
const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        res.setHeader("Content-Type", "text/html")
        res.write("<h1>Welcome to the Home page</h1>")
        res.end()
    }
    if(req.url === '/source'){
        res.write("Welcome to the source page")
        res.end()
    }
    if(req.url === '/contact'){
        res.setHeader("Content-Type", "text/plain")
        res.write("Welcome to the source page")
        res.end()
    }
})

const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}`)
})










