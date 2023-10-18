import React from "react";

//STYLE
import "./loginButton.css";
import { Link } from "react-router-dom";

//Component
// import Loginpage from "../Body/LoginForm/LoginPage";


function Loginbutton() {
  return (
    
    <Link to="/LoginForm" id="LoginBtnDiv">
      <div >
        <button class="btn btn-dark" id="LoginBtn">LogOut</button>
      </div>
    </Link>
  );
}

export default Loginbutton;
