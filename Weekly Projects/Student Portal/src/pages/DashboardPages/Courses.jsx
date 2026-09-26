import React, { useEffect, useState } from 'react'
import CoursesComp from '../../components/Courses/CoursesComp'
import { getCurrentUser } from '../../Backend/users';
import TeacherProgressForm from '../../components/Progress/TeacherProgressForm';
import { enrollStudent, getCoursesByStudent } from '../../Backend/courses';
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
      const allCourses = getCourses()
      const coursesNotTaken = allCourses.filter((course) => {
        return !course.enrolledStudents.some((entry) => entry.studentId === user.id)
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
      const allCourses = getCourses()
      const coursesNotTaken = allCourses.filter((course) => {
        return !course.enrolledStudents.some((entry) => entry.studentId === user.id)
      })
      setAvaliableCourses(coursesNotTaken)
    }
  }

  function enrollHandler(courseId) {

    enrollStudent(courseId, user.id)
    refreshCourses()
  }

  return (
    <div className='bg-bg w-full min-h-screen p-4 lg:p-8 inter'>

      <div className='courses'>
        <div className='flex flex-col mt-4'>
          <p className='text-xl lg:text-2xl text-text font-semibold space'>Courses</p>
          <p className='text-sm space text-text/60 inter'>{isTeacher ? "Classes you're teaching this semester." : "All courses you're enrolled in this semester."}</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8'>
          {isTeacher ? (
            <>
              {
                courses.map((course) => {
                  let average = 0
                  if(course.enrolledStudents.length === 0){
                    average = 0
                  }
                  else{
                    let sum = 0
                    let totalEnrolledStudents = course.enrolledStudents
                    for(let i = 0; i < totalEnrolledStudents.length; i++){
                      sum += Number(totalEnrolledStudents[i].progress)
                    }
                    average = sum / course.enrolledStudents.length
                  }

                  return <CoursesComp key={course.id} subject={course.name} teacher={`${course.section} · ${course.enrolledStudents.length} students`} percentage={average} details={`${course.credits} credits · ${course.schedule}`} />
                })
              }
              <TeacherProgressForm Refresher={refreshCourses} />
              <CreateCourseForm onCourseCreated={refreshCourses} />
            </>
          ) : (
            <>
              {
                courses.map((course) => {
                  const studentEntry = course.enrolledStudents.find((entry) => entry.studentId === user.id)
                  return <CoursesComp key={course.id} subject={course.name} teacher={course.section} percentage={studentEntry?.progress} details={`${course.credits} credits · ${course.schedule}`} />
                })
              }

              {avaliableCourses.map((course) => (
                <div key={course.id} className='w-full h-auto p-5 bg-panel border border-border flex flex-col gap-3 rounded-xl'>
                  <div>
                    <p className='text-text text-sm'>{course.name}</p>
                    <p className='text-text/60 text-xs'>{course.section}</p>
                  </div>
                  <button onClick={() => enrollHandler(course.id)} className='bg-linear-to-r from-accent2 to-accent hover:bg-linear-to-r hover:from-accent hover:to-accent2 transition-colors duration-300 ease-in-out text-[#0a0f16] px-4 py-2 rounded-lg font-semibold text-xs'>
                    Enroll
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>


    </div>
  )
}

export default Courses