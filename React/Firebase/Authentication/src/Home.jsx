import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { auth } from './Firebase';
import { db } from './Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';

const Home = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {
      // Create user in Firestore
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user;

      // Storing the user:
      await addDoc(collection(db, "users"), {
        email: user.email,
        createdAt: new Date()
      })

      console.log("User authentication successful!", user.email);
      setEmail("");
      setPassword("");
    }
    catch(error){
      console.log("Error registering user", error);
    }
  }


  return (
    <div>
      <form onSubmit={handleRegister}>

        <label htmlFor="email"> Email
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="" id="email" placeholder='Enter email' />
        </label>

        <label htmlFor="password">
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="" id="password" placeholder='Enter password' />
        </label>

        <button type="submit">
          Submit
        </button>

      </form>
    </div>
  )
}

export default Home
