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
            }
        ];

        function createProductCard(product){
            return `
                <div class="pb-10">
                    <div class="h-90 sm:h-110 md:h-103 bg-cover bg-centergap-45 flex flex-row gap-45 sm:gap-110 md:gap-53 lg:gap-47 pt-4 pl-4 sm:pl-7 lg:pl-2" style = "background-image: url('${product.image}')">
                        <div class="bg-[#C1121F] text-[#FFFFFF] jetBrains h-8 w-12 z-1 flex justify-center items-center text-sm">${product.badge}</div>
                        <div class="jetBrains text-[#ffffff]">${product.number}</div>
                    </div>
                    <div class="h-35 md:h-35 pt-5 pl-5 flex flex-col gap-2.5 bg-[#FFFFFF] border-1 border-[rgba(19,17,20,0.14)]">
                        <p class="jetBrains text-[#5B5A61] text-sm">${product.category}</p>
                        <p class="text-[#131114] fraunces text-xl">${product.name}</p>
                        <p class="text-[#131114] jetBrains">${product.price}</p>
                    </div>
                    <div class="border-1 border-[rgba(19,17,20,0.14)] h-12 flex flex-row jetBrains text-sm">
                        <div class="w-[50%] bg-[#FFFFFF] text-[131114] flex justify-center items-center"><button>View</button></div>
                        <div class="w-[50%] text-[#FFFFFF] bg-[#131114] flex justify-center items-center"><button>Add</button></div>
                    </div>
                </div>
            `
        };

        let cardContainer = document.getElementById("cardContainer");
        cardContainer.innerHTML = products.map((item)=>{
            return createProductCard(item);
        }).join("");

        const darkActivator = document.getElementById("darkActivator");
        const html = document.getElementById("dark");
        
        darkActivator.addEventListener("click", ()=>{
        html.classList.toggle("dark");
})











