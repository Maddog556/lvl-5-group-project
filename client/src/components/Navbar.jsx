import React from "react";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import './Navbar.css'

function NavBar() {
    
return(

    <nav className='nav-tabs'>
                <div className="logo"></div>
                
                <Link className="Links" to="/" style={{ padding: 20 }}> 
                Login
                </Link> 
                <Link className="Links" to="/AddLikesForm" style={{ padding: 20}}>
                Add like Movies/Tvshows
                </Link>
                <Link className="Links"to="/SavedLikes" style={{ padding: 20 }}>
                View Your Likes
                </Link>
          
    </nav>
)
} 

export default NavBar