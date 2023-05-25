import React,{useState,useEffect} from "react";
import "./Login.css"

export default function Login(){
    const[loginData, setLoginData] = useState({
        firstName: '',
        lastName:'',
        email:''
    })

    const[isMember, setIsMember] = useState(false)

    function toggleMembershipStatus(){
        setIsMember(prev=>!prev)
    }

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : {};
    });
    
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    //function to add items to a list 
function handleRegistration (event){
    event.preventDefault()
    setUser({...user, ...loginData})
    setLoginData({
        firstName: '',
        lastName:'',
        email:''
    });
    }

function logoutUser(){
    localStorage.removeItem("user")
}

console.log('user', user)

    //function that controls all input changes
function handleRegistrationChange(event) {
    const {name, value} = event.target//destructured object that targets the inputs name and values from the event.target object
    setLoginData(prevData => ({
        ...prevData,
        [name]: value //name is the name of the objects
    }))

    
}
    return(
        <div className="loginContainer">
            <div className="loginBox">
                <h3 className="userName">{user.firstName}</h3>
                <form onSubmit={handleRegistration} className="loginForm">
                    <input className="loginInput" onChange={handleRegistrationChange} name="firstName" placeholder="First Name" value={loginData.firstName} type="text"/>
                    <input className="loginInput" onChange={handleRegistrationChange} name="lastName" placeholder="Last Name" value={loginData.lastName} type="text"/>
                    <input className="loginInput" onChange={handleRegistrationChange} name="email" placeholder="Email" value={loginData.email} type="email"/>
                    <button className="loginButton">{isMember? "Login" : "Register"}</button>
                    {user.firstName !== ''&& <button onClick={logoutUser} className="logoutButton">Logout</button>}
                </form>
                <h6 className='alreadyMember' onClick={toggleMembershipStatus}>{isMember? "Not": "Already"} a Member? click here</h6>
            </div>
        </div>
    )
    }