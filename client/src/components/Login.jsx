import React,{useState,useEffect} from "react";
import "./Login.css"
import { LoginContext } from "./LoginProvider";

export default function Login(){
//use context 
const { user,
    handleRegistration,
    handleRegistrationChange,
    loginData,
    isMember,
    logoutUser,
    toggleMembershipStatus} =React.useContext(LoginContext)

    return(
        <>
        <div className="loginContainer">
            <div className="fade"></div>
            <div className="loginBox">
                <h3 className="userName">{user.firstName}</h3>
                <form onSubmit={handleRegistration} className="loginForm">
                    <input className="loginInput" onChange={handleRegistrationChange} name="firstName" placeholder="First Name" value={loginData.firstName} type="text"/>
                    <input className="loginInput" onChange={handleRegistrationChange} name="lastName" placeholder="Last Name" value={loginData.lastName} type="text"/>
                    <input className="loginInput" onChange={handleRegistrationChange} name="email" placeholder="Email" value={loginData.email} type="email"/>
                    <button className="loginButton">{isMember? "Login" : "Register"}</button>
                    {user.firstName !== '' && <button onClick={logoutUser} className="logoutButton">Logout</button>}
                </form>
                <h6 className='alreadyMember' onClick={toggleMembershipStatus}>{isMember? "Not": "Already"} a Member? click here</h6>
            </div>
        </div>
        </>
    )
    }