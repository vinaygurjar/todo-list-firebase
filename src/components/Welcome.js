import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import './welcome.css';
import TodoSVG from '../assets/todo-svg.svg';

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    ConfirmEmail: "",
    password: "",
    ConfirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if(registerInformation.email !== registerInformation.ConfirmEmail){
      alert("please confirm that email are the same");
      return;
    } else if (registerInformation.password !== registerInformation.ConfirmPassword){
      alert("please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="welcome">
      <img src={TodoSVG} className="todo-svg"/>
      <h1>Todo-List</h1>
      <div className="login-register-container">
        {isRegistering ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Confirm Email"
              value={registerInformation.ConfirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  ConfirmEmail: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerInformation.ConfirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  ConfirmPassword: e.target.value,
                })
              }
            />
            <button className="sign-in-register-button" onClick={handleRegister}>Register</button>
            <button className="create-account-button" onClick={() => setIsRegistering(false)}>Go back</button>
          </>
        ) : (
          <>
            <input 
              type="email" 
              placeholder="Email"
              onChange={handleEmailChange} 
              value={email} 
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
            <button className="sign-in-register-button" onClick={handleSignIn}>Sign In</button>
            <button className="create-account-button" onClick={() => setIsRegistering(true)}>
              Create an account
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
