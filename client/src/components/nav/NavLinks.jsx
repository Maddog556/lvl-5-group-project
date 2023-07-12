import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'


export default function NavLinks(){
    const { token, logout } = useContext(UserContext)
    return(
    <nav>
            <Link className="Links" to="/" > Home </Link> 
      
            <Link className="Links" to="/addLikesForm"> Add like Movies/Tvshows</Link>
        
            <Link className="Links"to="/savedLikes" >Saved Likes</Link>
       
         {token ? <button className='logout-btn' onClick={logout}>Logout</button> : <button disabled onClick={logout}>Logout</button>}
    </nav>
    )
}