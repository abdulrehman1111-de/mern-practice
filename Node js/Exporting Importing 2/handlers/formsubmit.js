const { realUsername, realPassword } = require("../data/userdata.js")

function formSubmit(req, res, readableData) {

    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")

    if (readableData.username === realUsername && parseInt(readableData.password) === realPassword) {
        res.setHeader("Content-Type", "text/html")
        res.write("<h1>Login successful!</h1>")
        res.end()
    }
    else {
        res.setHeader("Content-Type", "text/html")
        res.write("<h1>Login Failed!</h1>")
        res.end()
    }

    res.end()
}

module.exports = formSubmit









