import React from 'react'
import Nav from '../components/Nav'
import { useParams } from 'react-router'

const DetailedUser = () => {

    const paramsDetail = useParams();

  return (
    <>
    <Nav/>
    </>
  )
}

export default DetailedUser
