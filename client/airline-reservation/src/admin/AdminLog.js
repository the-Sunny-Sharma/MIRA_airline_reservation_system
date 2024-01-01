import Navbar from "../components/Navbar";
import "../styles/Signin.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLog({ show, onClose }) {
  const [showAdminLog, setShowAdminLog] = useState(false);
  const toggleAdminLog = () => {
    setShowAdminLog(!showAdminLog);
  };

  const nav = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const rId = useRef();

  const hId = (event) => {
    setId(event.target.value);
  };
  const hPassword = (event) => {
    setPassword(event.target.value);
  };

  const adminLogin = (event) => {
    event.preventDefault();
    if (id === "" || password === "") {
      alert("Username and password cannot be empty");
      rId.current.focus();
      return;
    }
    const url = "http://localhost:9000/admin/login"; // Use POST for more security
    axios
      .post(url, { id, password })
      .then((response) => {
        console.log(response.data);
        if (response.data === "Admin authenticated successfully.") {
          localStorage.setItem("token", response.data);
          nav("/admin/Home");
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((err) => {
        console.error(err); // Log the error for debugging
        alert("Error occurred during login");
      });
  };

  return (
    <>
      <Navbar />
      <div className={`signup-popup popup ${show ? "show" : ""}`}>
        <div className="popup-content admin-space">
          <div className="signup-col-1 admin-col">
            <div className="heading-signup">
              <h2 className="sign-admin">Admin Login</h2>
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
            <p className="para-signup">Fill the correct credentials</p>
            <form onSubmit={adminLogin}>
              <input
                className="input-field"
                type="text"
                placeholder="Enter your ID"
                value={id}
                onChange={hId}
                ref={rId}
              />
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={hPassword}
              />

              <input
                className="input-field submit-btn"
                type="submit"
                value="Login"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
