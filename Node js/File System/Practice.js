const fs = require('fs/promises')

// Creating a new file syncronously
// fs.writeFileSync("./text.txt", "Hey there")

// Creating new file asynchronously
// fs.writeFile("./test.txt", "Hello world", (err)=> {})

// Reading file synchronously
// const result = fs.readFileSync("./contacts.txt", "utf-8")    
// console.log(result)

// Reading file asynchronously
// Asynchronous one doesnt return anything
// fs.readFile("./contacts.txt", "utf-8", (err, result)=>{
//     if(err){
//         console.log("Error " + err)
//     }
//     else{
//         console.log(result)
//     }
// })

// Appending a file synchronously
// fs.appendFileSync("./test.txt", "\nHey There!")

// Copying a file
// fs.cpSync("./test.txt", "./copy.txt")

// Deleting a file
// fs.unlinkSync("./copy.txt")

// Checking status of a file
// console.log(fs.statSync("./test.txt"))

// Creating directories
// fs.mkdirSync("my-docs/a/b", { recursive : true })

// Renaming a file:
// async function renameFile(){
//     await fs.rename("./contacts.txt", "./renamed.txt")
//     console.log("Renamed!")
// }
// renameFile()

// Reading a dir
// async function readDir(){
//     const result = await fs.readdir("./my-docs")
//     console.log(result)
// }
// readDir()















