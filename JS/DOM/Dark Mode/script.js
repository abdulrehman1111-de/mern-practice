let button = document.getElementById("toggleBtn");

let hero = document.getElementById("hero");
let logo = document.getElementById("logo");
let badge = document.getElementById("badge");
let btnPrimary = document.getElementById("btnprimary");
let btnSecondary = document.getElementById("btnsecondary");

let features = document.getElementById("features");
let tag = document.getElementById("tag");
let sectionSubtitle = document.getElementById("sectionSubtitle");
let card = document.querySelectorAll(".card");
let iconBox = document.querySelectorAll(".icon-box");
let para = document.querySelectorAll(".p");
let statH = document.querySelectorAll(".statH");
let span = document.querySelectorAll(".span");

button.addEventListener("click", ()=>{
    hero.classList.toggle("heroDark");
    logo.classList.toggle("logo");
    button.classList.toggle("btnDark");
    badge.classList.toggle("badgeDark");
    btnPrimary.classList.toggle("btnprimaryDark");
    btnSecondary.classList.toggle("btnsecondaryDark");

    features.classList.toggle("featuresDark");
    tag.classList.toggle("tagDark");
    sectionSubtitle.classList.toggle("sectionsubtitleDark");

    card.forEach((item)=>{
        item.classList.toggle("cardDark")
    })
    iconBox.forEach((item)=>{
        item.classList.toggle("iconboxDark");
    })
    para.forEach((item)=>{
        item.classList.toggle("pDark");
    })
    statH.forEach((item)=>{
        item.classList.toggle("stathDark");
    })
    span.forEach((item)=>{
        item.classList.toggle("spanDark");
    })
})








