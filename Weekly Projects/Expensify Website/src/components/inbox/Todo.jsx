import React from 'react'
import { CircleUserRound } from 'lucide-react'
import pfpImage from '../../assets/Pfp.png';

const Todo = ({ text, time }) => {

    

    return (
        <div className='w-full h-15 p-5 flex justify-center items-center gap-0.5 inter'>

            <div
                style={{ backgroundImage: `url(${pfpImage})` }}
                className="bg-contain bg-center w-10 h-10 rounded-full"
            ></div>

            <div className='w-[95%] flex flex-col p-3'>
                <div className='flex gap-1.5 items-center'>
                    <p className='font-semibold'>Abdul Rehman</p>
                    <p className='text-xs text-white/70'>Today at {time}</p>
                </div>
                <div className='text-white/90'>{text}</div>
            </div>

        </div>
    )
}

export default Todo
