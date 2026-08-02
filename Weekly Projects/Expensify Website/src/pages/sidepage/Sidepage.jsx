import React from 'react'
import Transparentbtn from '../../components/Transparentbtn'
import Receiptspic from '../../assets/Receiptspic.png'

const Sidepage = () => {
    return (
        <div id='sidePage' className='absolute bg-[#061B09] h-[100vh] w-90 z-11 left-full text-white p-2 transition-all duration-300'>
            <p className='text-xl inter font-semibold m-8'>Create expense</p>

            <div className='flex justify-center items-center m-5'>
                <div className='border-1 border-white/20 hover:bg-green-900 transition delay-100 ease-in-out w-full p-3 h-10 flex justify-center items-center text-center rounded-4xl'><p className='text-sm inter font-bold text-white'>Manual</p></div>

                <div className='border-1 border-white/20 hover:bg-green-900 transition delay-100 ease-in-out w-full p-3 h-10 flex justify-center items-center text-center rounded-4xl'><p className='text-sm inter font-bold text-white'>Scan</p></div>
            </div>

            <div className='w-full h-[74vh] border-2 border-dotted border-green-400/90 rounded-2xl flex justify-center items-center flex-col pt-13 pb-5'>
                <div className='flex justify-center items-center flex-col gap-3'>
                    <div className='bg-contain bg-center w-50 h-35' style={{ backgroundImage: `url(${Receiptspic})` }}></div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className='text-2xl'>Upload Receipts</p>
                        <p className='text-white/80 text-xs'>Or drag and drop them here</p>
                    </div>
                    <div className='w-auto p-3 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold text-nowrap'>
                        <p className='text-sm'>Choose files</p>
                    </div>
                </div>

                <div className='inter mt-auto'>
                    <ul><li><p className='text-white/80 text-xs pb-2'>Other ways to add receipts</p></li>
                    <li className='list-disc'><p className='text-sm'><span className='text-blue-400'>Download the app</span> to scan from your phone</p></li>
                    <li className='list-disc'><p className='text-sm'>Forward receipts to <span className='text-blue-400'>receipt@expensify.com</span></p></li>
                    <li className='list-disc'><p className='text-sm'><span className='text-blue-400'>Add your number</span> to text receipts to 47777</p></li></ul>
                </div>
            </div>
        </div>
    )
}

export default Sidepage
