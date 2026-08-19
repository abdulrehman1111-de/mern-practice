import React from 'react'
import Nav from '../components/Nav'

const Home = () => {
  return (
    <>
      <Nav />
      <section className='firstSection w-full h-auto p-3 relative bg-cream'>

        <div className='archPic w-40 h-56 border border-black border-navy/40'>

        </div>

        <div className='blob absolute top-16 left-16 w-32 h-32 bg-gold/80'></div>

      </section>
    </>
  )
}

export default Home
