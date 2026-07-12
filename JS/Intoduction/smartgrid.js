const prompt = require('readline-sync').question;

// Problem Statement:
// A local green-energy grid monitors an industrial facility's power usage over a 5-hour shift. The grid operators need a real-time monitor to track energy consumption on the fly, flag dangerous power surges, and calculate penalty fines without storing the historical data in a database or list.

// Solution:

// Setup Phase:

let totalPowerConsumed = 0;
let peakPowerDraw = 0;
let totalPenaltyFines = 0;
let streakCounter = 0;
let overloadStreak = 0;

// The Monitoring Phase:

for (let i = 1; i <= 5; i++){
    
    let fine;
    console.log(`--- Hour ${i} ---`)
    let hourPower = parseInt(prompt(`Enter the power consumed in kWh during hour ${i}: `));
    totalPowerConsumed += hourPower;

    if (hourPower > peakPowerDraw){
        peakPowerDraw = hourPower;
    }

    if (hourPower > 80){
        streakCounter++;
        let additionalHours = hourPower - 80;
        fine = additionalHours * 150;
        totalPenaltyFines += fine;
    }

    else if (hourPower <= 80){
        fine = 0
        streakCounter = 0;
    }

    if (streakCounter > overloadStreak){
        overloadStreak = streakCounter;
    }

}

// The Report Phase:

let gridStatus;
if (totalPowerConsumed >= 350){
    gridStatus = "CRITICAL OVERUSE";
}
else if ((totalPowerConsumed >= 200) && (totalPowerConsumed <= 349.99)){
    gridStatus = "NOMINAL DRAW";
}
else{
    gridStatus = "ECO FRIENDLY";
}

// Final Output:

console.log("=========================================");
console.log("GRID STABILITY FINAL REPORT");
console.log("=========================================");
console.log(`Total energy consumed: ${totalPowerConsumed}kWh`);
console.log(`Peak Hourly Demand: ${peakPowerDraw} kWh`);
console.log(`Total Penalty Fines: ${totalPenaltyFines} PKR`);
console.log(`Longest Overload Streak: ${overloadStreak} hours`);
console.log("-----------------------------------------")
console.log(`Grid Compilance Status: ${gridStatus}`);
console.log("=========================================");








