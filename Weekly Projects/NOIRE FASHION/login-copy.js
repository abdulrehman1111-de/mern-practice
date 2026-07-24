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
        })

        let existingUsers = JSON.parse(localStorage.getItem("users"));
        if(existingUsers === null){
            existingUsers = [];
        }
        console.log(existingUsers);

        const signBtn = document.getElementById("signBtn");

        signBtn.addEventListener("click", ()=>{

        const welcome = document.querySelector("#welcome");
        if(welcome) {
            welcome.remove();
        } 

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        const section10 = document.getElementById("section10Id");

        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();
        let confirmPassword = confirmPasswordInput.value.trim();

        let newUserObj;

        if ((email === "") || (password === "") || (confirmPassword === "")){
            section10.insertAdjacentHTML("beforeend", 
                        `
                        <div id= "welcome" class="welcome w-[80%] h-15 bg-linear-to-r from-[#C1121F] to-[#131114] text-[#F1EDE7] fixed z-100 top-10 translate-x-2 flex justify-center items-center">
                         <p class="text-xl lg:text-2xl fraunces">Please fill out the required information!</p>
                        </div>
                        `
                    )
            return;
        }
        else{

            let existingEmail = false;
            for (let user of existingUsers){
                if (user.newEmail === email){
                    section10.insertAdjacentHTML("beforeend", 
                        `
                        <div id= "welcome" class="welcome w-[80%] h-15 bg-linear-to-r from-[#C1121F] to-[#131114] text-[#F1EDE7] fixed z-100 top-10 translate-x-2 flex justify-center items-center">
                         <p class="text-xl lg:text-2xl fraunces">Email already exists!</p>
                        </div>
                        `
                    )
                    existingEmail = true;
                    return;
                }
            }

            if((password) !== (confirmPassword)){
                section10.insertAdjacentHTML("beforeend", 
                        `
                        <div id= "welcome" class="welcome w-[80%] h-15 bg-linear-to-r from-[#C1121F] to-[#131114] text-[#F1EDE7] fixed z-100 top-10 translate-x-2 flex justify-center items-center">
                         <p class="text-xl lg:text-2xl fraunces">Passwords dont match!</p>
                        </div>
                        `
                    )
                return;
            }

            newUserObj = {
                newEmail: email,
                newPassword: password
            }
            existingUsers.push(newUserObj);
            localStorage.setItem("users", JSON.stringify(existingUsers));
            section10.insertAdjacentHTML("beforeend", 
                        `
                        <div id= "welcome" class="welcome w-[80%] h-15 bg-linear-to-r from-[#C1121F] to-[#131114] text-[#F1EDE7] fixed z-100 top-10 translate-x-2 flex justify-center items-center">
                         <p class="text-xl lg:text-2xl fraunces">SignUp successfull!</p>
                        </div>
                        `
                    )
        }
        setTimeout(()=>{
            window.location.reload();
            window.location.href = "./login.html"
        }, 3000);
    })

    let data = JSON.parse(localStorage.getItem("users"));
    console.log(data);


    

        









