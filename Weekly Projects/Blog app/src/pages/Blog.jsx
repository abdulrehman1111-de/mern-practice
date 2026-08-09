import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { User } from 'lucide-react'
import { X } from 'lucide-react'
import axios from 'axios'
import _ from 'lodash';

const Dashboard = () => {

    const content = [
        {   
            id: 1,
            image: "https://picsum.photos/seed/blogdesk1/800/600",
            heading: "heading",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium explicabo, quo provident tempora maiores pariatur incidunt in temporibus, facilis sunt tempore nulla fugiat rerum. Aspernatur perspiciatis ullam sint consequatur dicta deserunt, iusto aliquid dolorem dolor nisi, ea praesentium quod iure porro, reiciendis enim aliquam? Quo, accusantium esse! Ut, magni aliquam.",
            author: "John"
        },
        {   
            id: 2,
            image: "https://picsum.photos/seed/blogcoffee2/800/600",
            heading: "heading",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium explicabo, quo provident tempora maiores pariatur incidunt in temporibus, facilis sunt tempore nulla fugiat rerum. Aspernatur perspiciatis ullam sint consequatur dicta deserunt, iusto aliquid dolorem dolor nisi, ea praesentium quod iure porro, reiciendis enim aliquam? Quo, accusantium esse! Ut, magni aliquam.",
            author: "ALi"
        },
        {   
            id: 3,
            image: "https://picsum.photos/seed/blogtype3/800/600",
            heading: "heading",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium explicabo, quo provident tempora maiores pariatur incidunt in temporibus, facilis sunt tempore nulla fugiat rerum. Aspernatur perspiciatis ullam sint consequatur dicta deserunt, iusto aliquid dolorem dolor nisi, ea praesentium quod iure porro, reiciendis enim aliquam? Quo, accusantium esse! Ut, magni aliquam.",
            author: "Ahmad"
        },
        {   
            id: 4,
            image: "https://picsum.photos/seed/blognotebook4/800/600",
            heading: "heading",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium explicabo, quo provident tempora maiores pariatur incidunt in temporibus, facilis sunt tempore nulla fugiat rerum. Aspernatur perspiciatis ullam sint consequatur dicta deserunt, iusto aliquid dolorem dolor nisi, ea praesentium quod iure porro, reiciendis enim aliquam? Quo, accusantium esse! Ut, magni aliquam.",
            author: "John"
        },
        {   
            id: 5,
            image: "https://picsum.photos/seed/blogshelf5/800/600",
            heading: "heading",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium explicabo, quo provident tempora maiores pariatur incidunt in temporibus, facilis sunt tempore nulla fugiat rerum. Aspernatur perspiciatis ullam sint consequatur dicta deserunt, iusto aliquid dolorem dolor nisi, ea praesentium quod iure porro, reiciendis enim aliquam? Quo, accusantium esse! Ut, magni aliquam.",
            author: "ALi"
        },
        {   
            id: 6,
            image: "https://picsum.photos/seed/blogpen6/800/600",
            heading: "heading",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium explicabo, quo provident tempora maiores pariatur incidunt in temporibus, facilis sunt tempore nulla fugiat rerum. Aspernatur perspiciatis ullam sint consequatur dicta deserunt, iusto aliquid dolorem dolor nisi, ea praesentium quod iure porro, reiciendis enim aliquam? Quo, accusantium esse! Ut, magni aliquam.",
            author: "Ahmad"
        },
        {   
            id: 7,
            image: "https://picsum.photos/seed/blogpaper7/800/600",
            heading: "heading",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium explicabo, quo provident tempora maiores pariatur incidunt in temporibus, facilis sunt tempore nulla fugiat rerum. Aspernatur perspiciatis ullam sint consequatur dicta deserunt, iusto aliquid dolorem dolor nisi, ea praesentium quod iure porro, reiciendis enim aliquam? Quo, accusantium esse! Ut, magni aliquam.",
            author: "John"
        },
        {   
            id: 8,
            image: "https://picsum.photos/seed/blogstudy8/800/600",
            heading: "heading",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium explicabo, quo provident tempora maiores pariatur incidunt in temporibus, facilis sunt tempore nulla fugiat rerum. Aspernatur perspiciatis ullam sint consequatur dicta deserunt, iusto aliquid dolorem dolor nisi, ea praesentium quod iure porro, reiciendis enim aliquam? Quo, accusantium esse! Ut, magni aliquam.",
            author: "ALi"
        },
        {   
            id: 9,
            image: "https://picsum.photos/seed/blogink9/800/600",
            heading: "heading",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium explicabo, quo provident tempora maiores pariatur incidunt in temporibus, facilis sunt tempore nulla fugiat rerum. Aspernatur perspiciatis ullam sint consequatur dicta deserunt, iusto aliquid dolorem dolor nisi, ea praesentium quod iure porro, reiciendis enim aliquam? Quo, accusantium esse! Ut, magni aliquam.",
            author: "Ahmad"
        }
    ]

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const [blogs, setBlogs] = useState([]);
    const [heading, setHeading] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    
    const handleClick = () => {
    if (image.length === 0 || heading.trim().length === 0 || body.trim().length === 0 || author.trim().length === 0) {
        alert("Input field cannot be empty!");
        return false;
    }
    return true;
}

    if (open) {
        document.body.style.overflow = "hidden";
    }
    else {
    document.body.style.overflow = "";
    }

    useEffect(() => {
        if (!open) {
            setEdit(false);
        }
    }, [open])

    const getBlogs = () => {

    setBlogs(content);
}

useEffect(() => {

    const handleClick2 = () => {
        imageVal.value = "";
        setImage("");
        setHeading("");
        setBody("");
        setAuthor("");

        console.log("Clearing");
        console.log(imageVal);
    }

    cross.addEventListener("click", handleClick2);

    return () => {
        cross.removeEventListener("click", handleClick2);
    }

}, [open]);

    useEffect(() => {

        getBlogs();

    }, []);

    const deleteBlogs = (id) => {
        console.log(id);
    let newBlogs = blogs.filter((item) => {
        return item.id != id;
    })
    console.log(newBlogs);

    setBlogs(newBlogs);
}

const handleSubmit = (e) => {

    e.preventDefault();

    let newBlogs = {
        id: blogs.length + 1,
        heading,
        image,
        body, 
        author   
    }

    setBlogs([...blogs, newBlogs]);
}  

const handleSubmtiOnEdit = (e, obj)=>{
    e.preventDefault();
    setBlogs(blogs.map((b)=> b.id === obj.id ? obj:b));
}

const [initialObj, setInitialObj] = useState({});

const handleEdit = (item)=>{
    console.log(item);

    setHeading(item.heading)
    setImage(item.image);
    setBody(item.body);
    setAuthor(item.author)

    let obj = item;
    return obj;
}

const checkForEdits = (submittedObj)=>{
    if (_.isEqual(initialObj, submittedObj)){
        return initialObj;
    }
    else{
        return submittedObj;
    }
}

const imageConverter = (fileObject)=>{
    const url = URL.createObjectURL(fileObject);
    console.log(url);
    
    setImage(url);
}
    return (
        <>
            <div className='min-h-screen w-full bg-[#0A0E14] text-[#EDEFF2]' style={{ fontFamily: "'Inter', sans-serif" }}>

                <div className='flex w-full min-h-screen'>

                    <aside className='hidden md:flex flex-col justify-between w-20 shrink-0 border-r border-white/[0.06] py-8'>
                        <div className='flex flex-col items-center gap-1'>
                            <span
                                className='text-[13px] tracking-[0.35em] uppercase text-[#EDEFF2]/90 [writing-mode:vertical-rl]'
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                Dashboard
                            </span>
                        </div>
                        <div className='flex flex-col items-center gap-6 text-[#8B93A1]'>
                            <div className='w-8 h-8 rounded-full border border-white/10 flex items-center justify-center'>
                                <User size={14} />
                            </div>
                        </div>
                    </aside>

                    <main className='flex-1 px-6 sm:px-10 lg:px-16 py-12'>

                        <div className='flex items-end justify-between border-b border-white/[0.08] pb-6 mb-12 flex-wrap gap-6'>
                            <div>
                                <p className='text-[11px] tracking-[0.3em] uppercase text-[#E8A94C] mb-3'>
                                    The Journal
                                </p>
                                <h1
                                    className='text-4xl sm:text-5xl leading-none text-[#EDEFF2]'
                                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                                >
                                    Dispatches &amp; Drafts
                                </h1>
                            </div>

                            <button
                                className='group inline-flex items-center gap-2 border border-[#E8A94C]/40 text-[#E8A94C] px-5 py-2.5 rounded-full text-sm tracking-wide hover:bg-[#E8A94C] hover:text-[#0A0E14] transition-colors duration-200'
                                onClick={() => setOpen(true)}
                            >
                                <span className='text-lg leading-none'>{edit ? '✎' : '+'}</span>
                                {edit ? 'Edit entry' : 'New entry'}
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-8'>

                            {
                                blogs.map((item, index) => {
                                    return (
                                        <article
                                            key={item.id}
                                            className='group relative flex flex-col bg-[#12181F] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#E8A94C]/30 transition-colors duration-300'
                                        >
                                         
                                            <div className='relative h-80 w-full overflow-hidden'>
                                                <img
                                                    className='h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out'
                                                    src={item.image}
                                                    alt={item.heading}
                                                />
                                                <div className='absolute inset-0 bg-gradient-to-t from-[#0A0E14]/70 via-transparent to-transparent' />

                                                <div className='absolute top-3 left-3 flex items-center gap-1.5 bg-[#0A0E14]/80 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1'>
                                                    <span className='w-1.5 h-1.5 rounded-full bg-[#E8A94C]' />
                                                    <span className='text-[11px] tracking-[0.2em] uppercase text-[#EDEFF2]/80'>
                                                        Issue {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                </div>

                                                <div className='absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                                                    <button
                                                        onClick={() => deleteBlogs(item.id)}
                                                        className='w-8 h-8 rounded-full bg-[#0A0E14]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#EDEFF2]/70 hover:text-red-400 hover:border-red-400/40 transition-colors'
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setOpen(true)
                                                            setEdit(true);
                                                            setInitialObj(handleEdit(item));
                                                        }}
                                                        className='w-8 h-8 rounded-full bg-[#0A0E14]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#EDEFF2]/70 hover:text-[#E8A94C] hover:border-[#E8A94C]/40 transition-colors'
                                                    >
                                                        <Pencil size={13} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className='flex flex-col flex-1 p-6'>
                                                <h2
                                                    className='text-xl mb-3 text-[#EDEFF2] leading-snug'
                                                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                                                >
                                                    {item.heading}
                                                </h2>
                                                <p className='text-sm text-[#8B93A1] leading-relaxed line-clamp-4 flex-1'>
                                                    {item.body}
                                                </p>

                                                <div className='mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2'>
                                                    <div className='w-6 h-6 rounded-full bg-[#E8A94C]/15 border border-[#E8A94C]/30 flex items-center justify-center'>
                                                        <User size={11} className='text-[#E8A94C]' />
                                                    </div>
                                                    <span className='text-xs tracking-wide text-[#8B93A1] uppercase'>
                                                        {item.author}
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })
                            }

                        </div>
                    </main>
                </div>
            </div>

            <div className={`fixed top-0 h-screen w-full sm:w-[420px] bg-[#0D131B] border-l border-white/[0.08] z-50 transition-all duration-500 ease-out text-[#EDEFF2] ${open ? "right-0" : "-right-full sm:right-[-440px]"}`} style={{ fontFamily: "'Inter', sans-serif" }}>

                <div className='flex flex-col h-full'>

                    <div className='flex justify-between items-center px-8 pt-8 pb-6 border-b border-white/[0.06]'>
                        <div>
                            <p className='text-[11px] tracking-[0.3em] uppercase text-[#E8A94C] mb-1'>
                                {edit ? "Revise" : "Compose"}
                            </p>
                            <h2 className='text-2xl' style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                {edit ? "Edit entry" : "New entry"}
                            </h2>
                        </div>
                        <button
                            id='cross'
                            onClick={() => setOpen(!open)}
                            className='w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#8B93A1] hover:text-[#EDEFF2] hover:border-white/30 transition-colors'
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <form action="" onSubmit={handleSubmit} className='flex-1 overflow-y-auto px-8 py-6'>
                        <div className='flex flex-col gap-6'>

                            <div>
                                <label htmlFor="inputHeading" className='block text-[11px] tracking-[0.2em] uppercase text-[#8B93A1] mb-2'>
                                    Heading
                                </label>
                                <input
                                    className='w-full bg-transparent border-b border-white/15 focus:border-[#E8A94C] outline-none py-2 text-lg placeholder:text-[#8B93A1]/50 transition-colors'
                                    style={{ fontFamily: "'Fraunces', serif" }}
                                    type="text" name="" id="inputHeading"
                                    onChange={(e) => setHeading(e.target.value)} value={heading}
                                    placeholder='Give it a title'
                                />
                            </div>

                            <div className='border border-dashed border-white/15 rounded-xl px-4 py-4 hover:border-[#E8A94C]/40 transition-colors'>
                                <label htmlFor="inputImage" className='block text-[11px] tracking-[0.2em] uppercase text-[#8B93A1] mb-2'>
                                    Cover image
                                </label>
                                <input
                                    onChange={(e) => imageConverter(e.target.files[0])}
                                    type="file" name="inputImage" id="inputImage"
                                    className='w-full text-sm text-[#8B93A1] file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border file:border-[#E8A94C]/40 file:bg-transparent file:text-[#E8A94C] file:text-xs file:tracking-wide file:cursor-pointer hover:file:bg-[#E8A94C]/10'
                                />
                                {
                                    image && (
                                        <img className='h-24 w-full object-cover rounded-lg' src={image} alt="" />
                                    )
                                }
                            </div>

                            <div>
                                <label htmlFor="inputBody" className='block text-[11px] tracking-[0.2em] uppercase text-[#8B93A1] mb-2'>
                                    Body
                                </label>
                                <input
                                    className='w-full bg-transparent border-b border-white/15 focus:border-[#E8A94C] outline-none py-2 text-sm text-[#EDEFF2]/90 placeholder:text-[#8B93A1]/50 transition-colors'
                                    type="text" name="body" id="inputBody"
                                    onChange={(e) => setBody(e.target.value)} value={body}
                                    placeholder='Write a short excerpt'
                                />
                            </div>

                            <div>
                                <label htmlFor="inputAuthor" className='block text-[11px] tracking-[0.2em] uppercase text-[#8B93A1] mb-2'>
                                    Author
                                </label>
                                <input
                                    className='w-full bg-transparent border-b border-white/15 focus:border-[#E8A94C] outline-none py-2 text-sm placeholder:text-[#8B93A1]/50 transition-colors'
                                    type="text" name="author" id="inputAuthor"
                                    onChange={(e) => setAuthor(e.target.value)} value={author}
                                    placeholder='Your name'
                                />
                            </div>
                        </div>
                    </form>

                    <div className='px-8 pb-8 pt-4'>
                        <button
                            onClick={(e) => {

                                if (!edit) {
                                    if(!handleClick()) return;
                                    handleSubmit(e);
                                    setOpen(false);
                                }
                                else {
                                    if(!handleClick()) return;
                                    const submittedObj = {
                                        id: initialObj.id,
                                        image: image,
                                        heading: heading,
                                        body: body,
                                        author: author
                                    }

                                    const finalObj = checkForEdits(submittedObj);
                                    handleSubmtiOnEdit(e, finalObj);
                                    setOpen(false);
                                }

                            }}
                            id='addBtn' 
                            className='w-full h-12 rounded-full bg-[#E8A94C] text-[#0A0E14] font-semibold text-sm tracking-wide hover:bg-[#f0bb6a] transition-colors duration-200'
                        >
                            {edit ? "Save changes" : "Publish entry"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
