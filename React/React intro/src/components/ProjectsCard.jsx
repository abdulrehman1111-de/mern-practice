import NoireCard from "./NoireCard";
import TodoCard from "./TodoCard";
import YogaCard from "./YogaCard";

function ProjectsCard(){
    return(
        <div className="flex justify-center items-center space-x-6 mx-30">
            <NoireCard/>
            <TodoCard/>
            <YogaCard/>
        </div>
    )
}

export default ProjectsCard;