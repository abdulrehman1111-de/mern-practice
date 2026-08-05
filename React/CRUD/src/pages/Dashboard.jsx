import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'
import { Mail } from 'lucide-react'
import { MapPin } from 'lucide-react'
import { Home } from 'lucide-react'
import { Settings } from 'lucide-react'
import { User } from 'lucide-react'
import { X } from 'lucide-react'
import axios from 'axios'

const Dashboard = () => {

    const [open, setOpen] = useState(false);

    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");

    if (open) {
        document.body.style.overflow = "hidden";
    }
    else {
        document.body.style.overflow = "";
    }

    const API = "https://jsonplaceholder.typicode.com/users";
    const getUsers = async () => {

        let res = await axios.get(API);
        setUsers(res.data);
    }

    useEffect(() => {

        getUsers();

    }, []);

    const deleteUsers = (id) => {
        let newUsers = users.filter((item) => {
            return item.id != id;
        })
        axios.delete(`${API}/${id}`);

        setUsers(newUsers);
    }

    useEffect(() => {

        const nameVal = document.getElementById("name");
        const emailVal = document.getElementById("email");
        const cityVal = document.getElementById("city");
        const addressVal = document.getElementById("address");

        const cross = document.getElementById("cross");
        const addBtn = document.getElementById("addBtn");

        const handleClick = () => {

            const name = nameVal.value.trim();
            const email = emailVal.value.trim();
            const city = cityVal.value.trim();
            const address = addressVal.value.trim();

            if ((name.length === 0) || (email.length === 0) || (city.length === 0) || (address.length === 0)) {
                alert("Input field cannot be empty!");
                return;
            }

            addBtn.addEventListener("click", handleClick);

            return () => {
                addBtn.removeEventListener("click", handleClick);
            }
        }

        const handleClick2 = () => {
            nameVal.value = "";
            emailVal.value = "";
            cityVal.value = "";
            addressVal.value = "";
        }

        cross.addEventListener("click", handleClick2);

        return () => {
            cross.removeEventListener("click", handleClick2);
        }

    }, [open]);

    const handleSubmit = (e) => {

        e.preventDefault();

        let newUser = {
            id: users.length + 1,
            name,
            email,
            address: {
                city,
                street: address
            }
        }

        axios.post(API, newUser);
        setUsers([...users, newUser]);
    }


    return (
        <>
            <div className='inter text-white h-auto w-full bg-linear-to-r from-[#0B1120] to-[#0D1526] flex justify-center items-center'>
                <div className='w-[95%] h-auto bg-linear-to-r from-[#111C2E] to-[#131F35] flex flex-col justify-center items-center p-15'>

                    <div className='w-full p-3'>
                        <button className='border-1 border-gray-400 p-2 ml-2  hover:bg-yellow-50 hover:text-black rounded-md mr-auto' onClick={() => setOpen(true)}>Add</button>
                    </div>

                    <table className='border-1 border-[#FFFFFF] relative left-5 rounded-lg w-full'>
                        <thead className=''>
                            <tr>
                                <td>
                                    <div className='flex gap-2 items-center'>
                                        <User size={20} className='text-gray-400' />Id
                                    </div>
                                </td>
                                <td>
                                    <div className='flex gap-2 items-center'>
                                        <User size={20} className='text-gray-400' />Name
                                    </div>
                                </td>
                                <td>
                                    <div className='flex gap-2 items-center'>
                                        <Mail size={20} className='text-gray-400' />Email
                                    </div>
                                </td>
                                <td><div className='flex gap-2 items-center'>
                                    <MapPin size={20} className='text-gray-400' />City
                                </div></td>

                                <td><div className='flex gap-2 items-center'>
                                    <Home size={20} className='text-gray-400' />Address
                                </div></td>

                                <td colSpan={3}><div className='flex gap-2 items-center'>
                                    <Settings size={20} className='text-gray-400' />Actions
                                </div></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, index) => {
                                    return <tr className='border-1 border-white' key={index}>
                                        <td className=''>{index}</td>
                                        <td><div className='h-full flex gap-2 items-center fraunces'>
                                            <CircleUserRound size={25} className='text-gray-400' />{item.name}
                                        </div></td>
                                        <td>{item.email}</td>
                                        <td>{item.address.city}</td>
                                        <td>{item.address.street}</td>
                                        <td onClick={() => deleteUsers(item.id)}><Trash2 size={20} className='text-white' /></td>
                                        <td><Pencil size={16} className='text-white' /></td>
                                        <td></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>


            <div className={`absolute overflow-hidden bg-linear-to-r from-[#0B1120] to-[#0D1526] h-screen w-90 z-11 top-0 transition-all duration-500 ease-out text-white p-2 ${open ? "left-[72%]" : "left-full"}`}>

                <div className='flex justify-between items-center pr-8'>
                    <p className='text-xl inter font-semibold m-8'>User form</p>
                    <div id='cross' onClick={() => setOpen(!open)}>
                        <X size={20} className='text-white' />
                    </div>
                </div>

                <div className='flex flex-col gap-5 m-3'>

                    <form action="" onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-5'><input className='border-1 border-gray-700 p-3 w-full rounded-md' type="text" name="name" id='name' placeholder='Full name' onChange={(e) => setName(e.target.value)} />

                            <input className='border-1 border-gray-700 p-3 w-full rounded-md' type="email" name="" id="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                            <input className='border-1 border-gray-700 p-3 w-full rounded-md' type="text" name="city" id='city' placeholder='City' onChange={(e) => setCity(e.target.value)} />

                            <input className='border-1 border-gray-700 p-3 w-full rounded-md' type="text" name="address" id='address' placeholder='Address' onChange={(e) => setAddress(e.target.value)} /></div>
                    </form>

                </div>

                <div onClick={(e) => { handleSubmit(e); setOpen(false) }} id='addBtn' className='w-[90%] relative top-50 ml-4 h-10 rounded-4xl bg-linear-to-r from-[#111C2E] to-[#131F35] hover:bg-none hover:bg-[#364e7c] flex justify-center items-center text-center font-semibold'>
                    <p className='text-sm'>Add data</p>
                </div>
            </div>
        </>
    )
}

export default Dashboard