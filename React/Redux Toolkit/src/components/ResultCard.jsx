import React from 'react'
import { useDispatch } from 'react-redux'
import { addCollection } from '../redux/features/collectionSlice'
import { toast } from 'react-toastify'

const ResultCard = ({ item }) => {

  const dispatch = useDispatch()

  const addToCollection = (item) => {

    dispatch(addCollection(item))
    toast.success("Added to collection!")
  }

  return (
    <div className='w-[18vw] h-full relative bg-white rounded-xl'>
      <a target='_blank' href={item.url}><img className='h-full w-full object-cover object-center' src={item.thumbnail} alt="" /></a>
      <div id='bottom' className='text-white absolute bottom-0 py-8 px-6 w-full flex justify-between items-center'>
        <h2 className='text-md font-semibold capitalize h-12 overflow-hidden'>{item.title}</h2>
        <button onClick={() => addToCollection(item)} className='bg-red-600 text-white rounded px-3 py-2 font-medium active:scale-95'>Save</button>
      </div>
    </div>
  )
}

export default ResultCard
