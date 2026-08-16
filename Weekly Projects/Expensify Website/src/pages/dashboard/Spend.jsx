import React from 'react'
import { Search, Bot } from 'lucide-react'
import Accountnav from '../../components/account/Accountnav'
import Graybtn from '../../components/account/Graybtn'
import Expensepic from '../../assets/Expensepic.png'
import Dashboardhomepic from '../../assets/Dashboardhomepic.png'
import Transparentbtn from '../../components/Transparentbtn'

const Spend = ({dark}) => {
  return (
    <div className={`graySelect text-white w-full h-full overflow-y-auto ${dark ? "bg-[#061B09]" : "bg-white"}`}>
      <Accountnav dark={dark} heading="Spend" />

      <div className='w-[25%] h-15 flex gap-0'>
        <Graybtn dark ={dark} text="Filters" />
        <Graybtn dark ={dark} text="Display" />
        <Graybtn dark ={dark} text="Save" />
      </div>
      <div className='flex'>

        <div className='w-[60%] h-[75vh]'>
          <div className={`w-auto h-auto rounded-xl m-5 p-7 flex flex-col gap-9 ${dark ? "bg-[#072419] text-white" : "bg-gray-50 border border-gray-200 text-gray-900"}`}>

            <p className='text-xl font-semibold inter'>Recently added</p>

            <div className='flex flex-col gap-2 justify-center items-center'>

              <div className='bg-cover bg-center w-35 h-20' style={{ backgroundImage: `url(${Expensepic})` }}></div>
              <div className='flex flex-col justify-center items-center gap-2'>
                <p className='text-2xl'>No expenses yet</p>
                <p className= {dark ? "text-white/80" : "text-gray-500"}>Create an expense or take a test drive of Expensify to learn more.</p>
              </div>


              <div className='flex gap-2 mt-5'>
                <div className={`border-1 transition delay-100 ease-in-out w-auto p-3 h-8 flex justify-center items-center text-center rounded-4xl ${dark ? "border-white/20 hover:bg-green-900" : "bg-gray-100 hover:bg-gray-200"}`}><p className={`text-sm inter font-bold text-nowrap ${dark ? "text-white" : "text-gray-950"}`}>Take a test drive</p></div>

                <div className='w-[46%] h-8 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold ml-auto mr-10 text-nowrap p-2'>
                  <p className='text-sm'>Create expense</p>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div className='w-[40%] h-[120vh]'>
                    <div className={`w-auto h-auto rounded-xl m-5 p-7 flex flex-col gap-9 ${dark ? "bg-[#072419]" : "bg-gray-50 border border-gray-200"}`}>
        
                    <p className={`text-xl font-semibold inter ${dark ? "" : "text-gray-900"}`}>Recently added</p>
        
                     <div className='flex flex-col gap-2 justify-center items-center'>
                      
                              <div className='bg-cover bg-center w-full h-40 mb-5 rounded-xl' style={{ backgroundImage: `url(${Dashboardhomepic})` }}></div>
                              <div className='flex flex-col justify-center gap-2 mr-auto'>
                                <p className={`text-sm ${dark ? "text-white/80" : "text-gray-600"}`}>See what Expensify can do in 2 minutes</p>
                                <p className={`text-sm ${dark ? "" : "text-gray-600"}`}>Learn how to create expenses and submit reports</p>
                              </div>
                      
                            </div>
        
                  </div>

        </div>

      </div>
    </div>
  )
}

export default Spend
