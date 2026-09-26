import React, { useState } from 'react'
import { getCurrentUser } from '../../Backend/users'
import { createCourse, getCoursesByTeacher } from '../../Backend/courses'
import { toast } from 'react-toastify'

const CreateCourseForm = ({ onCourseCreated }) => {

    const [name, setName] = useState("")
    const [section, setSection] = useState("")
    const [credits, setCredits] = useState("")
    const [schedule, setSchedule] = useState("")

    const user = getCurrentUser()
    const teacherId = user?.id

    function handleSubmit(e) {

        e.preventDefault()
        const courseData = {
            name: name,
            section: section,
            credits: credits,
            schedule: schedule
        }

        const teacherCourses = getCoursesByTeacher(user.id)
        let parsedCourses = teacherCourses.map((course) => {

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

        let newDayPortion = schedule.split(" ")[0]
        let newTimePortion = schedule.split(" ")[1]

        let newDays = newDayPortion.split("/")
        const hasConflict = parsedCourses.some((course)=>{
                if (course.time !== newTimePortion){
                    return false
            }

            return course.days.some((day)=> newDays.includes(day))
        })

        if(hasConflict){
            toast.error("Timetable Clash! Set some other timing!")
            return
        }

        createCourse(courseData, teacherId)
        onCourseCreated()
    }


    return (
        <div className='bg-panel border border-border rounded-xl p-5 mt-5'>

            <p className='text-text text-md font-semibold'>Create a Course</p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-5'>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="name" className='text-text/60 text-sm'>Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="name"
                        placeholder='e.g. Data Structures & Algorithms'
                        className='p-2 border border-border rounded-lg text-text bg-panel2 text-sm'
                    />
                </div>

                <div className='flex gap-5'>
                    <div className='flex flex-col gap-1 flex-1 min-w-0'>
                        <label htmlFor="section" className='text-text/60 text-sm'>Section</label>
                        <input
                            onChange={(e) => setSection(e.target.value)}
                            type="text"
                            id="section"
                            placeholder='e.g. Sec A'
                            className='p-2 border border-border rounded-lg text-text bg-panel2 text-sm'
                        />
                    </div>

                    <div className='flex flex-col gap-1 flex-1 min-w-0'>
                        <label htmlFor="credits" className='text-text/60 text-sm'>Credits</label>
                        <input
                            onChange={(e) => setCredits(e.target.value)}
                            type="text"
                            id="credits"
                            placeholder='e.g. 3'
                            className='p-2 border border-border rounded-lg text-text bg-panel2 text-sm'
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="schedule" className='text-text/60 text-sm'>Schedule</label>
                    <input
                        onChange={(e) => setSchedule(e.target.value)}
                        type="text"
                        id="schedule"
                        placeholder='e.g. Mon/Wed 9:00'
                        className='p-2 border border-border rounded-lg text-text bg-panel2 text-sm'
                    />
                </div>

                <button
                    type="submit"
                    className='mt-2 bg-linear-to-r from-accent2 to-accent hover:bg-linear-to-r hover:from-accent hover:to-accent2 transition-colors duration-300 ease-in-out text-[#0a0f16] w-full p-2 rounded-lg font-semibold text-sm'
                >
                    Create course
                </button>

            </form>

        </div>
    )
}

export default CreateCourseForm