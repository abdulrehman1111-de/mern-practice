import React from 'react'
import OverviewSmCards from '../../components/Overview/OverviewSmCards'
import { getCurrentUser } from '../../Backend/users';
import TeacherProgressForm from '../../components/Progress/TeacherProgressForm';
import { getCoursesByStudent } from '../../Backend/courses';
import { getCoursesByTeacher } from '../../Backend/courses';
import { useState } from 'react';
import { useEffect } from 'react';

const Grades = () => {

  const user = getCurrentUser()
  const isTeacher = user?.role === "teacher"

  const [courses, setCourses] = useState([])
  const [averageScore, setAverageScore] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [fullyGraded, setFullyGraded] = useState(0)

  useEffect(() => {
    if (isTeacher) {
      const fetchedCourses = getCoursesByTeacher(user.id)
      let average = 0
      let averageArr = []
      let pendingCount = 0
      let totalCount = 0
      fetchedCourses.forEach((course) => {
        let sum = 0
        let count = 0
        course.enrolledStudents.forEach((entry) => {
          totalCount++
          if (entry.score) {
            sum += Number(entry.score.split("%").join(""))
            count++
          }
          else {
            pendingCount++
          }
        })

        if (count > 0) {
          average = sum / count
        }
        else {
          average = 0
        }
        averageArr.push(average)
      })

      let finalSum = 0
      for (let i = 0; i < averageArr.length; i++) {
        finalSum += averageArr[i]
      }
      let finalAverage = 0
      if (fetchedCourses.length > 0) {
        finalAverage = finalSum / fetchedCourses.length
      }
      else {
        finalAverage = 0
      }

      let fullyGraded = 0
      for (let i = 0; i < fetchedCourses.length; i++) {
        let flag = true
        for (let j = 0; j < fetchedCourses[i].enrolledStudents.length; j++) {
          if (!fetchedCourses[i].enrolledStudents[j].score) {
            flag = false
            continue
          }
        }
        if (flag) {
          fullyGraded++
        }
      }

      setAverageScore(finalAverage)
      setPendingCount(pendingCount)
      setTotalCount(totalCount)
      setFullyGraded(fullyGraded)
      setCourses(fetchedCourses)
    }
    else {
      setCourses(getCoursesByStudent(user.id))
    }
  }, [])

  function refreshCourses() {
    const user = getCurrentUser()
    const isTeacher = user?.role === "teacher"

    if (isTeacher) {
      const fetchedCourses = getCoursesByTeacher(user.id)
      let average = 0
      let averageArr = []
      fetchedCourses.forEach((course) => {
        let sum = 0
        let count = 0
        course.enrolledStudents.forEach((entry) => {
          if (entry.score) {
            sum += Number(entry.score.split("%").join(""))
            count++
          }
        })

        if (count > 0) {
          average = sum / count
        }
        else {
          average = 0
        }
        averageArr.push(average)
      })

      let finalSum = 0
      for (let i = 0; i < averageArr.length; i++) {
        finalSum += averageArr[i]
      }
      let finalAverage = 0
      if (fetchedCourses.length > 0) {
        finalAverage = finalSum / fetchedCourses.length
      }
      else {
        finalAverage = 0
      }
      setAverageScore(finalAverage)
      setCourses(fetchedCourses)
    }
    else {
      const fetchedCourses = getCoursesByStudent(user.id)
      let students = []

      fetchedCourses.forEach((course) => {
        let studentEntry = course.enrolledStudents.find((entry) => {
          return entry.studentId === user.id
        })
        students.push(studentEntry)
      })

      let sumScore = 0
      for (let i = 0; i < students.length; i++) {
        if (students[i].score) {
          sumScore += Number(students[i].score.split("%").join(""))
        }
      }

      let tempAverageScore;
      if (fetchedCourses.length === 0) {
        tempAverageScore = 0
      }
      else {
        tempAverageScore = sumScore / fetchedCourses.length
      }

      setAverageScore(tempAverageScore)
      setCourses(fetchedCourses)
    }
  }

  return (
    <div className='bg-bg w-full min-h-screen p-4 lg:p-8 inter'>

      <div className='grades'>
        <div className='flex flex-col mt-4'>
          <p className='text-xl lg:text-2xl text-text font-semibold space'>Grades</p>
          <p className='text-sm space text-text/60 inter'>
            {isTeacher ? "Grade breakdown and pending submissions by class." : "Your transcript and grade breakdown by course."}
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
          {isTeacher ? (
            <>
              <OverviewSmCards upper={"Classes Graded"} middle={`${fullyGraded} / ${courses.length}`} lower={"On track"} />
              <OverviewSmCards upper={"Avg Class Score"} middle={`${averageScore}`} lower={"Across sections"} />
              <OverviewSmCards upper={"Pending Submissions"} middle={`${pendingCount} / ${totalCount}`} lower={"pending ones across courses"} />
            </>
          ) : (
            <>
              <OverviewSmCards upper={"Current GPA"} middle={3.72} lower={"↑ 0.08 vs last sem"} />
              <OverviewSmCards upper={"Average Score"} middle={`${averageScore}`} lower={"Across enrolled courses"} />
              <OverviewSmCards upper={"Credits Completed"} middle={"78 / 130"} lower={"On track"} />
            </>
          )}
        </div>

        <div className='bg-panel rounded-lg border border-border p-4 lg:p-5 mt-5'>

          <p className='text-text text-md font-semibold'>
            {isTeacher ? "My Classes — Fall 2026" : "Current Semester — Fall 2026"}
          </p>

          <div className='overflow-x-auto mt-3'>
            <div className={`grid items-center min-w-[600px] lg:min-w-0 ${isTeacher
              ? 'grid-cols-[2fr_1.5fr_0.6fr_0.6fr]'
              : 'grid-cols-[2fr_1.5fr_0.6fr_0.6fr_0.6fr]'
              } gap-y-3 text-text text-sm`}>

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
                          <div>{course.name}</div>
                          <div>{course.section}</div>
                          <div>{course.credits}</div>
                          <div>{averageScore}</div>
                          <hr className='border-t border-border w-full col-span-4' />
                        </>
                      )
                    })
                  }
                  <TeacherProgressForm Refresher={refreshCourses} />
                </>
              ) : (
                <>
                  {
                    courses.map((course) => {
                      const studentEntry = course.enrolledStudents.find((entry) => entry.studentId === user.id)
                      return (
                        <>
                          <div>{course.name}</div>
                          <div>{course.section}</div>
                          <div>{course.credits}</div>
                          <div>{studentEntry?.score ? studentEntry?.score : "Yet to score"}</div>
                          <div>{studentEntry?.grade ? studentEntry?.grade : "Yet to grade"}</div>
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

      </div>

    </div >
  )
}

export default Grades