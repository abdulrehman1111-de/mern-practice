let listArr = [];
let filteredArr = [];

const section2 = document.getElementById("section2");
const targetUl = document.getElementById("targetUl");

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", ()=>{

    const inputTxt = document.getElementById("inputTxt");
    const text = inputTxt.value.trim();

    const listObj = {
        id: crypto.randomUUID(),
        value: text
    }

    listArr.push(listObj);
    localStorage.setItem("notes", JSON.stringify(listArr));

    renderList();
    

})

function renderList(){
    targetUl.innerHTML = "";

    listArr = JSON.parse(localStorage.getItem("notes")) || [];
    for (let i = 0; i < listArr.length; i++){
        targetUl.insertAdjacentHTML("beforeend", 
        
        `
        <li id = todo-${listArr[i].id} class="flex items-center justify-between gap-3 bg-[#1C1A17] border border-[#3A362F] rounded-lg px-4 py-3 text-[#EDE7DC]">${listArr[i].value}
        <span class="flex gap-2">
        <button class = "del text-xs font-mono px-3 py-1 rounded-md border border-[#3A362F] text-[#D98C7E] hover:bg-[#2E1F1C] transition-colors">Delete</button>
        <button class = "edit text-xs font-mono px-3 py-1 rounded-md border border-[#3A362F] text-[#D4A15F] hover:bg-[#28251F] transition-colors">Edit</button>
        </span>
        </li>
        `
        )

        let delBtn = document.querySelector(`#todo-${listArr[i].id} .del`);
        delBtn.addEventListener("click", ()=>{
            const targetParent = delBtn.closest(`#todo-${listArr[i].id}`);
            targetParent.remove();
            filteredArr = [];
            let comparisonParentId = targetParent.id.replace('todo-', "");
            for (let j = 0; j < listArr.length; j++){
                if (listArr[j].id === comparisonParentId){
                    continue;
                }
                filteredArr.push(listArr[j]);
            }
            listArr = filteredArr;
            localStorage.setItem("notes", JSON.stringify(listArr));
            renderList();
        })

        let editBtn = document.querySelector(`#todo-${listArr[i].id} .edit`);
        editBtn.addEventListener("click", ()=>{
            
            let editedValue = prompt(`Edit: `, listArr[i].value);
            if (editedValue === null){
                editedValue = listArr[i].value;
            }
            const targetParent = editBtn.closest(`#todo-${listArr[i].id}`);
            let comparisonParentId = targetParent.id.replace('todo-', "");
            for (let k = 0; k < listArr.length; k++){
                if(listArr[k].id === comparisonParentId){
                    listArr[k].value = editedValue;
                }
            }
            localStorage.setItem("notes", JSON.stringify(listArr));
            renderList();
        })
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    renderList();
})