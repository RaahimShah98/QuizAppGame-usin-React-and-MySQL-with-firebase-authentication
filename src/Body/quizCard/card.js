import React, { useEffect } from "react";
import styles from "./card.module.css";
import { Link , useNavigate } from "react-router-dom";

import { useState } from "react";
import { getAuth , onAuthStateChanged } from "firebase/auth";
import DifficultySelect from "../quizPage/difficultyPage";




function Cardcomponent(props) {

  const array = props.array;
  
  const [signUser , setSignUser] = useState(null)
  const [uid , setUid] = useState(null)

  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() =>{
    onAuthStateChanged(auth , (user)=>{

      if(user){
        // console.log("from Card" , user)
        setSignUser(true)
        setUid(user.uid)
        
      }else{
        setSignUser(false)
        console.log("userNotSignedIn")
      }
    })
  } , [])

  function checkUser(id){

    console.log(id)

    if(signUser){
      console.log(signUser)
      navigate(`${uid}/${id}/DifficultySelect`)
    }
    else{
      console.log(signUser)
      alert("you must sign in first")

    }
  }
  
  console.log(props.array)

  return (
    <div id={styles.cardContainer}>
      {array.map((item) => (
        
          <div onClick = {() => checkUser(item.quizId)} id={item.quizId} className={styles.quizCardComponent} key={item.quizId}  >
            <img className={styles.cardImage} src={item.quizImg} alt=""></img>
            <div className = {styles.cardDetails}>
              <h1>{item.quizName}</h1>

              <p>
                Answered: {item.correctAnswers}/{item.quizTotalQuestions}
              </p>

              <progress
                value={item.correctAnswers / item.quizTotalQuestions}
              ></progress>
            </div>
          </div>
        // </Link>
      ))}
    </div>
  );
}

export default Cardcomponent;
