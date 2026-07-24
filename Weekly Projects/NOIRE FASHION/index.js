const products = [
            {
                image: "https://i.pinimg.com/vwebp/1200x/1b/78/a8/1b78a8ea2a5e33540cf4538c37736839.webp",
                badge: "New",
                number: "01",
                category: 'FOOTWEAR',
                name: "Field Runner",
                price: "Rs. 12,900"
            },
            {
                image: "https://i.pinimg.com/1200x/f6/39/7c/f6397c23bc6e8356f001491fa26b9ffa.jpg",
                badge: "New",
                number: "02",
                category: 'OUTWEAR',
                name: "Coated Overshirt",
                price: "Rs. 18,500"
            },
            {
                image: "https://i.pinimg.com/1200x/8c/e1/d6/8ce1d6c3ccbc409f5868cde6f4537043.jpg",
                badge: "New",
                number: "03",
                category: 'FOOTWEAR',
                name: "Bound Lofer",
                price: "Rs. 14,200"
            },
            {
                image: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?q=80&w=800&auto=format&fit=crop",
                badge: "New",
                number: "04",
                category: 'ACCESSORY',
                name: "Ledger Watch",
                price: "Rs. 9,800"
            }
        ];

        function initCarousel() {
    const container = document.getElementById('cardContainer');
    
    // Apply scroll-snap behavior via inline styles — doesn't touch your Tailwind classes
    container.style.display = 'flex';
    container.style.overflowX = 'auto';
    container.style.scrollSnapType = 'x mandatory';
    container.style.scrollBehavior = 'smooth';

    Array.from(container.children).forEach(card => {
        card.style.scrollSnapAlign = 'center';
        card.style.flexShrink = '0';
    });
}

        function initCarousel2() {
    const container = document.querySelector(".thirdImg");
    
    
    container.style.display = 'flex';
    container.style.overflowX = 'auto';
    container.style.scrollSnapType = 'x mandatory';
    container.style.scrollBehavior = 'smooth';

    Array.from(container.children).forEach(card => {
        card.style.scrollSnapAlign = 'center';
        card.style.flexShrink = '0';
    });
}

        function createProductCard(product){
            return `
                <div class="mainCards pb-10">
                    <div class="cardSurface h-90 sm:h-110 md:h-103 bg-cover bg-center flex flex-row gap-45 sm:gap-110 md:gap-53 lg:gap-47 pt-4 pl-4 sm:pl-7 lg:pl-2" style = "background-image: url('${product.image}')">
                        <div class="bg-[#C1121F] text-[#FFFFFF] jetBrains h-8 w-12 z-1 flex justify-center items-center text-sm">${product.badge}</div>
                        <div class="jetBrains text-[#ffffff]">${product.number}</div>
                    </div>
                    <div class="h-35 md:h-35 pt-5 pl-5 flex flex-col gap-2.5 bg-[#FFFFFF] border-1 border-[rgba(19,17,20,0.14)] darkSurface">
                        <p class="jetBrains text-[#5B5A61] text-sm softText">${product.category}</p>
                        <p class="text-[#131114] fraunces text-xl lightText">${product.name}</p>
                        <p class="text-[#131114] jetBrains lightText">${product.price}</p>
                    </div>
                    
                    <a href = "./shop.html" class="border-1 border-[rgba(19,17,20,0.14)] h-12 flex flex-row jetBrains text-sm"><div class="cardSurface w-[50%] flex justify-center items-center darkSurface lightText view"><button>View</button></div>
                    <div class="addBtn w-[50%] text-[#FFFFFF] bg-[#131114] flex justify-center items-center darkInvert darkInvertText"><button>Add</button></div></a>
                
                    
                </div>
            `
        };

        initCarousel2();

        let cardContainer = document.getElementById("cardContainer");
        cardContainer.innerHTML = products.map((item)=>{
            return createProductCard(item);
        }).join("");

        const darkActivator = document.getElementById("darkActivator");
        const html = document.getElementById("dark");
        
        darkActivator.addEventListener("click", ()=>{
        html.classList.toggle("dark");
})

        const heroSection = document.querySelector('.section2');
        const glow = document.querySelector('.cursorGlow');

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
    
            glow.style.transform = `translate(${x - glow.offsetWidth / 2}px, ${y - glow.offsetHeight / 2}px)`;
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

    
    function addWelcomeMsg(){
        const section2 = document.getElementById("welcomeSection");

        const currDay = new Date();
        let day = currDay.getDay();
        
        switch(day){
            case 1:
                day = "Monday";
                break;
            
            case 2:
                day = "Tuesday";
                break;
                
            case 3:
                day = "Wednesday";
                break;    
            
            case 4:
                day = "Thursday";
                break;
            
            case 5:
                day = "Friday";
                break;
            
            case 6:
                day = "Saturday";
                break;
            
            default:
                day = "Sunday";
        }
            section2.insertAdjacentHTML("beforeend", 
                `
            <div id= "welcome" class="welcome w-[80%] h-15 bg-linear-to-r from-[#C1121F] to-[#131114] text-[#F1EDE7] absolute z-100 top-5 translate-x-2 flex justify-center items-center">
                <p class="text-xl lg:text-2xl fraunces">Good ${day}!</p>
            </div>
            `
            );

            const welcome = document.getElementById("welcome");

            
            setTimeout(()=>{
                document.getElementById("welcome").remove();
            }, 6000);
    }   

    addWelcomeMsg();











