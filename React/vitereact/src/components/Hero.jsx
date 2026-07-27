import BlueBtn from "./BlueBtn";
import WhiteBtn from "./WhiteBtn";

function Hero(){
    return(
        <section className="h-auto border-1 border-neutral-800 flex flex-col justify-center items-center min-h-100 space-y-6">
            <p className="font-bold text-5xl">Building things, one component at a time</p>
            <p className="text-neutral-400 max-w-[45%] text-center">BSCS student learning React by building real, reusable UI pieces instead of copy-pasted markup.</p>
            <div className="flex space-x-5 w-[80%] justify-center items-center">
                <BlueBtn/>
                <WhiteBtn/>
            </div>
        </section>
    )
}

export default Hero;








