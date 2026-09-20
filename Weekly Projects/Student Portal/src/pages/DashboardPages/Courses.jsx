import React, { useEffect, useState } from 'react'
import CoursesComp from '../../components/Courses/CoursesComp'
import { getCurrentUser } from '../../Backend/users';
import TeacherProgressForm from '../../components/Progress/TeacherProgressForm';
import { getCoursesByStudent } from '../../Backend/courses';
import { getCoursesByTeacher } from '../../Backend/courses';
import CreateCourseForm from '../../components/Courses/CreateCourseForm'
import { getCourses } from '../../Backend/courses';

const Courses = () => {

  const user = getCurrentUser()
  const isTeacher = user?.role === "teacher"

  const [courses, setCourses] = useState([])
  const [avaliableCourses, setAvaliableCourses] = useState([])

  useEffect(() => {
    if (isTeacher) {
      setCourses(getCoursesByTeacher(user.id))
    }
    else {
      setCourses(getCoursesByStudent(user.id))
    }
  }, [])

  useEffect(()=>{
    if(!isTeacher){
      const allCourses = getCourses()
      const coursesNotTaken = allCourses.filter((course)=>{
        return !course.enrolledStudents.some((entry)=> entry.studentId === user.id)
      })
      setAvaliableCourses(coursesNotTaken)
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
                  return <CoursesComp key={course.id} subject={course.name} teacher={`${course.section} · ${course.enrolledStudents.length} students`} details={`${course.credits} credits · ${course.schedule}`}/>
                })
              }
              <TeacherProgressForm />
              <CreateCourseForm onCourseCreated={refreshCourses}/>
            </>
          ) : (
            <>
              {
                courses.map((course)=>{
                  const studentEntry = course.enrolledStudents.find((entry)=> entry.studentId === user.id)
                  return <CoursesComp key={course.id} subject={course.name} teacher={course.section} percentage={studentEntry?.progress} details={`${course.credits} credits · ${course.schedule}`} />
                })
              }
            </>
          )}
        </div>
      </div>


    </div>
  )
}

export default Courses
