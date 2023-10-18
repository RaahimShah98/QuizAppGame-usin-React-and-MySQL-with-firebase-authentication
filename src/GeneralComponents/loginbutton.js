import React from "react";

//STYLE
import "./loginButton.css";
import { Link , useNavigate} from "react-router-dom";
import { useFireBase } from "../FireBase";

import { getAuth, onAuthStateChanged , signOut} from "firebase/auth";
import { useState , useEffect} from "react";

//Component
// import Loginpage from "../Body/LoginForm/LoginPage";

function Loginbutton() {
  const [user , setUser] = useState("null")

  const fireBaseUse = useFireBase();
  const navigate = useNavigate()

  const auth = getAuth();

 useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("THIS IS USER: ", user)
       setUser(user)
      } else {
        setUser(false)
      }
    });
  },[])

  async function logOutUser(){
    await signOut(auth); 
  }

const getButton = () =>{
  if(!user){

    return(<Link to="/LoginForm">
      <button className="LoginBtn btn btn-success">LogIn</button>
    </Link>)

  }
  else{
    return (
      <button className="LoginBtn btn btn-dark" onClick={() => logOutUser()}>LogOut</button>
      )
  }
  
}

  return (
    <div id= "LoginBtnDiv:" >
     {getButton()}
    </div>
   
  );
  }

export default Loginbutton;
