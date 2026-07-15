let database = {
    username: "user",
    password: 123
}

let username = document.getElementById("username");
let password = document.getElementById("password");

let button = document.getElementById("submitBtn");
button.addEventListener("click", ()=>{
    let trimmedUsername = username.value.trim();
    let trimmedPassword = password.value.trim();

    if ((trimmedUsername.length === 0) || (trimmedPassword.length === 0)){
        alert("Input fields cannot be empty!");
    }
    else{
        let numPassword = Number(trimmedPassword);
        if ((database.username === trimmedUsername) && (database.password === numPassword)){
            alert("User logged in!");
        }
        else{
            alert("Either wrong username or password!");
        }
        trimmedUsername.value = "";
        trimmedPassword.value = "";
    }
})














