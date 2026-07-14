const prompt = require('readline-sync').question;

// Problem Statement:
// The Smart Gym Fitness Tracker:
// As a developer building console-based utility applications, you want to build an interactive terminal tool that helps a gym-goer log their exercises, calculate their lifting stats in real-time, and store the summary in a structured JavaScript object.  Instead of hardcoding a fixed number of sets, your program must handle a dynamic number of sets (e.g., some exercises might have 3 sets, others might have 5) using modern JavaScript parameter mechanics.  


// Solution:

// The Object Architecture:
const user = {
    username: null,
    location: null,
    currentSession: {}
}

// The Rest Parameter Function (...):
function calculateTotalVolume(...sets){
    let sum = 0;
    for (let set of sets){
        sum += set;
    }
    return sum;
}

// The Control Flow Function (Intensity Evaluator):
function evaluateIntensity(totalVolume){
    if (totalVolume < 500){
        return "Warmup";
    }
    else if((totalVolume >= 500) && (totalVolume <= 1500)){
        return "Moderate Hypertrophy zone";
    }
    else{
        return "High Intensity Strength Zone";   
    }
}


let username = prompt("Enter your name: ");
user.username = username;
let location = prompt("Enter your location: ");
user.location = location;

while(true){
    let exerciseName = prompt("Enter the exercise name: ");

    let noOfSets = Number.parseInt(prompt("Enter the no of sets you will add: "));
    let set = null;
    let setArr = [];
    for (let i = 1; i <= noOfSets; i++){
        set = Number.parseInt(prompt(`Enter the weight lifted in set${i}: `));
        setArr.push(set);
    }

    let totalVolume = calculateTotalVolume(...setArr);
    let intensity = evaluateIntensity(totalVolume);

    user.currentSession.exercise = exerciseName;
    user.currentSession.volume = totalVolume;
    user.currentSession.intensity = intensity;

    console.log(`HERE ARE YOUR STATS FOR TODAY:`)
    console.log(`Username: ${user.username}`);
    console.log(`Location: ${user.location}`);
    console.log(`Execise name: ${user.currentSession.exercise}`);
    console.log(`Total Volume: ${user.currentSession.volume}`);
    console.log(user);

    let userValidation = prompt("Do you want to log another exercise? (y/n)");
    if (userValidation != "y"){
        console.log("GOOD BYE")
        break;
    }
}








