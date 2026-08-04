import React from 'react'
import Accountnav from '../../components/account/Accountnav'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'
import { useState } from 'react'
import { X } from 'lucide-react'


const Profile = () => {
  
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='bg-[#061B09] graySelect text-white w-full h-auto overflow-y-auto'>
        <Accountnav icon={UserCircle2} heading="Profile" />

        <div className='bg-[#072419] w-[75%] h-auto rounded-xl m-5 p-7 flex flex-col gap-9'>

          <p className='text-2xl'>Public</p>
          <p className='text-md text-white/80'>These details are displayed on your public profile. Anyone can see them.</p>

          <div>
            <CircleUserRound size={100} className="text-green-500" />
          </div>

          <div onClick={()=> setOpen(true)} className='flex flex-col gap-5'>
            <div id='nameDiv' className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Display Name</p>
              <p className='text-sm '>Abdul Rehman</p>
            </div>

            <div className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Contact methods</p>
              <p className='text-sm '>abdulrehmanpro6@gmail.com</p>
            </div>

            <div className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Status</p>
            </div>

            <div className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Pronouns</p>
              <p className='text-sm '>Select your pronouns</p>
            </div>

            <div className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Timezone</p>
              <p className='text-sm '>Asia/Karachi</p>
            </div>

          </div>

          <div className='w-[12%] h-10 rounded-4xl bg-[#1A3D32] hover:bg-green-400 flex justify-center items-center text-center font-semibold m-3'>
            <p className='text-sm'>Share</p>
          </div>

        </div>

        <div className='bg-[#072419] w-[75%] h-auto rounded-xl m-5 p-7 flex flex-col gap-9'>

          <p className='text-2xl'>Private</p>
          <p className='text-md text-white/80'>These details are used for travel and payments. They're never shown on your public profile.</p>

          <div className='flex flex-col gap-5'>
            <div className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Legal Name</p>
            </div>

            <div className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Date of birth</p>
            </div>

            <div className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Phone number</p>
            </div>

            <div className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Address</p>
            </div>

          </div>
        </div>


      </div>

      {
        open && (
          <div className='absolute bg-[#061B09] h-[100vh] w-90 z-11 right-0 top-0 transition-all duration-1000 ease-out text-white p-2'>
                      
                      <div className='flex justify-between items-center pr-8'>
                        <p className='text-xl inter font-semibold m-8'>Create expense</p>
                        <div className='border-1 border-white' onClick={()=> setOpen(!open)}>
                          <X size={20} className='text-white' />
                        </div>
                      </div>
          
                      <div className='flex justify-center items-center m-5'>
                          <div className='border-1 border-white/20 hover:bg-green-900 transition delay-100 ease-in-out w-full p-3 h-10 flex justify-center items-center text-center rounded-4xl'><p className='text-sm inter font-bold text-white'>Manual</p></div>
          
                          <div className='border-1 border-white/20 hover:bg-green-900 transition delay-100 ease-in-out w-full p-3 h-10 flex justify-center items-center text-center rounded-4xl'><p className='text-sm inter font-bold text-white'>Scan</p></div>
                      </div>
          
                      <div className='w-full h-[74vh] border-2 border-dotted border-green-400/90 rounded-2xl flex justify-center items-center flex-col pt-13 pb-5'>
                          <div className='flex justify-center items-center flex-col gap-3'>
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

    </>


  )
}

export default Profile
