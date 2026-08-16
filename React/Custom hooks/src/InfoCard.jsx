import React from 'react'

const InfoCard = ({ dark, useToggle }) => {
  return (
    <div className={`rounded-xl p-6 flex flex-col gap-3 ${dark ? "bg-gray-50 border border-gray-200" : "bg-[#0A2E22] border-white/10"}`}>
      <h2 className={`text-xl font-semibold ${dark ? "text-gray-900" : "text-white"}`}>Account Summary</h2>
      <p className={dark ? "text-gray-600" : "text-gray-300"}>Your monthly spend is tracked automatically.</p>
      <div className={`rounded-lg p-3 ${dark ? "bg-gray-100" : "bg-[#0F3B29]"}`}>
        <p className={`text-sm ${dark ? "text-gray-700" : "text-gray-300"}`}>Last updated: Today</p>
      </div>
      <button className="bg-green-500 hover:bg-green-600 text-white rounded-full py-2">
        View details
      </button>
      <button onClick={useToggle}>
        {dark ?
         <span>Enable dark mode</span> : <span className='text-white'>Enable light mode</span>}
      </button>
    </div>
  )
}

export default InfoCard