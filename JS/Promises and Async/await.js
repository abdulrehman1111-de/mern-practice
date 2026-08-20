// Question 1:
function checkLogin(username, password){
    return new Promise((resolve, reject)=>{
        if (username === "admin" && password === 1234){
            resolve("login successfull");
        }
        else{
            reject("Invalid credentials");
        }
    })
}

async function runLogin(){

    try{
        const result = checkLogin("admin", 1234);
        console.log(result);
    }
    catch(error){
        console.log(error);
    }
}

// runLogin();

// Question no 2:
function placeOrder(orderId){
    return new Promise((resolve, reject)=>{
        if(orderId > 0){
            resolve("Order accepted");
        }
        else{
            reject("Order rejected");
        }
    })
}

function confirmPayment(amount){
    return new Promise((resolve, reject)=>{
        if(amount > 0){
            resolve("Amount accepted");
        }
        else{
            reject("Amount rejected");
        }
    })
}

async function confirmOrder(){
    try{
        const result1 = await placeOrder(-1);
        const result2 = await confirmPayment(100);
        console.log(result1);
        console.log(result2);
    }
    catch(error){
        console.log(error);
    }
}

confirmOrder();














