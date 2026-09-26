import React from 'react'

const OverviewTimetable = ({subject, room, dotColor}) => {
    return (
        <div className='flex justify-start items-center gap-4 lg:gap-10'>
            <p className='text-text/70 text-xs shrink-0'>9:00</p>

            <div className='flex items-center gap-3 min-w-0'>
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`}></div>
                <div className='flex flex-col justify-center min-w-0'>
                    <p className='text-text font-semibold text-sm truncate'>{subject}</p>
                    <p className='text-text/70 text-xs'>{room}</p>
                </div>
            </div>
        </div>
    )
}

export default OverviewTimetable