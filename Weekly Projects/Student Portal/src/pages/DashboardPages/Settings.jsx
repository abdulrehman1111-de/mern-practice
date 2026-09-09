import React from 'react'

const Settings = () => {
  return (
    <div className='bg-bg w-full min-h-screen p-8 inter'>

      <div className='settings'>

        <div className='flex flex-col mt-4'>
          <p className='text-2xl text-text font-semibold space'>Settings</p>
          <p className='text-sm space text-text/60 inter'>Manage your account preferences.</p>
        </div>

        <div className='w-full h-auto p-5 border border-border rounded-xl bg-panel mt-5'>

          <p className='text-text text-sm font-semibold'>Notifications</p>

          <div className='w-full flex flex-col gap-5 mt-7'>

            <div className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <p className='text-text text-sm font-semibold'>Assignment reminders</p>
                <p className='text-text/70 text-xs'>Get notified before assignments are due</p>
              </div>

              <label className='relative w-15 h-8 block' htmlFor="ball">
                <input className='hidden peer' type="checkbox" name="ball" id="ball" />
                <div className='absolute peer-checked:bg-green-400 duration-150 ease-out w-13 h-6 bg-[#8A9A82] rounded-4xl'>
                </div>
                <div className='w-5 h-5 bg-[#061B09] rounded-full absolute top-0.5 left-1 peer-checked:left-7 transition-all duration-250 ease-out'></div>
              </label>

              
            </div>

            <hr className='border-t border-border'/>

            <div className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <p className='text-text text-sm font-semibold'>Grade updates</p>
                <p className='text-text/70 text-xs'>Get notified when new grades are posted</p>
              </div>

              <label className='relative w-15 h-8 block' htmlFor="ball2">
                <input className='hidden peer' type="checkbox" name="ball" id="ball2" />
                <div className='absolute peer-checked:bg-green-400 duration-150 ease-out w-13 h-6 bg-[#8A9A82] rounded-4xl'>
                </div>
                <div className='w-5 h-5 bg-[#061B09] rounded-full absolute top-0.5 left-1 peer-checked:left-7 transition-all duration-250 ease-out'></div>
              </label>

            </div>

              <hr className='border-t border-border'/>

            <div className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <p className='text-text text-sm font-semibold'>Fee reminders</p>
                <p className='text-text/70 text-xs'>Reminders before payment deadlines</p>
              </div>

              <label className='relative w-15 h-8 block' htmlFor="ball3">
                <input className='hidden peer' type="checkbox" name="ball" id="ball3" />
                <div className='absolute peer-checked:bg-green-400 duration-150 ease-out w-13 h-6 bg-[#8A9A82] rounded-4xl'>
                </div>
                <div className='w-5 h-5 bg-[#061B09] rounded-full absolute top-0.5 left-1 peer-checked:left-7 transition-all duration-250 ease-out'></div>
              </label>

            </div>  
            

          </div>
          

        </div>

        <div className='w-full h-auto p-5 border border-border rounded-xl bg-panel mt-5'>

          <p className='text-text text-sm font-semibold'>Account</p>

          <div className='w-full flex flex-col gap-5 mt-7'>

            <div className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <p className='text-text text-sm font-semibold'>Change password</p>
                <p className='text-text/70 text-xs'>Update your account password</p>
              </div>

              <button className='h-auto p-2 border-2 border-border/60 text-border rounded-lg'>
                <p className='text-text text-sm'>Change</p>
              </button>

              
            </div>

            <hr className='border-t border-border'/>

            <div className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <p className='text-text text-sm font-semibold'>Two-factor authentication</p>
                <p className='text-text/70 text-xs'>Add an extra layer of security</p>
              </div>

              <button className='h-auto p-2 border-2 border-border/60 text-border rounded-lg'>
                <p className='text-text text-sm'>Enable</p>
              </button>

            </div>

              <hr className='border-t border-border'/>

            <div className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <p className='text-text text-sm font-semibold'>Log out of all devices</p>
                <p className='text-text/70 text-xs'>End all active sessions</p>
              </div>

              <button className='h-auto p-2 border-2 border-danger/60 text-border rounded-lg'>
                <p className='text-danger text-sm'>Logout</p>
              </button>

            </div>  
            

          </div>
          

        </div>

      </div>

    </div>
  )
}

export default Settings
