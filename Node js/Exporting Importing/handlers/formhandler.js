const fs = require("fs")

function formHandler(req, res){
    fs.readFile("html/form.html", "utf-8", (error, data)=>{
        if(error){
            res.statusCode = 500
            res.setHeader("Content-Type", "text/plain")
            res.write("Internal Server error")
            res.end()
        }

        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        res.write(data)
        res.end()
    })
}

module.exports = formHandler








