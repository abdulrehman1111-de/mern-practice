// Import the Event Emitter class
const { emit } = require("cluster")
const EventEmitter = require("events")

// Create an instance of Event Emitter class
const emitter = new EventEmitter()

// Create an event listener
emitter.on("greet", (username)=>{
    console.log(`Hello ${username}`)
})

// Trigger/emit the event
emitter.emit("greet", "Abdul")

// Its best to take arguments as an object 
emitter.on("advanceGreet", (arg)=>{
    console.log(`My profession is ${arg.prof} and I am a ${arg.value}`)
})
emitter.emit("advanceGreet", { prof: "Doctor", value: "Human"})








