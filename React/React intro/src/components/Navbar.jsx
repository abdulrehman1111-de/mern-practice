function Navbar(){
    return (
        <nav className="flex justify-between items-center border-1 border-neutral-800 h-auto w-full p-6">
            <p className="text-2xl font-semibold">Abdul.<span className="text-indigo-400">dev</span></p>
            <ul className="flex gap-7 text-neutral-300">
                <a href=""><li className="hover:text-neutral-100">Skills</li></a>
                <a href=""><li className="hover:text-neutral-100">Projects</li></a>
                <a href=""><li className="hover:text-neutral-100">Testimonials</li></a>
                <a href=""><li className="hover:text-neutral-100">Contacts</li></a>
            </ul>
        </nav>
    )
}

export default Navbar;













