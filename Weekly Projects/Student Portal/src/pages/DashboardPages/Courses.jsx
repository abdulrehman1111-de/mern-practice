import React from 'react'
import CoursesComp from '../../components/Courses/CoursesComp'
import { getUser } from '../../Backend/auth';
import { getStudentRecords } from '../../Backend/auth';
import TeacherProgressForm from '../../components/Progress/TeacherProgressForm';

const Courses = () => {

  const user = getUser();
  const isTeacher = user?.role === "teacher"

  const student = getStudentRecords()
  const studentCourseProgress = student[user?.id]?.courseProgress;

  return (
    <div className='bg-bg w-full min-h-screen p-8 inter'>

      <div className='courses'>
        <div className='flex flex-col mt-4'>
          <p className='text-2xl text-text font-semibold space'>Courses</p>
          <p className='text-sm space text-text/60 inter'>{isTeacher ? "Classes you're teaching this semester." : "All courses you're enrolled in this semester."}</p>
        </div>

        <div className='grid grid-cols-2 gap-5 mt-8'>
          {isTeacher ? (
            <>
              <CoursesComp subject={"Data Structures & Algorithms"} teacher={"Sec A · 38 students"} percentage={72} details={"3 credits · Mon/Wed 9:00"} />
              <CoursesComp subject={"Database Systems"} teacher={"Sec B · 41 students"} percentage={58} details={"3 credits · Tue/Thu 11:00"} />
              <CoursesComp subject={"Web Engineering (MERN)"} teacher={"Elective · 25 students"} percentage={85} details={"Elective · Sat 11:30"} />
              <CoursesComp subject={"Discrete Mathematics"} teacher={"Sec A · 36 students"} percentage={40} details={"3 credits · Wed 14:00"} />
              <TeacherProgressForm/>
            </>
          ) : (
            <>
              <CoursesComp subject={"Data Structures & Algorithms"} teacher={"Dr. Farah Naz · Sec A"} percentage={studentCourseProgress?.DataStructures} details={"3 credits · Mon/Wed 9:00"} />
              <CoursesComp subject={"Database Systems"} teacher={"Dr. Bilal Ahmed · Sec B"} percentage={studentCourseProgress?.DatabaseSystems} details={"3 credits · Tue/Thu 11:00"} />
              <CoursesComp subject={"Web Engineering (MERN)"} teacher={"Code Lab Bahawalpur"} percentage={studentCourseProgress?.WebEngineering} details={"Elective · Sat 11:30"} />
              <CoursesComp subject={"Discrete Mathematics"} teacher={"Dr. Sana Malik · Sec A"} percentage={studentCourseProgress?.DiscreteMathematics} details={"3 credits · Wed 14:00"} />
            </>
          )}
        </div>
      </div>


    </div>
  )
}

export default Courses
