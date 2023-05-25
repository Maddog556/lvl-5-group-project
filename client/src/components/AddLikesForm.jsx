
import React,{useState} from "react";
import "./AddLikeForm.css"
import NavBar from "./Navbar";

export default function AddLikes(props){
    
    const initInputs = {
        title:props.title || '', 
        type:props.type || ''  
    }
    
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

    return(
        <>
        <NavBar />
        <form  className="form"onSubmit={handleSubmit}>
            <input 
            type='text' 
            name='title' 
            value={inputs.name} 
            onChange={handleChange} 
            placeholder='Title'/>
       
            <select name="type" id="type" onChange={handleChange}>
                <option>--Type--</option>
                <option value="movie">Movie</option>
                <option value="tvShow">Tv Show</option>
            </select>

            <button>{props.btnText}</button>

        </form>
        </>
    )
}