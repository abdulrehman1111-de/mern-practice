// function hello(){
//     console.log("Hello");
// }
// hello();

// function calculateCartPrice(val1, val2, ...num1){
//     console.log(val1, val2);
//     return num1
// }
// console.log(calculateCartPrice(200, 400, 500));

const user = {
    name: "abdul", 
    price: 199
}

function handleObject(anyObject){
    console.log(`Name is ${anyObject.name} and price is ${anyObject.price}`);
}

// handleObject(user);
// handleObject({
//     name: "ali",
//     price: 100
// })

const newArray = [100, 200, 300, 400];
function getSecondValue(getArray){
    return getArray[1];
}
// console.log(getSecondValue(newArray));
// console.log(getSecondValue([100, 200, 300, 400]));

// const addTwoNums = (num1, num2)=>{
//     return num1 + num2;
// }
// const addTwoNums = (num1, num2) => num1 + num2;
const addTwoNums = (num1, num2)=>{
    return {username: "Hitesh"};
}
console.log(addTwoNums(1, 2));











