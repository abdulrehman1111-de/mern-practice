import React from 'react'
import CoursesComp from '../../components/Courses/CoursesComp'

const Courses = () => {
  return (
    <div className='bg-bg w-full min-h-screen p-8 inter'>

      <div className='courses'>
        <div className='flex flex-col mt-4'>
          <p className='text-2xl text-text font-semibold space'>Courses</p>
          <p className='text-sm space text-text/60 inter'>All courses you're enrolled in this semester.</p>
        </div>

        <div className='grid grid-cols-2 gap-5 mt-8'>
          <CoursesComp subject={"Data Structures & Algorithms"} teacher={"Dr. Farah Naz · Sec A"} percentage={72} details={"3 credits · Mon/Wed 9:00"} />
          <CoursesComp subject={"Database Systems"} teacher={"Dr. Bilal Ahmed · Sec B"} percentage={58} details={"3 credits · Tue/Thu 11:00"} />
          <CoursesComp subject={"Web Engineering (MERN)"} teacher={"Code Lab Bahawalpur"} percentage={85} details={"Elective · Sat 11:30"} />
          <CoursesComp subject={"Discrete Mathematics"} teacher={"Dr. Sana Malik · Sec A"} percentage={40} details={"3 credits · Wed 14:00"} />
        </div>
      </div>


    </div>
  )
}

export default Courses
