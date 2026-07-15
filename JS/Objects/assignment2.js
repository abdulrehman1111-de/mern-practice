const prompt = require('readline-sync').question;

// Problem Statement:
// Imagine you are building the backend core of a productivity app (like Trello or Todoist). Instead of just simple variables, we need to manage a list of tasks. Each task has multiple properties (an ID, a title, a priority level, and a status).

// Solution: 

// The Task Database (State):


// The Logic Functions:
let arr = [];
let newId = 1;
function addTask(title, priority){
    const task = {
    id: newId, 
    title: title,
    priority: priority,
    isCompleted: false
}
    arr.push(task);
    newId++;
    console.log("Task added successfully\n")
}

function toggleTaskStatus(id){

    let foundStatus = false;
    for (let item of arr){
        if (item.id === id){
            foundStatus = true;
            if(item.isCompleted === false){
                item.isCompleted = true;
                console.log("Task toggled successfully!");
            }
            else{
                item.isCompleted = false;
                console.log("Task toggled successfully!");
            }
        }
        else{
            if(foundStatus === false){
                console.log("Either id wrong or id doesnt exist!");
            }
        }
    }
}

function viewTasks(){
    if (arr.length == 0){
        console.log("Task section is empty! please add one...\n");
    }
    else{
        console.log("Following is the list of tasks: ")
        arr.forEach((task)=>{
        console.log(`Task id: ${task.id}`);
        console.log(`Task title: ${task.title}`);
        console.log(`Task priority: ${task.priority}`);
        console.log(`Task completion status: ${task.isCompleted}\n`);
    })
    }
}

let flag = true;
while(flag){
    let userSelection = Number.parseInt(prompt("Press 1 for View Tasks\nPress 2 to add Task\nPress 3 to toggle task status\nPress 4 to exit\n"));

    if (userSelection === 1){
        viewTasks();
    }

    else if(userSelection === 2){
        let title = prompt("Enter the title of task: ");
        let priority = prompt("Set the priority of task for eg High Medium low etc: ")
        addTask(title, priority);
    }
            
    else if(userSelection === 3){
        let id = Number.parseInt(prompt("Enter the id of your task: "));
        toggleTaskStatus(id); 
    }
            
    else if(userSelection === 4){
        console.log("Thank you for using our program!\n")
        flag = false;
    }
    
    else{
        console.log("Invalid user selection!\n");;
    }
}





