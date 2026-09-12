export function getRegisteredUsers(){

    let arr = localStorage.getItem("Users");

    if(!arr){
        return []
    }

    return JSON.parse(arr);
}

export function saveUsers(arr){

    let jsonString = JSON.stringify(arr);
    localStorage.setItem("Users", jsonString);
}

export function checkDuplicateEmail(email){

    let allUsers = getRegisteredUsers();
    for(let i = 0; i < allUsers.length; i++){
        if(allUsers[i].email === email){
            return true;
        }
    }

    return false;
}

export function checkDuplicateId(id){

    let allUsers = getRegisteredUsers();
    for(let i = 0; i < allUsers.length; i++){
        if(allUsers[i].id === id){
            return true;
        }
    }

    return false;
}

export function setCurrentUser(newUser){

    let jsonString = JSON.stringify(newUser)
    localStorage.setItem("currentUser", jsonString)
}

export function getCurrentUser(){

    let jsonObject = JSON.parse(localStorage.getItem("currentUser"))
    return jsonObject
}










