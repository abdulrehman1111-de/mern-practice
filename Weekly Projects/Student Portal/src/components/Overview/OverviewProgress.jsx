import React from 'react'

const OverviewProgress = ({subject, teacher, progress}) => {
  return (
    <div className='w-full p-2 h-auto flex justify-between'>

        <div className='flex flex-col'>
            <p className='text-text text-sm'>{subject}</p>
            <p className='text-text/60 text-xs'>{teacher}</p>
        </div>

        <div className='flex gap-2 items-center'>

            {/* Progress bar code: Contains outer wrapper div with inner child div */}
            <div className='h-1.5 w-40 bg-panel2 overflow-hidden rounded-full'>
                <div className='h-full bg-linear-to-r from-accent2 to-accent rounded-full' style={{width:`${progress}%`}}>
                </div>
            </div>

            <p className='text-text/70 text-xs'>{progress}%</p>

        </div>
      
    </div>
  )
}

export default OverviewProgress
