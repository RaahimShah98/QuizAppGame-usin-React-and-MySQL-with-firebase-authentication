import React from "react";
import { useNavigate , useParams } from "react-router-dom";


//style
import "./logoStyle.css";



function Logo() {

  const navigate = useNavigate()
  // const {id} = useParams()
  // console.log(id)


  function goToMain(){
    navigate("/")
  }

  const style = {
    fontSize: "20px",
  };


  return (
    <div id="LogoDiv" onClick={goToMain}>
      <h1 id="Logo" stlye={style}>
        Quizoo
      </h1>
    </div>
  );
}

export default Logo;
