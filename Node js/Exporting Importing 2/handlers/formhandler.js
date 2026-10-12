const fs = require("fs")

function formHandler(req, res){
    fs.readFile("html/form.html", "utf-8", (err, data)=>{
        if(err){
            res.statuscode = 500
            res.setHeader("Content-Type", "text/plain")
            res.write("Internal Server Error")
            res.end()
            return
        }

        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        res.write(data)
        res.end()
    })
}

module.exports = formHandler










