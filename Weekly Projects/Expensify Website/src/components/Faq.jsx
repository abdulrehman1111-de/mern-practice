import React from 'react'
import Faqcard from './Faqcard'
import { useState } from 'react'

const Faq = () => {

    const faqsDropdown = [
        {
            question: "What is Expensify?",
            answer: "Expensify is an all-in-one expense management platform. You can track every receipt, manage expenses, and handle reimbursement, all with a couple of clicks."
        },
        {
            question: "Who is Expensify for?",
            answer: "dfkdajlkdjlkjdlkjl"
        },
        {
            question: "What kind of expenses can I track?",
            answer: "With Expensify, you can scan receipts, track mileage, and upload travel. You can also use it to pay bills and generate invoices."
        },
        {
            question: "Can I use Expensify if my company doesn’t use it?",
            answer: "Yes! Employees and contractors can use Expensify to track and manage their expenses even if their company doesn't use Expensify. You can submit your expenses to your employer electronically or create a PDF that you can email."
        },
        {
            question: "How quickly can I get set up?",
            answer: "Expensify is ready to use in seconds! Just sign up with your email or phone number to open your account, and you can upload receipts right away!"
        },
        {
            question: "What does Expensify integrate with?",
            answer: "Expensify integrates with QuickBooks, Xero, Oracle Netsuite, Sage Intacct, ADP, and Gusto, and 45+ more apps. Choose from accounting, finance, ERP, travel, tax, and many more software."
        },
        {
            question: "Can Expensify help with compliance?",
            answer: "Yes! Expensify allows you to streamline the auditing process by detecting duplicate receipts, ensuring correct exchange rates, and automatically checking transactions against company policies."
        },
        {
            question: "How do I upload expenses?",
            answer: "To upload expenses simply scan receipts via mobile app or swipe with your Expensify card. Expensify will automatically capture the amount, date, merchant, and more. You can also enter your payment information manually in a few seconds."
        },
        {
            question: "How much does it cost?",
            answer: "Expensify is completely free to use as an individual. For companies, plans start at $5 per member, but you can offset that cost with cash back from the Expensify Card."
        },
        {
            question: "How do I get started?",
            answer: "Getting started with Expensify is easy! Just sign up with your email or phone number, and you can start uploading receipts and tracking expenses right away."
        }
    ]

    const [open, setOpen] = useState(null);

    const toggle = (index)=>{
        if (index === open){
            setOpen(null);
        }
        else{
            setOpen(index);
        }
    }


    return (
        <div className='bg-[#07271F] w-full h-auto p-15 text-white'>

            <div className='flex justify-center items-center font-semibold fraunces'>
                <p className='text-4xl'>FAQ</p>
            </div>

            <div className='w-full h-auto flex items-start flex-wrap gap-4 justify-between mt-10'>
                {faqsDropdown.map((item, index) => {

                    let comparison = false;
                    if(index === open){
                        comparison = true;
                    }

                    return <Faqcard key = {index} text={item.question} status = {comparison} answer={item.answer} onToggle = {toggle} index = {index} />

                    
                })}
            </div>
        </div>
    )
}

export default Faq
