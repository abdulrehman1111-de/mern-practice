import React from 'react'

const Swipercards = ({ logo, para, span, dark }) => {
    return (
        <>
            <div className='flex flex-col gap-27'>
                <div className='pr-8 pl-8 pt-10'>
                    <p className={`text-2xl font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{logo}</p>
                </div>
                <div className='h-55 pl-8 pr-8 flex flex-col gap-6'>
                    <div className='flex justify-center font-semibold fraunces'>
                        <p className='text-white text-4xl'>{para} <span className='text-green-600'>{span}</span></p>
                    </div>
                    <div className={`w-[35%] h-12 flex justify-center items-center text-center rounded-4xl ${dark ? "bg-[#1A3D32] hover:bg-green-900" : "bg-gray-100 hover:bg-gray-200"}`}><p className={`text-md inter font-bold ${dark ? "text-white" : "text-gray-900"}`}>Read more</p></div>
                </div>
            </div>
        </>

    )
}

export default Swipercards
