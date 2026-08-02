import React from 'react'
import Accountnav from '../../components/account/Accountnav'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'
import Agentspic from '../../assets/Agentspic.png'

const Agents = () => {
  return (
    <div className='bg-[#061B09] graySelect text-white w-full h-full overflow-y-auto'>
      <Accountnav icon={Wand2} heading="Agents" />

      <div className='w-full h-[85vh] flex flex-col gap-2 justify-center items-center'>

        <div className='bg-contain bg-no-repeat bg-center w-64 h-40' style={{ backgroundImage: `url(${Agentspic})` }}></div>
        <div className='flex flex-col justify-center items-center gap-2'>
          <p className='text-2xl'>No agents created</p>
          <p className='text-white/80 w-120 text-center'>Stop manually doing stuff. Instruct an agent instead and save yourself lots of time. <span className='text-blue-600'>Learn more.</span></p>
        </div>
        <div className='w-[12%] h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold m-3'>
          <p className='text-sm'>New Rule</p>
        </div>

      </div>
    </div>
  )
}

export default Agents
