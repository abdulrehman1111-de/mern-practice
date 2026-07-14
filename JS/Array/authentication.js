const prompt = require('readline-sync').question;

function authentication(user, pass){
    let adminUsername = "admin123";
    let adminPassword = "password";

    let customUsername = "custom123";
    let customPassword = "password123";

    if ((user == adminUsername) && (pass == adminPassword)){
        console.log("Admin logged in!");
    }
    else if((user == customUsername) && (pass == customPassword)){
        console.log("User logged in!")
    }
    else{
        console.log("Invalid username or password!");
    }
}

let username = prompt("Enter your username: ");
let password = prompt("Enter your password: ");
authentication(username, password);



















