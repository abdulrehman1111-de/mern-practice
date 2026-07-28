import ProjectsCard from "./ProjectsCard";

function Projects(){
    return(
        <section className="border-1 border-neutral-800 min-h-80 py-5">
            <div className="w-full flex justify-center items-center min-h-25">
                <p className="text-2xl font-semibold">Projects</p>
            </div>
            <ProjectsCard/>
        </section>
    )
}

export default Projects;