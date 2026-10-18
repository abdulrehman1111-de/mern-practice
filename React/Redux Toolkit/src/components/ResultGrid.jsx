import React, { useEffect } from 'react'
import { fetchPhotos } from "../api/mediaApi"
import { setResults, setLoading, setError } from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from './ResultCard'

const ResultGrid = () => {

    const dispatch = useDispatch()

    const { query, loading, error, results } = useSelector((store) => store.search)

    useEffect(() => {
        if(!query) return
        const getData = async () => {
        try {
                const res = await fetchPhotos(query)
                const data = res.results.map((item) => ({
                    id: item.id,
                    type: "photo",
                    title: item.alt_description,
                    thumbnail: item.urls.small,
                    src: item.urls.full,
                    url: item.links.html
                }))

                dispatch(setResults(data))
        }
        catch(error){
            dispatch(setError(error.message))
        }
    }
        getData()
    }, [query, dispatch])

    if(error){
        return <h1>Error</h1>
    }

    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <div className='grid h-[80%] grid-cols-5 grid-rows-auto justify-between gap-5 overflow-auto px-10'>
            {
                results.map((item, idx)=>{
                    return <ResultCard key={item.id} item={item} />
                    
                })
            }
        </div>
    )
}

export default ResultGrid

















