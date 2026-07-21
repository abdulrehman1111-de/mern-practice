// Long Questions:

// Function + Primitive vs Reference + Loop   

// Write a program that: ● Uses a loop to modify a primitive value  ● Uses a loop to modify a reference value  ● Passes both into a function     
// Explain why the outputs are different even though both are modified inside loops. 

let primitiveVal = 10;
let referenceObj = {
    age : 1
}

for(let i = 0; i <= 5; i++){
    primitiveVal++;
}
console.log(primitiveVal);

for (let i = 1; i <= 5; i++){
    referenceObj.age++;
}
console.log(referenceObj);

function changeValues(primitiveValFunc, referenceObjFunc){
    primitiveValFunc += 10;
    referenceObjFunc.age += 10;
}

changeValues(primitiveVal, referenceObj);
console.log(`Primitive value: ${primitiveVal}`);
console.log(`Refrernce value: ${referenceObj.age}`);

// The outputs are different here because incase of the primitives they are passed in the function as pass by value the function creates a local copy which is basically changing just the local copy and not the actual variable 
// Whereas the refernce types are passed as refernce like the different references actually point to the same entity this is why we see the value of the original entity being mutated too.

// 2. Control Flow + Nested Loops + Operators
      
// Write a program that: 
// ● Uses a for loop from 1 to 20  
// ● Prints: ○ "Fizz" if number is divisible by 3  
// ○ "Buzz" if divisible by 5  
// ○ "FizzBuzz" if divisible by both  
// ● Uses logical and comparison operators 

for (let i = 1; i <= 20; i++){
    // First this condition is checked because if the bottom ones are checked this one will go ignored 
    // Prints when both divisible by 3 and 5
    if((i % 3 === 0) && (i % 5 === 0)){
        console.log("Fizz Buzz");
    }
    // then the other ones
    // Prints when divisible by 3
    else if (i % 3 === 0){
        console.log("Fizz");
    }
    // Prints when divisible by 5
    else if(i % 5 === 0){
        console.log("Buzz");
    }
    // last printing when neither divisible by 3 and 5 nor indiviually 
    else{
        console.log(i);
    }
}


// 3. Function Hoisting vs Function Expression           
// Analyze the code below and explain why one works and the other throws an error: 

// This function will run perfectly because this is a function declaration and function declarations are hoisted during the compilation normally so it executes properl too
sayHello(); 
function sayHello() 
{
    console.log("Hello");
}

// This function throws error because it is a function expression with var and also hoisting of function expression with var doesnot behave normal because when var is hoisted it is hoisted with undefined value so this is why it throws error
sayBye(); 
var sayBye = function () {
    console.log("Bye"); 
}; 





