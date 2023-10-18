import React from "react";
import {useNavigate} from 'react-router-dom'

import { useState , useEffect } from "react";

// import { app } from "../../firebase";

//import firebase
import {useFireBase } from "../../FireBase.js";
import { getAuth,  signOut} from "firebase/auth";

//style
import styles from "./loginFormstyle.module.css";
import { Link} from "react-router-dom";



function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const [user, setUser] = useState(null);
  const [signInStatus, setSignInStatus] = useState(false);


  const firebaseUse = useFireBase();
  const navigate = useNavigate();
  const auth = getAuth()

  async function logOutUser(){
    await signOut(auth); 
  }

  useEffect(() => {
    // This effect runs when signInStatus changes
    if (signInStatus) {
      if (signInStatus) {
        // User signed in successfully
        if (verify) {
          navigate("/");
        } else {
          alert("YOU MUST VERIFY YOUR EMAIL FIRST");
          firebaseUse.verifyUserEmail(user);
          logOutUser();
        }
      } else {
        // Sign in failed
        if (!email) {
          alert("must enter email before logging in");
        } else {
          alert("Wrong Credentials");
        }
      }
    }
  }, [signInStatus, email, verify, user, navigate, firebaseUse]);


  
  async function signInUser() {

      await firebaseUse.signInUser(email, password).then((res)=>{
        console.log(res.status);
          setVerify(res.user.emailVerified);
          setUser(res.user);
          setSignInStatus(true);

      }).catch( (err) => {
      console.log("IN CATCH: ", err);
      setSignInStatus("error");
    })
  }

  async function handleSignIn() {
    await signInUser();
  }

  return (

    <div id={styles.LoginForm}>
      <section>
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"></input>

      </section>

      <section>

        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"></input>
      </section>

      <section>
        <button className="btn btn-primary" onClick={handleSignIn}>Log In</button>
      </section>

      <section>
        <Link id={styles.toRegisterFormBtn} class="btn btn-dark" to="/RegisterUser">RegisterUser</Link>
      </section>
    </div>
  );

}

export default Loginpage;
