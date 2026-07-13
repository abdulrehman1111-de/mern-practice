// let arr = [1, 2, 3, 4, 5];
// console.log(arr[0]);

// arr.push(6);
// arr.push(7);
// arr.pop();

// arr.unshift(0);
// arr.shift();

// console.log("Original Array")
// console.log(arr);
// let newArr = arr.slice(1, 3);
// console.log("After slicing:")
// console.log(newArr);
// console.log("Original array after slicing");
// console.log(arr);

// let newArr2 = arr.splice(1, 3);
// console.log("After splicing:")
// console.log(newArr2);
// console.log("Original array after splicing");
// console.log(arr);

// let marvelHeroes = ["Thor", "IronMan", "Spiderman"];
// let dcHeroes = ["superman", "flash", "Ironman"];

// marvelHeroes.forEach((item)=>{
//     console.log(item);
// })

// marvelHeroes.forEach((item, index, arr)=>{
//     console.log(item, index, arr);
// })

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let result = arr.forEach((item)=>{
//     console.log(item);
// })
// console.log(result);

// let newArr = arr.filter((item)=>{
//     return item > 4;
// })
// console.log(newArr);

// let newArr = arr.map((item)=>{
//     return item + 10
// })
// console.log(newArr);

let nums = [1, 2, 3];
let result = nums.reduce((acc, curr)=>{
    return acc + curr;
}, 2)
console.log(result);




