import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { getRegisteredUsers } from '../Backend/users';
import { setCurrentUser } from '../Backend/users';
import { useNavigate } from 'react-router';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e) {

        e.preventDefault()

        const fullList = getRegisteredUsers()
        let matchedUserObject = null

        for (let i = 0; i < fullList.length; i++) {
            if (fullList[i].email === email && fullList[i].password === password) {
                matchedUserObject = fullList[i]
                setCurrentUser(matchedUserObject)
            }
        }

        if (matchedUserObject === null) {
            setError("Wrong email or password")
            setTimeout(() => {
                setError("")
            }, 4000);
            return
        }

        navigate("/dashboard")

    }

    return (
        <div className='bg-bg h-screen flex justify-center items-center p-5 sm:p-0'>
            <div className='login bg-panel login h-full sm:h-[80%] w-full sm:w-[35%] rounded-3xl border-border border p-5 sm:p-10 text-text flex flex-col justify-center gap-8'>

                {error && <p className="text-danger text-sm">{error}</p>}

                <div className='flex items-center gap-3'>
                    <div className='w-7 h-7 rounded-md bg-linear-to-r from-accent2 to-accent'></div>
                    <p className='space font-semibold'>Student Portal</p>
                </div>

                <div className='flex flex-col gap-2 h-20 w-full justify-center'>
                    <p className='space text-2xl font-semibold'>Welcome back</p>
                    <p className='inter text-text/60 text-sm'>Sign in with your university email to access your dashboard.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-8'>

                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-1 flex-1 min-w-0'>
                                <label htmlFor="studentId" className='text-text/60'>University Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} required type="email" name="" id="studentId" placeholder='university@example.com' className='p-2 border border-border rounded-lg' />
                            </div>

                            <div className='flex flex-col gap-1 flex-1 min-w-0'>
                                <label htmlFor="password" className='text-text/60'>Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} required type="password" name="" id="password" placeholder='Enter your password' className='p-2 border border-border rounded-lg' />
                            </div>
                        </div>

                        <button type="submit" className='bg-linear-to-r from-accent2 to-accent hover:bg-linear-to-r hover:from-accent hover:to-accent2 transition-colors duration-300 ease-in-out text-[#0a0f16] w-full p-2 rounded-2xl font-semibold'>
                            Sign in
                        </button>

                        <Link to="/"><p className='text-text/70 text-sm text-center'>Don't have an account? <span className='text-blue-400'>Signup</span></p></Link>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login