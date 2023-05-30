
import React,{useState} from "react";
import "./AddLikeForm.css"
import NavBar from "./Navbar";
import axios from 'axios'

export default function AddLikes(props){
    
    const initInputs = {
        title:props.title || '',
        moviePoster:props.moviePoster || ""
    }
    //input form state 
    const [inputs,setInputs] = useState(initInputs)

    function handleChange(e){
        const {name ,value} = e.target
        setInputs(prevInputs =>({...prevInputs, [name]:value}))
    }
// adds the Movie or tv show 
    function handleClick(e){
        axios.get(`/api/likes/search?title=${e.target.value}`)
        .then(res=>setLikesList(res.data))
        .catch(err=>console.log(err))
        setInputs(initInputs) 
    }
console.log('inputs',inputs)

    // state 
    const [LikesList,setLikesList] = useState([])

    //get all likes
    function getLikes(){
        axios.get('/api/likes')
        .then(res => setLikesList(res.data))
        .catch(err => console.log(err.response.data.errMsg))
    }
    

    // filter
function HandleFilterType(e){
    if(e.target.value === 'reset'){
        getLikes()
    } else{
    axios.get(`/api/likes/search/type?type=${e.target.value}`)
    .then(res => setLikesList(res.data))
    .catch(err => console.log(err))
    }
}

function HandleFilterGenre(e){
    if(e.target.value === 'reset'){
        getLikes()
    } else{
    axios.get(`/api/likes/search/genre?genre=${e.target.value}`)
    .then(res => setLikesList(res.data))
    .catch(err => console.log(err))
    }
}

const movieElements = LikesList.map(like=>(
<div key={like._id}>
    <img className="moviePoster" src={like.moviePoster}></img>
    <h2>{like.title}</h2>
    <h3>{like.type}</h3>
    <h3>{like.genre}</h3>
</div>
))

    return(
        <>
        <NavBar />
        <form  className="form" >
        
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
            

            <button onClick={handleClick} type="button">{props.btnText} Get Movies</button>
            <select name="type" id="type" onChange={HandleFilterType}>
                <option>---Type---</option>
                <option value='reset'>All Liked </option>
                <option value="movie">Movie</option>
                <option value="tv-show">Tv Show</option>
            </select>

            <select name="genre" id="genre" onChange={HandleFilterGenre}>
                <option>---Genre---</option>
                <option value='reset'>All Liked </option>
                <option value="action">Action</option>
                <option value="horror">Horror</option>
                <option value="comedy">Comedy</option>
                <option value="fantasy">Fantasy</option>
            </select>

        </form>

        {movieElements}
        </>
    )
}