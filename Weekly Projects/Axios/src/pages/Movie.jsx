import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Card } from '../components/UI/Card'
import { getMovie } from '../services/GetService'

const Movie = () => {
 
    const [data, setData] = useState([])

    const getMovieData = async () => {
        try {
            const res = await getMovie()
            console.log(res.data.Search)
            setData(res.data.Search)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovieData()
    }, [])

    return (
        <ul className='movie-list'>
            {
                data.map((item) => {
                    return <Card key={item.imdbID} movieData={item}  />
                })
            }
        </ul>
    )
}

export default Movie
