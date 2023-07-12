
import React,{useContext, useEffect} from "react";
import "./SavedLikes.css"

import { UserContext } from "./context/UserProvider";

export default function SavedLikes(){

//props used 
const {likesList,deleteLike,getUserLikes} = useContext(UserContext)

//map out data to dom
const likedMovieElements = likesList?.map(item => (
<div key={item._id} className="likedItemBox">
    
    <div className="saved-container">
    <img className="saved-picture" src = {item.moviePoster} />
    <h3 className="saved-title">{item.title}</h3>
    <h3 className="saved-type">{item.type}</h3>
    <h3 className="saved-genre">{item.genre}</h3>
    <button className="deleteBtn" onClick={()=>deleteLike(item._id)}>Delete</button>
    </div>
  
</div>))

useEffect(() => {
    getUserLikes()
    
},[])

    return( 
    <div className="Like-grid">
        {likedMovieElements}
    </div>
    )
}