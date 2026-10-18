import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div className='py-6 px-10 bg-blue-900 text-white text-2xl flex justify-between items-center'>
                <Link to={"/"}><h2 className='font-medium text-2xl'>Media Search</h2></Link>
                <div className='flex justify-between items-center text-xl gap-5'>
                    <Link className='text-xl text-black bg-white rounded-lg px-4 py-2 font-medium active:scale-95' to={"/"}>Search</Link>
                    <Link className='text-xl text-black bg-white rounded-lg px-4 py-2 font-medium active:scale-95' to={"/collection"}>Collection</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
