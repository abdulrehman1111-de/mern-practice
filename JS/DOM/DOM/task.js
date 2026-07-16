let button = document.getElementById("addTaskBtn");
let stringTask = document.getElementById("task");

button.addEventListener("click", ()=>{
    let trimmed = stringTask.value.trim();
    if (trimmed.length === 0){
        alert("Task cannot be empty!");
    }
    else{
        let ul = document.getElementById("taskList");
        let li = document.createElement("li");
        let textNode = document.createTextNode(trimmed);
        li.appendChild(textNode);
        ul.appendChild(li);
    }
})













