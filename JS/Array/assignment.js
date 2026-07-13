// Practice Questions:

// Question no 1:
// Create an array of student names and print each:
// let students = ["Ali", "Ahmed", "Amjad", "Irfan", "Hamza"];
// students.forEach((student)=>{
//     console.log(student);
// })

// Using Manual Approach:
// for (let i = 0; i < students.length; i++){
//     console.log(students[i]);
// }

// Question no 2:
// Filter even numbers from an array:
// let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
// let evenNums = nums.filter((num)=>{
//     return (num % 2 === 0);
// })
// console.log(evenNums);

// Using Manual Approach:
// let evenNumbers = [];
// for (let i = 0; i < nums.length; i++){
//     if(nums[i] % 2 === 0){
//         evenNumbers.push(nums[i]);
//     }
// }
// console.log(evenNumbers);

// Question no 3:
// Map prices to include GST (18%):
// let prices = [19.99, 5.50, 100.00, 45.25, 9.99];
// let finalPrices = prices.map((price)=>{
//     return (price + (price * (18/100)));
// })
// console.log(finalPrices);

// Using Manual Approach:
// let newPrices = [];
// for (let i = 0; i < prices.length; i++){
//     let newPrice = (prices[i] + (prices[i] * (18/100)));
//     newPrices.push(newPrice);
// }
// console.log(newPrices);

// Question no 4:
// Reduce salaries to calculate total payroll:
// let salaries = [45000, 62000, 75500, 98000, 125000, 53000];
// let total = salaries.reduce((acc, curr)=>{
//     return acc + curr
// }, 0);
// console.log(`The total payroll is ${total}`);

// Using Manual Approach:
// let salarySum = 0;
// for (let i = 0; i < salaries.length; i++){
//     salarySum += salaries[i];
// }
// console.log(salarySum);

// Question no 5:
// Write a function to reverse an array:
// let unMutatedArr = [1, 2, 3, 4, 5];
// let arr = [1, 2, 3, 4, 5];
// let reverse = arr.reverse();
// console.log(reverse);

// Using Manual Approach:
// let reverseArr = [];
// for (let i = unMutatedArr.length- 1; i >= 0; i--){
//     reverseArr.push(unMutatedArr[i]);
// }
// console.log(reverseArr);

// Question no 6:
// Sort array of ages in ascending order:
let unMutatedArr = [18, 22, 35, 42, 50, 29, 65, 14];
// let ages = [18, 22, 35, 42, 50, 29, 65, 14];
// let sortedAges = ages.sort((a, b)=>{
//     return (a - b);
// })
// console.log(sortedAges);

// Using Manual Approach:
// let temp = 0;
// for (let i = 0; i < unMutatedArr.length; i++){
//     for (let j = i + 1; j < unMutatedArr.length; j++){
//         if (unMutatedArr[i] > unMutatedArr[j]){
//             temp = unMutatedArr[i];
//             unMutatedArr[i] = unMutatedArr[j];
//             unMutatedArr[j] = temp;
//         }
//     }
// }
// console.log(unMutatedArr);


// Additional 10 questions:

// Question no 1:
// Remove the first element, then add two new items to the end.
// let unMutatedQueue = ["User1", "User2", "User3"];
// let queue = ["User1", "User2", "User3"];
// queue.shift();
// queue.push("User4")
// queue.push("User5");
// console.log(queue);

// Question no 2:
// Use splice to replace "broken" with the numbers 30 and 40.
// let sequence = [10, 20, "broken", 50, 60];
// sequence.splice(2, 1, 30, 40);
// console.log(sequence);

// Question no 3:
// Use slice to extract "March", "April", and "May" into a separate array.
// let months = ["January", "February", "March", "April", "May", "June"];
// let separateMonths = months.slice(2, 5);
// console.log(separateMonths);

// Question no 4:
// Use forEach to print each item exactly like: "Item: [name]".
// let stock = ["Laptop", "Mouse", "Keyboard", "Monitor"];
// stock.forEach((name)=>{
//     console.log(`Item: [${name}]`);
// })

