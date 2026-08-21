import React from 'react'
import Nav from '../components/Nav'
import User from '../components/User'
import { useState } from 'react';

const Home = () => {

    const [users, setUsers] = useState([]);
    
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => setUsers(data));

    return (
        <>
            <div className='bg-[#F7F8FA] w-full min-h-screen flex items-center flex-col'>
                <Nav />

                <div className='w-[80%] h-screen pt-10'>
                    <p className='font-semibold text-3xl sora'>All Users</p>
                    <p className='inter text-[#6B7280]'>Click a card to view full profile, posts and comments</p>

                    <div className='w-full grid grid-cols-4 pt-5 gap-5 pb-10'>

                        {
                            users.map((item)=>{
                                return <User id={item.id} name={item.name} email={item.email} street={item.address.street} city={item.address.city} />
                            })
                        }
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
