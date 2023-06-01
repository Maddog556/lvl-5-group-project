import React from "react";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import './Navbar.css'
import MobileNav from "./MobileNav";
import Navigation from "./Navigation";


function NavBar() {
    
return(
    <div className="navbar">
        <Navigation/>
        <MobileNav/>
    </div>

)
} 

export default NavBar