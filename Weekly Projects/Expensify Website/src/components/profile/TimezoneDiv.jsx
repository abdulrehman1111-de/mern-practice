import React, { useEffect, useState } from 'react'

const TimezoneDiv = ({dark, getter, setter }) => {

    const timezones = Intl.supportedValuesOf('timeZone');

    const [timezoneInput, setTimezoneInput] = useState("");

    let selectedValue = timezones.filter((item) => {
        return item.trim().toLowerCase().includes(timezoneInput);
    })

    return (
        <>


            <input type="text" name="" id="" placeholder='Timezone' onChange={(e) => setTimezoneInput(e.target.value)} value={timezoneInput} className={`p-3 text-sm rounded-lg border-1 w-full h-auto p-2 ${dark ? "border-gray-700" : "border-gray-300 placeholder:text-gray-400"}`} />


            <div className='invisible-scrollbar m-3 h-[60vh] overflow-auto w-[90%] flex flex-col gap-7 font-semibold pt-5'>
                {
                    selectedValue.length === 0 ?
                        <p>No results found</p>
                        : selectedValue.map((item, index) => {
                            return <>
                                <div className={`flex justify-between ${dark ? "" : "text-gray-900"}`}>
                                    <label htmlFor={`timezone-${index}`}>{item}</label>
                                    <input value={item}
                                        type="radio" checked={item === getter} onChange={() => setter(item)} name="" id={`timezone-${index}`} className={`w-5 h-5 appearance-none rounded-full border-1 checked:bg-green-400 ${dark ? "border-white" : "border-gray-400"}`} />
                                </div>
                            </>
                        })
                }
            </div>
        </>
    )
}

export default TimezoneDiv
