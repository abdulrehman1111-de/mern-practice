import React, { useEffect, useState } from 'react'

const PronounsDiv = () => {

    const pronouns = [
        "He / Him / His",
        "He / Him / His / They / Them / Theirs",
        "She / Her / Hers",
        "She / Her / Hers / They / Them / Theirs",
        "They / Them / Theirs",
        "Thon / Thons",
        "Ze / Hir",
        "Ze / Zie / Zir / Hir"
    ]

    const [pronounInput, setPronounInput] = useState("");

    const [selectedValue, setSelectedValue] = useState([]);
    
    const splitArray = pronouns.split("/");
    




    return (
        <>
            <div className='flex flex-col gap-5 p-3 text-sm'>
                <p>Your pronouns are shown on your profile.</p>

                <input type="text" name="" id="" value = {pronounInput} className='rounded-lg border-1 border-gray-700 w-full h-auto p-2' />
            </div>

            <div className='m-3 h-[60vh] overflow-auto w-[90%] flex flex-col justify-center gap-10 font-semibold pt-5'>
                {
                    pronouns.map((item, index) => {
                        return <>
                            <div className='flex justify-between'>
                                <label htmlFor={index}>{item}</label>
                                <input value={item}
                                type="radio" name="pronoun" id={index} className='w-5 h-5 appearance-none rounded-full border-1 border-white checked:bg-green-400' />
                            </div>
                        </>
                    })
                }
            </div>
        </>
    )
}

export default PronounsDiv
