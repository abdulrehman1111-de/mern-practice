const querystring = require("querystring")
const {realUsername, realPassword} = require("../data/userdata.js")

function formSubmit(req, res){

    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")

    let chunks = []
    req.on("data", (chunk)=>{
        chunks.push(chunk)
    })
    req.on("end", ()=>{
        let stringData = Buffer.concat(chunks).toString()
        let readableData = querystring.parse(stringData)

        if(readableData.username === realUsername && parseInt(readableData.password) === realPassword){
            res.write("<h1>Login Successfull</h1>")
            res.write(`<h1>Your username is: ${readableData.username} and your password is ${readableData.password}</h1>`)
            res.end()
        }

        else{
            res.write("<h1>Login Failed</h1>")
            res.end()
        }
    })
}

module.exports = formSubmit











