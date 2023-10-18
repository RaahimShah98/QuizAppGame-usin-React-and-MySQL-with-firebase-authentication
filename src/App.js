// import logo from './logo.svg';
import "./App.css";

import Header from "./Header/header";
import Body from "./Body/body";
import Footer from "./Footer/footer";



//COMPONENTS
import DifficultySelect from "./Body/quizPage/difficultyPage";
import Loginpage from "./Body/LoginForm/LoginPage";
import RegisterUser from "./Body/RegisterUserForm/registerUser";
import QuestionPage from "./Body/questionPage/questionPage";
import { Route, Routes } from "react-router-dom";




function App() {
  return (
    
    <div className="App">
      <div id="quizAppHeader">
        <Header />
      </div>

      <div id="quizAppBody">
       
          <Routes>
            <Route path="/" Component={Body}></Route>
            <Route path="/:uid" Component={Body}></Route>
            <Route path="/:uid/:id/DifficultySelect" Component={DifficultySelect}></Route>
            <Route path = "/LoginForm" Component={Loginpage}></Route>
            <Route path= "/RegisterUser" Component={RegisterUser}></Route> 
            <Route path= "/:uid/:id/:difficulty/questionPage" Component={QuestionPage}></Route> 

          </Routes>


      </div>

      <div id="quizAppFooter">
        <Footer />
      </div>
    </div>
  );
}

export default App;
