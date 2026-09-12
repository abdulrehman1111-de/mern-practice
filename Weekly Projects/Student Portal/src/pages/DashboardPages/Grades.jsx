import React from 'react'
import OverviewSmCards from '../../components/Overview/OverviewSmCards'
import { getCurrentUser } from '../../Backend/users';
import { getStudentRecords } from '../../Backend/auth';
import TeacherForm from '../../components/Grades/TeacherForm';

const Grades = () => {

  const user = getCurrentUser()
  const isTeacher = user?.role === "teacher"

  const student = getStudentRecords()
  const studentGrades = student[user?.id]?.grades;
  

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

          <div className='grid items-center grid-cols-[2fr_1.5fr_0.6fr_0.6fr_0.6fr] gap-y-3 text-text text-sm mt-3'>

            <div className='text-text/70 text-xs'>Course</div>
            <div className='text-text/70 text-xs'>{isTeacher ? "Section" : "Instructor"}</div>
            <div className='text-text/70 text-xs'>Credits</div>
            <div className='text-text/70 text-xs'>{isTeacher ? "Class Average" : "Score"}</div>
            <div className='text-text/70 text-xs'>Grade</div>

            <hr className='border-t border-border w-full col-span-5' />

            {isTeacher ? (
              <>
                <div>Data Structures & Algorithms</div>
                <div>Sec A</div>
                <div>3</div>
                <div>76%</div>
                <div className='flex items-start'>
                  <div className='text-blue-400 w-8 h-8 bg-blue-400/10 rounded-full flex justify-center items-center'>B</div>
                </div>

                <hr className='border-t border-border w-full col-span-5' />

                <div>Database Systems</div>
                <div>Sec B</div>
                <div>3</div>
                <div>71%</div>
                <div className='flex items-start'>
                  <div className='text-blue-400 w-8 h-8 bg-blue-400/10 rounded-full flex justify-center items-center'>B-</div>
                </div>

                <hr className='border-t border-border w-full col-span-5' />

                <div>Web Engineering (MERN)</div>
                <div>Elective</div>
                <div>—</div>
                <div>82%</div>
                <div className='flex items-start'>
                  <div className='text-accent w-8 h-8 bg-accent/10 rounded-full flex justify-center items-center'>A-</div>
                </div>

                <hr className='border-t border-border w-full col-span-5' />

                <div>Discrete Mathematics</div>
                <div>Sec A</div>
                <div>3</div>
                <div>64%</div>
                <div className='flex items-start'>
                  <div className='text-warn w-8 h-8 bg-warn/10 rounded-full flex justify-center items-center'>C</div>
                </div>

                <TeacherForm/>
              </>
            ) : (
              <>
                <div>Data Structures & Algorithms</div>
                <div>Dr. Farah Naz</div>
                <div>3</div>
                <div>{studentGrades?.DataStructures?.score}</div>
                <div className='flex items-start'>
                  <div className='text-accent w-8 h-8 bg-accent/10 rounded-full flex justify-center items-center'>{studentGrades?.DataStructures?.grade}</div>
                </div>

                <hr className='border-t border-border w-full col-span-5' />

                <div>Database Systems</div>
                <div>Dr. Bilal Ahmed</div>
                <div>3</div>
                <div>{studentGrades?.DatabaseSystems?.score}</div>
                <div className='flex items-start'>
                  <div className='text-blue-400 w-8 h-8 bg-blue-400/10 rounded-full flex justify-center items-center'>{studentGrades?.DatabaseSystems?.grade}</div>
                </div>

                <hr className='border-t border-border w-full col-span-5' />

                <div>Web Engineering (MERN)</div>
                <div>Code Lab Bahawalpur</div>
                <div>—</div>
                <div>{studentGrades?.WebEngineering?.score}</div>
                <div className='flex items-start'>
                  <div className='text-accent w-8 h-8 bg-accent/10 rounded-full flex justify-center items-center'>{studentGrades?.WebEngineering?.grade}</div>
                </div>

                <hr className='border-t border-border w-full col-span-5' />

                <div>Discrete Mathematics</div>
                <div>Dr. Sana Malik</div>
                <div>3</div>
                <div>{studentGrades?.DiscreteMathematics?.score}</div>
                <div className='flex items-start'>
                  <div className='text-warn w-8 h-8 bg-warn/10 rounded-full flex justify-center items-center'>{studentGrades?.DiscreteMathematics?.grade}</div>
                </div>
              </>
            )}

          </div>
        </div>

      </div>

    </div>
  )
}

export default Grades
