import React from 'react'
import OverviewSmCards from '../../components/Overview/OverviewSmCards'

const Grades = () => {
  return (
    <div className='bg-bg w-full min-h-screen p-8 inter'>

      <div className='grades'>
        <div className='flex flex-col mt-4'>
          <p className='text-2xl text-text font-semibold space'>Grades</p>
          <p className='text-sm space text-text/60 inter'>Your transcript and grade breakdown by course.</p>
        </div>

        <div className='grid grid-cols-3 gap-5'>

          <OverviewSmCards upper={"Current GPA"} middle={3.72} lower={"↑ 0.08 vs last sem"} />
          <OverviewSmCards upper={"This semester"} middle={"3.85"} lower={"Best so far"} />
          <OverviewSmCards upper={"Credits Completed"} middle={"78 / 130"} lower={"On track"} />

        </div>

        <div className='bg-panel rounded-lg border border-border p-5 mt-5'>

          <p className='text-text text-md font-semibold'>Current Semester — Fall 2026</p>

          <div className='grid items-center grid-cols-[2fr_1.5fr_0.6fr_0.6fr_0.6fr] gap-y-3 text-text text-sm mt-3'>

            <div className='text-text/70 text-xs'>Course</div>
            <div className='text-text/70 text-xs'>Instructor</div>
            <div className='text-text/70 text-xs'>Credits</div>
            <div className='text-text/70 text-xs'>Score</div>
            <div className='text-text/70 text-xs'>Grade</div>

            <hr className='border-t border-border w-full col-span-5'/>

            <div>Data Structures & Algorithms</div>
            <div>Dr. Farah Naz</div>
            <div>3</div>
            <div>88%</div>
            <div className='flex items-start'>
              <div className='text-accent w-8 h-8 bg-accent/10 rounded-full flex justify-center items-center'>
                A-
              </div>
            </div>

            <hr className='border-t border-border w-full col-span-5'/>

            <div>Database Systems</div>
            <div>Dr. Bilal Ahmed</div>
            <div>3</div>
            <div>79%</div>
            <div className='flex items-start'>
              <div className='text-blue-400 w-8 h-8 bg-blue-400/10 rounded-full flex justify-center items-center'>
                B+
              </div>
            </div>

            <hr className='border-t border-border w-full col-span-5'/>

            <div>Web Engineering (MERN)</div>
            <div>Code Lab Bahawalpur</div>
            <div>—</div>
            <div>91%</div>
            <div className='flex items-start'>
              <div className='text-accent w-8 h-8 bg-accent/10 rounded-full flex justify-center items-center'>
                A
              </div>
            </div>

            <hr className='border-t border-border w-full col-span-5'/>

            <div>Discrete Mathematics</div>
            <div>Dr. Sana Malik</div>
            <div>3</div>
            <div>68%</div>
            <div className='flex items-start'>
              <div className='text-warn w-8 h-8 bg-warn/10 rounded-full flex justify-center items-center'>
                C+
              </div>
            </div>

          </div>

        </div>

      </div>



    </div>
  )
}

export default Grades
