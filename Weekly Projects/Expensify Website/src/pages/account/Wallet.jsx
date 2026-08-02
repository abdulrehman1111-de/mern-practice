import React from 'react'
import Accountnav from '../../components/account/Accountnav'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'
import Walletpic from '../../assets/Walletpic.png'

const Wallet = () => {
  return (
    <div className='bg-[#061B09] graySelect text-white w-full h-full overflow-y-auto'>
      <Accountnav icon={Mail} heading="Wallet" />

      <div className='h-[65vh] m-5 w-[75%] bg-[#072419] rounded-2xl'>
        <div className='bg-center bg-cover h-[50%] w-full rounded-t-2xl' style={{ backgroundImage: `url(${Walletpic})` }}>

        </div>

        <div className='bg-[#072419] h-auto rounded-xl m-5 p-7 flex flex-col gap-9'>

          <div className='flex flex-col gap-2'>
            <p className='text-xl'>Bank accounts</p>
            <p className='text-sm text-white/80'>Add a bank account to make or receive payments.</p>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='hover:bg-[#0A2E25] p-3'>
              <p className='text-md text-white/80'>Add a bank account</p>
            </div>

          </div>
        </div>
      </div>

      <div className='bg-[#072419] w-[75%] h-auto rounded-xl m-5 p-7 flex flex-col gap-9'>

        <div className='flex flex-col gap-2'>
          <p className='text-xl'>Cards</p>
          <p className='text-md text-white/80'>Transactions from assigned cards sync automatically.</p>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='hover:bg-[#0A2E25] p-3'>
            <p className='text-md text-white/80'>Add personal card</p>
          </div>

          <div className='hover:bg-[#0A2E25] p-3'>
            <p className='text-md text-white/80'>Import transactions</p>
          </div>

          <div className='hover:bg-[#0A2E25] p-3'>
            <p className='text-md text-white/80'>Need to add company cards?</p>
          </div>
        </div>
      </div>

      <div className='bg-[#072419] w-[75%] h-auto rounded-xl m-5 p-7 flex flex-col gap-9'>

        <div className='flex flex-col gap-2'>
          <p className='text-xl'>Expensify Wallet (Beta)</p>
          <p className='text-md text-white/80'>Send and receive money with friends. US bank accounts only.</p>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='hover:bg-[#0A2E25] p-3'>
            <p className='text-md text-white/80'>Enable Wallet</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
