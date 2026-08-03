import React, { useEffect } from 'react'
import Accountnav from '../../components/account/Accountnav'
import { Search, Bot } from 'lucide-react'
import { Plus } from 'lucide-react'
import { Send } from 'lucide-react'
import { useState } from 'react'


const InboxPage = () => {

    const [messages, setMessages] = useState([]);
    const [inter, setInter] = useState("");

    useEffect(() => {

        const uploadInput = document.getElementById("uploadInput");
        const fileInput = document.getElementById("fileInput");
        uploadInput.addEventListener("click", () => {
            fileInput.click();
        })

        const chatInput = document.getElementById("chatInput");
        const chatInputBtn = document.getElementById("chatInputBtn");

        chatInputBtn.addEventListener("click", () => {

            let chatInputValue = chatInput.value.trim();

            if (chatInputValue.length === 0) {
                alert("Input field is empty!");
            }

            else{
                setInter(chatInputValue);
                setMessages([...messages, chatInputValue]);
            }
        })
    }, [])



    return (
        <div className='bg-[#061B09] text-white w-full h-auto border-1 border-gray-800 flex flex-col justify-between'>
            <div>
                <div className='w-full text-white graySelect sticky top-0 h-auto flex justify-between p-5  bg-[#061B09] border-1 border-gray-800'>

                    <div className='flex gap-3 items-center'>
                        {Bot && <Bot size={35} className='text-green-500' />}
                        <div className='flex flex-col inter'>
                            <span className='text-xl'>Concirege</span>
                            <p className='text-white/70 text-xs font-semibold'>Your personal Ai agent</p>
                        </div>
                    </div>

                    <div className='flex gap-4 items-center'>
                        <Search size={22} />
                    </div>
                </div>

                <div className='w-full relative h-[40%]'>
                    <div className='w-full h-full'>
                        <svg className="obliteratedBottom absolute inset-0 w-full h-full opacity-40" viewBox="0 0 680 260" preserveAspectRatio="xMidYMax slice">
                            <g fill="none" stroke="#15402C" strokeWidth="1.5">

                                <circle cx="20" cy="30" r="14" />
                                <path d="M0 60 Q0 40 20 40 Q40 40 40 60 L40 90 Q40 100 30 100 L10 100 Q0 100 0 90 Z" />
                                <path d="M0 100 L0 130 M8 100 L8 130 M16 100 L16 130 M24 100 L24 130 M32 100 L32 130 M40 100 L40 130" />

                                <path d="M60 260 L60 150 Q60 120 85 105 Q92 85 105 85 Q118 85 125 105 Q150 120 150 150 L150 260" />
                                <path d="M75 200 L75 230 M95 200 L95 230 M115 200 L115 230 M135 200 L135 230" />
                                <circle cx="105" cy="70" r="6" />

                                <rect x="175" y="90" width="70" height="170" rx="4" />
                                <circle cx="210" cy="70" r="16" />
                                <path d="M190 40 L190 60 M230 40 L230 60" />
                                <rect x="188" y="115" width="14" height="18" />
                                <rect x="218" y="115" width="14" height="18" />
                                <rect x="188" y="150" width="14" height="18" />
                                <rect x="218" y="150" width="14" height="18" />
                                <rect x="188" y="185" width="14" height="18" />
                                <rect x="218" y="185" width="14" height="18" />
                                <rect x="188" y="220" width="14" height="18" />
                                <rect x="218" y="220" width="14" height="18" />

                                <path d="M270 260 L270 170 Q270 145 290 130 Q296 110 310 110 Q324 110 330 130 Q350 145 350 170 L350 260" />
                                <path d="M285 195 Q310 180 335 195" />
                                <path d="M280 230 L320 230 L320 260 L280 260 Z" />
                                <circle cx="310" cy="95" r="8" />

                                <circle cx="420" cy="150" r="55" />
                                <circle cx="420" cy="150" r="38" />
                                <path d="M420 95 L420 260 M365 150 L475 150" />
                                <path d="M383 113 L457 187 M457 113 L383 187" />

                                <rect x="500" y="80" width="90" height="180" rx="6" />
                                <path d="M500 110 L590 110 M500 140 L590 140 M500 170 L590 170 M500 200 L590 200 M500 230 L590 230" />
                                <path d="M525 80 Q545 55 565 80" />
                                <circle cx="545" cy="55" r="5" />

                                <path d="M610 260 L610 60 Q610 40 622 32 Q634 40 634 60 L634 260" />
                                <path d="M600 100 L644 100 M600 140 L644 140 M600 180 L644 180" />
                                <circle cx="622" cy="20" r="6" />

                                <path d="M20 260 Q60 235 100 260" />
                                <path d="M150 260 Q210 225 270 260" />
                                <path d="M350 260 Q420 220 500 260" />
                                <path d="M590 260 Q630 235 670 260" />

                            </g>
                        </svg>
                        <div className='flex flex-col gap-5 p-5 relative top-15'>
                            <Bot size={65} className='text-green-500' />
                            <p className='text-4xl'>Ask me anything!</p>
                            <p className='text-white/90 text-sm inter'>Concierge can answer questions, update expenses, and more.</p>

                            <hr className='opacity-15 bg-green-700' />
                        </div>
                    </div>

                </div>
            </div>

            <div className='border-1 border-white w-full'>

            </div>

            <div className='w-full h-20 p-5 flex justify-center items-center'>
                <div className='h-12 w-full flex rounded-4xl border-1 border-white'>
                    <div className='w-[7%] flex justify-center items-center'>
                        <button id='uploadInput'><Plus size={22} className='text-white/70' /></button>
                        <input className='hidden' id="fileInput" type="file" name="" />
                    </div>
                    <div className='w-[86%]'>
                        <input className='w-full h-full border-none outline-none' type="text" name="" id="chatInput" placeholder='Write something...' />
                    </div>
                    <div className='w-[7%] flex justify-center items-center'>
                        <button id='chatInputBtn'><Send size={22} className='text-white/70' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InboxPage
