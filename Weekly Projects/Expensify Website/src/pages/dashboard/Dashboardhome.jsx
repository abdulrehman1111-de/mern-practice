import React from 'react'
import { Search, Bot } from 'lucide-react'
import Accountnav from '../../components/account/Accountnav'
import Graybtn from '../../components/account/Graybtn'
import Expensepic from '../../assets/Expensepic.png'
import Dashboardhomepic from '../../assets/Dashboardhomepic.png'

const Dashboardhome = () => {
  return (
    <div className='bg-[#061B09] graySelect text-white w-full h-full overflow-y-auto'>
      <Accountnav heading="Home" />

      <div className='w-[25%] h-15 flex gap-0'>
        <Graybtn text="Expense" />
        <Graybtn text="Report" />
        <Graybtn text="Distance" />
      </div>
      <div className='flex'>

        <div className='w-[60%] h-[75vh]'>
          <div className='bg-[#072419] w-auto h-auto rounded-xl m-5 p-7 flex flex-col gap-9'>

            <p className='text-xl font-semibold inter'>Recently added</p>

             <div className='flex flex-col gap-2 justify-center items-center'>
              
                      <div className='bg-cover bg-center w-35 h-20' style={{ backgroundImage: `url(${Expensepic})` }}></div>
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <p className='text-2xl'>No recent expenses</p>
                        <p className='text-white/80'>Create one or drag a receipt here</p>
                      </div>
              
                    </div>

          </div>
        </div>
        <div className='w-[40%] h-[120vh]'>
            <div className='bg-[#072419] w-auto h-auto rounded-xl m-5 p-7 flex flex-col gap-9'>

            <p className='text-xl font-semibold inter'>Recently added</p>

             <div className='flex flex-col gap-2 justify-center items-center'>
              
                      <div className='bg-cover bg-center w-full h-40 mb-5 rounded-xl' style={{ backgroundImage: `url(${Dashboardhomepic})` }}></div>
                      <div className='flex flex-col justify-center gap-2 mr-auto'>
                        <p className='text-white/80 text-sm'>See what Expensify can do in 2 minutes</p>
                        <p className='text-sm'>Learn how to create expenses and submit reports</p>
                      </div>
              
                    </div>

          </div>

          <div className='bg-[#072419] w-auto h-auto rounded-xl m-5 p-7 flex flex-col gap-9'>

            <p className='text-xl font-semibold inter'>Announcements</p>

             <div className='flex flex-col gap-5 justify-center items-center'>
              
                      <div className='flex w-full h-12'>
                          <div className='relative top-1 mr-2 h-10 w-10 p-2 bg-[#3c6b57] rounded-lg text-white/80 text-xs flex flex-col justify-center items-center text-center'>
                              <p>JUL</p>
                              <p>20</p>
                          </div>
                          <div className='flex flex-col gap-0.5'>
                            <p className='text-white/80 test-sm inter'>Press Release</p>
                            <p className='text-md inter'>The Expensify Card: Now in the UK & EU</p>
                          </div>
                      </div>

                      <div className='flex w-full h-12'>
                          <div className='relative top-1 mr-2 h-10 w-10 p-2 bg-[#3c6b57] rounded-lg text-white/80 text-xs flex flex-col justify-center items-center text-center'>
                              <p>JUL</p>
                              <p>13</p>
                          </div>
                          <div className='flex flex-col gap-0.5'>
                            <p className='text-white/80 test-sm inter'>Press Release</p>
                            <p className='text-md inter'>Consolidated travel billing</p>
                          </div>
                      </div>

                      <div className='flex w-full h-12'>
                          <div className='relative top-1 mr-2 h-10 w-10 p-2 bg-[#3c6b57] rounded-lg text-white/80 text-xs flex flex-col justify-center items-center text-center'>
                              <p>JUL</p>
                              <p>1</p>
                          </div>
                          <div className='flex flex-col gap-0.5'>
                            <p className='text-white/80 test-sm inter'>Press Release</p>
                            <p className='text-md inter'>More Coincerge Ai updates plus agent Beta</p>
                          </div>
                      </div>
              
                    </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboardhome
