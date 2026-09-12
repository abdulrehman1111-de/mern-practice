import React from 'react'
import { getCurrentUser } from '../../Backend/users';

const Timetable = () => {

  const user = getCurrentUser()
  const isTeacher = user?.role === "teacher"

  return (
    <div className='bg-bg w-full min-h-screen p-8 inter'>

      <div className='timetable'>
        <div className='flex flex-col mt-4'>
          <p className='text-2xl text-text font-semibold space'>Timetable</p>
          <p className='text-sm space text-text/60 inter'>
            {isTeacher ? "Your weekly teaching schedule." : "Your full weekly class schedule."}
          </p>
        </div>

        <div className='grid grid-cols-[70px_repeat(5,1fr)] border border-border bg-border h-auto rounded-xl text-text mt-8'>

          <div className='bg-panel2 p-3 border border-border rounded-tl-xl'></div>
          <div className='bg-panel2 p-5 text-xs font-semibold border border-border'>Mon</div>
          <div className='bg-panel2 p-5 text-xs font-semibold border border-border'>Tue</div>
          <div className='bg-panel2 p-5 text-xs font-semibold border border-border'>Wed</div>
          <div className='bg-panel2 p-5 text-xs font-semibold border border-border'>Thu</div>
          <div className='bg-panel2 p-5 text-xs font-semibold border border-border rounded-tr-xl'>Fri</div>

          {isTeacher ? (
            <>
              <div className='bg-panel2 p-5 border border-border text-text/70 text-xs text-center'>9:00</div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-accent2/25 bg-accent2/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Data Structures & Algorithms</p>
                  <p className='text-xs text-text/70'>Room 214</p>
                </div>
              </div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-accent2/25 bg-accent2/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Data Structures & Algorithms</p>
                  <p className='text-xs text-text/70'>Room 214</p>
                </div>
              </div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel2 p-5 text-xs font-semibold border border-border'></div>

              <div className='bg-panel2 p-5 border border-border text-text/70 text-xs text-center'>11:00</div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-accent2/25 bg-accent2/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Database Systems</p>
                  <p className='text-xs text-text/70'>Room 108</p>
                </div>
              </div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-accent2/25 bg-accent2/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Database Systems</p>
                  <p className='text-xs text-text/70'>Room 108</p>
                </div>
              </div>
              <div className='bg-panel2 p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-accent/25 bg-accent/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Web Engineering Lab</p>
                  <p className='text-xs text-text/70'>Lab 3</p>
                </div>
              </div>

              <div className='bg-panel2 p-5 border border-border text-text/70 text-xs text-center rounded-bl-lg'>14:00</div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-warn/25 bg-warn/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Discrete Mathematics</p>
                  <p className='text-xs text-text/70'>Room 108</p>
                </div>
              </div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border rounded-br-xl'></div>
            </>
          ) : (
            <>
              <div className='bg-panel2 p-5 border border-border text-text/70 text-xs text-center'>9:00</div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-accent2/25 bg-accent2/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Data Structures</p>
                  <p className='text-xs text-text/70'>Room 214</p>
                </div>
              </div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-accent2/25 bg-accent2/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Data Structures</p>
                  <p className='text-xs text-text/70'>Room 214</p>
                </div>
              </div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel2 p-5 text-xs font-semibold border border-border'></div>

              <div className='bg-panel2 p-5 border border-border text-text/70 text-xs text-center'>11:00</div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-accent2/25 bg-accent2/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Database Systems</p>
                  <p className='text-xs text-text/70'>Room 108</p>
                </div>
              </div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-accent2/25 bg-accent2/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Database Systems</p>
                  <p className='text-xs text-text/70'>Room 108</p>
                </div>
              </div>
              <div className='bg-panel2 p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-accent/25 bg-accent/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Web Eng. Lab</p>
                  <p className='text-xs text-text/70'>Lab 3</p>
                </div>
              </div>

              <div className='bg-panel2 p-5 border border-border text-text/70 text-xs text-center rounded-bl-lg'>14:00</div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'>
                <div className='rounded-lg border border-warn/25 bg-warn/10 p-2 flex flex-col justify-center'>
                  <p className='text-xs text-text'>Discrete Math Quiz</p>
                  <p className='text-xs text-text/70'>Room 108</p>
                </div>
              </div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border'></div>
              <div className='bg-panel p-5 text-xs font-semibold border border-border rounded-br-xl'></div>
            </>
          )}

        </div>

      </div>

    </div>
  )
}

export default Timetable
