import React from 'react'

const Swipercards = ({ logo, para, span }) => {
    return (
        <>
            <div className='flex flex-col gap-27'>
                <div className='pr-8 pl-8 pt-10'>
                    <p className='text-white text-2xl font-semibold'>{logo}</p>
                </div>
                <div className='h-55 pl-8 pr-8 flex flex-col gap-6'>
                    <div className='flex justify-center font-semibold fraunces'>
                        <p className='text-white text-4xl'>{para} <span className='text-green-600'>{span}</span></p>
                    </div>
                    <div className='bg-[#1A3D32] w-[35%] h-12 flex justify-center items-center text-center rounded-4xl'><p className='text-md inter font-bold text-white'>Read more</p></div>
                </div>
            </div>
        </>

    )
}

export default Swipercards
