import React from "react";

import styles from "./difficultyCard.module.css";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function DifficultySelectCard(props) {


  const navigate = useNavigate();
  const {uid , id} = useParams()
  console.log(useParams())
  // console.log("PROPS" , props.value)


  if (!props.value) {
    return null; // or return a loading indicator or error message
  }

  const difficulty = props.value

  // console.log("Data" , difficulty)

  function getData(){
    difficulty.map(item=>{
      console.log(item)
    })
  }

  const goToQuestions = (difficulty)=>{
    navigate(`/${uid}/${id}/${difficulty}/questionPage`)
  }

  getData();
    return (
      <div id={styles.difficultySelectCard}>
      
       {
        difficulty.map((item) => (
        <div id={item.quizid} className={styles.difficultyCard} onClick={() => goToQuestions(item.difficultyName)}>
            <h1>Difficulty: {item.difficultyName}</h1>
            <label>Total Questions:{item.totalNumberOfQuestions} </label>
          </div>
      ))
       }
       
      </div>
    );
}

export default DifficultySelectCard;
