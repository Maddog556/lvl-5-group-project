import React from "react";
import './Navbar.css'

import NavLinks from "./NavLinks";


function NavBar() {
    
return(
    <div className="navbar">
        <h3 className="title">Liked<span>Flix</span></h3>
        <NavLinks/>
        
    </div>

)
} 

export default NavBar