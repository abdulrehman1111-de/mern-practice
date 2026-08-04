import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'
import { Mail } from 'lucide-react'
import { MapPin } from 'lucide-react'
import { Home } from 'lucide-react'
import { Settings } from 'lucide-react'
import { User } from 'lucide-react'

const Dashboard = () => {

    const [users, setUsers] = useState([]);

    const getUsers = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    }

    useEffect(() => {

        getUsers();

    }, []);

    const deleteUsers = (id) => {
        let newUsers = users.filter((item) => {
            return item.id != id;
        })

        setUsers(newUsers);
    }


    return (
        <div className='inter text-white h-screen w-full bg-linear-to-r from-[#0B1120] to-[#0D1526] flex justify-center items-center'>
            <div className='w-[95%] h-[95%] bg-linear-to-r from-[#111C2E] to-[#131F35] flex justify-center items-center p-15'>

                <table className='border-1 border-[#FFFFFF] rounded-lg w-full'>
                    <thead className=''>
                        <tr>
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
                                return <tr className='border-1 border-white'>
                                    <td className='flex gap-2 items-center fraunces'><CircleUserRound size={25} className='text-gray-400' />{item.name}</td>
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
    )
}

export default Dashboard
