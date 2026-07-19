// console.log(count);
// var count = 42; //undefined

// const name = "Abdul";
// const city = "Bwp";
// let age = 19;

// const object = {
//     name: "Abdul",
//     age: 19,
//     country: "Pak"
// }
// object.iq = 90;
// console.log(object); // Can change items within objects using const

// console.log(name);
// let name = "Ali";  // Reference error

// const arr = [1, 2, 3, 4];
// arr.push(5);
// console.log(arr);  // Can push to const arr

// console.log(null + 1); // 1
// console.log("5" + 3);  // 53
// console.log("5" - 3); // 2
// console.log(true + false); // 1

// console.log(typeof []);  // object
// console.log(typeof null); // object
// console.log(typeof 123n); // bigint

// console.log(5 == "5"); // true
// console.log(5 === "5"); // false

// console.log("10" + 1); // 101
// console.log("10" - 1); // 9
// console.log(true + false); // 1
// console.log(!!"Sheryians"); // true

// let str = "42";
// let num = +str;
// console.log(num); // 42 number

// let age = 17;
// let msg = age >= 18 ? "Adult" : "Minor";
// console.log(msg);

// Sum all numbers using rest parameter:
// let finalSum = 0;
// function sumNums(...numbers){
//     for (let i = 0; i < numbers.length; i++){
//         finalSum += numbers[i];
//     }
//     console.log(finalSum);
// }

// sumNums(10, 20, 30);

// closure function
// function createCounter(){
//     let count = 0;

//     return function(){
//         count++; 
//         return count;
//     }
// }

// let counter = createCounter();
// console.log(counter());
// console.log(counter());
// console.log(counter());

// let anotherCounter = createCounter();
// console.log(anotherCounter());
// console.log(counter());

// Function returning another function:
// function greet(){
//     return function(){
//         return "HEllo";
//     }
// }

// const sayHello = greet();
// console.log(sayHello());

//IIFE 
// (function (){
//     console.log("Welcome");
// })();

// using higher order function:
// function calculateDiscount(discount){
//     return function(price){
//         return price = price - (price * discount) / 100;
//     }
// }

// const tenPercentDiscount = calculateDiscount(10);
// const twentyPercentDiscount = calculateDiscount(20);

// console.log(tenPercentDiscount(1000));
// console.log(twentyPercentDiscount(20000));

// Destructuring
// let arr = [10, 20, 30, 40];
// let [first, second, ...rest] = arr;
// console.log(first);
// console.log(second);
// console.log(rest);

// Some method
// const students = [
//   { name: "Ali", marks: 85 },
//   { name: "Sara", marks: 42 },
//   { name: "Ahmed", marks: 78 }
// ];

// const anyFailed = students.some((items)=>{
//     return items.marks < 50;
// })
// console.log(anyFailed);

// Spread operator
// let arr = [10, 20, 30];
// const newArr = [...arr];
// newArr.push(100);
// console.log(newArr);

// Destructure name and age from a student object:
// const student = {
//     name: "ali",
//     age: 15,
//     location: "lhr"
// }
// let {name, age} = student;
// console.log(name);
// console.log(age);

// Copy an object using spread operator:
// const student = {
//     name: "ali",
//     age: 15,
//     location: "lhr"
// }
// let newStudent = Object.assign({}, student);
// console.log(newStudent);

// Create a deep copy of an object with nested structure:
// const student = {
//     name: "ali",
//     age: 15,
//     location: {
//         city: "lhr"
//     }
// }

// Optional chaining:
// console.log(student?.location?.city);

// const deepCopy = JSON.parse(JSON.stringify(student));
// console.log(deepCopy);

//  Use a variable as a key using computed properties:
// let key = "name";
// let student = {
//     [key]: "Ali"
// }
// console.log(student);









