import React from 'react'

const OverviewProgress = () => {
  return (
    <div className='w-full p-2 h-auto flex justify-between'>

        <div className='flex flex-col'>
            <p className='text-text text-sm'>Data Structures & Algorithms</p>
            <p className='text-text/60 text-xs'>Dr. Farah Naz · Sec A</p>
        </div>

        <div className='flex gap-2 items-center'>

            {/* Progress bar code: Contains outer wrapper div with inner child div */}
            <div className='h-1.5 w-40 bg-panel2 overflow-hidden rounded-full'>
                <div className='h-full bg-linear-to-r from-accent2 to-accent rounded-full' style={{width:'72%'}}>
                </div>
            </div>

            <p className='text-text/70 text-xs'>72%</p>

        </div>
      
    </div>
  )
}

export default OverviewProgress
