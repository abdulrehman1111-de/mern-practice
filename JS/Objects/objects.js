// singleton
// Object.create();

// Object literals
let mySm = Symbol("Key1");

const JsUser = {
    name: "Abdul", 
    "full name": "Abdul Rehman",
    [mySm]: "MyKey1",
    age: 19,
    location: "BWP",
    email: "abdul@gmail.com",
    isLoggedIn: false,
    lastLoginDays: ["Monday", "Saturday"]
}

// console.log(JsUser.email);
// console.log(JsUser["email"]);

// console.log(JsUser["full name"]);
// console.log(JsUser[mySm]);

// JsUser.email = "abdul@chatgpt.com";
// Object.freeze(JsUser);
// JsUser.email = "abdul@microsoft.com";
// console.log(JsUser);

// JsUser.greeting = function(){
//     console.log("Hello JS user");
// }
// JsUser.greeting2 = function(){
//     console.log(`Greetings! ${this.name}`);
// }
// console.log(JsUser.greeting());
// console.log(JsUser.greeting2());

const tinderUser = new Object();
tinderUser.id = "123abc";
tinderUser.name = "Sam";
tinderUser.isLoggedIn = false;

// console.log(tinderUser);

const regularUser = {
    email: "sum@gmail.com",
    fullName: {
        userFullName: {
            firstName: "Abdul",
            lastName: "Rehman"
        }
    }
}

// console.log(regularUser.fullName.userFullName.firstName);

const obj1 = {
    1: "a",
    2: "b"
}

const obj2 = {
    3: "a",
    4: "b"
}

const obj4 = {
    5: "a",
    6: "b"
}

// const obj3 = Object.assign({}, obj1, obj2, obj4);

// const obj3 = {...obj1, ...obj2};
// console.log(obj3);

const users = [
    {
        id: 1,
        email: "a@gmail.com"
    },
    {
        id: 2,
        email: "b@gmail.com"
    },
    {
        id: 3,
        email: "c@gmail.com"
    }
]
// users[1].email;

// console.log(tinderUser);
// console.log(Object.keys(tinderUser));
// console.log(Object.entries(tinderUser));
// console.log(Object.values(tinderUser));
// console.log(Object.hasOwnProperty("isLoggedIN"));



const item = {
    id: 101,
    details: {
        brand: "Nike",
        specifications: { size: "M", color: "black" }
    }
};

// Challenge:
// 1. Create a shallow copy of 'item' using the spread operator.
// 2. Change the 'color' value in your new copied object to "red".
// 3. Log both the original 'item' and your new copy. 
// What happened to the original 'item's color, and why?

const newItem = {...item};
// console.log(newItem);

newItem.details.specifications.color = "red";

console.log(item);
console.log(newItem);

// the original color also changed I think so because there is only one object here 




