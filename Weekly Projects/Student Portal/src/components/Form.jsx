import React, { useEffect } from 'react'
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkDuplicateEmail, getRegisteredUsers } from '../Backend/users';
import { saveUsers } from '../Backend/users';
import { setCurrentUser } from '../Backend/users';
import { checkDuplicateId } from '../Backend/users';
import { getCurrentUser } from '../Backend/users';

const Form = () => {

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = getCurrentUser();
  const isTeacher = user?.role === "teacher"

  function handleSubmit(e) {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords don't match!")
      setTimeout(() => {
        setError("")
      }, 4000);
      return
    }

    const emailResult = checkDuplicateEmail(email);
    if (emailResult) {
      setError("Email already taken")
      setTimeout(() => {
        setError("")
      }, 4000);
      return
    }

    const idResult = checkDuplicateId(id);
    if (idResult) {
      setError("Id already taken")
      setTimeout(() => {
        setError("")
      }, 4000);
      return
    }

    const allUsers = getRegisteredUsers();
    const newUser = { name, id, department, email, password, role };

    allUsers.push(newUser)
    saveUsers(allUsers)
    setCurrentUser(newUser)


    navigate("/dashboard")
  }

  return (
    <div className='signup bg-panel h-[95%] w-[45%] rounded-3xl border-border border p-10 text-text flex flex-col justify-center gap-5'>

      {error && <p className="text-danger text-sm">{error}</p>}

      <div className='flex items-center gap-3'>
        <div className='w-7 h-7 rounded-md bg-linear-to-r from-accent2 to-accent'></div>
        <p className='space font-semibold'>Portal</p>
      </div>

      <div className='flex flex-col gap-2 h-25 w-full justify-center'>
        <p className='space text-2xl font-semibold'>Create your Account</p>
        <p className='inter text-text/60 text-sm'>Register with your student ID to access your dashboard, courses, and grades.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3'>

          <div className='flex justify-between items-center gap-5'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="name" className='text-text/60'>Full name</label>
              <input onChange={(e) => setName(e.target.value)} required title='Only alphabets are allowed' pattern="[A-Za-z\s]+" type="text" name="" id="name" placeholder='Enter your full name' className='p-2 border border-border rounded-lg' />
            </div>

            <div className='flex flex-col gap-1 flex-1 min-w-0'>
              <label htmlFor="" className='text-text/60'>Role</label>

              <div className='relative'>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  className='border border-border p-2 text-text bg-panel flex justify-center appearance-none rounded-lg w-full'
                  name=""
                  id=""
                >
                  <option value="">Choose role</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-[50%] -translate-y-1/2 w-4 h-4 text-dim" />
              </div>
            </div>

          </div>

          <div className='flex gap-5 flex-1 min-w-0'>

            <div className='flex flex-col gap-1 flex-1 min-w-0'>
              <label htmlFor="ID" className='text-text/60'>ID</label>
              <input onChange={(e) => setId(e.target.value)} required title='Only numeric values are allowed' pattern="[0-9]+" type="text" name="" id="ID" placeholder='Enter your id' className='p-2 border border-border rounded-lg' />
            </div>

            <div className='flex flex-col gap-1 flex-1 min-w-0'>
              <label htmlFor="" className='text-text/60'>Department</label>

              {/* Wrapped the select in a label to use the custom arrow down since the default arrow down doesnt get padding  */}
              <div className='relative'>
                <select onChange={(e) => setDepartment(e.target.value)} className='border border-border p-2 text-text bg-panel flex justify-center appearance-none rounded-lg w-full' name="" id="">
                  <option value="Computer Science">Computer Science</option>
                  <option value="IT">IT</option>
                  <option value="Software Engineering">Software Engineering</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-[50%] -translate-y-1/2 w-4 h-4 text-dim" />
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-1 flex-1 min-w-0'>
            <label htmlFor="email" className='text-text/60'>University Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="" id="email" placeholder='university@example.com' className='p-2 border border-border rounded-lg' />
          </div>

          <div className='flex gap-5 flex-1 min-w-0'>

            <div className='flex flex-col gap-1 flex-1 min-w-0'>
              <label htmlFor="password" className='text-text/60'>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} pattern=".{8,}" type="password" title='Password must be atleast 8 characters' name="" id="password" placeholder='Enter your password' className='p-2 border border-border rounded-lg' />
            </div>

            <div className='flex flex-col gap-1 flex-1 min-w-0'>
              <label htmlFor="confirmPassword" className='text-text/60'>Confirm Password</label>
              <input onChange={(e) => setConfirmPassword(e.target.value)} pattern=".{8,}" type="password" title='Password must be atleast 8 characters' name="" id="confirmPassword" placeholder='Enter your password' className='p-2 border border-border rounded-lg' />
            </div>
          </div>
          <p className='text-text/70 text-sm'>Atleast 8 characters</p>

          <button type="submit" className='bg-linear-to-r from-accent2 to-accent hover:bg-linear-to-r hover:from-accent hover:to-accent2 transition-colors duration-300 ease-in-out text-[#0a0f16] w-full p-2 rounded-2xl font-semibold'>
            Create your account
          </button>

          <Link to="/login"><p className='text-blue-400 text-sm text-center'>Login instead</p></Link>

        </div>
      </form>

    </div>
  )
}

export default Form
