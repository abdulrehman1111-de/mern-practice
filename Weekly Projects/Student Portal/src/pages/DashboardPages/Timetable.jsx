import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../../Backend/users';
import { getCoursesByStudent } from '../../Backend/courses';
import { getCoursesByTeacher } from '../../Backend/courses';

const Timetable = () => {

  const user = getCurrentUser()
  const isTeacher = user?.role === "teacher"

  const [courses, setCourses] = useState([])

  useEffect(() => {
    if (isTeacher) {
      const fetchedCourses = getCoursesByTeacher(user.id)
      setCourses(fetchedCourses)
    }
    else {
      const fetchedCourses = getCoursesByStudent(user.id)
      setCourses(fetchedCourses)
    }
  }, [])


  let parsedCourses = courses.map((course) => {

    let dayPortion = course.schedule.split(" ")[0]
    let timePortion = course.schedule.split(" ")[1]

    let indiviualDays = dayPortion.split("/")

    return {
      name: course.name,
      section: course.section,
      days: indiviualDays,
      time: timePortion
    }
  })

  const timeSet = new Set()
  parsedCourses.forEach((course) => {
    timeSet.add(course.time)
  })

  const timesArray = Array.from(timeSet)
  timesArray.sort((a, b) => {
    const hourA = Number(a.split(":")[0])
    const hourB = Number(b.split(":")[0])
    return hourA - hourB
  })

  const scheduleMap = {}
  for (let i = 0; i < parsedCourses.length; i++) {
    for (let j = 0; j < parsedCourses[i].days.length; j++) {
      let key = `${parsedCourses[i].days[j]}-${parsedCourses[i].time}`
      scheduleMap[key] = parsedCourses[i].name
    }
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

  return (
    <div className='bg-bg w-full min-h-screen p-4 lg:p-8 inter'>

      <div className='timetable'>
        <div className='flex flex-col mt-4'>
          <p className='text-xl lg:text-2xl text-text font-semibold space'>Timetable</p>
          <p className='text-sm space text-text/60 inter'>
            {isTeacher ? "Your weekly teaching schedule." : "Your full weekly class schedule."}
          </p>
        </div>

        <div className='overflow-x-auto mt-8 rounded-xl'>
          <div className='grid grid-cols-[70px_repeat(5,1fr)] min-w-[700px] lg:min-w-0 border border-border bg-border h-auto text-text'>

            <div className='bg-panel2 p-3 border border-border rounded-tl-xl'></div>
            <div className='bg-panel2 p-5 text-xs font-semibold border border-border'>Mon</div>
            <div className='bg-panel2 p-5 text-xs font-semibold border border-border'>Tue</div>
            <div className='bg-panel2 p-5 text-xs font-semibold border border-border'>Wed</div>
            <div className='bg-panel2 p-5 text-xs font-semibold border border-border'>Thu</div>
            <div className='bg-panel2 p-5 text-xs font-semibold border border-border rounded-tr-xl'>Fri</div>

            {timesArray.map((time) => {
              return (
                <React.Fragment key={time}>
                  <div className='bg-panel2 p-5 border border-border text-text/70 text-xs text-center'>{time}</div>
                  {days.map((day) => {
                    const courseName = scheduleMap[`${day}-${time}`]
                    return (
                      <div key={day} className='bg-panel p-5 text-xs font-semibold border border-border'>
                        {courseName && (
                          <div className='rounded-lg border border-accent2/25 bg-accent2/10 p-2 flex flex-col justify-center'>
                            <p className='text-xs text-text'>{courseName}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              )
            })}

          </div>
        </div>

      </div>

    </div>
  )
}

export default Timetable