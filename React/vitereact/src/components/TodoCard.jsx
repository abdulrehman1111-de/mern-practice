function TodoCard(){
    return(
        <div className="border-1 border-neutral-800 min-h-40 w-[80%] bg-neutral-900 rounded-lg flex flex-col gap-3 justify-center p-6">
            <p className="text-xl font-semibold">To-Do App</p>
            <p className="text-neutral-400 text-sm">RLocalStorage-based task manager with UUID handling.</p>
            <a href=""><p className="text-sm text-indigo-400">View project →</p></a>
        </div>
    )
}

export default TodoCard;