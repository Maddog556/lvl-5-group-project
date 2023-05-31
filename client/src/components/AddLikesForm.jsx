
import React,{useState} from "react";
import "./AddLikeForm.css"
import NavBar from "./Navbar";


export default function AddLikesform(props){
    
const initInputs = {
    moviePoster:props.moviePoster || "",
    title:props.title || "",
    type:props.type || "",
    genre:props.genre || ""
        
}
//input form state 
const [inputs,setInputs] = useState(initInputs)

//makes all input changes controlled by react 
function handleChange(e){
        const {name ,value} = e.target
        setInputs(prevInputs =>({...prevInputs, 
            [name]:value}))
    }
 //submit 
function handleSubmit(e){
    e.preventDefault()
    props.submit(inputs, props._id)//inputs is the new movie object state and props._id is coming from the likelist prop
    setInputs(initInputs)
}
console.log('inputs',inputs)

const defaultImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtRcLq69MMpy4uCtnR8azqxnIxOVlSqVlhSg&usqp=CAU"

    return(
        <>
        <NavBar />
        <form  className="form"onSubmit={handleSubmit} >
        
        <input 
            type='text' 
            name='moviePoster' 
            value={inputs.moviePoster} 
            onChange={handleChange} 
            placeholder='Add Movie poster (imgUrl)'/>
            
            <input 
            type='text' 
            name='title' 
            value={inputs.title} 
            onChange={handleChange} 
            placeholder='Title'/>
            
            <select name="type" id="type" onChange={handleChange}>
                <option>---Type---</option>
                <option value={"movie"}>Movie</option>
                <option value={"tv-show"}>Tv Show</option>
            </select>

            <select name="genre" id="genre" onChange={handleChange}>
                <option>---Genre---</option>
                <option value={"action"}>Action</option>
                <option value={"horror"}>Horror</option>
                <option value={"comedy"}>Comedy</option>
                <option value={"fantasy"}>Fantasy</option>
            </select>
            <button>{props.btnText}</button>

            <div className="previewBox">
            {inputs.moviePoster === "" ? (
            <img src={defaultImg} style={{ width: "250px", height: "275px" }} />
            ) : (
            <img src={inputs.moviePoster} style={{ width: "250px", height: "275px" }} />
            )}
                <h2>Title:{inputs.title}</h2>
                <h2>Type:{inputs.type}</h2>
                <h2>Genre:{inputs.genre}</h2>
            </div>

        </form>
        </>
    )
}