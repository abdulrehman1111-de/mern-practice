import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

const IndiviualPage = () => {

    const {id} = useParams();

    const [users, setUsers] = useState(null);

    useEffect(()=>{

        fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)
        .then(res => res.json())
        .then(data => setUsers(data));

    }, [id])

    if(!users){
        return <h1>Loading user data</h1>
    }

  return (
    <>
        <Link to={"/home"}><h1>Back to home</h1></Link>
        <ul>
            
            {
                users.map((item)=>{
                    return <><li>{item.username}</li>
                    <li>{item.email}</li>
                    <li>{item.website}</li>
                    </>
                })
            }
        </ul>
    </>
  )
}

export default IndiviualPage
