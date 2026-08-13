history.scrollRestoration = "manual"

const menu = document.getElementById("menu");
const sidePanel = document.getElementById("sidePanel");

menu.addEventListener("click", () => {


    if (sidePanel.classList.contains("hiddenClass")) {
        sidePanel.classList.remove("hiddenClass");
        sidePanel.classList.remove("visibilityHidden");
        sidePanel.classList.add("removeHiddenClass");
        document.body.style.overflow = "hidden";
    }
    else {
        sidePanel.classList.remove("removeHiddenClass");
        sidePanel.classList.add("hiddenClass");


        setTimeout(() => {
            sidePanel.classList.add("visibilityHidden");
            document.body.style.overflow = "";
        }, 300);
    }

})

function sidePanelCloser() {
    sidePanel.classList.remove("removeHiddenClass");
    sidePanel.classList.add("hiddenClass");

    setTimeout(() => {
        sidePanel.classList.add("visibilityHidden");
        document.body.style.overflow = "";
    }, 300);
}

const cardsGroup = document.querySelectorAll(".hiddenCards");
const showCardsBtn = document.getElementById("showCardsBtn");
const showCardPara = document.getElementById("showCardPara");

showCardsBtn.addEventListener("click", () => {
    if (window.innerWidth >= 1024) {
        const isHidden = cardsGroup[0].classList.contains("hidden");
        cardsGroup.forEach((card) => {
            if (isHidden) {
                card.classList.remove("hidden");
                card.classList.add("aos-animate");
            }
            else {
                card.classList.add("hidden");
            }
            showCardPara.innerHTML = isHidden ? "Show less poses" : "Show more poses";
        })
    }
})

function incrementer(element) {

    let numberStartingFromZero = 0;
    let target = parseInt(element.getAttribute("data-target"));

    const intervalId = setInterval(() => {

        element.textContent = numberStartingFromZero;

        if (numberStartingFromZero >= target) {
            clearInterval(intervalId);
            return;
        }

        numberStartingFromZero++;

    }, 100);
}

const counter = document.querySelectorAll(".counter");
const statsSection = document.getElementById("statsSection");
const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        counter.forEach((item) => {
            incrementer(item);
            observer.disconnect();
        })
    }
    
})
observer.observe(statsSection);













