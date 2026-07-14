const prompt = require('readline-sync').question;

// function add(x, y){
//     return x + y;
// }
// function subtract(x, y){
//     return x - y;
// }
// function multiply(x, y){
//     return x * y;
// }
// function divide(x, y){
//     return x / y;
// }
// function modulo(x, y){
//     return x % y;
// }

// while(true){
//     let firstNumber = Number.parseInt(prompt("Enter the first Number: "));
// let secondNumber = Number.parseInt(prompt("Enter the second Number: "));
// let operator = prompt("Enter the operator for the type of operation you want to apply: ")

// if (operator == "+"){
//     let sum = add(firstNumber, secondNumber);
//     console.log(`The sum of the given numbers is: ${sum}`);
// }
// else if (operator == "-"){
//     let diff = subtract(firstNumber, secondNumber);
//     console.log(`The difference of the given numbers is: ${diff}`);
// }
// else if (operator == "*"){
//     let product = multiply(firstNumber, secondNumber);
//     console.log(`The product of the given numbers is: ${product}`);
// }
// else if(operator == "/"){
//     let division = divide(firstNumber, secondNumber);
//     console.log(`The division of the given numbers is: ${division}`);
// }
// else if (operator == "%"){
//     let modulus = modulo(firstNumber, secondNumber);
//     console.log(`The modulo of the given numbers is: ${modulus}`);
// }
// else{
//     console.log("Please enter the right operator!")
// }
// }

function calculator(x, y, operator){
    if (operator == "+"){
        return x + y;
    }
    else if(operator == "-"){
        return x - y;
    }
    else if(operator == "*"){
        return x * y;
    }
    else if(operator == "/"){
        return x / y;
    }
    else if(operator == "%"){
        return x % y;
    }
    else{
        return "Invalid operator!"
    }
}

while (true) {
    let firstNumber = Number.parseInt(prompt("Enter the first number: "));
    let secondNumber = Number.parseInt(prompt("Enter the second number: "));
    let operator = prompt("Enter the operator for respective operation: ");

    let result = calculator(firstNumber, secondNumber, operator);
    console.log(result);
}










