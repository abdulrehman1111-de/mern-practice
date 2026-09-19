import React, { useEffect, useState } from 'react'
import CoursesComp from '../../components/Courses/CoursesComp'
import { getCurrentUser } from '../../Backend/users';
import { getStudentRecords } from '../../Backend/auth';
import TeacherProgressForm from '../../components/Progress/TeacherProgressForm';
import { getCoursesByStudent } from '../../Backend/courses';
import { getCoursesByTeacher } from '../../Backend/courses';
import CreateCourseForm from '../../components/Courses/CreateCourseForm'

const Courses = () => {

  const user = getCurrentUser()
  const isTeacher = user?.role === "teacher"

  const [courses, setCourses] = useState([])
  const student = getStudentRecords()
  const studentCourseProgress = student[user?.id]?.courseProgress;

  useEffect(() => {
    if (isTeacher) {
      setCourses(getCoursesByTeacher(user.id))
    }
    else {
      setCourses(getCoursesByStudent(user.id))
    }
  }, [])

  function refreshCourses() {
    const user = getCurrentUser()
    const isTeacher = user?.role === "teacher"

    if (isTeacher) {
      setCourses(getCoursesByTeacher(user.id))
    }
    else {
      setCourses(getCoursesByStudent(user.id))
    }
  }

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
              {
                courses.map((course)=>{
                  return <CoursesComp key={course.id} subject={course.name} teacher={`${course.section} . ${course.enrolledStudents.length} students`} details={`${course.credits} credits . ${course.schedule}`}/>
                })
              }
              <TeacherProgressForm />
              <CreateCourseForm onCourseCreated={refreshCourses}/>
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
