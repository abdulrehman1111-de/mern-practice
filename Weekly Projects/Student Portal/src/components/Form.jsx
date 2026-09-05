import React, { useEffect } from 'react'
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import AOS from 'aos';

const Form = () => {

  useEffect(()=>{
    AOS.init({
        mirror:true,
    });
  }, [])

  return (
    <div data-aos-offset="100px" data-aos="custom" className='signup bg-panel h-[95%] w-[45%] rounded-3xl border-border border p-10 text-text flex flex-col justify-center gap-5'>

      <div className='flex items-center gap-3'>
        <div className='w-7 h-7 rounded-md bg-linear-to-r from-accent2 to-accent'></div>
        <p className='space font-semibold'>Student Portal</p>
      </div>

      <div className='flex flex-col gap-2 h-25 w-full justify-center'>
        <p className='space text-2xl font-semibold'>Create your Account</p>
        <p className='inter text-text/60 text-sm'>Register with your student ID to access your dashboard, courses, and grades.</p>
      </div>

      <form action="">
        <div className='flex flex-col gap-3'>

          <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='text-text/60'>Full name</label>
            <input required title='Only alphabets are allowed' pattern="[A-Za-z\s]+" type="text" name="" id="name" placeholder='Enter your full name' className='p-2 border border-border rounded-lg' />
          </div>

          <div className='flex gap-5 flex-1 min-w-0'>

            <div className='flex flex-col gap-1 flex-1 min-w-0'>
              <label htmlFor="studentId" className='text-text/60'>Student ID</label>
              <input required title='Only numeric values are allowed' pattern="[0-9]+" type="text" name="" id="studentId" placeholder='Enter your full name' className='p-2 border border-border rounded-lg' />
            </div>

            <div className='flex flex-col gap-1 flex-1 min-w-0'>
              <label htmlFor="" className='text-text/60'>Department</label>

              {/* Wrapped the select in a label to use the custom arrow down since the default arrow down doesnt get padding  */}
              <div className='relative'>
                <select className='border border-border p-2 text-text bg-panel flex justify-center appearance-none rounded-lg w-full' name="" id="">
                  <option value="">Computer Science</option>
                  <option value="">IT</option>
                  <option value="">Software Engineering</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-[50%] -translate-y-1/2 w-4 h-4 text-dim" />
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-1 flex-1 min-w-0'>
            <label htmlFor="email" className='text-text/60'>University Email</label>
            <input type="email" name="" id="email" placeholder='university@example.com' className='p-2 border border-border rounded-lg' />
          </div>

          <div className='flex gap-5 flex-1 min-w-0'>

            <div className='flex flex-col gap-1 flex-1 min-w-0'>
              <label htmlFor="password" className='text-text/60'>Password</label>
              <input pattern=".{8,}" type="password" title='Password must be atleast 8 characters' name="" id="password" placeholder='Enter your password' className='p-2 border border-border rounded-lg' />
            </div>

            <div className='flex flex-col gap-1 flex-1 min-w-0'>
              <label htmlFor="confirmPassword" className='text-text/60'>Confirm Password</label>
              <input pattern=".{8,}" type="password" title='Password must be atleast 8 characters' name="" id="confirmPassword" placeholder='Enter your password' className='p-2 border border-border rounded-lg' />
            </div>
          </div>
          <p className='text-text/70 text-sm'>Atleast 8 characters</p>

          <Link to="/dashboard"><button type="submit" className='bg-linear-to-r from-accent2 to-accent hover:bg-linear-to-r hover:from-accent hover:to-accent2 transition-colors duration-300 ease-in-out text-[#0a0f16] w-full p-2 rounded-2xl font-semibold'>
            Create your account
          </button></Link>

          <Link to="/login"><p className='text-blue-400 text-sm text-center'>Login instead</p></Link>

        </div>
      </form>

    </div>
  )
}

export default Form
