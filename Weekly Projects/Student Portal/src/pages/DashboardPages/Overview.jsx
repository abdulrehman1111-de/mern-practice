import React, { useEffect, useState } from 'react'
import OverviewSmCards from '../../components/Overview/OverviewSmCards'
import OverviewProgress from '../../components/Overview/OverviewProgress'
import OverviewTimetable from '../../components/Overview/OverviewTimetable'
import Assignments from '../../components/Overview/Assignments'
import { getCurrentUser } from '../../Backend/users'
import { getCoursesByStudent, getCoursesByTeacher } from '../../Backend/courses'

const Overview = () => {

  const user = getCurrentUser();
  const isTeacher = user?.role === "teacher"
  const attendancePercentage = isTeacher ? 85 : 91;
  const firstName = user?.name ? user.name.split(" ")[0] : "User"

  const currDay = new Date();
  const [day, setDay] = useState(currDay.getDay())

  useEffect(() => {

    function addWelcomeMsg() {

      switch (day) {
        case 1:
          setDay("Monday")
          break;

        case 2:
          setDay("Tuesday")
          break;

        case 3:
          setDay("Wednesday")
          break;

        case 4:
          setDay("Thursday")
          break;

        case 5:
          setDay("Friday")
          break;

        case 6:
          setDay("Saturday")
          break;

        default:
          setDay("Sunday")
      }
    }

    addWelcomeMsg();

  }, [])

  const [animatedAttendance, setAnimatedAttendance] = useState(0);
  const [courses, setCourses] = useState([])
  const [totalStudents, setTotalStudents] = useState("")
  const [pendingGrading, setPendingGrading] = useState(0)
  const [averageProgress, setAverageProgress] = useState("")
  const [averageScore, setAverageScore] = useState("")

  useEffect(() => {
    setAnimatedAttendance(attendancePercentage);
  });

  useEffect(() => {
    if (isTeacher) {
      const fetchedCourses = getCoursesByTeacher(user.id)
      setCourses(fetchedCourses)

      const uniqueStudentIds = new Set()
      for (let i = 0; i < fetchedCourses.length; i++) {
        for (let j = 0; j < fetchedCourses[i].enrolledStudents.length; j++) {
          uniqueStudentIds.add(fetchedCourses[i].enrolledStudents[j].studentId)
        }
      }

      let pendingCount = 0
      for (let i = 0; i < fetchedCourses.length; i++) {
        for (let j = 0; j < fetchedCourses[i].enrolledStudents.length; j++) {
          if (!fetchedCourses[i].enrolledStudents[j].score) {
            pendingCount++;
          }
        }
      }

      setTotalStudents(uniqueStudentIds.size)
      setPendingGrading(pendingCount)

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
      let sum = 0
      for (let i = 0; i < students.length; i++) {
        sum += students[i].progress
      }
      let average;
      if (fetchedCourses.length === 0) {
        average = 0
      }
      else {
        average = sum / fetchedCourses.length
      }

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

      setAverageProgress(average)
      setAverageScore(tempAverageScore)
      setCourses(fetchedCourses)
    }
  }, [])

  return (
    <div className='bg-bg w-full min-h-screen p-8 inter'>

      <div className='overview' data-aos-offset="0px" data-aos="custom">
        <span className='p-1 border text-accent border-accent rounded-2xl text-nowrap text-xs font-semibold bg-accent/10 inter'>
          Fall 2026 . Week 6
        </span>

        <div className='flex flex-col mt-4'>
          <p className='text-2xl text-text font-semibold space'><span>Good {day}!</span>, {firstName}</p>
          <p className='text-sm space text-text/70 inter'>{isTeacher ? "You have 3 classes to teach today and 12 assignments pending grading." : "You have 2 assignments due this week and a quiz tomorrow."}</p>
        </div>

        <div className='grid grid-cols-4 gap-5 items-start'>

          <OverviewSmCards upper={isTeacher ? "Total students" : "Enrolled Courses"} middle={isTeacher ? totalStudents : courses.length} lower={isTeacher ? "Alpha Batch" : user?.department} />
          <OverviewSmCards upper={isTeacher ? "Classes taught" : "Average Progress"} middle={isTeacher ? courses.length : `${averageProgress}%`} lower={"↑ 3% this month"} />
          <OverviewSmCards upper={isTeacher ? "Pending Grading" : "Average Score"} middle={isTeacher ? pendingGrading : `${averageScore}%`} lower={isTeacher ? '12 Submissions' : '78 / 130'} />
          <OverviewSmCards upper={isTeacher ? 'Department' : 'Department'} middle={isTeacher ? user?.department : user?.department} lower={"Cleared"} />

        </div>

        <div className='flex gap-5'>

          <div className='w-[60%] h-auto mt-5'>

            <div className='border border-border rounded-xl bg-panel w-full h-auto p-4'>
              <div className='flex justify-between'>
                <p className='text-text/90 font-semibold space'>{isTeacher ? 'My Teaching Schedule' : 'Active Courses'}</p>
                <p className='text-text/60 text-sm'>View all</p>
              </div>

              <div className='flex flex-col gap-1.5 mt-5'>
                {isTeacher ? (
                  <>
                    {
                      courses.map((course) => {
                        let averageProgress = 0
                        let sum = 0
                        let count = 0
                        let totalEnrolledStudents = course.enrolledStudents

                        for (let i = 0; i < totalEnrolledStudents.length; i++) {
                          if (totalEnrolledStudents[i].progress) {
                            sum += totalEnrolledStudents[i].progress
                            count++
                          }
                        }
                        averageProgress = count > 0 ? sum / count : 0
                        return <>
                          <OverviewProgress subject={course.name} teacher={`${course.section} · ${course.enrolledStudents.length} students`} progress={averageProgress} />
                          <hr className='border border-border' />
                        </>
                      })
                    }
                  </>
                ) : (
                  <>
                    {
                      courses.map((course) => {
                        const studentEntry = course.enrolledStudents.find((entry) => entry.studentId === user.id)
                        return <>
                          <OverviewProgress subject={course.name} teacher={course.section} progress={studentEntry?.progress} />
                          <hr className='border border-border' />
                        </>
                      })
                    }


                  </>
                )}
              </div>
            </div>

            <div className='w-full h-auto mt-5 bg-panel rounded-xl p-4 flex flex-col justify-between gap-10'>

              <div className='flex justify-between'>
                <p className='text-text font-semibold space'>Grade Trend</p>
                <p className='text-text/60 text-sm'>Full transcript</p>
              </div>


              <div className='text-text/60 flex justify-between text-xs pl-13 pr-13'>
                <p>Sem 1</p>
                <p>Sem 2</p>
                <p>Sem 3</p>
                <p>Sem 4</p>
              </div>

            </div>

          </div>

          <div className='w-[40%] h-auto mt-5 flex flex-col gap-5'>

            <div className='p-5 w-full h-[37vh] bg-panel border border-border rounded-xl'>

              <div className='flex justify-between'>
                <p className='text-text font-semibold space'>Attendance</p>
                <p className='text-text/60 text-xs'>Details</p>
              </div>

              <div className='flex justify-center items-center relative'>
                {/* Circular Progress Bar */}
                <svg viewBox="0 0 100 100" className="w-35 h-35 -rotate-90 absolute top-5">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-panel2" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke="currentColor" className="text-accent transition-all duration-1000 ease-out"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - (animatedAttendance / 100))}
                    strokeLinecap="round"
                  />
                </svg>

                <div className='flex flex-col justify-center items-center z-10 absolute top-17'>
                  <p className='text-text font-semibold space text-2xl'>{animatedAttendance}%</p>
                  <p className='text-text/60 text-xs'>this semester</p>
                </div>

              </div>

            </div>

            <div className='p-5 w-full h-auto bg-panel border border-border rounded-xl'>

              <div className='flex justify-between'>
                <p className='text-text font-semibold space'>Today's Timetable</p>
                <p className='text-text/60 text-xs'>Full week</p>
              </div>

              <div className='flex flex-col gap-3 mt-5'>
                {isTeacher ? (
                  <>
                    <OverviewTimetable time={"9:00"} dotColor={'bg-blue-400'} subject={"Data Structures"} room={"Room 214"} />
                    <hr className='border border-border' />
                    <OverviewTimetable time={"9:00"} dotColor={'bg-accent'} subject={"Web Engineering Lab"} room={"Lab 3"} />
                    <hr className='border border-border' />
                    <OverviewTimetable time={"9:00"} dotColor={'bg-yellow-400'} subject={"Discrete Math Quiz"} room={"Room 108"} />
                  </>
                ) : (
                  <>
                    <OverviewTimetable time={"9:00"} dotColor={'bg-blue-400'} subject={"Data Structures"} room={"Room 214"} />
                    <hr className='border border-border' />
                    <OverviewTimetable time={"11:30"} dotColor={'bg-accent'} subject={"Web Engineering Lab"} room={"Lab 3"} />
                    <hr className='border border-border' />
                    <OverviewTimetable time={"2:00"} dotColor={'bg-yellow-400'} subject={"Discrete Math Quiz"} room={"Room 108"} />
                  </>
                )}
              </div>

            </div>

            <div className='p-5 w-full h-auto bg-panel border border-border rounded-xl'>
              <div className='flex justify-between'>
                <p className='text-text font-semibold space'>{isTeacher ? 'Submissions to Grade' : 'Assignments'}</p>
                <p className='text-text/60 text-xs'>All tasks</p>
              </div>

              <div className='flex flex-col'>
                <div className='flex flex-col gap-2.5 mt-6'>
                  {isTeacher ? (
                    <>
                      <Assignments subject={"DBMS — ER Diagram"} dueStatus={"Due tomorrow"} />
                      <hr className='border border-border' />
                      <Assignments subject={"DSA — Binary Tree Lab"} dueStatus={"Submitted"} />
                      <hr className='border border-border' />
                      <Assignments subject={"MERN — Auth Module"} dueStatus={"Due in 4 days"} />
                    </>
                  ) : (
                    <>
                      <Assignments subject={"DBMS — ER Diagram"} dueStatus={"Due tomorrow"} />
                      <hr className='border border-border' />
                      <Assignments subject={"DSA — Binary Tree Lab"} dueStatus={"Submitted"} />
                      <hr className='border border-border' />
                      <Assignments subject={"MERN — Auth Module"} dueStatus={"Due in 4 days"} />
                    </>
                  )}
                </div>
              </div>

            </div>

          </div>



        </div>
      </div>



    </div>
  )
}

export default Overview
