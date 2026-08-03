import React from 'react'
import { ChevronDown } from 'lucide-react'

const Faqcard = ({ key, text, status, answer, onToggle, index }) => {
    return (
        <div className='inter bg-[#061B09] w-[46%] h-auto p-7 text-white font-semibold flex flex-col justify-center items-center justify-around rounded-3xl'>
            <div className='flex justify-between w-full'>
                <span className='mr-auto hover:text-blue-400 transition-all duration-200'>{text}</span>
                <ChevronDown onClick={() => onToggle(index)} size={25} className='text-white/70 text-lg hover:text-white' />
            </div>

            {
                status && (
                    <div className='bg-[#061B09] w-full h-auto text-md p-5 font-light'>
                        <p>{answer}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Faqcard
