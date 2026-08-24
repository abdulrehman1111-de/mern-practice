import React, { useState } from 'react'
import { Link } from 'react-router'

const User = ({ id, name, email, street, city}) => {

    // User card component for the Home page

    return (
        <>
            <Link to={"/home/"+id}>
                <div className='w-full h-50 border-1 border-gray-300 bg-[#FFFFFF] rounded-2xl p-3 flex flex-col gap-2 hover:shadow-xl transition-all hover:scale-101 duration-150 ease-out'>


                    <div className='text-[#3D5AFE] h-13 w-13 p-1 pr-2 pl-2 flex justify-center items-center text-center rounded-full  text-nowrap text-sm font-semibold'>User {id}</div>


                    <div>
                        <p className='text-md sora font-semibold'>{name}</p>
                        <p className='text-sm inter text-[#6B7280]'>{email}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='inter text-sm text-[#6B7280]'>🏢 {street}</p>
                        <p className='text-sm inter text-[#6B7280]'>📍 {city}</p>
                    </div>

                </div>
            </Link>
        </>
    )
}

export default User
