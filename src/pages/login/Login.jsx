import React from 'react'
import { NavLink } from 'react-router-dom'
import "./login.css"
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export const Login = () => {

  const { loginHandler } = useAuth();
  const [ userLoginDetails,setUserLoginDetails ] = useState({ username:"", password:"" });

  const guestUser ={
    username: "adarshbalika",
    password: "adarshBalika123"
  }

  const inputHandler = (e)=>{
    setUserLoginDetails({
      ...userLoginDetails,
      [e.target.name]: e.target.value})
  }

  const loginSubmitHadler =(e)=>{
    e.preventDefault();
    loginHandler(userLoginDetails);
  }

  return (
    <div>
        <form className='form-container' onSubmit={loginSubmitHadler}>
            <h2 className='center app-name'>Connectify</h2>
            <h2 className='center'>Login</h2>
            <label className='block form-label'>
                Username
                <input 
                    type="text" 
                    name="username"
                    placeholder='Husaini12'
                    onChange={inputHandler}
                    className='block form-input'/>
            </label>
            <label className='block form-label'>
                Password
                <input 
                    type="password" 
                    name="password"
                    placeholder='**********'
                    onChange={inputHandler}
                    className='block form-input'/>
            </label>
            <button type="submit" className='block login-btn'>Login</button>
            <button 
              type='submit' 
              className='block guest-btn'
              onClick={()=>setUserLoginDetails(guestUser)}
              >Guest Login</button>
            <p className='center'>Dont have an account? <NavLink className="signup-nav" to="/signup">Signup</NavLink></p>
        </form>
    </div>
  )
}
