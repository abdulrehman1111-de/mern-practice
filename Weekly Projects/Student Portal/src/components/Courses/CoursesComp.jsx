import React from 'react'
import ProgressBar from '../ProgressBar'
import ShiningDiv from './ShiningDiv'

const CoursesComp = ({subject, teacher, percentage, details}) => {
    return (
        <div className='w-full h-auto p-5 bg-panel border border-border flex flex-col gap-5 rounded-xl'>

            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <p className='text-text text-sm'>{subject}</p>
                    <p className='text-text/60 text-xs'>{teacher}</p>
                </div>

                <ShiningDiv status={"In Progress"}/>
            </div>

            <ProgressBar width={72} value={percentage}/>

            <div className='flex justify-between items-center'>
                <p className='text-text/60 text-xs'>{details}</p>
                <p className='text-blue-400 text-xs'>Materials</p>
            </div>

        </div>
    )
}

export default CoursesComp
