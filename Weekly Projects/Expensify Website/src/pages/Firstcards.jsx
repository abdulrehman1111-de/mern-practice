import React from 'react'
import iconExpenseManagement from '../assets/icon-expense-management.svg'
import iconTravel from '../assets/icon-travel.svg'
import iconExpensifyCard from '../assets/icon-expensify-card.svg'
import iconReceiptScanning from '../assets/icon-receipt-scanning.svg'
import iconByoc from '../assets/icon-byoc.svg'
import iconGlobalReimbursements from '../assets/icon-global-reimbursements.svg'
import iconVirtualCards from '../assets/icon-virtual-cards.svg'
import iconExpenseReports from '../assets/icon-expense-reports.svg'
import iconAiExpenses from '../assets/icon-ai-expenses.svg'
import Firstcard from '../components/Firstcard'
import MySwiper from '../components/MySwiper'
import { useState } from 'react'

const Firstcards = () => {

    let card = [
        { icon: iconExpenseManagement, title: "Expense management", desc: "Automatically create, submit, approve, and reimburse expenses. Reports automatically sync with accounting." },
        { icon: iconTravel, title: "Travel", desc: "Book flights, hotels, cars, and rail right in the app. Every booking syncs with your expenses for total T&E." },
        { icon: iconExpensifyCard, title: "Expensify Card", desc: "The Expensify Visa® Commercial Card earns cash back on US purchases and lowers your Expensify bill." },
        { icon: iconReceiptScanning, title: "Receipt scanning", desc: "Snap a photo, forward to receipts@expensify.com, or upload a file – we'll scan the details!" },
        { icon: iconByoc, title: "Bring your own cards (BYOC)", desc: "Link the corporate cards you already have for automatic reconciliation. 10k+ banks supported globally." },
        { icon: iconGlobalReimbursements, title: "Global reimbursements", desc: "Reimburse employees or independent contractors anywhere in the world, in their local currency." },
        { icon: iconVirtualCards, title: "Virtual cards", desc: "Instantly issue unlimited virtual cards for employees, vendors, or projects. Free with every Expensify Card." },
        { icon: iconExpenseReports, title: "Expense reports", desc: "Submit, review, and approve expenses in seconds. Expensify handles the matching and policy checks." },
        { icon: iconAiExpenses, title: "AI-powered expenses", desc: "Automate expense categorization, flag policy violations, enforce rules, and reduce manual errors." },
    ]

    const [open, setOpen] = useState(false);



    return (
        <div className='w-full h-auto pb-7 bg-[#0A1F15] text-white flex flex-col'>

            <div className='w-full h-[25vh] flex justify-center items-center'>
                <p className='text-4xl fraunces font-semibold'>Features</p>
            </div>

            <div className='pl-15 pr-15 grid grid-cols-3 grid-rows-3 gap-6'>
                {card.map((item) => (
                    <Firstcard icon={item.icon} title={item.title} desc={item.desc} />
                ))}

                {open && (
                    card.map((item) => (
                    <Firstcard icon={item.icon} title={item.title} desc={item.desc} />
                ))
                )}

            </div>

            <div className='w-full h-auto p-10 flex justify-center items-center'>
                

                <div onClick={() => setOpen(!open)} className='bg-[#173B2C] w-[14%] hover:bg-gray-700  transition delay-50 ease-in-out h-12 flex justify-center items-center text-center rounded-4xl'><p className='text-md inter font-bold'>See All Features</p></div>

                
            </div>
            

            <div className='pl-15 pr-15'>
                <MySwiper />
            </div>


        </div>


    )
}

export default Firstcards
