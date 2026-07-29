import React from 'react'
import iconReceiptScanning from '../assets/icon-receipt-scanning.svg'
import iconExpenseReports from '../assets/icon-expense-reports.svg'
import iconAiExpenses from '../assets/icon-ai-expenses.svg'

const Darkcards = ({icon, title, desc}) => {
    return (
        <div className='text-white w-full h-53 p-7 rounded-lg flex flex-col gap-3 bg-[#061B09]'>

            <div><img src={icon} alt={title} className='w-9 h-9' /></div>
            <div><p className='text-lg font-semibold'>{title}</p></div>
            <div>
                {desc}
            </div>
        </div>
    )
}

export default Darkcards
