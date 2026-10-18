import React, { useEffect } from 'react'
import { fetchGIFs } from "../api/mediaApi"
import { setResults, setLoading, setError } from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from './ResultCard'

const ResultGrid = () => {

    const dispatch = useDispatch()

    const { query, loading, error, results } = useSelector((store) => store.search)

    useEffect(() => {
        console.log("query:", query)
        if (!query) return
        const getData = async () => {
            try {
                dispatch(setLoading())
                const res = await fetchGIFs(query)
                const data = res.data.map((item) => ({
                    id: item.id,
                    type: "photo",
                    title: item.title || "Untitled GIF",
                    thumbnail: item.images.fixed_height.url,
                    src: item.images.original.url,
                    url: item.url
                }))

                dispatch(setResults(data))
            }
            catch (error) {
                dispatch(setError(error.message))
            }
        }
        getData()
    }, [query, dispatch])

    if (error) {
        return <h1 className='text-white'>{error}</h1>
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='grid h-[80%] grid-cols-5 grid-rows-auto justify-between gap-5 overflow-auto px-10 pb-10'>
            {
                results.map((item, idx) => {
                    return <ResultCard key={item.id} item={item} />

                })
            }
        </div>
    )
}

export default ResultGrid

















