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

export default function UserProvider(props) {
  
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem('token') || "",
    likesList:[],
    errMsg: ""
  }
  
  const [userState, setUserState] = useState(initState)
  
  // console.log(userState)


  function getUserLikes(){
    userAxios.get('/api/likes/user')
    .then(res => {
      setUserState(prevUserState => ({
        ...prevUserState,
        likesList: res.data
      }))
    }
    )
    .catch(err => console.log(err.response))
  }


  function signup(credentials) {
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        getUserLikes()
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
        getUserLikes()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
      console.log('Im logged in')
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      likesList:[]
    })
    console.log('Im logged out')
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

  function addLike(newLike) {
    userAxios.post("/api/likes", newLike)
      .then(res => {
        setUserState(prevUserState => ({
          ...prevUserState,
          likesList: [prevUserState.likesList, res.data]
        }))
      })
      .catch(err => console.log(err.response))
  }

  function deleteLike(likeId) {
    userAxios.delete(`/api/likes/${likeId}`)
      .then(res => {
        setUserState(prev => ({
         ...prev,
         LikesList: prev.likesList.filter( likes => likes._id !== likeId)
        }));
        getUserLikes()
      })
      .catch(err => console.log(err));
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
        getUserLikes
        
       
      }}>
      {props.children}
    </UserContext.Provider>

  )
}