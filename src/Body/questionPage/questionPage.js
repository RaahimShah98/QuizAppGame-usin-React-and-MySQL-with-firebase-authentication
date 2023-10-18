import React, { useSyncExternalStore } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//STLYES
import styles from './questionPage.module.css'

function QuestionPage() {
  const [questions, setQuestions] = useState(null);
  const [questionNo, setQuestionNo] = useState(0);
  const [load, setLoad] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sessionToken , setSessionToken] = useState(null)

  const auth = getAuth();
  const navigate = useNavigate();

  let answeredQuestions = [];

  const {uid, id, difficulty } = useParams();

  // console.log("bef" , questions)

  const getQuestion = async () => {
    const getData = await axios
      .get("http://localhost:5005/getQuestions", {
        params: { qid: id, qDifficulty: difficulty },
      })
      .then((res) => {
        // console.log(res)
        setQuestions(res.data);
        // console.log(questions);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    if (getData) {
      //   console.log("set");
      setLoad(true);
    } else {
      //   console.log("no set");
      setLoad(false);
    }
  };

  const getData = () => {
   
    return questions;
  };

  const goToNextQuestion = (questid, quizid , correctAnswer, option, difficulty) => {
    if (!option) {
      alert("You must Select an Option");
      return;
    }

    if (localStorage.Answered) {
      answeredQuestions = JSON.parse(localStorage.getItem("Answered"));
    }

    setSelectedOption(null);
    // console.log("ID:" , id , "OPTION : " , option)

    const questionDetail = {
      questId: questid,
      quizId: quizid,
      qCorrectAnswer: correctAnswer,
      qSelectedOpt: option,
      qDifficulty: difficulty,
    };

    answeredQuestions.push(questionDetail);

    localStorage.setItem("Answered", JSON.stringify(answeredQuestions));

    if (questionNo === questions.length) {
    
      return;
    } else {

      setQuestionNo(questionNo + 1);
    }
  };

  const goToPreviousQuestion = () => {
    setQuestionNo(questionNo - 1);
    setSelectedOption(null);

    const getQuestions = JSON.parse(localStorage.getItem("Answered"));

    getQuestions.pop();
    localStorage.setItem("Answered", JSON.stringify(getQuestions));

    console.log(questionNo);
  };

  const checkAnswers = async () => {
    const getQuestions = JSON.parse(localStorage.getItem("Answered"));
    var correctAnswers = 0;

    for (let i = 0; i < getQuestions.length; i++) {
      if (getQuestions[i].qCorrectAnswer === getQuestions[i].qSelectedOpt) {
        correctAnswers += 1;
      }
    }

    console.log(correctAnswers);

    setCorrect(correctAnswers);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("Answered");
  };

// LAST SCREEN BUTTONS AND MESSAGES
const submitScoreButton = ()=>{
  return(
    <div>
      <button className={styles.tryAgainButton} onClick={submitResult}>Submit Score</button>
    </div>
  )
}
  const tryAgainButton = () => {
    return (
      <div onClick={ ()=>{
        window.location.reload(false)
      }}>
        <button className={styles.tryAgainButton}>Try Again</button>
      </div>
    );
  };

const  showFinalResult = () => {
  return(
    <div>
      YOU SCORED : {correct} / {questions.length}
    </div>
  )
}

  const FailedScreen = () => {
    return (
      <div className={styles.failScreen}>
        YOU HAVE FAILED
        {showFinalResult()}
        {tryAgainButton()}
        {submitScoreButton()}
      </div>
    );
  };

  const PassedScreen = () => {
    return (
      <div className={styles.passScreen}>
        YOU HAVE Passed
        {showFinalResult()}
        {tryAgainButton()}
        {submitScoreButton()}
      </div>
    );
  };

  const goToHomePage = ()=>{
    navigate("/")
  }
const submitResult = async (event) =>{
  event.preventDefault()
    const getLocalStorage = JSON.parse(localStorage.getItem("Answered"))
    console.log(getLocalStorage)
    console.log(sessionToken)
  
   const check = await axios.post("http://localhost:5005/submitResult" , {uToken : sessionToken, userID :uid , answers: getLocalStorage}).then((res)=>{
      console.log(res)
      return true;
    }).catch(err =>{
      console.log(err)
      return false
    })

    if(check){
      goToHomePage()
    }
}


  // SHOW WHEN ANSWERING QUESTIONS

  const submitResultBtn = async () => {

    if (questionNo === questions.length - 1) {
      if (selectedOption) {
        const lastQuestion = questions[questionNo];
        
        const questionDetail = {
          questId: lastQuestion.questionId,
          quizId: id,
          qCorrectAnswer: lastQuestion.correctAnswer,
          qSelectedOpt: selectedOption,
          qDifficulty: lastQuestion.difficulty
        };

        // Store the answer for the last question
        if (localStorage.Answered) {
          answeredQuestions = JSON.parse(localStorage.getItem("Answered"));
        }

        answeredQuestions.push(questionDetail);
        localStorage.setItem("Answered", JSON.stringify(answeredQuestions));

        // Call checkAnswers after storing the last answer
        await checkAnswers();
        setQuestionNo(questionNo + 1);
      } else {
        alert("You must Select an Option");
      }
    }
  };
  


  //REDNER BUTTONS
  const renderNextButton = (question) => {
  //  console.log(question)
    if (questionNo < questions.length - 1)
      return (
        <button
          onClick={() =>
            goToNextQuestion(
              question.questionId,
              id,
              question.correctAnswer,
              selectedOption,
              question.difficulty,
            )
          }
        >
          Next Question
        </button>
      );
  };




  const renderPreviousButton = () => {
    if (questionNo > 0)
      return <button onClick={goToPreviousQuestion}>Previous Question</button>;
  };

  const renderSubmitButton = () => {
    if (questionNo === questions.length - 1)
      return <button onClick={submitResultBtn}>Submit Question</button>;
  };

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };


  // GET DATA
    const getTime = ()=>{
      const time  = new Date()
      console.log(time.getTime())
      return time.getTime()
  }

  useEffect(()  => {
    getQuestion();
    clearLocalStorage();
    const time = getTime()
    onAuthStateChanged(auth, async (user) => {

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // console.log(user)
        
        const uid = user.uid;

         setSessionToken(uid + time)
        
        
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  if (load) {
    // shuffleQuestions();
    const data = getData();
    // console.log(load);
    // console.log(data);
    // console.log("OUT" , questions)
    return (
      <div id={styles.QuestionAnswerPage}>
        {questionNo < questions.length ? (
          <div>
            <div>
              <h1>Question {questionNo + 1} </h1>
            </div>

            <div>Question: {data[questionNo].question}</div>

            <div>
              Options
              <br></br>
              <label>
                <input
                  type="radio"
                  checked={selectedOption === data[questionNo].optA}
                  onChange={() => handleRadioChange(data[questionNo].optA)}
                ></input>
                {data[questionNo].optA}
              </label>
              <label>
                <input
                  type="radio"
                  checked={selectedOption === data[questionNo].optB}
                  onChange={() => handleRadioChange(data[questionNo].optB)}
                ></input>
                {data[questionNo].optB}
              </label>
              <label>
                <input
                  type="radio"
                  checked={selectedOption === data[questionNo].optC}
                  onChange={() => handleRadioChange(data[questionNo].optC)}
                ></input>
                {data[questionNo].optC}
              </label>
              <label>
                <input
                  type="radio"
                  checked={selectedOption === data[questionNo].optD}
                  onChange={() => handleRadioChange(data[questionNo].optD)}
                ></input>
                {data[questionNo].optD}
              </label>
            </div>
            <div>
              {renderPreviousButton()}
              {renderNextButton(data[questionNo])}
              {renderSubmitButton(data[questionNo])}
            </div>
          </div>
        ) : (
          <div className = {styles.endResultArea}>
            {(correct / questions.length) * 100 < 50
              ? FailedScreen()
              : PassedScreen()}
          </div>
        )}
      </div>
    );
  }
}

export default QuestionPage;
