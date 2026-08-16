import React from 'react'
import { CircleUserRound } from 'lucide-react'
import pfpImage from '../../assets/Pfp.png';

const Todo = ({dark, text, time }) => {

    

    return (
        <div className={`w-full h-14 p-5 flex shrink-0 justify-center items-center gap-0.5 inter ${dark ? "" : "bg-white"}`}>

            <div
                style={{ backgroundImage: `url(${pfpImage})` }}
                className="bg-contain bg-center w-10 h-10 rounded-full"
            ></div>

            <div className='w-[95%] flex flex-col p-3'>
                <div className='flex gap-1.5 items-center'>
                    <p className={`font-semibold ${dark ? "" : "text-gray-900"}`}>Abdul Rehman</p>
                    <p className={`text-xs ${dark ? "text-white/70" : "text-gray-400"}`}>Today at {time}</p>
                </div>
                <div className={dark ? 'text-white/90' : "text-gray-700"}>{text}</div>
            </div>

        </div>
    )
}

export default Todo