// Using Manual Approach:
// for (let i = 0; i < stock.length; i++){
//     console.log(`Item: [${stock[i]}]`);
// }

// Question no 5:
// Use map to convert all negative numbers to positive values.
// let changes = [12, -5, 8, -22, 0, -14];
// let changedValues = changes.map((value)=>{
//     if (value < 0){
//         return value = value - value - value;
//     }
//     return value;
// })
// console.log(changedValues);

// Using Manual Approach:
// let positiveValues = [];
// for (let i = 0; i < changes.length; i++){
//     if (changes[i] < 0){
//         changes[i] = changes[i] - changes[i] - changes[i];
//     }
//     positiveValues.push(changes[i]);
// }
// console.log(positiveValues);

// Question no 6:
// Use filter to keep only strings longer than 5 characters.
// let words = ["apple", "banana", "kiwi", "pineapple", "plum"];
// let longWords = words.filter((word)=>{
//     return (word.length) > 5;
// })
// console.log(longWords);

// Using Manual Approach:
// let fiveWordArr = [];
// for (let i = 0; i < words.length; i++){
//     if (words[i].length > 5){
//         fiveWordArr.push(words[i]);
//     }
// }
// console.log(fiveWordArr);

// Question no 7:
// filter out prices above 100, then map a 10% discount (price * 0.9) onto them.
// let productPrices = [45, 120, 80, 250, 99, 300];
// let discountedPrices = productPrices.filter((price)=>{
//     return price > 100;
// })
// .map((price)=>{
//     return price = price - (price * (10/100));
// })
// console.log(discountedPrices);

// Using Manual Approach:
// let newDiscountedPrices = [];
// let above100 = [];
// for (let i = 0; i < productPrices.length; i++){
//     if (productPrices[i] > 100){
//         above100.push(productPrices[i]);
//     }
// }
// for (let i = 0; i < above100.length; i++){
//     let discountedPrice = above100[i] - (above100[i] * (10/100));
//     newDiscountedPrices.push(discountedPrice);
// }
// console.log(newDiscountedPrices);

// Question no 8:
// Use reduce to find and return the single highest number.
// let measurements = [14, 52, 29, 87, 43, 61];
// let highestNum = measurements.reduce((acc, curr)=>{
//     if (curr >= acc){
//         return curr;
//     }
//     else{
//         return acc;
//     }
// })
// console.log(highestNum);

// Using Manual Approach:
// let highestNum = Number.MIN_VALUE;
// for (let i = 0; i < measurements.length; i++){
//     if (measurements[i] > highestNum){
//         highestNum = measurements[i];
//     }
// }
// console.log(highestNum);


// Question no 9:
// Use reduce to merge all individual array characters into one single string.
// let characters = ["M", "E", "R", "N", " ", "2", "0", "2", "6"];
// let newString = characters.reduce((acc, curr)=>{
//     return acc + curr;
// })
// console.log(newString);

// Using Manual Approach:
// let string = "";
// for (let i = 0; i < characters.length; i++){
//     string += characters[i];
// }
// console.log(string);


// Question no 10:
// Use sort with a comparison function to arrange ratings from highest to lowest.
// let unMutatedRatings = [4.2, 4.8, 3.5, 5.0, 4.1];
// let ratings = [4.2, 4.8, 3.5, 5.0, 4.1];
// let sortedRatings = ratings.sort((a, b)=>{
//     return (b - a);
// })
// console.log(sortedRatings);

// Using Manual Approach:
// let temp = 0;
// for (let i = 0; i < unMutatedRatings.length; i++){
//     for (let j = i + 1; j < unMutatedRatings.length; j++){
//         if (unMutatedRatings[i] < unMutatedRatings[j]){
//             temp = unMutatedRatings[i];
//             unMutatedRatings[i] = unMutatedRatings[j];
//             unMutatedRatings[j] = temp;
//         }
//     }
// }
// console.log(unMutatedRatings);







