import React from 'react'

const Assignments = ({ subject, dueStatus }) => {
    return (
        <div className='flex flex-col lg:flex-row lg:justify-between gap-1 lg:gap-0'>

            <div className='flex gap-2 items-center'>
                <input type="checkbox" name="" id="checkbox" className='h-5 w-5 shrink-0 rounded-full appearance-none border-border checked:bg-accent border-2' />
                <label htmlFor="checkbox" className='text-text text-sm break-words'>{subject}</label>
            </div>

            <p className='text-text/70 text-xs pl-7 lg:pl-0'>{dueStatus}</p>
        </div>
    )
}

export default Assignments