import React from 'react'

const OverviewSmCards = ({upper, middle, lower}) => {
    return (
        <div className='border border-border bg-panel rounded-xl h-auto p-4.5 flex flex-col mt-7 gap-2'>
            <p className='text-text/70 text-xs inter'>{upper}</p>
            <p className='font-semibold text-text text-2xl space'>{middle}</p>
            <p className='text-xs text-accent/90 font-semibold'>{lower}</p>
        </div>
    )
}

export default OverviewSmCards
