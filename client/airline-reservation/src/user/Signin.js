import Navbar from "../components/Navbar";
import "../styles/Signin.css";
import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { app } from "../components/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

export default function Signin({ show, onClose }) {
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const rEmail = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hEmail = (event) => {
    setEmail(event.target.value);
  };
  const hPassword = (event) => {
    setPassword(event.target.value);
  };

  const toggleSignInPopup = () => {
    setShowSignInPopup(!showSignInPopup);
  };

  const nav = useNavigate();
  useEffect(() => {
    let name = localStorage.getItem("name");
    if (name != null) nav("/");
  });

  const signin = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("username and password cannot be empty");
      rEmail.current.focus();
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const url = `http://localhost:9000/getUserInfo?email=${email}`;

        axios
          .get(url)
          .then((response) => {
            console.log(response.data);
            if (response.data && response.data.name) {
              console.log(response.data.name);
              console.log(response.data.email);
              localStorage.setItem("name", response.data.name);
              localStorage.setItem("email", response.data.email);
              nav("/flight-booking");
            } else {
              console.log("Name not found in response data");
              alert("Invalid credentials");
              setPassword("");
            }
          })
          .catch((err) => {
            alert("Error :" + err);
          });
      })
      .catch((err) => {
        alert("Error :" + err);
      });
  };
  return (
    <>
      <Navbar />
      <div className={`signup-popup popup ${show ? "show" : ""}`}>
        <div className="popup-content">
          <div className="signup-col-1">
            <div className="heading-signup">
              <h2 className="sign-tripma">Welcome back!</h2>
              <button className="close-popup" onClick={onClose}>
                <svg
                height="32px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <circle
                      opacity="0.5"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#1C274C"
                      stroke-width="1.5"
                    ></circle>{" "}
                    <path
                      d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                      stroke="#1C274C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
            <p className="para-signup">
              Please sign-in to your account and let's start the adventure
            </p>
            <form onSubmit={signin}>
              <input
                className="input-field"
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={hEmail}
                ref={rEmail}
              />
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={hPassword}
              />
              <div className="sharte">
                <p className="sharte-p">
                  Don't have an account? <span>Create One</span>
                </p>
              </div>
              <div className="sharte">
                <p className="sharte-p">
                  <span>Forgot Password</span>
                </p>
              </div>
              <input
                className="input-field submit-btn"
                type="submit"
                value="Sign in"
              />
            </form>
          </div>
          <div className="signup-options">
            <div className="hr-divide cont-with">
              <hr className="hr-line" />
              <span className="or-text">or</span>
              <hr className="hr-line" />
            </div>
            <button className="cont-with">Continue with Google</button>
          </div>
        </div>
      </div>
    </>
  );
}
