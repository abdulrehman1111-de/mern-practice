import React from 'react'

const Profile = () => {
  return (
    <div className='bg-bg w-full min-h-screen p-8 inter'>

      <div className='profile'>
        <div className='flex flex-col mt-4'>
          <p className='text-2xl text-text font-semibold space'>Profile</p>
          <p className='text-sm space text-text/60 inter'>Your personal and academic information.</p>
        </div>

        <div className='w-full h-auto mt-5 bg-panel rounded-xl p-4 flex flex-col justify-between'>

          <div className='flex gap-3'>

            <div className='w-[10%] h-30 flex justify-center items-center'>

              <div className='w-19 h-19 rounded-full bg-linear-to-br from-accent2 to-accent flex justify-center items-center'>
                <p className='text-panel text-2xl font-semibold'>AR</p>
              </div>

            </div>

            <div className='flex flex-col justify-center'>
              <p className='text-2xl text-text font-semibold'>
                Abdul Rehman
              </p>
              <p className='text-text/60 text-xs'>
                BSCS · Semester 4 · Islamia University of Bahawalpur</p>
            </div>
          </div>

          <div className='w-full h-auto p-5 flex'>

              <div className='w-[50%] h-full flex flex-col gap-5'>
                <div className='flex flex-col'>
                  <p className='text-text/70 text-xs '>Student ID</p>
                  <p className='text-text text-sm'>BSCS-24-0142</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-text/70 text-xs '>University Email</p>
                  <p className='text-text text-sm'>abdul.rehman@iub.edu.pk</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-text/70 text-xs '>Enrollment Year</p>
                  <p className='text-text text-sm'>2025</p>
                </div>
              </div>

              <div className='w-[50%] h-full flex flex-col gap-5'>
                <div className='flex flex-col'>
                  <p className='text-text/70 text-xs '>Department</p>
                  <p className='text-text text-sm'>Computer Science</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-text/70 text-xs '>Phone</p>
                  <p className='text-text text-sm'>+92 300 1234567</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-text/70 text-xs '>Status</p>
                  <p className='text-accent text-sm'>Active</p>
                </div>
              </div>

              

          </div>

        </div>



      </div>



    </div>
  )
}

export default Profile
