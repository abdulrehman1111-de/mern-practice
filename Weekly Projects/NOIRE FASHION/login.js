        const darkActivator = document.getElementById("darkActivator");
        const html = document.getElementById("dark");
        
        darkActivator.addEventListener("click", ()=>{
        html.classList.toggle("dark");
        });

        let menu = document.getElementById("ham");
        menu.addEventListener("click", ()=>{

            let existingMenu = document.querySelector(".menu");
            if (existingMenu){
                existingMenu.classList.add("closing");
                setTimeout(()=>{
                    existingMenu.remove();
                }, 500);
            }
            else{
                document.body.insertAdjacentHTML("beforeend", 
                `
            <div class="menu w-full h-150 z-100 top-0 bg-black absolute flex flex-col gap-3">
                <div id="closeMenu" class="ham flex flex-col gap-2 relative top-2 lg:hidden">
                        <div class="w-8 bg-black h-0.5 darkInvert"></div>
                        <div class="w-8 bg-black h-0.5 darkInvert"></div>
                        <div class="w-8 bg-black h-0.5 darkInvert"></div>
                    </div>
                <ul class="text-white flex flex-col pt-20 gap-7 justify-center items-center">
                    <li class="text-3xl underline1"><a href="./index.html">HOME</a></li>
                        <li class="text-3xl underline1"><a href="./collection.html">COLLECTION</a></li>
                        <li class="text-3xl underline1"><a href="./shop.html">SHOP</a></li>
                        <li class="text-3xl underline1"><a href="./login.html">LOGIN</a></li>
                </ul>
            </div>
            `
            )
            }
        });
        
        document.addEventListener("click", (e) => {
            if (e.target.closest("#closeMenu")) {
                document.querySelector(".menu")?.remove();
            }
        });

        let radio = document.querySelectorAll(".radio");
        radio.forEach((item)=>{
            item.addEventListener("click", ()=>{
                radio.forEach((r)=>{
                    r.style.backgroundColor = "";
                    r.style.color = "";
                })
                item.style.backgroundColor = "#F1EDE7";
                item.style.color = "#0B0B0D";
            })
        })












