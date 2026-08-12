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













