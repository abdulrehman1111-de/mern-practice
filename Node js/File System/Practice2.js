const fs = require('fs/promises')

// Creating file
async function writeFile() {
    await fs.writeFile("./notes.txt", "Hello world")
    console.log("File written")
}
writeFile()


// Reading file
// async function readFiles() {
//     try {
//         const result = await fs.readFile("./notes.txt", "utf-8")
//         console.log(result)
//     }
//     catch(err){
//         console.log(err)
//     }
// }
// readFiles()

// Appending file
// async function appendingFiles(){

//     await fs.appendFile("./notes.txt", "\nThis is the appended line")
//     console.log("Result done!")
// }
// appendingFiles()

// Deleting file
// async function deleteFile(){

//     await fs.unlink("./test.txt")
//     console.log("File deleted")
// }
// deleteFile()

// Creating Dir
// async function createDir(){
//     await fs.mkdir("my-app/c/d", {recursive: true})
//     console.log("Directory created!")
// }
// createDir()

// Checking status
// async function checkStatus(){
//     const stat = await fs.stat("./notes.txt")
//     console.log(stat)
// }
// checkStatus()

// Reading dir
// async function readDirs(){
//     const result = await fs.readdir("./my-app")
//     console.log(result)
// }
// readDirs()

// Renaming file
// async function renameFile(){
//     await fs.rename("./notes.txt", "./renamed.txt")
//     console.log("Renamed")
// }
// renameFile()














