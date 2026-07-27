import HtmlCard from "./HtmlCard.jsx";
import JavascriptCard from "./JavascriptCard.jsx";
import ReactCard from "./ReactCard.jsx";
import TailwindCard from "./TailwindCard.jsx";

function CardSection(){
    return(
        <section className="border-1 border-neutral-800 min-h-80 pt-5">
            <div className="w-full flex justify-center items-center min-h-25">
                <p className="text-2xl font-semibold">Skills</p>
            </div>
            <div className="flex justify-center items-center mx-40 space-x-7">
                <ReactCard/>
                <TailwindCard/>
                <JavascriptCard/>
                <HtmlCard/>
            </div>
        </section>
    )
}

export default CardSection;









