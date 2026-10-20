const express = require("express")
// Requiring the fs (the promises one!)
const fs = require("fs/promises")
const path = require("path")

const app = express()

// Getting the absolute path of the project folder
const projectDir = path.join(__dirname, "Project/Project/files")

// Creating the middleware that looks into the folder and serves any page (not focused on index.html, defualt behaviour turned off)
app.use(express.static(projectDir, { index: false }))

const renderPage = async (res, dynamicComp) => {
    try {
        const [header, nav, body, footer] = await Promise.all([
            fs.readFile(path.join(projectDir, "header.html"), "utf-8"),
            fs.readFile(path.join(projectDir, "nav.html"), "utf-8"),
            fs.readFile(path.join(projectDir, dynamicComp), 'utf-8'),
            fs.readFile(path.join(projectDir, "footer.html"), "utf-8")
        ])
        res.send(header + nav + body + footer)
    }
    catch(error){
        console.log(error)
    }
}

app.get("/", (req, res)=> renderPage(res, "index.html"))
app.get("/about", (req, res)=> renderPage(res, "about.html"))
app.get("/contact", (req, res)=> renderPage(res, "contact.html"))
app.get("/portfolio", (req, res)=> renderPage(res, "portfolio.html"))
app.get("/pricing", (req, res)=> renderPage(res, "pricing.html"))
app.get("/services", (req, res)=> renderPage(res, "services.html"))

const PORT = 3000
app.listen(PORT, ()=>{
    console.log("Server listening at port", PORT)
})






















