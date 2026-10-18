import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CollectionCard from '../components/CollectionCard'
import { clearCollection } from '../redux/features/collectionSlice'
import { toast } from 'react-toastify'

const CollectionPage = () => {

  const collection = useSelector((state) => state.collection.items)

  const dispatch = useDispatch()

  const clearOnCollection = ()=>{
    dispatch(clearCollection())
    toast.success("Collection cleared")
  }

  return (
    <>
      {
        collection.length > 0 ? <><h1 className='text-white text-4xl text-center py-3'>Your Collection</h1>
      <center><button onClick={()=> clearOnCollection()} className='bg-red-500 px-5 py-2 text-base rounded active:scale-95 cursor-pointer text-white'>Clear collection</button></center></> : <h1 className='text-white text-2xl text-center py-3'>Collection is empty</h1>
      }
      <div className='grid h-[80%] grid-cols-5 grid-rows-auto justify-between gap-5 overflow-auto px-10 py-6'>
        {
          collection.map((item, idx) => {
            return <CollectionCard item={item} />
          })
        }
      </div>
    </>

  )
}

export default CollectionPage
