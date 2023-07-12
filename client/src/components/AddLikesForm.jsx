
import React,{useContext, useState} from "react";
import "./AddLikeForm.css"
import { UserContext } from "./context/UserProvider";

export default function AddLikesform(props){
    
const initInputs = {
    moviePoster:props.moviePoster || "",
    title:props.title || "",
    type:props.type || "",
    genre:props.genre || ""
        
}
//input form state 
const [inputs,setInputs] = useState(initInputs)
const {addLike} = useContext(UserContext)
// const {moviePoster,title,type,genre} = props

//makes all input changes controlled by react 
function handleChange(e){
        const {name ,value} = e.target
        setInputs(prevInputs =>({...prevInputs, 
            [name]:value}))
    }
 //submit 
function handleSubmit(e){
    e.preventDefault()
    addLike(inputs)
    // inputs.submit(inputs, props._id)//inputs is the new movie object state and props._id is coming from the likelist prop
    setInputs(initInputs)
}
console.log('inputs',inputs)

const defaultImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtRcLq69MMpy4uCtnR8azqxnIxOVlSqVlhSg&usqp=CAU"

    return(
        <div className="Add-background-color">
        <form  className="Add-form" onSubmit={handleSubmit} >
        
        <input 
            className="Add-img-input"
            type='text' 
            name='moviePoster' 
            value={inputs.moviePoster} 
            onChange={handleChange} 
            placeholder='Add Movie poster (imgUrl)'
            required
            />
            
            <input
            className="Add-title-input"
            type='text' 
            name='title' 
            value={inputs.title} 
            onChange={handleChange} 
            placeholder='Title'
            required
            />
            
            <select className="Add-type-input" name="type" id="type" onChange={handleChange} required >
                <option value={''}>---Type---</option>
                <option value={"movie"}>Movie</option>
                <option value={"tv-show"}>Tv Show</option>
            </select>

            <select className="Add-genre-input" name="genre" id="genre" onChange={handleChange} required >
                <option value={''}>---Genre---</option>
                <option value={"action"}>Action</option>
                <option value={"horror"}>Horror</option>
                <option value={"comedy"}>Comedy</option>
                <option value={"fantasy"}>Fantasy</option>
            </select>
            <button type='submit' className="Add-btn">'Add Likes'</button>

            <div className="previewBox">
            {inputs.moviePoster === "" ? (
            <img className="preview-img" src={defaultImg}/>
            ) : (
            <img className="preview-img" src={inputs.moviePoster}/>
            )}
                <h2 className="preview-title">Title:{inputs.title}</h2>
                <h2 className="preview-type">Type:{inputs.type}</h2>
                <h2 className="preview-genre">Genre:{inputs.genre}</h2>
            </div>
        </form>
       
        </div>
    )
}