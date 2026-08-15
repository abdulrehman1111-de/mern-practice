import React from 'react'
import { ChevronDown } from 'lucide-react'

const Faqcard = ({dark, key, text, status, answer, onToggle, index }) => {
    return (
        <div className={`inter w-[46%] h-auto p-7 font-semibold flex flex-col justify-center items-center justify-around rounded-3xl ${dark ? "bg-[#061B09] text-white" : "border border-gray-200 text-gray-900"}`}>
            <div className='flex justify-between w-full'>
                <span className={`mr-auto transition-all duration-200 ${dark ? "hover:text-blue-400" : "hover:text-gray-600"}`}>{text}</span>
                <ChevronDown onClick={() => onToggle(index)} size={25} className={`text-lg ${dark ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-gray-400"}`} />
            </div>

            {
                status && (
                    <div className={` w-full h-auto text-md p-5 font-light ${dark ? "bg-[#061B09]" : "bg-white text-gray-900"}`}>
                        <p>{answer}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Faqcard
