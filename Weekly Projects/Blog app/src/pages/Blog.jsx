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
            para: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime illo, alias perspiciatis commodi ducimus ullam nesciunt doloremque eligendi eos voluptatem. Iusto, ducimus numquam.",
            author: "John"
        },
        {   
            id: 2,
            para: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime illo, alias perspiciatis commodi ducimus ullam nesciunt doloremque eligendi eos voluptatem. Iusto, ducimus numquam.",
            author: "ALi"
        },
        {   
            id: 3,
            para: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime illo, alias perspiciatis commodi ducimus ullam nesciunt doloremque eligendi eos voluptatem. Iusto, ducimus numquam.",
            author: "Ahmad"
        }
    ]

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const [blogs, setBlogs] = useState([]);
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (!open) {
            setEdit(false);
        }
    }, [open])

    const getBlogs = () => {

    setBlogs(content);
}

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

    return (
        <>
            <div className='inter text-white min-h-screen w-full bg-linear-to-r from-[#0B1120] to-[#0D1526] flex justify-center items-center'>

                <div className='w-[95%] h-auto bg-linear-to-r from-[#111C2E] to-[#131F35] flex flex-col justify-center items-center p-15'>

                    <div className='w-full p-3'>
                        <button className='border-1 border-gray-400 p-2 ml-2  hover:bg-yellow-50 hover:text-black rounded-md mr-auto' onClick={() => setOpen(true)}>
                            Add
                        </button>

                        <div className='w-full h-auto p-5 grid grid-cols-3 items-center relative left-5 border-1 border-white min-h-[50vh] gap-7'>

                            {
                                blogs.map((item, index) => {
                                    return <div key= {item.id} className='border-1 border-white w-full min-h-70 rounded-lg'>

                                        <button onClick={() => deleteBlogs(item.id)}><Trash2 size={20} className='text-white' /></button>

                                        <div className=''>{index}</div>

                                        <div className='h-[30%] w-full border-1 border-white mt-auto'>
                                            Hello
                                        </div>
                                        <div className='h-[70%] w-full border-1 border-white'>
                                            <p>{item.para}</p>
                                            <p>Author: {item.author}</p>
                                        </div>
                                    </div>
                                })
                            }

                        </div>
                    </div>

                </div>
            </div>


            <div className={`fixed top-0 overflow-hidden bg-linear-to-r from-[#0B1120] to-[#0D1526] h-screen w-90 z-11 top-0 transition-all duration-500 ease-out text-white p-2 ${open ? "left-[72%]" : "left-full"}`}>

                <div className='flex justify-between items-center pr-8'>
                    <p className='text-xl inter font-semibold m-8'>Blog form</p>
                    <div id='cross' onClick={() => setOpen(!open)}>
                        <X size={20} className='text-white' />
                    </div>
                </div>

                <form action="" >
                    <div className='flex flex-col gap-5'>

                        <input className='border-1 border-gray-700 p-3 w-full rounded-md' type="text" name="" id="inputHeading" placeholder='Heading' />

                        <div className='border-1 border-white flex flex-col gap-2 p-3'>
                            <label htmlFor="inputImage">Add Image</label>
                            <input type="file" name="inputImage" id="" />
                        </div>

                        <input className='border-1 border-gray-700 p-3 w-full rounded-md' type="text" name="" id="inputBody" placeholder='Blog Body' />

                        <input className='border-1 border-gray-700 p-3 w-full rounded-md' type="text" name="" id="inputAuthor" placeholder='Author name' />
                    </div>

                </form>


                <div id='addBtn' className='w-[90%] relative top-50 ml-4 h-10 rounded-4xl bg-linear-to-r from-[#111C2E] to-[#131F35] hover:bg-none hover:bg-[#364e7c] flex justify-center items-center text-center font-semibold'>
                    <p className='text-sm'>
                        Add Blog
                    </p>
                </div>
            </div>
        </>
    )
}

export default Dashboard