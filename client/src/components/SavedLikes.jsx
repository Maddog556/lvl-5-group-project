
import React,{useState} from "react";
import "./SavedLikes.css"
import NavBar from "./nav/Navbar";
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
    <>
    <img src = {item.moviePoster} style={{width: '150px', height: '200px' }}/>
    <h3>{item.title}</h3>
    <h3>{item.type}</h3>
    <h3>{item.genre}</h3>
    <button className="deleteBtn" onClick={()=>deleteLikes(item._id)}>X</button>
    <button className="editBtn" onClick={()=> setEditToggle(prevToggle=>!prevToggle)}>Edit</button>
    </>
    :
    <>
    <AddLikesform
    moviePoster={item.moviePoster}
    title={item.title}
    type={item.type}
    genre={item.genre}
    _id={item._id}
    btnText = "Submit Edit"
    submit = {editLikes}
    />
    <button onClick={()=>setEditToggle(prevToggle => !prevToggle)}>Close</button>
    </>
    }
</div>))

    return(
    <>
    <NavBar/>
    {likedMovieElements}
    </>
    )
}