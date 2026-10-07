const http = require("http")

const usersApiData = [
    {id: 1, name: "Abdul Rehman", Role: "Developer"},
    {id: 2, name: "Ayesha Khan", Role: "Tester"},
    {id: 3, name: "Abdul Rehman", Role: "Developer"},
]

const productsApiData = [
    {id: 101, title: "Laptop", price: 1200, category: "Electronics"},
    {id: 102, title: "Wirless Mouse", price: 25, category: "Accessories"},
    {id: 103, title: "Mechanical Keyboard", price: 75, category: "Accessories"},
    {id: 104, title: "Monitor", price: 300, category: "Electronics"}
]

const coursesApiData = [
    {id: 201, course: "Node.js Backend", duration: "4 weeks", level: "Intermediate"},
    {id: 202, course: "React Frontend", duration: "6 weeks", level: "Beginner"},
    {id: 203, course: "Database Systems", duration: "8 weeks", level: "Advanced"},
    {id: 204, course: "Python Programming", duration: "5 weeks", level: "Beginner"}
]

const ordersApiData = [
    {id: 301, item: "Laptop", quantity: 10, status: "Delivered"},
    {id: 302, item: "Mouse", quantity: 2, status: "Pending"},
    {id: 303, item: "Keyboard", quantity: 1, status: "Shipped"},
    {id: 304, item: "Monitor", quantity: 1, status: "Processing"}
]

const server = http.createServer((req, res)=>{
    if(req.url == "/"){
        res.write("Welcome to the home page!")
        res.end()
    }

    else if(req.url === "/api/users"){
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(usersApiData))
        res.end()
    }

    else if(req.url === "/api/products"){
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(productsApiData))
        res.end()
    }

    else if(req.url === "/api/orders"){
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(ordersApiData))
        res.end()
    }

    else if(req.url === "/api/courses"){
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(coursesApiData))
        res.end()
    }

    else{
        res.statusCode = 404
        res.write(JSON.stringify({error: "Cannot fetch data"}))
        res.end()
    }
})

const PORT = 9000
server.listen(PORT, ()=>{
    console.log(`Server listening at port ${PORT}`)
})















