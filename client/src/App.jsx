import React from "react"
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import Login from './components/Login'
import SavedLikes from './components/SavedLikes'
import './App.css'
import AddLikesform from './components/AddLikesForm'
import axios from "axios"
import NavBar from "./components/nav/Navbar"
import Home from "./components/Home"

function App() {
  const [likesList , setLikesList] = React.useState([])

  //get request 
  function getLikes(){
    axios.get('/api/Likes')
    .then(res => setLikesList(res.data))
    .catch(err => console.log(err.response.data.errMsg))
  }

//store get data to state on first render
React.useEffect(() => {
  getLikes()
},[])
  
  //post new like
  function addLike(newLike){
  axios.post('/api/likes', newLike)
  .then(res=>{
  setLikesList(prevLikes=>[...prevLikes, res.data])
  }) //resetting state to an [] w/prev data and the new response data 
  .catch(err => console.log(err))
  }

// delete function
function deleteLikes(likesId){
  axios.delete(`/api/likes/${likesId}`)
  .then(res => {
  setLikesList(prevlikes => prevlikes.filter(likes => likes._id !== likesId))
  })
  .catch(err => console.log(err))
  }

// edit function
function editLikes(updates,likesId){
  axios.put(`/api/likes/${likesId}`,updates)
  .then(res => {
      setLikesList(prevlikes => prevlikes.map(likes => likes._id !== likesId ? likes : res.data))
  })
  .catch(err => console.log(err))
}

//filter makes w/query 
// filter
function HandleFilter(e){
  if(e.target.value === 'reset'){
    getLikes()
  } else{
  axios.get(`/api/likes/search/type?type=${e.target.value}`)
  .then(res => setLikesList(res.data))
  .catch(err => console.log(err))
  }
}
console.log('likesList', likesList)
  return (
    <div className='App'>
  <Router>
    <NavBar/>
    <Routes>
    
      <Route path='/' index element={<Home 
      likesList={likesList}
      />}
      />
      <Route path="/login" element={<Login/>}/>
      <Route path='/AddLikesForm' element={<AddLikesform 
      submit = {addLike} 
      likesList={likesList}  
      btnText = "ADD TO LIKES"
      deleteLikes= {deleteLikes}
      />}
      />
      <Route path='/SavedLikes' element={<SavedLikes 
      likesList={likesList}  
      deleteLikes= {deleteLikes}
      editLikes={editLikes}
      />}/>
    
    </Routes>
  </Router>
    </div>
  )
}

export default App