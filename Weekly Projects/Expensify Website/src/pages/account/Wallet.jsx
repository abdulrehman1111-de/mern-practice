import React from 'react'
import Accountnav from '../../components/account/Accountnav'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'
import Walletpic from '../../assets/Walletpic.png'

const Wallet = ({dark}) => {
  return (
    <div className={`graySelect text-white w-full h-full overflow-y-auto ${dark ? "bg-[#061B09]" : "bg-white"}`}>
      <Accountnav dark={dark} icon={Mail} heading="Wallet" />

      <div className={`h-[65vh] m-5 w-[75%] rounded-2xl ${dark ? "bg-[#072419]" : "bg-gray-50 border border-gray-200"}`}>
        <div className='bg-center bg-cover h-[50%] w-full rounded-t-2xl' style={{ backgroundImage: `url(${Walletpic})` }}>

        </div>

        <div className={`h-auto rounded-xl m-5 p-7 flex flex-col gap-9 ${dark ? "bg-[#072419]" : "bg-gray-50 text-gray-900"}`}>

          <div className='flex flex-col gap-2'>
            <p className='text-xl'>Bank accounts</p>
            <p className={`text-sm ${dark ? "text-white/80" : "text-gray-500"}`}>Add a bank account to make or receive payments.</p>
          </div>

          <div className='flex flex-col gap-5'>
            <div className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
              <p className={`text-md ${dark ? "text-white/80" : "text-gray-500"}`}>Add a bank account</p>
            </div>

          </div>
        </div>
      </div>

      <div className={`w-[75%] h-auto rounded-xl m-5 p-7 flex flex-col gap-9 ${dark ? "bg-[#072419]" : "bg-white border border-gray-200"}`}>

        <div className='flex flex-col gap-2'>
          <p className={`text-xl ${dark ? "" : "text-gray-900"}`}>Cards</p>
          <p className={`text-md ${dark ? "text-white/80" : "text-gray-500"}`}>Transactions from assigned cards sync automatically.</p>
        </div>

        <div className='flex flex-col gap-5'>
          <div className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
            <p className={`text-md ${dark ? "text-white/80" : "text-gray-500"}`}>Add personal card</p>
          </div>

          <div className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
            <p className={`text-md ${dark ? "text-white/80" : "text-gray-500"}`}>Import transactions</p>
          </div>

          <div className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
            <p className={`text-md ${dark ? "text-white/80" : "text-gray-500"}`}>Need to add company cards?</p>
          </div>
        </div>
      </div>

      <div className={`w-[75%] h-auto rounded-xl m-5 p-7 flex flex-col gap-9  ${dark ? "bg-[#072419]" : "bg-white"}`}>

        <div className='flex flex-col gap-2'>
          <p className={`text-xl ${dark ? "" : "text-gray-900"}`}>Expensify Wallet (Beta)</p>
          <p className={`text-md ${dark ? "text-white/80" : "text-gray-500"}`}>Send and receive money with friends. US bank accounts only.</p>
        </div>

        <div className='flex flex-col gap-5'>
          <div className={`p-3 ${dark ? "hover:bg-[#0A2E25]" : "hover:bg-gray-200"}`}>
            <p className={`text-md ${dark ? "text-white/80" : "text-gray-500"}`}>Enable Wallet</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
