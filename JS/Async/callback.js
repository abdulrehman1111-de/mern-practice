const prompt = require('prompt-sync')();

function getPin(callback){

    const pin = Number.parseInt(prompt("Enter your pin: "));
    console.log("Your pin is being passed for verifcation...");
    setTimeout(() => {
        callback(pin);
    }, 2000);
}

function authenticatePin(pin, callback){
    console.log("Pin correct!");
    console.log("Checking balance in your account please wait...");
    setTimeout(()=>{
        callback("100$");
    }, 2000);
}

function checkAccountBalance(amount, callback){
    console.log("Current amount in account:", amount);
    const requiredAmount = Number.parseInt(prompt("Enter the amount you want to deduct: "));
    console.log("Deducting the required amount...");
    setTimeout(() => {
        if (requiredAmount > 100){
            console.log("Amount greater than current amount!");
            return;
        }
        else if(requiredAmount <= 0){
            console.log("Amount cannot be 0 or negative!");
            return;
        }
        else{
            callback(requiredAmount);
        }
        
    }, 2000);
}

function withdrawCash(withdrawAmount, callback){
    console.log("Amount withdrawn!", withdrawAmount);
    console.log("Wrapping up the procedure...");
    setTimeout(() => {
        callback("Done");
    }, 2000);
}

function printReceipt(status){
    console.log("Procedure status:", status);
}

getPin(function(result){
    authenticatePin(result, function(step1Result){

    checkAccountBalance(step1Result, function(step2Result){

        withdrawCash(step2Result, function(step3Result){

            printReceipt(step3Result);
        });
    });
});
});
















