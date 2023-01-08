import React from "react";
import "../css/auth.css";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import Home from './Home'


const firebaseConfig = {
  apiKey: "AIzaSyDOj2KdXXNg_CKcMFE3sgAHa5XRI6doKL4",

  authDomain: "dashboard-4246d.firebaseapp.com",

  projectId: "dashboard-4246d",

  storageBucket: "dashboard-4246d.appspot.com",

  messagingSenderId: "87531142436",

  appId: "1:87531142436:web:78dc8fd04f61391c8d47b1",

  measurementId: "G-H0TWS9Q8KL",
};
firebase.initializeApp(firebaseConfig);


const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/home',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
};



function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);


    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); 
    }, []);

    //the login function
    function logIn() {
      let username = document.getElementById("username").value;
      let passwd = document.getElementById("passwd").value;
      const auth = getAuth()
      signInWithEmailAndPassword(auth, username, passwd)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          let test = user.getIdToken().then((value) => {
            console.log("log in");
            localStorage.setItem("token", value);
            setIsSignedIn(!!user);
            console.log(user)
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }

    //if not login go to the login page 
    if (!isSignedIn) {
        return (
      <div className="cover">
              <h1 className='titre'>Login</h1>
              <input className='identification' type="text" placeholder='username' id="username"/>
              <input className='identification' type="password" placeholder='password' id="passwd"/>
              <div className='login-btn' onClick={logIn}>
                  Login
              </div>
              <p className='text'>Or login using</p>
              <div className='alt-login'>
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              </div>
          </div>
  );
}
else{
  return(
    <Home></Home>
  )
}
}

export default SignInScreen