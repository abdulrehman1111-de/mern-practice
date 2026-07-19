// const prompt = require("prompt-sync")();

// For Loop:

// 1. Print numbers from 1 to 10
// for (let i = 1; i <= 10; i++){
//     console.log(i);
// } 

// 2. Print even numbers between 1 and 20:
// for (let i = 1; i <= 20; i++){
//     if (i % 2 === 0){
//         console.log(i);
//     }
// }

// 3. Print odd numbers between 1 and 20. 
// for (let i = 1; i <= 20; i++){
//     if (i % 2 !== 0){
//         console.log(i);
//     }
// }

// 4. Print numbers from 10 down to 1.
// for (let i = 10; i >= 1; i--){
//     console.log(i);
// }

// 5. Print the multiplication table of 5.
// for (let i = 1; i <= 10; i++){
//     console.log(`5 x ${i} = ${5 * i}`);
// }

// 6. Print all numbers divisible by 3 from 1 to 30. 
// for (let i = 1; i <= 30; i++){
//     if (i % 3 === 0){
//         console.log(i);
//     }
// }

// 7. Print the first 10 square numbers. 
// for (let i = 1; i <= 10; i++){
//     console.log(i * i);
// }

// 8. Print the sum of numbers from 1 to 50. 
// let sum = 0;
// for(let i = 1; i <= 50; i++){
//     sum += i;
// }
// console.log(sum);

// 9. Print all elements of the array [2,4,6,8,10]. 
// let arr = [2,4,6,8,10];
// for (let i = 0; i < arr.length; i++){
//     console.log(arr[i]);
// }

// 10. Print numbers from 1 to 100 that are multiples of 7. 
// for (let i = 1; i <= 100; i++){
//     if (i % 7 === 0){
//         console.log(i);
//     }
// }

// 2⃣ While Loop –  

// 1. Print numbers from 1 to 10.
// let i = 1;
// while(i <= 10){
//     console.log(i);
//     i++;
// }

// 2. Print even numbers less than 50.
// let i = 0;
// while(i < 50){
//     if (i % 2 === 0){
//         console.log(i);
//     }
//     i++;
// }

// 3. Print numbers from 20 down to 1
// let i = 20;
// while(i >= 1){
//     console.log(i);
//     i--;
// }

// 4. Print numbers divisible by 5 from 1 to 100
// let i = 1;
// while(i <= 100){
//     if (i % 5 === 0){
//         console.log(i);
//     }
//     i++;
// }

// 5. Print the first 10 odd numbers.
// let i = 0;
// let flag = true;
// let count = 0;
// while(flag){
//     if (i % 2 != 0){
//         console.log(i);
//         count++;
//         if (count === 10){
//             flag = false;
//         }
//     }
//     i++;
// }

// 6. Calculate the sum of numbers from 1 to 20.
// let sum = 0;
// let i = 1;
// while (i <= 20){
//     sum += i;
//     i++;
// }
// console.log(sum);

// 7. Print all elements of the array [5,10,15,20].
// let arr = [5,10,15,20];
// let i = 0;
// while(i < arr.length){
//     console.log(arr[i]);
//     i++;
// }

// 8. Print numbers from 100 down to 50. 
// let i = 100;
// while(i >= 50){
//     console.log(i);
//     i--;
// }

// 9. Print all multiples of 3 less than 30.
// let i = 30;
// while(i > 0){
//     if (i % 3 === 0){
//         console.log(i);
//     }
//     i--;
// }

// 10. Print Fibonacci numbers up to 50.
// let limit = 50;
// let a = 0;
// let b = 1;
// while(a < limit){
//     console.log(a, " ");
//     let next = a + b;
//     a = b;
//     b = next;
// }

// Do...While Loop 
// 1. Print numbers from 1 to 10.
// let i = 1;
// do{
//     console.log(i);
//     i += 1;
// }while(i <= 10);

// 2. Print numbers from 10 down to 1
// let i = 10;
// do{
//     console.log(i);
//     i -= 1;
// }while(i >= 1);

// 3. Print even numbers less than 20. 
// let i = 19;
// do{
//     if (i % 2 === 0){
//         console.log(i);
//     }
//     i -= 1;
// }while(i >= 0);

let user;
do{
    user = 2
    console.log(user);
}while(user !== 0);











