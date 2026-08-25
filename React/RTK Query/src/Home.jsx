import React, { useState } from 'react'
import { useGetProductsQuery } from './Fakestore'

const Home = () => {

   const {data, isLoading, error} = useGetProductsQuery();

   if(isLoading) return <h1>Loading</h1>;
   if(error) return <h1>Error</h1>;

    return (
        <div>
            <section>
                <div className="h-screen bg-amber-100">
                    <h1>Get Started</h1>
                    {data?.map((item, index) => (
                        <div key={index}>
                            <h2>{item.title}</h2>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home
