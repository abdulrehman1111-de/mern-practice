import React from 'react'
import Accountnav from '../../components/account/Accountnav'
import { UserCircle2, Mail, Zap, Wand2, Wand } from 'lucide-react'

const Wallet = () => {
  return (
    <div className='bg-[#061B09] text-white w-full h-full'>
      <Accountnav icon={Mail} heading="Wallet"/>
    </div>
  )
}

export default Wallet
