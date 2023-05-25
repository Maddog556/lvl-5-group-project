
import React,{useState} from "react";
import "./AddLike.css"

export default function AddLikes(props){
    
    const initInputs = {
        name:props.name || '', 
        type: props.type || ''
        
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
        <form onSubmit={handleSubmit}>
            <input 
            type='text' 
            name='name' 
            value={inputs.name} 
            onChange={handleChange} 
            placeholder='Name'/>

       
            <select name="type" id="type" onChange={handleChange}>
                <option>--Type--</option>
                <option value="Movie">Movie</option>
                <option value="Tv show">Tv Show</option>
            </select>

            <button>{props.btnText}</button>

        </form>
    )
}