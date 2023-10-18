// import axios from "axios";
import React, { useState, useEffect } from "react";
import DifficultySelectCard from "../difficultySelectCard/difficultyCard";

import { useParams } from "react-router-dom";

import axios from "axios";

// const param = Params();
//     console.log(Params)
// console.log(useParams)

function DifficultySelect() {
  const { id } = useParams();

  const [load, setLoad] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  // console.log("ID:" , id)
  const getDifficulty = () => {
    const getData = axios
      .get("http://localhost:5005/getDifficulty", { params: { qid: id } })
      .then((res) => {
        const data = res;
        setDifficulty(data.data);
        return true;
      })
      .catch((err) => {
        console.log("HELLO ", err);
        return;
      });

    if (getData) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  };

  const getData = () => {
    const array = difficulty;
    return array;
  };

  useEffect(() => {
    getDifficulty();
  }, []);

  if (load) {
    return (
      <div>
        {console.log("Pass")}

        <DifficultySelectCard value={getData()}></DifficultySelectCard>
      </div>
    );
  } else {
    return console.log("FAIL");
  }
}

export default DifficultySelect;
