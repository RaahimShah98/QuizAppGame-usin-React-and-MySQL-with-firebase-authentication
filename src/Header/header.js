import React from "react";


//CSS

import "./headerStyle.css"

//IMPORTS COMPONENTS
import Logo from "../GeneralComponents/logo";
import Navbar from "./headerNavBar.js"
import Login from "../GeneralComponents/loginbutton"
function Header(){

    


    return(
        <div id = "Header">
            <Logo />
            <Navbar />
            <Login />
        </div>
        )
}



export default Header