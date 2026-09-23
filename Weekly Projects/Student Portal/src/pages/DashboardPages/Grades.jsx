import React from 'react'
import OverviewSmCards from '../../components/Overview/OverviewSmCards'
import { getCurrentUser } from '../../Backend/users';
import TeacherForm from '../../components/Grades/TeacherForm';
import { getCoursesByStudent } from '../../Backend/courses';
import { getCoursesByTeacher } from '../../Backend/courses';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCourses } from '../../Backend/courses';

const Grades = () => {

  const user = getCurrentUser()
  const isTeacher = user?.role === "teacher"

  const [courses, setCourses] = useState([])

  useEffect(() => {
    if (isTeacher) {
      setCourses(getCoursesByTeacher(user.id))
    }
    else {
      setCourses(getCoursesByStudent(user.id))
    }
  }, [])

  return (
    <div className='bg-bg w-full min-h-screen p-8 inter'>

      <div className='grades'>
        <div className='flex flex-col mt-4'>
          <p className='text-2xl text-text font-semibold space'>Grades</p>
          <p className='text-sm space text-text/60 inter'>
            {isTeacher ? "Grade breakdown and pending submissions by class." : "Your transcript and grade breakdown by course."}
          </p>
        </div>

        <div className='grid grid-cols-3 gap-5'>
          {isTeacher ? (
            <>
              <OverviewSmCards upper={"Classes Graded"} middle={"3 / 4"} lower={"On track"} />
              <OverviewSmCards upper={"Avg Class Score"} middle={"76%"} lower={"Across sections"} />
              <OverviewSmCards upper={"Pending Submissions"} middle={"78 / 130"} lower={"12 due this week"} />
            </>
          ) : (
            <>
              <OverviewSmCards upper={"Current GPA"} middle={3.72} lower={"↑ 0.08 vs last sem"} />
              <OverviewSmCards upper={"This semester"} middle={"3.85"} lower={"Best so far"} />
              <OverviewSmCards upper={"Credits Completed"} middle={"78 / 130"} lower={"On track"} />
            </>
          )}
        </div>

        <div className='bg-panel rounded-lg border border-border p-5 mt-5'>

          <p className='text-text text-md font-semibold'>
            {isTeacher ? "My Classes — Fall 2026" : "Current Semester — Fall 2026"}
          </p>

          <div className={`grid items-center ${isTeacher
              ? 'grid-cols-[2fr_1.5fr_0.6fr_0.6fr]'
              : 'grid-cols-[2fr_1.5fr_0.6fr_0.6fr_0.6fr]'
            } gap-y-3 text-text text-sm mt-3`}>

            {isTeacher ? (
              <>
                <div className='text-text/70 text-xs'>Course</div>
                <div className='text-text/70 text-xs'>Section</div>
                <div className='text-text/70 text-xs'>Credits</div>
                <div className='text-text/70 text-xs'>Class Average</div>
                <hr className='border-t border-border w-full col-span-4' />
              </>
            ) : (
              <>
                <div className='text-text/70 text-xs'>Course</div>
                <div className='text-text/70 text-xs'>Instructor</div>
                <div className='text-text/70 text-xs'>Credits</div>
                <div className='text-text/70 text-xs'>Score</div>
                <div className='text-text/70 text-xs'>Grade</div>
                <hr className='border-t border-border w-full col-span-5' />
              </>
            )}

            {isTeacher ? (
              <>
                {
                  courses.map((course) => {
                    let averageScore = 0
                    let sum = 0
                    let gradedCount = 0
                    let totalEnrolledStudents = course.enrolledStudents

                    for (let i = 0; i < totalEnrolledStudents.length; i++) {
                      const s = totalEnrolledStudents[i]
                      if (s.score) {
                        let integerScore = Number(s.score.split("%").join(""))
                        sum += integerScore
                        gradedCount += 1
                      }
                    }
                    averageScore = gradedCount > 0 ? sum / gradedCount : 0

                    return (
                      <>
                        <div>Course: {course.name}</div>
                        <div>Section: {course.section}</div>
                        <div>Credits: {course.credits}</div>
                        <div>Average Score: {averageScore}</div>
                        <hr className='border-t border-border w-full col-span-4' />
                      </>
                    )
                  })
                }
                <TeacherForm />
              </>
            ) : (
              <>
                {
                  courses.map((course) => {
                    const studentEntry = course.enrolledStudents.find((entry) => entry.studentId === user.id)
                    return (
                      <>
                        <div>Course: {course.name}</div>
                        <div>Instructor: {course.section}</div>
                        <div>Credits: {course.credits}</div>
                        <div>Score: {studentEntry?.score}</div>
                        <div>Grade: {studentEntry?.grade}</div>
                        <hr className='border-t border-border w-full col-span-5' />
                      </>

                    )
                  })
                }
              </>
            )}

          </div>
        </div>

      </div>

    </div >
  )
}

export default Grades
