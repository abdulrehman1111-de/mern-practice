import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { useState } from 'react';

const Home = () => {

    const [users, setUsers] = useState(null);

    useEffect(()=>{

        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => setUsers(data));


    }, []);

    if(!users){
        return <h1>Loading</h1>
    }

  return (
    <div>
      <ul>

        {
            users.slice(0, 3).map((item)=>{
               return <Link to={"/home/" + item.id}><li>{item.name}</li></Link>
            })
        }

      </ul>
    </div>
  )
}

export default Home
