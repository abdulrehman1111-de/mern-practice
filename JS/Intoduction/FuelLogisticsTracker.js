// Single line of code to get prompt from the terminal 
const prompt = require('readline-sync').question;

// Problem Statement:
// The Digital Fuel Efficiency Calculator:
// A logistics driver wants to track their fuel efficiency and driving performance over a 4-day road trip. They do not have software to store lists of data, so the program must calculate everything on the fly as the days progress.

// Solution:

// Setup Phase:

// Variables to keep track of running totals:
let totalKilometers = 0;
let totalFuelConsumed = 0;
let highEfficientDays = 0;
let streakCounter = 0;
let longestStreak = 0;

// Core Phase Logic:

// Simulation using a for loop
for(let i = 1; i <= 4; i++){
    let dayKilometers = parseInt(prompt(`Enter your kms for the Day ${i}: `));
    totalKilometers += dayKilometers

    let dayFuel = parseInt(prompt(`Enter your fuel in liters for the Day ${i}: `));
    totalFuelConsumed += dayFuel

    // Fuel efficiency for the current day
    let fuelEfficiency = dayKilometers / dayFuel;

    if (dayFuel === 0){
        fuelEfficiency = 0
    }

    if (fuelEfficiency >= 15){
        highEfficientDays++;
        streakCounter++;
    }

    else if (fuelEfficiency < 15){
        streakCounter = 0;
    }

    if (streakCounter > longestStreak){
        longestStreak = streakCounter;
    }
}

// Report Phase:

let driverRating = null;
let overallEfficiency = totalKilometers / totalFuelConsumed;

if (overallEfficiency >= 16){
    driverRating = "ECO-WARRIOR";
}
else if ((15.99 >= overallEfficiency) && (overallEfficiency >= 12)){
    driverRating = "STANDARD-COMMUTER";
}
else{
    driverRating = "FUEL-GUZZLER";
}

// Trip Performance report:

console.log("=========================================");
console.log("TRIP PERFORMANCE REPORT");
console.log("=========================================");
console.log(`Total Distance: ${totalKilometers}km`)
console.log(`Total Fuel consumed: ${totalFuelConsumed} liters`);
console.log(`Overall Efficiency: ${overallEfficiency} km/L`);
console.log(`Highly Efficient Days: ${highEfficientDays} days`);
console.log(`Highest Streak ${longestStreak} days`);
console.log("-----------------------------------------");
console.log(`Driver Rating: ${driverRating}`);
console.log("=========================================");








