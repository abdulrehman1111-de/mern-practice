import React from 'react'

const Assignments = ({ subject, dueStatus }) => {
    return (
        <div className='flex justify-between'>

            <div className='flex gap-2'>
                <input type="checkbox" name="" id="checkbox" className='h-5 w-5 rounded-full appearance-none border-border checked:bg-accent border-2' />
                <label htmlFor="checkbox" className='text-text text-sm'>{subject}</label>
            </div>

            <p className='text-text/70 text-xs'>{dueStatus}</p>
        </div>
    )
}

export default Assignments
