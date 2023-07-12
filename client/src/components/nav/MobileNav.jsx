import React from "react"
import NavLinks from "./NavLinks"
import {RxHamburgerMenu} from 'react-icons/rx'
import {AiOutlineCloseCircle} from "react-icons/ai"


export default function MobileNav(){
const [open, setOpen] = React.useState(false)

const hamburgerIcon = <RxHamburgerMenu 
            className="hamburger" 
            size="40px" 
            color="red"
            onClick={()=>setOpen(!open)} />

const closeIcon = <AiOutlineCloseCircle
            className="closeIcon" 
            size="40px" 
            color="red"
            onClick={()=>setOpen(!open)} />
    return(
        <nav className="mobileNav">
            {open? closeIcon : hamburgerIcon}
            {open && <NavLinks/>}
        </nav>
    )
}