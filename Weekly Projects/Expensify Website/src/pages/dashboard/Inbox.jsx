import React from 'react'
import { Search, Bot } from 'lucide-react'
import Accountnav from '../../components/account/Accountnav'
import Graybtn from '../../components/account/Graybtn'
import Expensepic from '../../assets/Expensepic.png'
import Dashboardhomepic from '../../assets/Dashboardhomepic.png'
import { MessageSquare, MessageCircle, MessagesSquare, Mail } from 'lucide-react'

const Inbox = () => {
  return (
    <div className='bg-[#061B09] graySelect text-white w-full h-full overflow-y-auto'>
      <Accountnav heading="Inbox" />

      <div className='w-[25%] h-15 flex gap-0'>
        <Graybtn text="Messages" />
        <Graybtn text="Chats" />
        <Graybtn text="Connects" />
      </div>
      <div className='flex'>

        <div className='w-[60%] h-[75vh]'>
          <div className='bg-[#072419] w-auto h-auto rounded-xl m-5 p-7 flex flex-col gap-9'>

            <p className='text-xl font-semibold inter'>Recent Chats</p>

             <div className='flex flex-col gap-2 justify-center items-center'>
              
                      <MessageSquare size={40} className='text-green-500' />
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <p className='text-2xl'>No recent chats</p>
                        <p className='text-white/80'>Connect with someone to start a chat</p>
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
                        <p className='text-sm'>Learn how to connect and expand your network</p>
                      </div>
              
                    </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Inbox
