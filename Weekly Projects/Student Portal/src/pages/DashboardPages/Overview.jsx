import React from 'react'
import OverviewSmCards from '../../components/OverviewSmCards'

const Overview = () => {
  return (
    <div className='bg-bg w-full min-h-screen p-8 inter'>

      <span className='p-1 border text-accent border-accent rounded-2xl text-nowrap text-xs font-semibold bg-accent/10 inter'>
        Fall 2026 . Week 6
      </span>

      <div className='flex flex-col mt-4'>
        <p className='text-2xl text-text font-semibold space'>Good morning, Abdul</p>
        <p className='text-sm space text-text/70 inter'>You have 2 assignments due this week and a quiz tomorrow.</p>
      </div>

      <div className='grid grid-cols-4 gap-5'>

        <OverviewSmCards upper={"Current GPA"} middle={3.72} lower={"↑ 0.08 vs last sem"}/>
        <OverviewSmCards upper={"Attendance"} middle={"91%"} lower={"↑ 3% this month"}/>
        <OverviewSmCards upper={"Credits Earned"} middle={"78 / 130"} lower={"On track"}/>
        <OverviewSmCards upper={"Pending Fees"} middle={"Rs 0"} lower={"Cleared"}/>

      </div>

      <div className='w-[60%] border border-white h-[90vh]'>

          <div className='border border-border rounded-xl bg-panel w-full h-[55%] p-4'>
              <div className='flex justify-between'>
                  <p className='text-text font-semibold space'>Active Courses</p>
                  <p className='text-text/60 text-sm'>View all</p>
              </div>
          </div>

      </div>

    </div>
  )
}

export default Overview
