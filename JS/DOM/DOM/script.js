// console.log(window);
// console.log(window.document);
// console.dir(document);
// console.log(document.baseURI);
// console.log(document.links);

let title = document.getElementById("title");
// console.log(title.id);
// console.log(title.className);
// console.log(title.getAttribute('id'));
// title.setAttribute('class', 'test');
title.setAttribute('class', 'test heading');

title.style.backgroundColor = "green";
title.style.padding = "15px";
title.style.borderRadius = "15px";

// console.log(title.textContent);
// console.log(title.innerHTML);
// console.log(title.innerText);

let heading = document.getElementsByClassName("heading");
let h2 = document.querySelector('h2');
document.querySelector("#title");
document.querySelector(".heading");
document.querySelector('input[type="password"]');

const myUl = document.querySelector("ul");
let turnGreen = myUl.querySelector("li");
turnGreen.style.backgroundColor = "green";
turnGreen.style.padding = "16px";
turnGreen.innerText = "Four";

let li = document.querySelectorAll("li");

li.forEach((item)=>{
    item.style.backgroundColor = "green";
})
li[0].style.backgroundColor = "red";

let tempClassList = document.getElementsByClassName("listItem");
let arr = Array.from(tempClassList);
arr.forEach((item)=>{
    item.innerText = "HAHAHA";
})

