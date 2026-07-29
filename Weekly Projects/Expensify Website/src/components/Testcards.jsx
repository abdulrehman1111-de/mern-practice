import React from 'react'
import iconReceiptScanning from '../assets/icon-receipt-scanning.svg'
import iconExpenseReports from '../assets/icon-expense-reports.svg'
import iconAiExpenses from '../assets/icon-ai-expenses.svg'
import { FaStar } from 'react-icons/fa'

const Darkcards = ({ icon, title, desc, name }) => {
    return (
        <div className='text-white w-full h-[55vh] p-7 rounded-lg flex flex-col gap-3 bg-[#07271F]'>

            <div className="flex text-yellow-400 relative top-1 text-xl mb-3">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </div>
            <div><p className='text-lg font-semibold inter'>{title}</p></div>
            <div className='tracking-tighter font-semibold'>
                {desc}
            </div>

            <div className='flex gap-3 mt-8'>
                <div><img src={icon} alt={title} className='w-9 h-9 rounded-full' /></div>
                <div className='font-semibold text-lg'><p>{name}</p></div>
            </div>
        </div>
    )
}

export default Darkcards
