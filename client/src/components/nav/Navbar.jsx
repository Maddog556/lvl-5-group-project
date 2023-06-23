import React from "react";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import './Navbar.css'
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";


function NavBar() {
    
return(
    <div className="navbar">
        <h3 className="title">Liked<span>Flix</span></h3>
        <NavLinks/>
        <MobileNav/>
    </div>

)
} 

export default NavBar