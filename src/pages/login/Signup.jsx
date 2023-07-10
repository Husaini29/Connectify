import React,{ useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./login.css"
import { useAuth } from '../../context/AuthContext'

export const Signup = () => {

    const { signupHandler } = useAuth();
    const [ userDetails, setUserDetails ] = useState({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
    })

    const inputHandler =(e)=>{
        setUserDetails({
            ...userDetails,
            [e.target.name]:e.target.value
        })
    }

    const signupSubmitHandler =(e)=>{
        e.preventDefault();
        signupHandler(userDetails);
    }


  return (
    <div>
        <form className='form-container' onSubmit={signupSubmitHandler}>
            <h2 className='center app-name'>Connectify</h2>
            <h2 className='center'>Signup</h2>
            <label className='block form-label'>
                First Name
                <input 
                    type="text" 
                    placeholder='Husaini'
                    name="firstName"
                    onChange={inputHandler}
                    className='block form-input'/>
            </label>
            <label className='block form-label'>
                Last Name
                <input 
                    type="text" 
                    placeholder='Bohra'
                    name="lastName"
                    onChange={inputHandler}
                    className='block form-input'/>
            </label>
            <label className='block form-label'>
                Username
                <input 
                    type="text" 
                    placeholder='Husaini12'
                    name="username"
                    onChange={inputHandler}
                    className='block form-input'/>
            </label>
            <label className='block form-label'>
                Password
                <input 
                type="password" 
                placeholder='**********'
                onChange={inputHandler}
                name="password"
                className='block form-input'/>
            </label>
            <button className='block login-btn' type="submit">Signup</button>
            <p className='center'>Already have an account? <NavLink className="signup-nav" to="/login">Login</NavLink></p>
        </form>
    </div>
  )
}
