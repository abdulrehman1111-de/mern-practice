import React, { useState } from 'react'
import { updateCourseProgress } from '../../Backend/auth';

const TeacherProgressForm = () => {

    const [student, setStudent] = useState("");
    const [course, setCourse] = useState("");
    const [progress, setProgress] = useState("");

    function handleSubmit(e) {

        e.preventDefault();

        if (!student || !course || !progress) {
            alert("Please fill out the form properly")
            return
        }
        updateCourseProgress(student, course, progress);
        alert("updated!")
    }

    return (
        <div className='bg-panel rounded-lg border border-border p-5 mt-5'>

            <p className='text-text text-md font-semibold mb-5'>Update Course Progress</p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <div className='flex gap-5'>
                    <label htmlFor="students" className='flex flex-col gap-1 flex-1'>
                        <span className='text-text/70 text-xs'>Select a student</span>
                        <select onChange={(e) => setStudent(e.target.value)} className='p-2 border border-border rounded-lg bg-panel2 text-text' name="" id="students">
                            <option value="">Choose student</option>
                            <option value="123">Abdul Rehman</option>
                            <option value="456">Ali Ahmad</option>
                        </select>
                    </label>

                    <label htmlFor="courses" className='flex flex-col gap-1 flex-1'>
                        <span className='text-text/70 text-xs'>Select a course</span>
                        <select onChange={(e) => setCourse(e.target.value)} className='p-2 border border-border rounded-lg bg-panel2 text-text' name="" id="courses">
                            <option value="">Choose course</option>
                            <option value="DataStructures">Data Structures</option>
                            <option value="WebEngineering">Web Engineering</option>
                            <option value="DiscreteMathematics">Discrete Mathematics</option>
                            <option value="DatabaseSystems">Database Systems</option>
                        </select>
                    </label>
                </div>

                <label htmlFor="progress" className='flex flex-col gap-1 w-1/2'>
                    <span className='text-text/70 text-xs'>Progress (%)</span>
                    <input onChange={(e) => setProgress(e.target.value)} type="number" placeholder='e.g. 75' min="0" max="100" className='p-2 border border-border rounded-lg placeholder:text-text text-text' name="" id="progress" />
                </label>

                <button type="submit" className='bg-linear-to-r from-accent2 to-accent hover:bg-linear-to-r hover:from-accent hover:to-accent2 transition-colors duration-300 ease-in-out text-[#0a0f16] w-fit px-6 py-2 rounded-2xl font-semibold self-end'>
                    Save
                </button>

            </form>
        </div>
    )
}

export default TeacherProgressForm