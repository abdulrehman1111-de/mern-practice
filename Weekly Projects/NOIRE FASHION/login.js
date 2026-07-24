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
            }
            else{
                document.body.insertAdjacentHTML("beforeend", 
                `
            <div class="menu hide fixed w-full h-150 z-100 top-0 bg-black absolute flex flex-col gap-3">
                <div id="closeMenu" class="ham flex flex-col gap-2 relative top-5 left-5 lg:hidden">
                        <div class="w-8 bg-black h-0.5 darkInvert"></div>
                        <div class="w-8 bg-black h-0.5 darkInvert"></div>
                        <div class="w-8 bg-black h-0.5 darkInvert"></div>
                    </div>
                <ul class="text-white flex flex-col pt-20 gap-10 justify-center items-center relative left-25 sm:left-60 md:left-75">
                    <li class="text-3xl underline1"><a href="./index.html">HOME</a></li>
                        <li class="text-3xl underline1"><a href="./collection.html">COLLECTION</a></li>
                        <li class="text-3xl underline1"><a href="./shop.html">SHOP</a></li>
                        <li class="text-3xl underline1"><a href="./login.html">LOGIN</a></li>
                </ul>
            </div>
            `
            )
            document.body.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
            setTimeout(()=>{
                document.querySelector(".menu")?.classList.remove("hide");
            }, 300);
            }


        });
        
        document.addEventListener("click", (e) => {
            if (e.target.closest("#closeMenu")) {

                const menu = document.querySelector(".menu");
                menu.classList.add("hide");

                setTimeout(()=>{
                    document.querySelector(".menu")?.remove();
                    document.body.style.overflow = "";
                }, 300);
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
        });

        const section10 = document.getElementById("section10Id");

        let existingData = JSON.parse(localStorage.getItem("users"));

        if(existingData === null){
            existingData = [];
        }

        let logBtn = document.getElementById("logBtn");
        logBtn.addEventListener("click", ()=>{

            const welcome = document.querySelector("#welcome");
            if(welcome) {
                welcome.remove();
            } 

            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");
            
            let email = emailInput.value.trim();
            let password = passwordInput.value.trim();

            if((email === "") || (password === "")){
                section10.insertAdjacentHTML("beforeend", `
                        <div id= "welcome" class="welcome w-[80%] h-15 bg-linear-to-r from-[#C1121F] to-[#131114] text-[#F1EDE7] fixed z-100 top-10 translate-x-2 flex justify-center items-center">
                         <p class="text-xl lg:text-2xl fraunces">Please fill out the credentials!</p>
                        </div>
                    `)
                return;
            }
            
            const matchedUser = existingData.find((user)=> user.newEmail === email);

            if(!matchedUser){
                section10.insertAdjacentHTML("beforeend", `
                        <div id= "welcome" class="welcome w-[80%] h-15 bg-linear-to-r from-[#C1121F] to-[#131114] text-[#F1EDE7] fixed z-100 top-10 translate-x-2 flex justify-center items-center">
                         <p class="text-xl lg:text-2xl fraunces">Email doesnot exist signup instead!</p>
                        </div>
                    `)
                return;
            }
            
            if(matchedUser.newPassword === password){
                section10.insertAdjacentHTML("beforeend", `
                        <div id= "welcome" class="welcome w-[80%] h-15 bg-linear-to-r from-[#C1121F] to-[#131114] text-[#F1EDE7] fixed z-100 top-10 translate-x-2 flex justify-center items-center">
                         <p class="text-xl lg:text-2xl fraunces">User logged in successfully!</p>
                        </div>
                    `)
                setTimeout(()=>{
                    window.location.reload();
                    window.location.href = "./index.html";
                }, 4000);
                return;
            }
            else{
                section10.insertAdjacentHTML("beforeend", `
                        <div id= "welcome" class="welcome w-[80%] h-15 bg-linear-to-r from-[#C1121F] to-[#131114] text-[#F1EDE7] fixed z-100 top-10 translate-x-2 flex justify-center items-center">
                         <p class="text-xl lg:text-2xl fraunces">Wrong password!</p>
                        </div>
                    `)
            }

        });

        












