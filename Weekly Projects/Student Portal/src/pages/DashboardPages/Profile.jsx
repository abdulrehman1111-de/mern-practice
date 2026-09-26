import React from 'react'
import { getCurrentUser } from '../../Backend/users';
import { getCoursesByTeacher } from '../../Backend/courses';
import { getCoursesByStudent } from '../../Backend/courses';

const Profile = () => {

  const user = getCurrentUser()
  const name = user?.name ? user?.name : "User";
  let nameAbbreviation = "";
  if (name === "User") {
    nameAbbreviation = "U";
  }
  else {
    let nameArr = name.split(" ");
    let joinedNameArr = "";
    for (let i = 0; i < nameArr.length; i++) {
      joinedNameArr += nameArr[i].slice(0, 1).toUpperCase();
    }
    nameAbbreviation = joinedNameArr;
  }

  const isTeacher = user?.role === "teacher"

  return (
    <div className='bg-bg w-full min-h-screen p-4 lg:p-8 inter'>

      <div className='profile'>
        <div className='flex flex-col mt-4'>
          <p className='text-xl lg:text-2xl text-text font-semibold space'>Profile</p>
          <p className='text-sm space text-text/60 inter'>Your personal and academic information.</p>
        </div>

        <div className='w-full h-auto mt-5 bg-panel rounded-xl p-4 flex flex-col justify-between'>

          <div className='flex flex-col sm:flex-row gap-3'>

            <div className='w-full sm:w-[10%] h-auto sm:h-30 flex justify-center sm:justify-center items-center'>

              <div className='w-19 h-19 rounded-full bg-linear-to-br from-accent2 to-accent flex justify-center items-center'>
                <p className='text-panel text-2xl font-semibold'>{nameAbbreviation}</p>
              </div>

            </div>

            <div className='flex flex-col justify-center items-center sm:items-start text-center sm:text-left'>
              <p className='text-xl lg:text-2xl text-text font-semibold'>
                {name}
              </p>
              <p className='text-text/60 text-xs'>
                {user?.department} · {isTeacher ? "Faculty" : ""} Islamia University of Bahawalpur
              </p>
            </div>
          </div>

          <div className='w-full h-auto p-3 lg:p-5 flex flex-col sm:flex-row gap-6 sm:gap-0'>

            <div className='w-full sm:w-[50%] h-full flex flex-col gap-5'>
              <div className='flex flex-col'>
                <p className='text-text/70 text-xs '>{isTeacher ? "Employee ID" : "Student ID"}</p>
                <p className='text-text text-sm'>{user?.id}</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-text/70 text-xs '>University Email</p>
                <p className='text-text text-sm break-all'>{user?.email}</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-text/70 text-xs '>{isTeacher ? "Joining Year" : "Enrollment Year"}</p>
                <p className='text-text text-sm'>2025</p>
              </div>
            </div>

            <div className='w-full sm:w-[50%] h-full flex flex-col gap-5'>
              <div className='flex flex-col'>
                <p className='text-text/70 text-xs '>Department</p>
                <p className='text-text text-sm'>{user?.department}</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-text/70 text-xs '>{isTeacher ? "Classes Taught" : "Courses Enrolled"}</p>
                <p className='text-text text-sm'>{isTeacher ? getCoursesByTeacher(user?.id).length : getCoursesByStudent(user?.id).length}</p>
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