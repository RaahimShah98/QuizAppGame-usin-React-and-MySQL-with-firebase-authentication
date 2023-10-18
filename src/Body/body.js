import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import Loginpage from "./LoginForm/LoginPage";

//style
import styles from "./body.module.css";

//COMPONENTS IMPORTS
import Card from "./quizCard/card";

function Body() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getQuizData = async () => {

    const array = await axios
      .get(`http://localhost:5005/quizDetail`)
      .then((res) => {
        // console.log(res)
        const dataa = res;
        // console.log("HERE IS DATA: ", dataa.data);
        setData(dataa.data);
        //  console.log("NEW: , " , data)
        return data;
      })
      .catch((error) => {
        console.log(error);
      });

    if (array) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    return array;
  };

  function arrayData() {
    // console.log("REC DATA: < "  , getQuizData())

    const array = data;
    // console.log("INSIDE:", array);
    return array;
  }

  useEffect(() => {
    getQuizData();
    
    // console.log("HELLO", data);
  }, []);

//   console.log("DATA", arrayData());
  console.log(arrayData())
  if (!loading) {

    return (
      
      <div id={styles.Body}>
        <Card array={arrayData()} />
      </div>
    );
  }
}

export default Body;
