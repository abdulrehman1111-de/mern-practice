// Importing the os module
const os = require("os")

// Get the os platform and user info
console.log("OS platform: " , os.platform())
console.log("User info: " , os.userInfo())

// Get the os architecture
console.log("CPU Architecture: " , os.arch())

// Get free system memory
console.log("Free memory: " , os.freemem(), "bytes")

// Get total system memory
console.log("Total free system memory: " , os.totalmem(), "bytes")

// Get system uptime
console.log("System uptime: " , os.uptime(), "seconds")

// Get home directory
console.log("Home directory: " , os.homedir())

// Get host name
console.log("Host name: " , os.hostname())

// Get Network Interfaces
console.log("Network Interfaces: " , os.networkInterfaces())

// Get CPU Information
console.log("CPU Information: " , os.cpus())

// Get temporary directory
console.log("Temporary directory: " , os.tmpdir())

// Get operating system name
console.log("Operating system name: " , os.type())














