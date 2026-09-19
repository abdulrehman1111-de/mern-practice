const path = require('path')

// Getting directory
console.log(__dirname)

// Get address upto current file
console.log(__filename)

// Creating folder and file with apporpriate separator
const filepath = path.join("folder", "school", "data.txt")
console.log(filepath)

const parseData = path.parse(filepath)
console.log(parseData)

// Gives absolute path
const resolvePath = path.resolve(filepath)
console.log(resolvePath)

// Gives the base name of the file 
const baseName = path.basename(filepath)
console.log(baseName)

// Gives the directory name
const dirName = path.dirname(filepath)
console.log(dirName)

// Gives the file seperator in your operating system
console.log(path.sep)

// Checking extension name
console.log(path.extname(filepath))










