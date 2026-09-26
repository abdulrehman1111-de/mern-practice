import React from 'react'
import ProgressBar from '../ProgressBar'
import ShiningDiv from './ShiningDiv'

const CoursesComp = ({subject, teacher, percentage, details}) => {
    return (
        <div className='w-full h-auto p-4 lg:p-5 bg-panel border border-border flex flex-col gap-4 lg:gap-5 rounded-xl'>

            <div className='flex justify-between gap-3'>
                <div className='flex flex-col min-w-0'>
                    <p className='text-text text-sm truncate'>{subject}</p>
                    <p className='text-text/60 text-xs truncate'>{teacher}</p>
                </div>

                <ShiningDiv status={"In Progress"}/>
            </div>

            {
                percentage !== undefined && <ProgressBar width={percentage} value={percentage}/>
            }

            <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-1 lg:gap-0'>
                <p className='text-text/60 text-xs'>{details}</p>
                <p className='text-blue-400 text-xs'>Materials</p>
            </div>

        </div>
    )
}

export default CoursesComp