import React, { useEffect, useState } from 'react'
import { getCoursesByTeacher, updateStudentProgress } from '../../Backend/courses';
import { getCurrentUser } from '../../Backend/users';
import { toast } from 'react-toastify';
import { updateStudentGrade } from '../../Backend/courses';

const TeacherProgressForm = ({ Refresher }) => {

    const [student, setStudent] = useState("");
    const [teacherCourses, setTeacherCourses] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState("")
    const [progress, setProgress] = useState("");
    const [score, setScore] = useState("")
    const [grade, setGrade] = useState("")

    const user = getCurrentUser()
    const teacherId = user?.id

    const selectedCourse = teacherCourses.find((c) => String(c.id) === selectedCourseId)

    function handleSubmit(e) {

        e.preventDefault();

        if (!student || !selectedCourseId || !progress || !score || !grade) {
            toast.error("Please fill out the form properly")
            return
        }
        updateStudentProgress(selectedCourseId, student, progress)
        updateStudentGrade(selectedCourseId, student, score, grade)
        toast.success("updated!")
        Refresher()
    }

    useEffect(() => {
        let courses = getCoursesByTeacher(teacherId)
        setTeacherCourses(courses)
    }, [])

    return (
        <div className='bg-panel rounded-lg border border-border p-5 mt-5'>

            <p className='text-text text-md font-semibold mb-5'>Update Course Progress</p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <div className='flex flex-col sm:flex-row gap-4 sm:gap-5'>
                    <label htmlFor="students" className='flex flex-col gap-1 flex-1'>
                        <span className='text-text/70 text-xs'>Select a student</span>
                        <select onChange={(e) => setStudent(e.target.value)} className='p-2 border border-border rounded-lg bg-panel2 text-text' name="" id="students">
                            <option value="">Choose student</option>
                            {
                                selectedCourse?.enrolledStudents.map((entry) => {
                                    return (<option key={entry.studentId} value={entry.studentId}>{entry.studentId}</option>)
                                })
                            }

                        </select>
                    </label>

                    <label htmlFor="courses" className='flex flex-col gap-1 flex-1'>
                        <span className='text-text/70 text-xs'>Select a course</span>
                        <select onChange={(e) => setSelectedCourseId(e.target.value)} className='p-2 border border-border rounded-lg bg-panel2 text-text' name="" id="courses">
                            <option value="">Choose course</option>
                            {
                                teacherCourses.map((course) => {
                                    return (
                                        <option key={course.id} value={course.id}>{course.name}</option>
                                    )
                                })
                            }
                        </select>
                    </label>
                </div>

                <label htmlFor="progress" className='flex flex-col gap-1 w-full sm:w-1/2'>
                    <span className='text-text/70 text-xs'>Progress (%)</span>
                    <input onChange={(e) => setProgress(e.target.value)} type="number" placeholder='e.g. 75' min="0" max="100" className='p-2 border border-border rounded-lg placeholder:text-text/70 text-text' name="" id="progress" />
                </label>

                <div className='flex flex-col sm:flex-row gap-4 sm:gap-5'>
                    <label htmlFor="score" className='flex flex-col gap-1 w-full sm:w-1/2'>
                        <span className='text-text/70 text-xs'>Score</span>
                        <input onChange={(e) => setScore(e.target.value)} type="text" placeholder='e.g. 88%' className='p-2 border border-border rounded-lg placeholder:text-text/70 text-text' name="" id="score" />
                    </label>

                    <label htmlFor="grade" className='flex flex-col gap-1 w-full sm:w-1/2'>
                        <span className='text-text/70 text-xs'>Grade</span>
                        <input onChange={(e) => setGrade(e.target.value)} type="text" placeholder='e.g. A-' className='p-2 border border-border rounded-lg placeholder:text-text/70 text-text' name="" id="grade" />
                    </label>
                </div>

                <button type="submit" className='bg-linear-to-r from-accent2 to-accent hover:bg-linear-to-r hover:from-accent hover:to-accent2 transition-colors duration-300 ease-in-out text-[#0a0f16] w-full sm:w-fit px-6 py-2 rounded-2xl font-semibold self-stretch sm:self-end'>
                    Save
                </button>

            </form>
        </div>
    )
}

export default TeacherProgressForm