import React from "react";
import { useState } from "react";

import { useFireBase } from "../../FireBase";
import { useNavigate } from "react-router-dom";
import styles from '.././LoginForm/loginFormstyle.module.css'

function RegisterUser(){

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const fireBase = useFireBase();
    const navigate = useNavigate();

    const registerUser = async () =>{
        await fireBase.registerUser(email , password)
        navigate('/LoginForm')
    }
    return(
        <div id={styles.LoginForm}>
            <section>
            <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="email"></input>
            </section>

            <section>
            <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password"></input>
            </section>

            <section>
            <button class="btn btn-danger" onClick={registerUser}>RegisterUser</button>
            </section>
        </div>
    )

}

export default RegisterUser;