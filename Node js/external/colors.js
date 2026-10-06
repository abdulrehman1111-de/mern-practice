const colors = require("colors")

console.log(colors.red("this is log"))
console.log(colors.yellow("this is log"))
console.log(colors.blue("this is log"))
console.log(colors.green("this is log....,,,"))

const http = require("http")
const server = http.createServer((req, res)=>{
    res.setHeader("Content-Type", "text/html")
    res.write("<h2>Hello world hellooogtt</h2>")
    res.end()
})
server.listen(1000, ()=>{
    console.log("server listening at port", 1000)
})

















