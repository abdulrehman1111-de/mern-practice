import express from "express"
import path from "path"

const app = express()

const absolutePath = path.resolve("Project/Project/files")
console.log(absolutePath)