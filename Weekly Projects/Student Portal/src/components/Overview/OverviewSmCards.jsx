import React from 'react'

const OverviewSmCards = ({upper, middle, lower}) => {
    return (
        <div className='border border-border bg-panel rounded-xl h-auto p-3.5 lg:p-4.5 flex flex-col mt-4 lg:mt-7 gap-2'>
            <p className='text-text/70 text-xs inter'>{upper}</p>
            <p className='font-semibold text-text text-lg lg:text-xl space'>{middle}</p>
            <p className='text-xs text-accent/90 font-semibold'>{lower}</p>
        </div>
    )
}

export default OverviewSmCards