import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import AddLikes from './AddLikesForm'


function Bounty() {
  const [LikesList,setLiklesList] = useState([])


//get all likes
  function getLikes(){
    axios.get('/Likes')
      .then(res => setLikesList(res.data))
      .catch(err => console.log(err.response.data.errMsg))
  }
// add new Likes
  function addLikes(newLikeAdded){
    axios.post('/bountiesList',newLikeAdded)
    .then(res => {
        setLikesList(prevbounties => [...prevbounties, res.data])
    })
    .catch(err => console.log(err))
}

// delete function
function deleteBounty(bountyId){
axios.delete(`/bountiesList/${bountyId}`)
.then(res => {
    setBountiesList(prevbounties => prevbounties.filter(bounty => bounty._id !== bountyId))
})
.catch(err => console.log(err))
}

// edit function
function editBounty(updates,bountyId){
    axios.put(`/bountiesList/${bountyId}`,updates)
    .then(res => {
        setBountiesList(prevbounties => prevbounties.map(bounty => bounty._id !== bountyId ? bounty : res.data))
    })
    .catch(err => console.log(err))
}
// filter
function HandleFilter(e){
  if(e.target.value === 'reset'){
    getBounties()
  } else{
  axios.get(`/bountiesList/search/type?type=${e.target.value}`)
  .then(res => setBountiesList(res.data))
  .catch(err => console.log(err))
  }
}
  useEffect(() => {
    getBounties()
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
        submit={addBounties}
        btnText ='Add'
    />
    {bountiesList.map(bounty => 
        <BountyFront 
            {...bounty} 
            key={bounty._id} 
            deleteBounty={deleteBounty}
            editBounty={editBounty}    
        />)}  
</div>
 
 )}

export default Bounty
