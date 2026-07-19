// var x = 10;

// function test() {
//     console.log(x);
//     var x = 20;
//     console.log(x);
// }

// test();

// undefined, 20

// Filter out products that cost less than $50.
// Apply a 10% discount to the remaining products.
// const products = [
//     { name: "Keyboard", price: 60 },
//     { name: "Mouse", price: 30 },
//     { name: "Monitor", price: 150 },
//     { name: "Cable", price: 15 }
// ];

// const discountedProducts = products.filter((item)=>{
//     return item.price >= 50;
// })
// .map((item)=>{
//     return {
//         ...item, 
//         price: item.price * 0.9
//     }
// })

// console.log(discountedProducts);

// What will be the output of console.log(user1.address.city) and console.log(user2.address.city) at the end of this script, and why?
// const user1 = {
//     name: "Alex",
//     address: {
//         city: "Mumbai",
//         zip: 400001
//     }
// };

// // Creating a copy using the spread operator
// const user2 = { ...user1 };

// user2.name = "John";
// user2.address.city = "Delhi";

// console.log(user1.address.city);
// // Delhi
// console.log(user2.address.city);
// // Delhi


// What will be logged to the console when the following code runs?
// function createCounters() {
//     let count = 0;
    
//     return {
//         increment: function() {
//             count++;
//             console.log(count);
//         },
//         decrement: function() {
//             count--;
//             console.log(count);
//         }
//     };
// }

// const counterA = createCounters();
// const counterB = createCounters();

// counterA.increment();
// 1
// counterA.increment();
// 2
// counterB.increment();
// 1
// counterA.decrement();
// 1

// What will be the output of these four console logs?
// console.log("apple" && "banana"); banana
// console.log("apple" || "banana"); apple
// console.log(0 ?? "cherry"); 0
// console.log(false || "date");  date

// What will be the output of this loop? Pay close attention to the continue statement!
// for (let i = 1; i <= 4; i++) {
//     if (i === 2) {
//         continue;
//     }
//     console.log(i * 2);
// }
// 2
// 6
// 8


// function sumSpecial(multiplier, ...numbers) {
//     return numbers.reduce((acc, curr) => acc + curr, 0) * multiplier;
// }

// console.log(sumSpecial(2, 1, 2, 3)); 12
// console.log(sumSpecial(0, 5, 10, 15)); 0


// console.log([] == false);   true
// console.log(null == undefined); false
// console.log(null === undefined); false


// Given the user object below, how would you log the city property using a single line of Object Destructuring?
// const employee = {
//     id: 101,
//     personalInfo: {
//         firstName: "Rohan",
//         address: {
//             city: "Bhopal",
//             country: "India"
//         }
//     }
// };

// // Write your destructuring statement here:
// const { personalInfo: { address: { city } } } = employee;
// console.log(city); // Logs: Bhopal

// What is the final value of result after running this code?
// const numbers = [1, 2, 3, 4, 5];

// const result = numbers
//     .map(num => num * 2)
//     .filter(num => num > 5)
//     .reduce((acc, curr) => acc + curr, 0);

// console.log(result);
// 22


