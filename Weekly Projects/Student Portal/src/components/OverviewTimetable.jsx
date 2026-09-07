import React from 'react'

const OverviewTimetable = ({subject, room, dotColor}) => {
    return (
        <div className='flex justify-start items-center gap-10'>
            <p className='text-text/70 text-xs'>9:00</p>

            <div className='flex items-center gap-3'>
                <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
                <div className='flex flex-col justify-center'>
                    <p className='text-text font-semibold text-sm'>{subject}</p>
                    <p className='text-text/70 text-xs'>{room}</p>
                </div>
            </div>
        </div>
    )
}

export default OverviewTimetable
