import React from 'react'
import { Search, Bot } from 'lucide-react'

const Accountnav = ({ icon: Icon, heading, dark }) => {
    return (
        <div className={`w-full graySelect sticky top-0 h-auto flex justify-between p-5 ${dark ? "bg-[#061B09] text-white" : 'bg-white text-gray-900 border-1 border-gray-600'}`}>

            <div className='flex gap-3 items-center'>
                {Icon && <Icon size={35} className='text-green-500' />}
                <span className='text-xl'>{heading}</span>
            </div>

            <div className='flex gap-4 items-center'>
                <Search size={22} />
                <Bot size={22} />
            </div>
        </div>
    )
}

export default Accountnav
