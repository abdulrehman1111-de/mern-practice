import React from 'react'
import { ChevronDown } from 'lucide-react';

const Form = () => {
  return (
    <div className='bg-panel h-[95%] w-[45%] rounded-3xl border-border border p-10 text-text flex flex-col justify-center gap-6'>

      <div className='flex items-center gap-3'>
        <div className='w-7 h-7 rounded-md bg-teal'></div>
        <p className='space font-semibold'>Merdian</p>
      </div>

      <div className='flex flex-col gap-2 h-30 w-full justify-center'>
        <p className='space text-2xl font-semibold'>Create your Account</p>
        <p className='inter text-text/60 text-sm'>Register with your student ID to access your dashboard, courses, and grades.</p>
      </div>

      <div className='flex flex-col gap-3'>

        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='text-text/60'>Full name</label>
          <input type="text" name="" id="name" placeholder='Enter your full name' className='p-3 border border-border rounded-lg' />
        </div>

        <div className='flex gap-5 flex-1 min-w-0'>

          <div className='flex flex-col gap-1 flex-1 min-w-0'>
            <label htmlFor="studentId" className='text-text/60'>Student ID</label>
            <input type="text" name="" id="studentId" placeholder='Enter your full name' className='p-3 border border-border rounded-lg' />
          </div>

          <div className='flex flex-col gap-1 flex-1 min-w-0'>
            <label htmlFor="" className='text-text/60'>Department</label>

            {/* Wrapped the select in a label to use the custom arrow down since the default arrow down doesnt get padding  */}
            <div className='relative'>
              <select className='border border-border p-3 text-text bg-panel flex justify-center appearance-none rounded-lg w-full' name="" id="">
                <option value="">Computer Science</option>
                <option value="">IT</option>
                <option value="">Software Engineering</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-[50%] -translate-y-1/2 w-4 h-4 text-dim" />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-1 flex-1 min-w-0'>
          <label htmlFor="studentId" className='text-text/60'>University Email</label>
          <input type="text" name="" id="studentId" placeholder='university@example.com' className='p-3 border border-border rounded-lg' />
        </div>

        <div className='flex gap-5 flex-1 min-w-0'>

          <div className='flex flex-col gap-1 flex-1 min-w-0'>
            <label htmlFor="password" className='text-text/60'>Password</label>
            <input type="text" name="" id="password" placeholder='Enter your password' className='p-3 border border-border rounded-lg' />
          </div>

          <div className='flex flex-col gap-1 flex-1 min-w-0'>
            <label htmlFor="confirmPassword" className='text-text/60'>Confirm Password</label>
            <input type="text" name="" id="confirmPassword" placeholder='Enter your password' className='p-3 border border-border rounded-lg' />
          </div>
        </div>
        <p className='text-text/70 text-sm'>Atleast 8 characters</p>

        <button className='bg-linear-to-r from-accent2 to-accent hover:bg-linear-to-r hover:from-accent hover:to-accent2 transition-colors duration-300 ease-in-out text-[#0a0f16] w-full p-3 rounded-2xl font-semibold'>
            Create your account
        </button>

      </div>

    </div>
  )
}

export default Form
