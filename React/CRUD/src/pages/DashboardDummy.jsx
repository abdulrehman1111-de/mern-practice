import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'
import { Mail } from 'lucide-react'
import { MapPin } from 'lucide-react'
import { Home } from 'lucide-react'
import { Settings } from 'lucide-react'
import { User } from 'lucide-react'
import axios from 'axios'

const Dashboard = () => {

    const [users, setUsers] = useState([]);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");

    let API= "https://jsonplaceholder.typicode.com/users"
    const getUsers = async () => {

        let res =  await axios.get(API)
        setUsers(res.data)

 
    }

    useEffect(() => {

        getUsers();

    }, []);

    const deleteUsers = (id) => {
        let newUsers = users.filter((item) => {
            return item.id != id;
        })
        axios.delete(`${API}/${id}`)
        console.log(`${API}/${id}`);
        

        setUsers(newUsers);
    }


    const handlesubmit =(e)=>{

        e.preventDefault()

        console.log({name ,email});

        let newuser ={
            id :users.length+1,
            name,
            email
        }
        axios.post(`${API}/${newuser}`)
        setUsers([...users ,newuser])
        
    }



    return (
        <div className='inter text-white h-screen w-full bg-linear-to-r from-[#0B1120] to-[#0D1526] flex justify-center items-center'>

   


            <div className='w-[95%] h-[95%] bg-linear-to-r from-[#111C2E] to-[#131F35]  justify-center items-center p-15'>
        <div>
            <form onSubmit={handlesubmit}>

                <label htmlFor="">name</label>
                <input type="text" name="name" id="" onChange={(e)=>setname(e.target.value)} />
                <label htmlFor="">email</label>
                <input type="email" name="email" id=""  onChange={(e)=>setemail(e.target.value)} />
                <button>add</button>
            </form>
           </div>
                <table className='border-1 border-[#FFFFFF] rounded-lg w-full'>
                    <thead className=''>
                        <tr>
                            <td>
                                <div className='flex gap-2 items-center'>
                                    <User size={20} className='text-gray-400' />id
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
                                <MapPin size={20} className='text-gray-400' />Email
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
                                return <tr className='border-1 border-white'  key={index}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td className='flex gap-2 items-center fraunces'><CircleUserRound size={25} className='text-gray-400' />{item.name}</td>
                                    <td>{item.email}</td>
                                    {/* <td>{item.address.city}</td>
                                    <td>{item.address.street}</td> */}
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
    )
}

export default Dashboard
