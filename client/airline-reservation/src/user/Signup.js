import Navbar from "../components/Navbar";
import "../styles/Signup.css";
import { app } from "../components/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Signup() {
  const nav = useNavigate();
  useEffect(() => {
    let name = localStorage.getItem("name");
    console.log(localStorage.getItem("name"));

    if (name != null) nav("/");
  });

  const rName = useRef();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const hName = (event) => {
    setName(event.target.value);
  };
  const hAge = (event) => {
    setAge(event.target.value);
  };
  const hCountry = (event) => {
    setCountry(event.target.value);
  };
  const hState = (event) => {
    setState(event.target.value);
  };
  const hCity = (event) => {
    setCity(event.target.value);
  };
  const hEmail = (event) => {
    setEmail(event.target.value);
  };
  const hPassword = (event) => {
    setPassword(event.target.value);
  };
  const hMobile = (event) => {
    setMobile(event.target.value);
  };
  const hAddress = (event) => {
    setAddress(event.target.value);
  };

  const signup = (event) => {
    event.preventDefault();
    let data = {
      name,
      age,
      country,
      state,
      city,
      email,
      password,
      mobile,
      address,
    };
    let url = "http://localhost:9000/saveUserInfo";
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        axios
          .post(url, data)
          .then((res) => {
            alert("Account Created Successfully");
            setName("");
            setAge("");
            setCountry("");
            setState("");
            setCity("");
            setEmail("");
            setPassword("");
            setMobile("");
            setAddress("");
            nav("/");
          })
          .catch((err) => {
            alert("Issue : " + err);
          });
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <div className="main-content">
          <h2 className="signup-head">Sign up</h2>
          <form onSubmit={signup}>
            <input
              className="input-field"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={hName}
              ref={rName}
              required
            />
            <input
              className="input-field"
              type="number"
              placeholder="Age"
              value={age}
              onChange={hAge}
              required
            />
            <input
              className="input-field"
              type="text"
              placeholder="Country"
              value={country}
              onChange={hCountry}
              required
            />
            <input
              className="input-field"
              type="text"
              placeholder="State"
              value={state}
              onChange={hState}
              required
            />
            <input
              className="input-field"
              type="text"
              placeholder="City"
              value={city}
              onChange={hCity}
              required
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={email}
              onChange={hEmail}
              required
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={hPassword}
              required
            />
            <input
              className="input-field"
              type="number"
              placeholder="Mobile Number"
              value={mobile}
              onChange={hMobile}
              required
            />
            <textarea
              className="input-field"
              placeholder="Address:"
              value={address}
              onChange={hAddress}
            ></textarea>
            <input
              className="submit-btn signup"
              type="submit"
              value="Create Account"
            />
          </form>
        </div>
      </div>
    </>
  );
}
