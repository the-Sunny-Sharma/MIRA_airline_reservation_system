import "./styles/Signin.css";
import React, { useState } from "react";
import Admin from "./assets/admin.png";
import User from "./assets/user.png";
import { Link } from "react-router-dom";
import Signin from "./user/Signin";
import AdminLog from "./admin/AdminLog";

export default function SigninOPT({ show, onClose }) {
  const [showSignInOPT, setShowSignInOPT] = useState(false);

  const toggleSignInOPT = () => {
    setShowSignInOPT(!showSignInOPT);
  };
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const toggleSignInPopup = () => {
    setShowSignInPopup(!showSignInPopup);
  };

  const [showAdminLog, setShowAdminLog] = useState(false);
  const toggleAdminLog = () => {
    setShowAdminLog(!showAdminLog);
  };

  return (
    <>
      <div className={`signup-popup popup ${show ? "show" : ""}`}>
        <div className="popup-content">
          <div className="signup-col-1">
            <div className="heading-signup">
              <h2 className="sign-tripma">Please select your role</h2>
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
          </div>
          <div className="parent-flex">
            <div className="user-left">
              <Link onClick={toggleSignInPopup}>
                <img src={User} width="300px" alt="" className="img-profile" />
                <p>USER</p>
              </Link>
            </div>
            <div className="admin-right">
              <Link onClick={toggleAdminLog}>
                <img src={Admin} width="200px" alt="" className="img-profile" />
                <p>ADMIN</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showSignInPopup && (
        <Signin show={showSignInPopup} onClose={toggleSignInPopup} />
      )}
      {showAdminLog && <AdminLog show={showAdminLog} onClose={toggleAdminLog} />}
    </>
  );
}
