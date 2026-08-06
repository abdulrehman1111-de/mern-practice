import React, { useEffect } from 'react'
import Accountnav from '../../components/account/Accountnav'
import { UserCircle2, Mail, Zap, Wand2, Wand, Cross } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'
import { useState } from 'react'
import { X } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { ChevronLeft } from 'lucide-react'
import { Smile, ChevronDown } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { renderToString } from 'react-dom/server'


const Profile = () => {

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const [changeMessage, setChangeMessage] = useState("");

  useEffect(() => {

    if (open) {
      setOpen2(false);
      setOpen3(false);
      setOpen4(false);
    }

    if (open2) {
      setOpen(false);
      setOpen4(false);
    }

    if (open3) {
      setOpen(false);
      setOpen4(false);
    }

    if (open4) {
      setOpen(false);
      setOpen2(false);
      setOpen3(false)
    }

  }, [open, open2, open3, open4])

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

  const [selectedOption, setSelectedOption] = useState("Today");
  const [index, setIndex] = useState(3);
  // const statusPara = document.getElementById("statusPara");

  const now = new Date();
  const midnight = new Date();

  midnight.setHours(24, 0, 0, 0);

  const timeTillMidnight = now - midnight;

  const options = [
    {
      radio: "Never",
      time: 0
    },
    {
      radio: "30 minutes",
      time: 1800000
    },
    {
      radio: "5 seconds",
      time: 5000
    },
    {
      radio: "1 hour",
      time: 3600000
    },
    {
      radio: "Today",
      time: timeTillMidnight
    },
    {
      radio: "A week",
      time: 604800000
    }
  ]

  const targetIndex = index;
  let intermediateObj = null;
  for (let i = 0; i < options.length; i++) {
    if (i === index) {
      intermediateObj = options[i];
    }

    else {
      console.log("No time currently selected!")
    }
  }
  const targetSetTimeout = intermediateObj.time;


  const setTimeoutCleanerFunction = () => {

    const highestId = setTimeout(() => {

    }, 0)

    for (let i = 0; i <= highestId; i++) {
      clearTimeout(i);
    }

    console.log("All set timeouts cleaned up!")
  }

  const [emojiPicker, setEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const emojiFunction = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    setEmojiPicker(false);
  }

  const emojiDiv = document.getElementById("emojiDiv");
  if (selectedEmoji !== "") {
    emojiDiv.innerHTML = selectedEmoji;
  }

  useEffect(() => {
    const statusInput = document.getElementById("statusInput");
    const emojiPara = document.getElementById("emojiPara")
    const emojiDiv = document.getElementById("emojiDiv");
    if (((statusPara.innerHTML === "") || (emojiPara.innerHTML === "")) && (!open4)) {
      statusInput.value = "";
      emojiDiv.innerHTML = renderToString(<Smile size={25} className='text-white' />);
      setSelectedEmoji("");
    }
  }, [open4])




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

            <div onClick={() => setOpen4(true)} className='hover:bg-[#0A2E25] p-3'>
              <p className='text-lg text-white/80'>Status</p>
              <div className='flex gap-1'>
                <p id='emojiPara'></p>
                <p id='statusPara'></p>
              </div>
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

          <ChevronLeft onClick={() => setOpen3(false)} size={25} className='text-white/80' />
          <p className='text-lg'>abdulrehmanpro6@gmail.com</p>

        </div>

        <p className='p-4 text-white/80 text-sm'>This is your current default contact method. Before you can delete it, you'll need to choose another contact method and click “Set as default”.</p>

      </div>

      <div className={`absolute z-50 overflow-hidden bg-[#061B09] h-screen w-90 top-0 transition-all duration-500 ease-out text-white inter p-2 ${open4 ? "left-[72%]" : "left-full"}`}>

        <div className='p-4 flex flex-start items-center gap-2'>

          <ChevronLeft onClick={() => setOpen4(false)} size={25} className='text-white/80' />
          <p className='text-lg font-semibold'>Status</p>

        </div>

        <p className='p-4 text-white/80 text-sm font-semibold'>Set your status with an emoji and optional message.</p>

        <div className='w-[30%] h-12 rounded-4xl bg-[#1A3D32] hover:bg-green-400 flex gap-2 justify-center items-center text-center font-semibold m-3'>
          <div id='emojiDiv'><Smile size={25} className='text-white' /></div>
          <ChevronDown onClick={() => setEmojiPicker(true)} size={25} className='text-white' />

          {
            emojiPicker && (
              <div className='absolute top-50 left-5 w-30 rounded-lg bg-[#061B09]'>
                <X onClick={() => setEmojiPicker(false)} size={20} className='text-white' />
                <EmojiPicker onEmojiClick={emojiFunction} theme="dark" width={300} height={370} />
              </div>
            )
          }
        </div>

        <input onChange={(e) => setChangeMessage(e.target.value)} className='border-1 border-gray-700 p-3 w-[95%] m-2 rounded-md' type="text" name="" id="statusInput" placeholder='Message' />

        <div onClick={() => setOpen5(true)} className='hover:bg-[#0A2E1F]'>
          <div className='p-4 text-sm flex justify-between items-center '>
            <div className='flex flex-col gap-1'>
              <p className='text-white/80'>Clear after</p>
              <p>Today</p>
            </div>
            <ChevronRight size={20} className='text-white/80' />
          </div>
        </div>

        <div className='flex flex-col gap-2 p-3 text-sm font-semibold'>
          <p>Vacation delegate</p>
          <p className='text-white/80'>Set a vacation delegate to approve reports on your behalf while you're out of office.</p>
        </div>

        <div className='hover:bg-[#0A2E1F]'>
          <div className='p-4 text-sm flex justify-between items-center '>
            <p className='text-white/80'>Vacation delegate</p>
            <ChevronRight size={20} className='text-white/80' />
          </div>
        </div>



        <div onClick={() => {
          setOpen4(false);
          const statusPara = document.getElementById("statusPara");
          const emojiPara = document.getElementById("emojiPara");
          statusPara.innerHTML = changeMessage;
          emojiPara.innerHTML = selectedEmoji;
        }}
          id='saveBtn' className='w-[90%] relative top-25 ml-4 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
          <p className='text-sm'>Save</p>
        </div>

      </div>


      <div className={`absolute z-50 overflow-hidden bg-[#061B09] h-screen w-90 top-0 transition-all duration-500 ease-out text-white inter p-2 ${open5 ? "left-[72%]" : "left-full"}`}>


        <div className='p-4 flex flex-start items-center gap-2'>

          <ChevronLeft onClick={() => setOpen5(false)} size={25} className='text-white/80' />
          <p className='text-lg font-semibold'>Clear after</p>

        </div>

        <p className='text-sm p-4'>When should we clear your status?</p>

        <div className='m-3 h-auto w-[90%] flex flex-col justify-center gap-10 font-semibold pt-5'>
          {
            options.map((item, index) => {
              return <>
                <div className='flex justify-between'>
                  <label htmlFor={index}>{item.radio}</label>
                  <input value={item.radio} onChange={(e) => {
                    setSelectedOption(e.target.value)
                    setIndex(index);
                  }} checked={selectedOption === item.radio} type="radio" name="selection" id={index} className='w-5 h-5 appearance-none rounded-full border-1 border-white checked:bg-green-400' />
                </div>
              </>
            })
          }
        </div>

        <div onClick={() => {

          setTimeoutCleanerFunction();

          const statusPara = document.getElementById("statusPara");
          const emojiPara = document.getElementById("emojiPara");
          const statusInput = document.getElementById("statusInput");
          statusPara.innerHTML = changeMessage;

          setTimeout(() => {
            statusPara.innerHTML = "";
            emojiPara.innerHTML = "";
            statusInput.value = "";
            emojiDiv.innerHTML = renderToString(<Smile size={25} className='text-white' />);
            setSelectedEmoji("");
          }, targetSetTimeout)
          setOpen5(false)
          setOpen4(false);
        }} className='w-[90%] relative top-25 ml-4 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
          <p className='text-sm'>Save</p>
        </div>

      </div>

    </>


  )
}

export default Profile
