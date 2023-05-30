import React from "react";

//create context to send all data to every component when needed 
const LoginContext = React.createContext()

function LoginProvider(props){
    const[loginData, setLoginData] = React.useState({
        firstName: '',
        lastName:'',
        email:''
    })

    const[isMember, setIsMember] = React.useState(false)

    function toggleMembershipStatus(){
        setIsMember(prev=>!prev)
    }

    const [user, setUser] = React.useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : {};
    });
    
    React.useEffect(() => {
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

console.log('userLogin', user)

    //function that controls all input changes
function handleRegistrationChange(event) {
    const {name, value} = event.target//destructured object that targets the inputs name and values from the event.target object
    setLoginData(prevData => ({
        ...prevData,
        [name]: value //name is the name of the objects
    }))

    
}

    
    return(
        <LoginContext.Provider value={{
            user,
            handleRegistration,
            handleRegistrationChange,
            loginData,
            isMember,
            logoutUser,
            toggleMembershipStatus
        }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export {LoginProvider, LoginContext}