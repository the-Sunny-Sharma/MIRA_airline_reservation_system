import AdminNav from "./AdminNav";
import "./ManageFlights.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageUsers() {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "Admin authenticated successfully.") {
      alert("Access Denied");
      nav("/");
    } else {
      fetchUserDetails();
    }
  }, [nav]);

  const fetchUserDetails = () => {
    let url = "http://localhost:9000/admin/getUserDetails";
    axios
      .get(url)
      .then((res) => setUsers(res.data))
      .catch((err) => alert("Issue: " + err));
  };

  const deleteUser = (email) => {
    let url = "http://localhost:9000/admin/rmUserDetails";
    let d = { data: { email } };
    axios
      .delete(url, d)
      .then((res) => {
        alert(`User ${email} Removed!`);
        // window.location.reload();
        axios
          .get("http://localhost:9000/admin/getUserDetails")
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => {
            console.log("Error fetching User data:", err);
          });
      })
      .catch((err) => alert("Error deleting user : " + err));
  };

  return (
    <>
      <AdminNav />
      <div className="manage-flights-container">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.country}</td>
                <td>{user.state}</td>
                <td>{user.city}</td>
                <td>{user.email}</td>
                <td>{user.mobil}</td>
                <td>{user.address}</td>
                <td><button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm("Are you sure to delete this User?"))
                    deleteUser(user.email);
                }}
              >
                Delete
              </button></td>
                </tr>))}
            </tbody>
          </table>
      </div>
    </>
  );
}
