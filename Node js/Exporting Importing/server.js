const http = require("http")
const { formHandler } = require("./handlers/formhandler")
const { formSubmit } = require("./handlers/formsubmit")

const server = http.createServer((req, res)=>{
    
    if(req.url === "/"){
        formHandler(req, res)
    }

    else if(req.url === "/submit"){
        formSubmit(req, res)
    }

    else{
        res.statusCode = 404
        res.setHeader("Content-Type", "text/html")
        res.write("Page not found")
        res.end()
    }
})

const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`Server listening at PORT`, PORT)
})













