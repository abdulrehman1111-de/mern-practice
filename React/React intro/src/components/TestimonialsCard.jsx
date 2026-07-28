import ClassmateCard from "./ClassmateCard";
import InstructorCard from "./InstructorCard";

function TestimonialsCard(){
    return(
        <div className="flex justify-center items-center space-x-8 mx-30">
            <InstructorCard/>
            <ClassmateCard/>
        </div>
    )
}

export default TestimonialsCard;