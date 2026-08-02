import React from 'react'
import Accountnav from '../../components/account/Accountnav'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'

const Profile = () => {
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

          <div className='flex flex-col gap-5'>
            <div className='hover:bg-[#0A2E25] p-3'>
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

    </>


  )
}

export default Profile
