import React, {useState,useContext} from 'react'
import AuthForm from "./AuthForm.jsx"
import './Auth.css'
import {UserContext} from '../context/UserProvider'

const initInputs = {username:"" , password:""}

export default function Auth(){
    const [inputs, setInputs] = useState(initInputs)
    const [toggle,setToggle] = useState(false)
    //user data
    const {
      signup,
      login,
      errMsg,
      resetAuthErr
    } = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]:value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs) 
    }
    function handleLogin(e){
        e.preventDefault()
       login(inputs)
    }
    function toggleForm(){
      setToggle(prev => !prev)
      resetAuthErr() 
    }

    return(
        <div className= "auth-container">
            <h1 className='login-title'>Add Likes</h1>
            {!toggle ?
            <>
          <AuthForm
            className="authForm"
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign Up"
            errMsg={errMsg}
          />
          <p className='toggleform' onClick={toggleForm}>Already A Member?</p>
        </> :
        <>
          <AuthForm
          className="authForm"
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <p className='toggleform' onClick={toggleForm}>Not a member?</p>
        </>}
    </div>
    )
}