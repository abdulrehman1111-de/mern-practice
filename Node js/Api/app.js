const http = require("http")

const staticApiData = [
    {id: 1, name: "Abdul Rehman", Role: "Developer"},
    {id: 2, name: "Sara Khan", Role: "Manager"},
    {id: 3, name: "Ali Ahmad", Role: "Tester"},
]

const server = http.createServer((req, res)=>{

    if(req.url === "/"){
        res.write("Welcome to the home page")
        res.end()
    }

    else if(req.url === "/api/users"){
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(staticApiData))
        res.end()
    }

    else{
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify({error: "Api data not found"}))
        res.end()
    }

})

const PORT = 8000
server.listen(PORT, ()=>{
    console.log(`Server listening at port ${PORT}`)
})

























