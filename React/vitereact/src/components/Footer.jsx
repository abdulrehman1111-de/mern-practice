function Footer(){
    return(
        <footer className="min-h-75 py-5 pt-8 flex justify-center items-center">
            <div className="w-[30%] min-h-40 flex flex-col justify-center items-center space-y-3">
                <p className="text-2xl font-semibold">Get in touch</p>
                <div className="mt-1 bg-indigo-500 min-h-13 w-[30%] rounded-lg text-nowrap flex justify-center items-center">
                <button>
                <p className="font-semibold">Say Hello</p>
                </button>
                </div>
                <p className="pt-5">© 2026 Abdul Rehman</p>
            </div>
        </footer>
    )
}

export default Footer;