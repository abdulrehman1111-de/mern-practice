// fs 
// os 
// path
// event


const Eventemmiter = require("events")
const http = require("http")


const event = new Eventemmiter()


// event.on("message", () => {

//     console.log("login successfylu");

// })

// event.emit("message")

event.on("message", (name) => {


    console.log(`${name} food oder `);

})

event.emit("message","piza")

// http

// client : req

// let server = http.createServer((req ,res)=>{

//     // res.write("wertyui")
//     // res.end()
//     // res.statusCode(200)
//     // res.end("success")


//     if (req.url==="/") {
//         res.end("home page")
        
//     }else if (req.url==="/about") {
//         res.end("anout page")
        
//     }else{
//         res.end("404 not found")
//     }

// })
// server.listen(5000 ,()=>{
//     console.log("server running on port 5000");
    
// })


let server = http.createServer((req ,res)=>{

    // res.write("wertyui")
    // res.end()
    // res.statusCode(200)
    // res.end("success")


  res.setHeader("Content-Type","application/json ")


  const data={
    name:"jhon doe",
    age:22
  }

  res.end(JSON.stringify(data))


})
server.listen(5000 ,()=>{
    console.log("server running on port 5000");
    
})