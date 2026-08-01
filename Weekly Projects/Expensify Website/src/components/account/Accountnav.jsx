import React from 'react'
import { Search, Bot } from 'lucide-react'

const Accountnav = ({ icon: Icon, heading }) => {
    return (
        <div className='border-1 border-white w-full h-auto flex justify-between p-5'>

            <div className='flex gap-3 items-center border-1 border-white'>
                <Icon size={35} className='text-green-500' />
                <span className='text-xl'>{heading}</span>
            </div>

            <div className='flex gap-4 items-center border-1 border-white'>
                <Search size={22} />
                <Bot size={22} />
            </div>
        </div>
    )
}

export default Accountnav
