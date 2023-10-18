const express = require("express");

const mysql = require("mysql");
const cors = require("cors");
const { FORMERR } = require("dns");

const app = express();
const port = 5005;

app.use(cors());
// app.use(express.static("dist"));
app.use(express.json());

const connection = mysql.createPool({
//
//
//
//
//
//Add MySQL Database details
//
//
//
//
//
});


connection.getConnection((error) => {
  if (error) {
    console.error("Error connecting to the database:", error.message);
  } else {
    console.log("Connected to the database");
  }
});

app.get("/quizDetail", async (req, res) => {
  console.log("hello");
  console.log(req);

  connection.query(`SELECT * FROM quiz`, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.get("/getDifficulty", async (req, res) => {
  const id = req.query.qid;

  connection.query(
    `     
  SELECT
      d.difficultyName,
      COUNT(q.questionId) AS totalNumberOfQuestions
  FROM
      difficulty AS d
  LEFT JOIN
      questions AS q ON d.difficultyName = q.difficulty
  WHERE
      q.quizId = ${id}  -- Replace 'your_quiz_id' with the actual quizId you're interested in
  GROUP BY
   d.difficultyName;`,
   
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json(result);
      }
    }
  );
});


app.get("/getQuestions" , async(req,res)=>{
  console.log(req)
  const id = req.query.qid
  const difficulty = req.query.qDifficulty

  connection.query(`select * from questions WHERE quizID =${id}  and difficulty = '${difficulty}'` , (err , result)=>{
      if(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
      }
      else{
        res.json(result)
      }
  })

})


app.post("/submitResult" , async(req,res)=>{
  // console.log(req.body)
  const {uToken, userID , answers} = req.body

  console.log("TOKEN : "  , uToken )
  // console.log("Answer : ",answers)
  console.log("user : ",userID)
  // console.log("HELLO" , typeof(uToken))


  for(let i  = 0 ; i <answers.length ; i++){

    //(sessionID , qid , CorrectAnswer , SelectedOption , Difficulty) 
   

  connection.query(` INSERT INTO answeredQuestions (sessionID,userID ,  quizId, questID, questSelectedAnswer, questCorrectAnswer, qDifficulty) VALUES ('${uToken}', '${userID}' , ${answers[i].quizId} , ${answers[i].questId} , '${answers[i].qSelectedOpt}' , '${answers[i].qCorrectAnswer}' , '${answers[i].qDifficulty}');` , (err , result)=>{
    if(err){
      console.log(err)
      res.status(500).send("Internal Server Error")
    }
    else{
      console.log("Sent")
    }
})
  }

    res.json("DATA SENT SUCCESSFULLY")

  

})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
