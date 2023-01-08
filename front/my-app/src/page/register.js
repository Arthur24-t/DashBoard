import React from "react";
import "../css/auth.css";
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { registerVersion } from "firebase/app";

function Register(){

    //the route 
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `../`;
    navigate(path);
    }

    return (
        //the register formulary
        <div className="cover">
            <h1 className="titre">Register</h1>
            <h2 className="sub_title">Your mail address :</h2>
            <input className='identification' type="text" placeholder='email' id="username"/>
            <h2 className="sub_title">Your password :</h2>
            <input className='identification' type="password" placeholder='password' id="passwd"/>
            <div className='login-btn' onClick={btnregisterVersion}>
                Register
            </div>
            <div className="login-btn" onClick={routeChange}>
                Already have an account
            </div>
        </div>
    )
}

//the register function 
function btnregisterVersion(){
    console.log("est")
    const auth = getAuth();
    let email = document.getElementById("username").value;
    let password = document.getElementById("passwd").value;
  
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("connected");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        });

    }
    
export default Register;