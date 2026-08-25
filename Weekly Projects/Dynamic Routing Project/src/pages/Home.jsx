import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import User from '../components/User'
import{
    useGetAllUsersQuery
} from '../components/JsonPlaceholderApi';


const Home = () => {

    const {data: users, isLoading} = useGetAllUsersQuery();

    if (isLoading) {
        return <p className='text-5xl sora font-semibold text-center pt-20'>Loading...</p>
    }

    return (
        <>
            <div className='bg-[#F7F8FA] text-[#1B1F24] w-full h-auto flex items-center flex-col'>

                {/* Nav component for the home shows user count */}
                <Nav users={users} showUserCount={true} />

                <div className='w-[80%] h-screen pt-10'>
                    <p className='font-semibold text-3xl sora'>All Users</p>
                    <p className='inter text-[#6B7280]'>Click a card to view full profile, posts and comments</p>

                    <div className='w-full grid grid-cols-4 pt-5 gap-5 pb-10  bg-[#F7F8FA]'>

                        {
                            users.map((item) => {
                                return <User key={item.id} id={item.id} name={item.name} email={item.email} street={item.address.street} city={item.address.city} />
                            })
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
