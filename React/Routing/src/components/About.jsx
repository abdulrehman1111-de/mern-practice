import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const About = () => {
  return (
    <div>
      I am about

      <Link to={"student"}>Students</Link>

      <Outlet/>
    </div>
  )
}

export default About
