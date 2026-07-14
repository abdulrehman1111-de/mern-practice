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

const obj3 = {...obj1, ...obj2};
console.log(obj3);



  