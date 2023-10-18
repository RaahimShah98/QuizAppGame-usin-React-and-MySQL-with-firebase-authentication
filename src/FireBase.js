// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createContext, useContext, useState } from "react";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {


    //
    //
    //
    //
    // ADD YOUR FIREBASE DETAILS HERE
    //
    //
    //
    //
    //
    //
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseContext = createContext(null);

export const useFireBase = () => useContext(FirebaseContext);

export const FireBaseProvider = (props) => {
  //SIGN IN A USER

  const signInUser = async (email, password) => {
    console.log("Sign IN Complete");

   const response =  await signInWithEmailAndPassword(auth, email, password).then((res) => {
      // console.log("THIS IS RES: " , res);

      return res;
    });

    return response
  };

  //SIGNOUT A USER

  function getAuth() {
    return auth;
  }



  /*
    
  verify user

  */


  const verifyUserEmail = async (user) => {
    
    console.log("THIS: " , user)
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }

//  
//
  //REGISTER A USER
//
//

  const registerUser = async (email, password) => {
    console.log("registerComplete");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Send a verification email
      verifyUserEmail(user);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ getAuth, signInUser, registerUser, verifyUserEmail }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
