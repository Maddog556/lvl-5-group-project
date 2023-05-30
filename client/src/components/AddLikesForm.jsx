
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

    function handleChange(e){
        const {name ,value} = e.target
        setInputs(prevInputs =>({...prevInputs, [name]:value}))
    }
// adds the Movie or tv show 
function handleSubmit(e){
    e.preventDefault()
    //post request
    props.submit(inputs, props._id)
    setInputs(initInputs)
}
console.log('inputs',inputs)

    return(
        <>
        <NavBar />
        <form  className="form"onSubmit={handleSubmit} >
        
        <input 
            type='text' 
            name='moviePoster' 
            value={inputs.moviePoster} 
            onChange={handleChange} 
            placeholder='Add Movie poster'/>
            
            <input 
            type='text' 
            name='title' 
            value={inputs.title} 
            onChange={handleChange} 
            placeholder='Title'/>
            
            <select name="type" id="type" onChange={handleChange}>
                <option>---Type---</option>
                <option value="movie">Movie</option>
                <option value="tv-show">Tv Show</option>
            </select>

            <select name="genre" id="genre" onChange={handleChange}>
                <option>---Genre---</option>
                <option value="action">Action</option>
                <option value="horror">Horror</option>
                <option value="comedy">Comedy</option>
                <option value="fantasy">Fantasy</option>
            </select>

            <button> Add Like </button>

        </form>
        </>
    )
}