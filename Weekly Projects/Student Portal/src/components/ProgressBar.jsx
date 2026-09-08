import React from 'react'

const ProgressBar = ({width, value}) => {
    return (
        <div className='flex gap-2 items-center'>

            {/* Progress bar code: Contains outer wrapper div with inner child div */}
            <div className='h-1.5 bg-panel2 overflow-hidden rounded-full w-full'>
                <div className='h-full bg-linear-to-r from-accent2 to-accent rounded-full' style={{ width: `${width}%` }}>
                </div>
            </div>

            <p className='text-text/70 text-xs'>{value}%</p>

        </div>
    )
}

export default ProgressBar
