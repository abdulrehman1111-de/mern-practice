export function saveUser(objectToSave){

    let stringifiedObject = JSON.stringify(objectToSave);   
    localStorage.setItem("user", stringifiedObject);
}

export function getUser(){

    let parsedObject = JSON.parse(localStorage.getItem("user"));
    return parsedObject;
}













