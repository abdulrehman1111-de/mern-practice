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
import PronounsDiv from '../../components/profile/PronounsDiv'
import TimezoneDiv from '../../components/profile/TimezoneDiv'
import { auth } from '../../components/firebase'
import { db } from '../../components/firebase'
import { doc } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'



const Profile = ({ dark }) => {

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [open9, setOpen9] = useState(false);

  const [changeMessage, setChangeMessage] = useState("");

  const [userData, setUserData] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
        else{
          console.log("No user document found");
        }
      }
    });

    return ()=> unsubscribe();

  }, []);

  useEffect(() => {

    if (open) {
      setOpen2(false);
      setOpen3(false);
      setOpen4(false);
      setOpen6(false);
      setOpen7(false);
      setOpen9(false);
    }

    if (open2) {
      setOpen(false);
      setOpen4(false);
      setOpen6(false);
      setOpen7(false);
      setOpen9(false);
    }

    if (open3) {
      setOpen(false);
      setOpen4(false);
      setOpen6(false);
      setOpen7(false);
      setOpen9(false);
    }

    if (open4) {
      setOpen(false);
      setOpen2(false);
      setOpen3(false);
      setOpen6(false);
      setOpen7(false);
      setOpen9(false);
    }

    if (open6) {
      setOpen(false);
      setOpen2(false);
      setOpen3(false);
      setOpen4(false);
      setOpen5(false);
      setOpen7(false);
      setOpen9(false);
    }

    if (open7) {
      setOpen(false);
      setOpen2(false);
      setOpen3(false);
      setOpen4(false);
      setOpen5(false);
      setOpen6(false);
      setOpen9(false);
    }

    if (!open7) {
      setOpen8(false);
    }

    if (open9) {
      setOpen(false);
      setOpen2(false);
      setOpen3(false);
      setOpen4(false);
      setOpen5(false);
      setOpen6(false);
      setOpen7(false);
    }

  }, [open, open2, open3, open4, open5, open6, open7, open8, open9])

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

  const [selectedPronoun, setSelectedPronoun] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(false);

  return (
    <>
      <div className={`graySelect text-white w-full h-auto overflow-y-auto ${dark ? "bg-[#061B09]" : "bg-white"}`}>
        <Accountnav dark={dark} icon={UserCircle2} heading="Profile" />

        <div className={`w-[75%] h-auto rounded-xl m-5 p-7 flex flex-col gap-9 ${dark ? "bg-[#072419]" : "bg-gray-50 border border-gray-200"}`}>

          <p className={`text-2xl ${dark ? "" : "text-gray-900"}`}>Public</p>
          <p className={`text-md ${dark ? "text-white/80" : "text-gray-500"}`}>These details are displayed on your public profile. Anyone can see them.</p>

          <div>
            <CircleUserRound size={100} className="text-green-500" />
          </div>

          <div className='flex flex-col gap-5'>
            <div onClick={() => setOpen(true)} id='nameDiv' className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
              <p className={`text-lg ${dark ? "text-white/80" : "text-gray-500"}`}>Display Name</p>
              <div className={`flex gap-1 ${dark ? "" : "text-gray-900"}`}>
                <p id='firstNamePara'>{userData?.name}</p> 
              </div>
            </div>

            <div onClick={() => setOpen2(true)} className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
              <p className={`text-lg ${dark ? "text-white/80" : "text-gray-500"}`}>Contact methods</p>
              <p className={`text-sm ${dark ? "" : "text-gray-900"}`}>{userData?.email}</p>
            </div>

            <div onClick={() => setOpen4(true)} className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
              <p className={`text-lg ${dark ? "text-white/80" : "text-gray-500"}`}>Status</p>
              <div className='flex gap-1'>
                <p id='emojiPara'></p>
                <p id='statusPara'></p>
              </div>
            </div>

            <div onClick={() => setOpen6(true)} className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
              <p className={`text-lg ${dark ? "text-white/80" : "text-gray-500"}`}>Pronouns</p>
              <p id='selectPronouns' className={`text-sm ${dark ? "" : "text-gray-900"}`}>Select your pronouns</p>
            </div>

            <div onClick={() => setOpen7(true)} className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
              <p className={`text-lg ${dark ? "text-white/80" : "text-gray-500"}`}>Timezone</p>
              <p id='selectTimezones' className={`text-sm ${dark ? "" : "text-gray-900"}`}>Asia/Karachi</p>
            </div>

          </div>

          <div className={`w-[12%] h-10 rounded-4xl flex justify-center items-center text-center font-semibold m-3 ${dark ? "bg-[#1A3D32] hover:bg-green-400" : "bg-gray-500 hover:bg-gray-400"}`}>
            <p className='text-sm'>Share</p>
          </div>

        </div>

        <div className={`w-[75%] h-auto rounded-xl m-5 p-7 flex flex-col gap-9 ${dark ? "bg-[#072419]" : "bg-white"}`}>

          <p className={`text-lg ${dark ? "text-2xl" : "text-gray-500"}`}>Private</p>
          <p className={`text-md ${dark ? "text-white/80" : "text-gray-900"}`}>These details are used for travel and payments. They're never shown on your public profile.</p>

          <div onClick={() => setOpen9(true)} className='flex flex-col gap-5'>
            <div className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
              <p className={`text-lg ${dark ? "text-2xl" : "text-gray-500"}`}>Legal Name</p>
            </div>

            <div onClick={() => setOpen9(true)} className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
              <p className={`text-lg ${dark ? "text-2xl" : "text-gray-500"}`}>Date of birth</p>
            </div>

            <div onClick={() => setOpen9(true)} className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
              <p className={`text-lg ${dark ? "text-2xl" : "text-gray-500"}`}>Phone number</p>
            </div>

            <div onClick={() => setOpen9(true)} className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
              <p className={`text-lg ${dark ? "text-2xl" : "text-gray-500"}`}>Address</p>
            </div>

          </div>
        </div>


      </div>


      <div className={`absolute overflow-hidden h-screen w-90 z-11 top-0 transition-all duration-500 ease-out text-white p-2 ${open ? "left-[72%]" : "left-full"} ${dark ? "bg-[#061B09]" : "bg-white"}`}>

        <div className='flex justify-between items-center pr-8'>
          <p className={`text-xl inter font-semibold m-8 ${dark ? "" : "text-gray-900"}`}>Display name</p>
          <div id='cross' onClick={() => setOpen(!open)}>
            <X size={20} className={dark ? "text-white" : "text-gray-500"} />
          </div>
        </div>

        <p className={`inter text-sm pl-5 pb-3 font-semibold ${dark ? "text-white/90" : "text-gray-700"}`}>Your display name is shown on your profile</p>

        <div className='flex flex-col gap-5 m-3'>

          <input onKeyDown={(e) => { if (e.key === "Enter") document.getElementById("saveBtn").click() }} className={`border-1 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type="text" name="" id="firstName" placeholder='First name' />



          <input onKeyDown={(e) => { if (e.key === "Enter") document.getElementById("saveBtn").click() }} className={`border-1 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type="text" name="" id="lastName" placeholder='Last name' />

        </div>

        <div id='saveBtn' className='w-[90%] relative top-80 ml-4 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
          <p className='text-sm'>Save</p>
        </div>
      </div>


      <div className={`absolute overflow-hidden h-screen w-90 z-11 top-0 transition-all duration-500 ease-out text-white p-2 ${open2 ? "left-[72%]" : "left-full"} ${dark ? "bg-[#061B09]" : "bg-white"}`}>

        <div className='flex justify-between items-center pr-8'>
          <p className={`text-xl inter font-semibold m-8 ${dark ? "" : "text-gray-900"}`}>Contact methods</p>
          <div onClick={() => setOpen2(!open2)}>
            <X size={20} className={dark ? "text-white" : "text-gray-500"} />
          </div>
        </div>

        <div className={`inter text-sm pl-5 pb-3 font-semibold ${dark ? "text-white/90" : "text-gray-700"}`}>
          <p>Add more ways to log in and send receipts to Expensify.</p>
          <p>Add an email address to forward receipts to <span className='text-blue-400'>receipts@expensify.com</span> or add a phone number to text receipts to 47777 (US numbers only).</p>
        </div>

        <div onClick={() => setOpen3(true)} className={`${dark ? "hover:bg-[#0A2E1F]" : ""}`}>
          <div className='p-4 text-sm flex justify-between items-center '>
            <div className={`flex flex-col gap-1 ${dark ? "" : "text-gray-900"}`}>
              <p>abdulrehmanpro6@gmail.com</p>
              <p className={dark ? "text-white/80" : ""}>We'll use this method to contact you</p>
            </div>
            <ChevronRight size={20} className={dark ? "text-white/80" : "text-gray-500"} />
          </div>
        </div>

        <div className='w-[90%] relative top-65 ml-4 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
          <p className='text-sm'>New contact method</p>
        </div>
      </div>


      <div className={`absolute z-50 overflow-hidden h-screen w-90 top-0 transition-all duration-500 ease-out text-white font-semibold inter p-2 ${open3 ? "left-[72%]" : "left-full"} ${dark ? "bg-[#061B09]" : "bg-white"}`}>

        <div className='p-4 flex flex-start items-center gap-2'>

          <ChevronLeft onClick={() => setOpen3(false)} size={25} className={dark ? "text-white/80" : "text-gray-500"} />
          <p className={`text-lg ${dark ? "" : "text-gray-900"}`}>abdulrehmanpro6@gmail.com</p>

        </div>

        <p className={`p-4 text-sm ${dark ? "text-white/80" : "text-gray-600"}`}>This is your current default contact method. Before you can delete it, you'll need to choose another contact method and click “Set as default”.</p>

      </div>

      <div className={`absolute z-50 overflow-hidden h-screen w-90 top-0 transition-all duration-500 ease-out text-white inter p-2 ${open4 ? "left-[72%]" : "left-full"} ${dark ? "bg-[#061B09]" : "bg-white"}`}>

        <div className='p-4 flex flex-start items-center gap-2'>

          <ChevronLeft onClick={() => setOpen4(false)} size={25} className={dark ? 'text-white/80' : "text-gray-600"} />
          <p className={`text-lg font-semibold ${dark ? "" : "text-gray-900"}`}>Status</p>

        </div>

        <p className={`p-4 text-sm font-semibold ${dark ? "text-white/80" : "text-gray-600"}`}>Set your status with an emoji and optional message.</p>

        <div className={`w-[30%] h-12 rounded-4xl flex gap-2 justify-center items-center text-center font-semibold m-3 ${dark ? "bg-[#1A3D32] hover:bg-green-400" : "bg-gray-100 hover:bg-gray-200"}`}>
          <div id='emojiDiv'><Smile size={25} className={dark ? 'text-white' : "text-gray-700"} /></div>
          <ChevronDown onClick={() => setEmojiPicker(true)} size={25} className={dark ? 'text-white' : "text-gray-700"} />

          {
            emojiPicker && (
              <div className='absolute top-50 left-5 w-30 rounded-lg bg-[#061B09]'>
                <X onClick={() => setEmojiPicker(false)} size={20} className='text-white' />
                <EmojiPicker onEmojiClick={emojiFunction} theme="dark" width={300} height={370} />
              </div>
            )
          }
        </div>

        <input onChange={(e) => setChangeMessage(e.target.value)} className={`border-1 p-3 w-[95%] m-2 rounded-md ${dark ? "border-gray-700" : "border-gray-300 text-gray-700 placeholder:text-gray-400"}`} type="text" name="" id="statusInput" placeholder='Message' />

        <div onClick={() => setOpen5(true)} className={dark ? 'hover:bg-[#0A2E1F]' : "hover:bg-gray-200"}>
          <div className='p-4 text-sm flex justify-between items-center '>
            <div className='flex flex-col gap-1'>
              <p className={dark ? 'text-white/80' : "text-gray-500"}>Clear after</p>
              <p className={dark ? 'text-white/80' : "text-gray-500"}>Today</p>
            </div>
            <ChevronRight size={20} className={dark ? 'text-white/80' : "text-gray-400"} />
          </div>
        </div>

        <div className='flex flex-col gap-2 p-3 text-sm font-semibold'>
          <p className={dark ? '' : "text-gray-900"}>Vacation delegate</p>
          <p className={dark ? 'text-white/80' : "text-gray-400"}>Set a vacation delegate to approve reports on your behalf while you're out of office.</p>
        </div>

        <div className={dark ? 'hover:bg-[#0A2E1F]' : "hover:bg-gray-200"}>
          <div className='p-4 text-sm flex justify-between items-center '>
            <p className={dark ? 'text-white/80' : "text-gray-400"}>Vacation delegate</p>
            <ChevronRight size={20} className={dark ? 'text-white/80' : "text-gray-500"} />
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


      <div className={`absolute z-50 overflow-hidden h-screen w-90 top-0 transition-all duration-500 ease-out text-white inter p-2 ${open5 ? "left-[72%]" : "left-full"} ${dark ? "bg-[#061B09]" : "bg-white"}`}>


        <div className='p-4 flex flex-start items-center gap-2'>

          <ChevronLeft onClick={() => setOpen5(false)} size={25} className={dark ? 'text-white/80' : "text-gray-500"} />
          <p className={`text-lg font-semibold ${dark ? 'text-white/80' : "text-gray-500"}`}>Clear after</p>

        </div>

        <p className={`text-sm p-4 ${dark ? "" : "text-gray-600"}`}>When should we clear your status?</p>

        <div className='m-3 h-auto w-[90%] flex flex-col justify-center gap-10 font-semibold pt-5'>
          {
            options.map((item, index) => {
              return <>
                <div className={`flex justify-between ${dark ? "" : "text-gray-900"}`}>
                  <label htmlFor={index}>{item.radio}</label>
                  <input value={item.radio} onChange={(e) => {
                    setSelectedOption(e.target.value)
                    setIndex(index);
                  }} checked={selectedOption === item.radio} type="radio" name="selection" id={index} className={`w-5 h-5 appearance-none checked:bg-green-400 rounded-full border-1 ${dark ? "border-white" : "text-gray-900 border-gray-400"}`} />
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


      <div className={`absolute inter z-50 overflow-hidden h-screen w-90 top-0 transition-all duration-500 ease-out text-white p-2 ${open6 ? "left-[72%]" : "left-full"} ${dark ? "bg-[#061B09]" : "bg-white"}`}>

        <div className='p-4 flex flex-start items-center gap-2'>

          <ChevronLeft onClick={() => setOpen6(false)} size={25} className={dark ? 'text-white/80' : "text-gray-500"} />
          <p className={`text-lg font-semibold ${dark ? 'text-white/80' : "text-gray-500"}`}>Status</p>

        </div>

        <PronounsDiv dark={dark} getter={selectedPronoun} setter={setSelectedPronoun} />

        <div onClick={() => {
          const selectPronouns = document.getElementById("selectPronouns");
          selectPronouns.innerHTML = selectedPronoun;
          setOpen6(false);
        }} className='w-[90%] relative top-4 ml-4 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
          <p className='text-sm'>Save</p>
        </div>
      </div>

      <div className={`absolute z-50 overflow-hidden h-screen w-90 top-0 transition-all duration-500 ease-out text-white font-semibold inter p-2 ${open7 ? "left-[72%]" : "left-full"} ${dark ? "bg-[#061B09]" : "bg-white"}`}>

        <div className='p-4 flex flex-start items-center gap-2'>

          <ChevronLeft onClick={() => setOpen7(false)} size={25} className={`text-lg ${dark ? "text-white/80" : "text-gray-400"}`} />
          <p className={`text-lg ${dark ? "" : "text-gray-900"}`}>Timezone</p>

        </div>

        <p className={`p-4 text-sm ${dark ? "text-white/90" : "text-gray-600"}`}>Your timezone is shown on your profile.</p>

        <div className='flex items-center'>
          <p className={`p-4 text-sm ${dark ? "text-white/90" : "text-gray-900"}`}>Automatically determine your location</p>
          <label className='relative bottom-4' htmlFor="ball">
            <input className='hidden peer' type="checkbox" name="ball" id="ball" />
            <div className='absolute peer-checked:bg-green-400 duration-150 ease-out w-15 h-8 bg-[#8A9A82] rounded-4xl'>
            </div>
            <div className='w-7 h-7 bg-[#061B09] rounded-full absolute top-0.5 left-1 peer-checked:left-7 transition-all duration-250 ease-out'></div>
          </label>
        </div>

        <div onClick={() => setOpen8(true)} className='p-4 text-sm flex justify-between items-center'>
          <div className='flex flex-col gap-1'>
            <p className={dark ? 'text-white' : "text-gray-900"}>Timezone</p>
            <p></p>
          </div>
          <ChevronRight size={20} className={` ${dark ? "text-white/80" : "text-gray-400"}`} />
        </div>
      </div>

      <div className={`absolute z-50 overflow-hidden h-screen w-90 top-0 transition-all duration-500 ease-out text-white font-semibold inter p-2 ${open8 ? "left-[72%]" : "left-full"} ${dark ? "bg-[#061B09]" : "bg-white"}`}>

        <div className='p-4 flex flex-start items-center gap-2'>

          <ChevronLeft onClick={() => setOpen8(false)} size={25} className={`${dark ? "text-white/80" : "text-gray-900"}`} />
          <p className={`text-lg ${dark ? "" : "text-gray-900"}`}>Timezone</p>

        </div>

        <p className={`p-4 text-sm ${dark ? "text-white/90" : "text-gray-600"}`}>Your timezone is shown on your profile.</p>

        <TimezoneDiv dark={dark} getter={selectedTimezone} setter={setSelectedTimezone} />

        <div onClick={() => {
          const selectTimezones = document.getElementById("selectTimezones");
          selectTimezones.innerHTML = selectedTimezone;
          setOpen7(false);
        }} className='w-[90%] relative top-4 ml-4 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
          <p className='text-sm'>Save</p>
        </div>
      </div>

      <div className={`absolute z-50 overflow-auto h-screen w-90 top-0 transition-all duration-500 ease-out text-white font-semibold inter p-2 ${open9 ? "left-[72%]" : "left-full"} ${dark ? "bg-[#061B09]" : "bg-white"}`}>

        <div className='h-screen overflow-auto'>

          <div className='p-4 flex flex-start items-center gap-2'>

            <ChevronLeft onClick={() => setOpen9(false)} size={25} className={`${dark ? "text-white/80" : "text-gray-900"}`} />
            <p className={`text-lg ${dark ? "" : "text-gray-900"}`}>Personal details</p>

          </div>

          <p className={`inter text-sm pl-5 pt-2 font-semibold ${dark ? "text-white/90" : "text-gray-900"}`}>Basic details</p>

          <div className='flex flex-col gap-3 m-3 font-medium text-sm'>

            <input required className={`clearable peer border-1 [&:user-invalid]:border-red-500 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type="text" name="" id="f" placeholder='Legal first name' />
            <div className='gap-2 items-center hidden peer-[&:user-invalid]:flex'>
              <span className='w-2 h-2 bg-red-500 rounded-full'></span>
              <p className='text-red-500'>This input field is required!</p>
            </div>

            <input required className={`clearable peer border-1 [&:user-invalid]:border-red-500 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type="text" name="" id="" placeholder='Legal last name' />
            <div className='flex gap-2 items-center hidden peer-[&:user-invalid]:flex'>
              <span className='w-2 h-2 bg-red-500 rounded-full'></span>
              <p className='text-red-500'>This input field is required!</p>
            </div>

            <input required className={`clearable peer border-1 [&:user-invalid]:border-red-500 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type='date' name="" id="" placeholder='Legal last name' />
            <div className='flex gap-2 items-center hidden peer-[&:user-invalid]:flex'>
              <span className='w-2 h-2 bg-red-500 rounded-full'></span>
              <p className='text-red-500'>This input field is required!</p>
            </div>

            <input required className={`clearable peer border-1 [&:user-invalid]:border-red-500 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type="number" name="" id="" placeholder='Phone number' />
            <div className='flex gap-2 items-center hidden peer-[&:user-invalid]:flex'>
              <span className='w-2 h-2 bg-red-500 rounded-full'></span>
              <p className='text-red-500'>This input field is required!</p>
            </div>

          </div>

          <p className={`inter text-sm pl-5 pt-2 font-semibold ${dark ? "text-white/90" : "text-gray-900"}`}>Address</p>

          <div className='flex flex-col gap-3 m-3 font-medium text-sm'>

            <input required className={`clearable peer border-1 [&:user-invalid]:border-red-500 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type="text" name="" id="" placeholder='Address line 1' />
            <div className='gap-2 items-center hidden peer-[&:user-invalid]:flex'>
              <span className='w-2 h-2 bg-red-500 rounded-full'></span>
              <p className='text-red-500'>This input field is required!</p>
            </div>

            <input className={`clearable peer border-1 [&:user-invalid]:border-red-500 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type="text" name="" id="" placeholder='Address line 2' />
            <div className='gap-2 items-center hidden peer-[&:user-invalid]:flex'>
              <span className='w-2 h-2 bg-red-500 rounded-full'></span>
              <p className='text-red-500'>This input field is required!</p>
            </div>

            <input className={`clearable peer border-1 [&:user-invalid]:border-red-500 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type="text" name="" id="" placeholder='City' />
            <div className='gap-2 items-center hidden peer-[&:user-invalid]:flex'>
              <span className='w-2 h-2 bg-red-500 rounded-full'></span>
              <p className='text-red-500'>This input field is required!</p>
            </div>

            <input required className={`clearable peer border-1 [&:user-invalid]:border-red-500 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type="text" name="" id="" placeholder='State/Province' />
            <div className='gap-2 items-center hidden peer-[&:user-invalid]flexk'>
              <span className='w-2 h-2 bg-red-500 rounded-full'></span>
              <p className='text-red-500'>This input field is required!</p>
            </div>

            <input required className={`clearable peer border-1 [&:user-invalid]:border-red-500 p-3 w-full rounded-md ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400 text-gray-900"}`} type="number" name="" id="" placeholder='Zipcode' />
            <div className='gap-2 items-center hidden peer-[&:user-invalid]:flex'>
              <span className='w-2 h-2 bg-red-500 rounded-full'></span>
              <p className='text-red-500'>This input field is required!</p>
            </div>

          </div>

        </div>

        <div onClick={() => {

          const inputForms = document.querySelectorAll(".clearable");
          inputForms.forEach((input) => {
            input.value = "";
          })
          setOpen9(false);
        }} className='w-[90%] relative top-4 ml-4 mb-8 h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold'>
          <p className='text-sm'>Save</p>
        </div>
      </div>



    </>


  )
}

export default Profile
