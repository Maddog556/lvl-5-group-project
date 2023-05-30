import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import AddLikes from './AddLikesForm'


function likes() {
  const [LikesList,setLikesList] = useState([])


// //get all likes
//   function getLikes(){
//     axios.get('/api/Likes')
//       .then(res => setLikesList(res.data))
//       .catch(err => console.log(err.response.data.errMsg))
//   }
// add new Likes
  function addLikes(newLikeAdded){
    axios.post('/api/likes',newLikeAdded)
    .then(res => {
        setLikesList(prevlikes => [...prevlikes, res.data])
    })
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
  useEffect(() => {
    getLikes()
  },[])
  

  return (
<div className="cardContainer">

<h4>Filter by Type</h4>
  <select onChange={HandleFilter}>
  <option>-- Filter By --</option>
  <option value="movie">Movie</option>
  <option value="tvShow">Tv show</option>
  <option value="reset">Show All</option>
  </select>

    <AddLikes
        //here is for editing and add button on the form 
        submit={addLikes} 
    />
    {bountiesList.map(likes => 
        <BountyFront 
            {...likes} 
            key={likes._id} 
            deleteBounty={deleteLikes}
            editBounty={editLikes}    
        />)}  
</div>

)}

export default likes
