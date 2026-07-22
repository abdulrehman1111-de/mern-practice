const products = [
            {
                image: "https://images.unsplash.com/photo-1558121556-2a39fc528338?q=80&w=800&auto=format&fit=crop",
                badge: "New",
                number: "01",
                category: 'FOOTWEAR',
                name: "Field Runner",
                price: "Rs. 12,900"
            },
            {
                image: "https://images.unsplash.com/photo-1773259592395-144b30949978?q=80&w=800&auto=format&fit=crop",
                badge: "New",
                number: "02",
                category: 'OUTWEAR',
                name: "Coated Overshirt",
                price: "Rs. 18,500"
            },
            {
                image: "https://images.unsplash.com/photo-1576792741377-eb0f4f6d1a47?q=80&w=800&auto=format&fit=crop",
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
            },
            {
                image: "https://i.pinimg.com/originals/63/8c/4f/638c4fd4a96f61a289ff9d68f7c3688e.png",
                badge: "New",
                number: "05",
                category: 'APPAREL',
                name: "Raw Selvedge Denim",
                price: "Rs. 11,400"
            },
            {
                image: "https://i.pinimg.com/736x/16/a7/2d/16a72da16b9b5d8c789a2821d2d94aa7.jpg",
                badge: "New",
                number: "06",
                category: 'APPAREL',
                name: "Column Dress",
                price: "Rs. 15,600"
            },
            {
                image: "https://i.pinimg.com/736x/a1/62/b7/a162b7c735e08607d9573e0cffcfb5e6.jpg",
                badge: "New",
                number: "07",
                category: 'APPAREL',
                name: "Linen Shirt",
                price: "Rs. 7,200"
            },
            {
                image: "https://i5.walmartimages.com/seo/CaComMARK-PI-Clearance-Denim-Shirt-Dress-Women-Denim-Dress-for-Women-with-Pockets-Jean-Button-Down-Shirt-Dresses-Long-Sleeve-Blue_8fdc1631-5f20-42a1-a586-aadd5aa6fcdd.2a286ad7f8d4ed03ab30a0b130b7b723.jpeg",
                badge: "New",
                number: "08",
                category: 'OUTWEAR',
                name: "Structured Blazer",
                price: "Rs. 21,300"
            },
            {
                image: "https://i.pinimg.com/originals/37/29/c0/3729c0a7ead1eff7a6db47a5ed5fe6c8.jpg",
                badge: "New",
                number: "09",
                category: 'ACCESSORY',
                name: "Grain Belt",
                price: "Rs. 5,600"
            },
            {
                image: "https://at-wp.logbase.io/wp-content/uploads/2025/04/DALL_E2024-06-0811.04.04-Apairofstylishbrownsneakersmadefromhigh-qualitymaterials.Comfortableandperfectforcasualwear.Displaythesneakersonaplainwhiteback.jpg",
                badge: "New",
                number: "10",
                category: 'FOOTWEAR',
                name: "Court Sneaker",
                price: "Rs. 13,750"
            },
            {
                image: "https://images.stockcake.com/public/1/6/d/16d1cb7f-ddd4-4663-bea4-1106016fc68e/nineties-street-style-stockcake.jpg",
                badge: "New",
                number: "11",
                category: 'APPAREL',
                name: "Tapered Trouser",
                price: "Rs. 9,400"
            },
            {
                image: "https://d9h5s6u2c7pvc.cloudfront.net/sites/files/merlingoldsmith/closeup-many-elegant-gold-chains-with-heart-shape-pendant-model-white-shirt-metal-necklace.jpg",
                badge: "New",
                number: "12",
                category: 'ACCESSORY',
                name: "Chain Bracelet Set",
                price: "Rs. 4,300"
            }
        ];

        function initCarousel() {
    const container = document.getElementById('cardContainer');
    
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
    if(!container){
        return;
    }
    
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
                    <div class="h-90 sm:h-110 md:h-103 bg-cover bg-center flex flex-row gap-45 sm:gap-110 md:gap-53 lg:gap-47 pt-4 pl-4 sm:pl-7 lg:pl-2" style = "background-image: url('${product.image}')">
                        <div class="bg-[#C1121F] text-[#FFFFFF] jetBrains h-8 w-12 z-1 flex justify-center items-center text-sm">${product.badge}</div>
                        <div class="jetBrains text-[#ffffff]">${product.number}</div>
                    </div>
                    <div class="h-35 md:h-35 pt-5 pl-5 flex flex-col gap-2.5 bg-[#FFFFFF] border-1 border-[rgba(19,17,20,0.14)] darkSurface">
                        <p class="jetBrains text-[#5B5A61] text-sm softText">${product.category}</p>
                        <p class="text-[#131114] fraunces text-xl lightText">${product.name}</p>
                        <p class="text-[#131114] jetBrains lightText">${product.price}</p>
                    </div>
                    <div class="border-1 border-[rgba(19,17,20,0.14)] h-12 flex flex-row jetBrains text-sm">
                        <div class="w-[50%] bg-[#FFFFFF] text-[131114] flex justify-center items-center darkSurface lightText view"><button>View</button></div>
                        <div class="addBtn w-[50%] text-[#FFFFFF] bg-[#131114] flex justify-center items-center darkInvert darkInvertText"><button>Add</button></div>
                    </div>
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
                    <li class= "text-3xl">HOME</li>
                    <li class= "text-3xl">COLLECTION</li>
                    <li class= "text-3xl">LOGIN</li>
                </ul>
            </div>
            `
            )
            };
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












