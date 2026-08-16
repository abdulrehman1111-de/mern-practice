import React, { useEffect, useState } from 'react'

const PronounsDiv = ({getter, setter, dark}) => {

    const pronouns = [
        "Call me by my name",
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
    
    let selectedValue = pronouns.filter((item)=>{
        return item.split("/").map((item)=>{
            return item.trim().toLocaleLowerCase();
        }).some((items)=>{
            return items.includes(pronounInput);
        });
    })
    
    return (
        <>
            <div className='flex flex-col gap-5 p-3 text-sm'>
                <p className={dark ? "" : "text-gray-600"}>Your pronouns are shown on your profile.</p>

                <input placeholder='Search for options' type="text" name="" id="" onChange={(e)=> setPronounInput(e.target.value)} value = {pronounInput} className={`rounded-lg border-1 border-gray-700 w-full h-auto p-2 ${dark ? "" : "placeholder:text-gray-400"}`} />
            </div>

            <div className='invisible-scrollbar m-3 h-[60vh] overflow-auto w-[90%] flex flex-col gap-7 font-semibold pt-5'>
                {
                    selectedValue.length === 0 ? 
                    <p>No results found</p>
                    :selectedValue.map((item, index) => {
                        return <>
                            <div className={`flex justify-between ${dark ? "" : "text-gray-900"}`}>
                                <label htmlFor={`user-${index}`}>{item}</label>
                                <input value={item}
                                type="radio" checked={item === getter} onChange={()=> setter(item)} name="pronoun" id={`user-${index}`} className={`w-5 h-5 appearance-none rounded-full border-1 checked:bg-green-400 ${dark ? "border-white" : "border-gray-600"}`} />
                            </div>
                        </>
                    })
                }
            </div>
        </>
    )
}

export default PronounsDiv
