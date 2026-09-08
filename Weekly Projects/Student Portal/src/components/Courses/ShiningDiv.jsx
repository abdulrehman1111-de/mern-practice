import React from 'react'

const ShiningDiv = ({status}) => {
    return (
        <span className='px-2 py-0.5 inline-flex items-center border text-blue-400 border-blue-400 rounded-full text-nowrap text-xs font-semibold bg-blue-400/10 inter'>
            {status}
        </span>
    )
}

export default ShiningDiv
