import React, { useEffect } from 'react'
import Accountnav from '../../components/account/Accountnav'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'
import { useState } from 'react'
import { X } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { ChevronLeft } from 'lucide-react'


const Profile = () => {

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  useEffect(() => {

    if (open) {
      setOpen2(false);
      setOpen3(false);
    }

    if (open2) {
      setOpen(false);
    }

    if (open3) {
      setOpen(false);
    }

  }, [open, open2])

  useEffect(() => {

    const firstNameVal = document.getElementById("firstName");
    const lastNameVal = document.getElementById("lastName");
    const saveBtn = document.getElementById("saveBtn");
    const cross = document.getElementById("cross");

    const firstNamePara = document.getElementById("firstNamePara");
    const lastNamePara = document.getElementById("lastNamePara");

    const handleClick = () => {

      const firstName = firstNameVal.value.trim();
      const lastName = lastNameVal.value.trim();

      if ((firstName.length === 0) || (lastName.length === 0)) {
        alert("Input field cannot be empty!");
        return
      }

      else {
        firstNamePara.innerHTML = firstName;
        lastNamePara.innerHTML = lastName;
        setOpen(false);
        firstNameVal.value = "";
        lastNameVal.value = "";
      }

      const handleClick2 = () => {
        firstNameVal.value = "";
        lastNameVal.value = "";
      }

      cross.addEventListener("click", handleClick2);

      return () => {
        cross.removeEventListener("click", handleClick2);
      }
    }

    saveBtn.addEventListener("click", handleClick);

    return () => {
      saveBtn.removeEventListener("click", handleClick);
    }



  }, [open]);

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
            <div onClick={() => setOpen(true)} id='nameDiv' className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Display Name</p>
              <div className='flex gap-1'>
                <p id='firstNamePara'>Abdul</p> <p id='lastNamePara'>Rehman</p>
              </div>
            </div>

            <div onClick={() => setOpen2(true)} className='hover:bg-[#0A2E25] p-3'>
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


      <div className={`absolute overflow-hidden bg-[#061B09] h-screen w-90 z-11 top-0 transition-all duration-500 ease-out text-white p-2 ${open ? "left-[72%]" : "left-full"}`}>

        <div className='flex justify-between items-center pr-8'>
          <p className='text-xl inter font-semibold m-8'>Display name</p>
          <div id='cross' onClick={() => setOpen(!open)}>
            <X size={20} className='text-white' />
          </div>
        </div>

        <p className='inter text-sm text-white/90 pl-5 pb-3 font-semibold'>Your display name is shown on your profile</p>

        <div className='flex flex-col gap-5 m-3'>

          <input onKeyDown={(e) => { if (e.key === "Enter") document.getElementById("saveBtn").click() }} className='border-1 border-gray-700 p-3 w-full rounded-md' type="text" name="" id="firstName" placeholder='First name' />



          <input onKeyDown={(e) => { if (e.key === "Enter") document.getElementById("saveBtn").click() }} className='border-1 border-gray-700 p-3 w-full rounded-md' type="text" name="" id="lastName" placeholder='Last name' />

        </div>

        <div id='saveBtn' className='w-[90%] relative top-80 ml-4 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
          <p className='text-sm'>Save</p>
        </div>
      </div>


      <div className={`absolute inter z-50 overflow-hidden bg-[#061B09] h-screen w-90 top-0 transition-all duration-500 ease-out text-white p-2 ${open2 ? "left-[72%]" : "left-full"}`}>

        <div className='flex justify-between items-center pr-8'>
          <p className='text-xl inter font-semibold m-8'>Contact methods</p>
          <div onClick={() => setOpen2(!open2)}>
            <X size={20} className='text-white' />
          </div>
        </div>

        <div className='flex flex-col gap-5 p-3 text-sm'>
          <p>Add more ways to log in and send receipts to Expensify.</p>
          <p>Add an email address to forward receipts to <span className='text-blue-400'>receipts@expensify.com</span> or add a phone number to text receipts to 47777 (US numbers only).</p>
        </div>

        <div onClick={() => setOpen3(true)} className='hover:bg-[#0A2E1F]'>
          <div className='p-4 text-sm flex justify-between items-center '>
            <div className='flex flex-col gap-1'>
              <p>abdulrehmanpro6@gmail.com</p>
              <p className='text-white/80'>We'll use this method to contact you</p>
            </div>
            <ChevronRight size={20} className='text-white/80' />
          </div>
        </div>

        <div className='w-[90%] relative top-65 ml-4 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
          <p className='text-sm'>New contact method</p>
        </div>
      </div>


      <div className={`absolute z-50 overflow-hidden bg-[#061B09] h-screen w-90 top-0 transition-all duration-500 ease-out text-white font-semibold inter p-2 ${open3 ? "left-[72%]" : "left-full"}`}>

        <div className='p-4 flex flex-start items-center gap-2'>

          <ChevronLeft onClick={() => setOpen3(false)} size={25} className='text-white/80'/>
          <p className='text-lg'>abdulrehmanpro6@gmail.com</p>
          
        </div>

        <p className='p-4 text-white/80 text-sm'>This is your current default contact method. Before you can delete it, you'll need to choose another contact method and click “Set as default”.</p>

      </div>

    </>


  )
}

export default Profile
