import React from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'


export default function NavLinks(props){
    const { token, logout } = props
    return(
    <ul>
        <li>
            <Link className="Links" to="/" > Login</Link> 
        </li>
        <li>
            <Link className="Links" to="/AddLikesForm"> Add liked Movies/Tvshows</Link>
        </li>
        <li>
            <Link className="Links"to="/SavedLikes" >View Your Likes</Link>
        </li>
        {token ? <button onClick={logout}>Logout</button> : <button disabled onClick={logout}>Logout</button>}
    </ul>
    )
}