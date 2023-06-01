
import React,{useState} from "react";
import "./SavedLikes.css"
import AddLikesform from "./AddLikesForm";

export default function SavedLikes(props){
    //state for edit btn toggle
const [editToggle,setEditToggle] = React.useState(true)

//props used 
const {likesList,editLikes,deleteLikes} = props

//map out data to dom
const likedMovieElements = likesList.map(item => (
<div key={item._id} className="likedItemBox">
    {editToggle ? 
    <div className="saved-container">
    <img className="saved-picture" src = {item.moviePoster} />
    <h3 className="saved-title">{item.title}</h3>
    <h3 className="saved-type">{item.type}</h3>
    <h3 className="saved-genre">{item.genre}</h3>
    <button className="deleteBtn" onClick={()=>deleteLikes(item._id)}>Delete</button>
    <button className="editBtn" onClick={()=> setEditToggle(prevToggle=>!prevToggle)}>Edit</button>
    </div>
    :
    <>
    <AddLikesform
    moviePoster={item.moviePoster}
    title={item.title}
    type={item.type}
    genre={item.genre}
    _id={item._id}
    btnText = "SUBMIT EDIT"
    submit = {editLikes}
    />
    <button className="close-btn" onClick={()=>setEditToggle(prevToggle => !prevToggle)}>Close</button>
    </>
    }
</div>))

    return( 
    <div className="Like-grid">
        {likedMovieElements}
    </div>
    )
}