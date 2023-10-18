import React from "react";

import FooterNavBar from "./footerComponents/footerNavBar";
import Logo from "../GeneralComponents/logo";
import Loginbutton from "../GeneralComponents/loginbutton";


//style
import styles from "./footer.module.css"

function Footer(){


    return(

        <div id={styles.footer}>
            <Logo />
            <FooterNavBar />
            <Loginbutton />
        </div>
    )
}




export default Footer