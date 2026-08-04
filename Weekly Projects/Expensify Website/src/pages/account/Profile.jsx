import React, { useEffect } from 'react'
import Accountnav from '../../components/account/Accountnav'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'
import { useState } from 'react'
import { X } from 'lucide-react'


const Profile = () => {

  const [open, setOpen] = useState(false);

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

      const handleClick2 = ()=>{
          firstNameVal.value = "";
          lastNameVal.value = "";
      }

      cross.addEventListener("click", handleClick2);

      return ()=>{
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

          <div onClick={() => setOpen(true)} className='flex flex-col gap-5'>
            <div id='nameDiv' className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Display Name</p>
              <div className='flex gap-1'>
                <p id='firstNamePara'>Abdul</p> <p id='lastNamePara'>Rehman</p>
              </div>
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


      <div className={`absolute overflow-hidden bg-[#061B09] h-screen w-90 z-11 top-0 transition-all duration-500 ease-out text-white p-2 ${open ? "left-[72%]" : "left-full"}`}>

        <div className='flex justify-between items-center pr-8'>
          <p className='text-xl inter font-semibold m-8'>Display name</p>
          <div id='cross' onClick={() => setOpen(!open)}>
            <X size={20} className='text-white' />
          </div>
        </div>

        <p className='inter text-sm text-white/90 pl-5 pb-3 font-semibold'>Your display name is shown on your profile</p>

        <div className='flex flex-col gap-5 m-3'>

          <input onKeyDown={(e)=> {if(e.key === "Enter") document.getElementById("saveBtn").click()}} className='border-1 border-gray-700 p-3 w-full rounded-md' type="text" name="" id="firstName" placeholder='First name' />



          <input onKeyDown={(e)=> {if(e.key === "Enter") document.getElementById("saveBtn").click()}} className='border-1 border-gray-700 p-3 w-full rounded-md' type="text" name="" id="lastName" placeholder='Last name' />

        </div>

        <div id='saveBtn' className='w-[90%] relative top-80 ml-4 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
          <p className='text-sm'>Save</p>
        </div>
      </div>

    </>


  )
}

export default Profile
