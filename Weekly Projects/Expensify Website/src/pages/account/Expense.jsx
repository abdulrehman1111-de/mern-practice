import React from 'react'
import Accountnav from '../../components/account/Accountnav'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'
import Expensepic from '../../assets/Expensepic.png'

const Expense = () => {
  return (
    <div className='bg-[#061B09] text-white w-full h-full overflow-y-auto'>
      <Accountnav icon={Zap} heading="Expense Rules" />

      <div className='text-lg text-white/80 p-5'>
        <p>These rules will apply to your expenses.</p>
      </div>

      <div className='w-full h-[75vh] flex flex-col gap-2 justify-center items-center'>

        <div className='bg-cover bg-center w-50 h-35' style={{ backgroundImage: `url(${Expensepic})` }}></div>
        <div className='flex flex-col justify-center items-center gap-2'>
          <p className='text-2xl'>No rules yet</p>
          <p className='text-white/80'>Add a rule to automate expense reporting.</p>
        </div>
        <div className='w-[12%] h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold m-3'>
            <p className='text-sm'>New Rule</p>
          </div>

      </div>
    </div>
  )
}

export default Expense
