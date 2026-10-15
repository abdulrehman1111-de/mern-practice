const fs = require("fs")

const operation = process.argv[2]
const name = process.argv[3]
const fullName = `files/${name}.txt`
const content = process.argv[4]

if (operation === "write") {
    fs.writeFileSync(fullName, content)
}

else if (operation === "read") {
    const data = fs.readFileSync(fullName, "utf-8")
    console.log(data)
}

else if (operation === "append") {
    fs.appendFileSync(fullName, content)
}

else if (operation === "delete") {
    fs.unlinkSync(fullName)
}







