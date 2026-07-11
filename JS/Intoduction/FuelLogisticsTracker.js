const prompt = require('readline-sync').question;

// Problem Statement:
// A logistics driver wants to track their fuel efficiency and driving performance over a 4-day road trip. They do not have software to store lists of data, so the program must calculate everything on the fly as the days progress.

// Solution:

// Setup Phase:
let totalKilometers = 0;
let totalFuelConsumed = 0;
let highEfficientDays = 0;
let streakCounter = 0;
let longestStreak = 0;

// Core Phase Logic:
for(let i = 1; i <= 4; i++){
    let dayKilometers = parseInt(prompt(`Enter your kms for the Day ${i}: `));
    totalKilometers += dayKilometers

    let dayFuel = parseInt(prompt(`Enter your fuel for the Day ${i}: `));
    totalFuelConsumed += dayFuel

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
    driverRating = "Eco Warrior";
}
else if ((15.99 >= overallEfficiency) && (overallEfficiency >= 12)){
    driverRating = "Standard commuter";
}
else{
    driverRating = "Fuel Guzzler";
}

// Trip Performance report:
console.log(`Total Distance: ${totalKilometers}kms`)
console.log(`Total Fuel consumed: ${totalFuelConsumed} liters`);
console.log(`Overall Efficiency: ${overallEfficiency} per liter`);
console.log(`Highly Efficient Days: ${highEfficientDays} days`);
console.log(`Highest Streak ${longestStreak} days`);
console.log(`Driver Rating: ${driverRating}`);









