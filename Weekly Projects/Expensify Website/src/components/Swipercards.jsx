import React from 'react'

const Swipercards = ({ para, span }) => {
    return (
        <>  
            <div className='h-55 pl-8 pr-8'>
                <div className='flex justify-center font-semibold fraunces'>
                    <p className='text-white text-4xl'>{para} <span className='text-green-600'>{span}</span></p>
                </div>
                <div className='bg-[#2d3f37] w-[35%] h-12 flex justify-center items-center text-center rounded-4xl'><p className='text-md inter font-bold text-white'>Read more</p></div>
            </div>
        </>

    )
}

export default Swipercards
