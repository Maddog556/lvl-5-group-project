import React from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'


export default function NavLinks(){
    return(
    <ul>
        <li>
            <Link className="Links" to="/" > Login</Link> 
        </li>
        <li>
            <Link className="Links" to="/AddLikesForm">liked Movies/Tvshows</Link>
        </li>
        <li>
            <Link className="Links"to="/SavedLikes" >View Your Likes</Link>
        </li>
    </ul>
    )
}