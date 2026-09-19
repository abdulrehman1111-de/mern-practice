// Importing the http module
const http = require('http')

// Importing the events module
const EventEmitter = require('events')

const event = new EventEmitter()

event.on("success", (username)=>{
    console.log(`Login success for ${username}`)
})

event.on("fail", (username)=>{
    console.log(`Login failed ${username}`)
})

const hardCodedUsername = "abdul"
const hardCodedPassword = "1234"

// Creating a web server
const server = http.createServer((req, res)=>{
    if(req.url === "/"){
        res.setHeader("Content-Type", "text/html")
        res.write(`<h1>Welcome user go to Login...</h1> <br>
            <a href="/login">Go to login</a>
            `)
        res.end()    
    }
    if(req.url === "/login"){
        res.setHeader("Content-Type", "text/html")
        res.write(`
            <h1>Login Form</h1>
            <form method = "GET" action = "/validate">

            <label for="username">Username: 
            <input name="username" type="text" id="username">
            </label>

            <label for="password">Password: 
            <input name="password" type="password" id="password">
            </label>

            <button type="submit" >Submit form</button>
            </form>
            `)
        res.end()    
    }
    if(req.url.startsWith("/validate")){
        let initialStrip = req.url.split("?")[1]
        let firstStrip = initialStrip.split("&")[0]
        let username = firstStrip.split("=")[1]

        let secondStrip = initialStrip.split("&")[1]
        let password = secondStrip.split("=")[1]

        if(username === hardCodedUsername && password === hardCodedPassword){
            event.emit("success", username)
            res.write("<h1>Login Success!</h1>")
            res.end()
        }
        else{
            event.emit("fail", username)
            res.write("<h1>Login Failed!</h1>")
            res.end()
        }
    }
    if(req.url === "/source"){
        res.write("Source page")
        res.end()
    }
})


const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`Server listening at port ${PORT}`)
})

















