import "../styles/Navbar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SigninOPT from "../SigninOPT";

export default function Navbar() {
  const [showSignInOPT, setShowSignInOPT] = useState(false);
  let [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  
  const handleLogout = (event) => {
    event.preventDefault();
    let text = "Are you sure you want to logout?"

      // eslint-disable-next-line no-restricted-globals
    if(confirm(text) === true){
        localStorage.clear();
        window.location.reload();
    }
    else {
        return;
    }

    setShowDropdown(false); // Hide the dropdown when logging out
  };


  const toggleSignInOPT = () => {
    setShowSignInOPT(!showSignInOPT);
  };
  useEffect(() => {
    // Retrieve 'name' from localStorage and set it to the 'userName' state
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h2 className="logo-text">SYN</h2>
        </div>
        <div className="a-nav">
          <ul>
            <li>
              <Link to="/" className="nav-option nav-opt-active">
                Get Fare
              </Link>
            </li>
            <li>
              <Link
                to="/flight-booking"
                className="nav-option nav-opt-inactive"
              >
                Book Flight
              </Link>
            </li>
            {/* if user is not logged in */}
            {userName && (
          <li className="nav-option nav-user-btn" onClick={() => {
            setShowDropdown(!showDropdown);
            if (showDropdown) {
              setTimeout(() => {
                setShowDropdown(false);
              }, 2000); // Hide dropdown after 2 seconds
            }
          }}>
            Welcome, {userName}
            {showDropdown && (
            <ul className={`dropdown ${showDropdown ? 'active' : ''}`}>
                <li >Change Password</li>
                <hr />
                <li  onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </li>
        )}
         
            {!userName && (
              <li>
                <Link
                  className="nav-option nav-opt-inactive"
                  onClick={toggleSignInOPT}
                >
                  Sign In
                </Link>
              </li>
            )}
            {!userName && (
              <li>
                <Link to="/signup" className="nav-sign-up-btn">
                  Sign up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {showSignInOPT && (
        <SigninOPT show={showSignInOPT} onClose={toggleSignInOPT} />
      )}
    </>
  );
}
