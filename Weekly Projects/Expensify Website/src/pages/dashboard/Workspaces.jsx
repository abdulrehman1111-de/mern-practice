import React from 'react'
import { Search, Bot } from 'lucide-react'
import Accountnav from '../../components/account/Accountnav'
import Graybtn from '../../components/account/Graybtn'
import Expensepic from '../../assets/Expensepic.png'
import Dashboardhomepic from '../../assets/Dashboardhomepic.png'
import Transparentbtn from '../../components/Transparentbtn'
import Workspacespic from '../../assets/Workspacespic.png'


const Workspaces = () => {
  return (
    <div className='bg-[#061B09] graySelect text-white w-full h-full overflow-y-auto'>
      <Accountnav heading="Workspaces" />

      <div className='w-[25%] h-15 flex gap-0'>
        <Graybtn text="Wokrspaces" />
        <Graybtn text="Domains" />
      </div>

      <div className='w-full h-[75vh] flex flex-col gap-2 justify-center items-center'>

        <div className='bg-cover bg-center w-50 h-35' style={{ backgroundImage: `url(${Workspacespic})` }}></div>
        <div className='flex flex-col justify-center items-center gap-2'>
          <p className='text-2xl'>Enhance your security with domains</p>
          <p className='text-white/70'>Require members on your domain to log in via single sign-on, restrict workspace creation, and more.</p>
        </div>
        <div className='w-[12%] h-10 rounded-4xl bg-[#2FE38A] hover:bg-green-400 flex justify-center items-center text-center font-semibold m-3'>
          <p className='text-sm'>New Domain</p>
        </div>

      </div>

    </div>
  )
}

export default Workspaces
