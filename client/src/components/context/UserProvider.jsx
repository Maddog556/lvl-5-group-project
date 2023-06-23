/* eslint-disable react/prop-types */
import React, { useState,createContext,useEffect} from 'react'
import axios from 'axios'

export const UserContext = createContext()

// INSERTS TOKEN PRIOR TO REQUEST
const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

const initState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: localStorage.getItem('token') || "",
  likes: [],
  errMsg: ""
}

export default function UserProvider(props) {

  const [userState, setUserState] = useState(initState)
  const [userErr, setUserErr] = useState("")
  const [likesList , setLikesList] = useState([])
  
  function getAllLikes(){
    axios.get('/api/Likes')
    .then(res => setLikesList(res.data))
    .catch(err => console.log(err.response.data.errMsg))
  }

  //store get data to state on first render
  useEffect(() => {
   getAllLikes()
  },[])

  function signup(credentials) {
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        getAllLikes()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function login(credentials) {
    axios.post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getAllLikes()
        getUserLikes()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      likes: []
    })
  }

  function handleAuthErr(errMsg) {
    setUserState(prevUserState => ({
      ...prevUserState,
      errMsg
    }))
  }

  function resetAuthErr() {
    setUserState(prevState => ({
      ...prevState,
      errMsg: ""
    }))
  }

  function getUserLikes() {
    userAxios.get("/api/likes/user")
      .then(res => {
        setUserState(prevUserState => ({
          ...prevUserState,
          issues: res.data
        }))
      })
      .catch(err => console.log(err))
  }

  function addLike(newLike) {
    userAxios.post("/api/likes", newLike)
      .then(res => {
        setUserState(prevUserState => ({
          ...prevUserState,
          likes: [...prevUserState.likes, res.data]
        }))
        getAllLikes()
        getUserLikes()
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function deleteLike(likeId) {
    userAxios.delete(`/api/like/${likeId}`)
    .then(res => {
      setLikesList(prev => prev.filter(like => like._id !== likeId))
    })
    .catch(err => console.log(err))  
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addLike,
        deleteLike,
        resetAuthErr,
        setUserErr,
      }}>
      {props.children}
    </UserContext.Provider>

  )
}