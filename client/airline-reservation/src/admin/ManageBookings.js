import AdminNav from "./AdminNav";
import "./ManageFlights.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageBookings() {
  const nav = useNavigate();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "Admin authenticated successfully.") {
      alert("Access Denied");
      nav("/");
    } else {
        fetchBookings();
      }
    }, [nav]);
    const fetchBookings = () => {
        let url = "http://localhost:9000/admin/getBookingDetails";
        axios
          .get(url)
          .then((res) => setBookings(res.data))
          .catch((err) => alert("Issue: " + err));
      };

      const deleteBooking = (flightNumber, email) => {
        let url = "http://localhost:9000/admin/deleteBooking";
        let d = { data: { flightNumber, email } };
        axios
          .delete(url, d)
          .then((res) => {
            alert(`Booking for ${flightNumber} by ${email} is been Cancelled!`);
            // window.location.reload();
            axios
              .get("http://localhost:9000/admin/getBookingDetails")
              .then((res) => {
                setBookings(res.data);
              })
              .catch((err) => {
                console.log("Error fetching Booking data:", err);
              });
          })
          .catch((err) => alert("Error occured while cancelling booking : " + err));
      };
  return (
    <>
      <AdminNav />
      <div className="manage-flights-container">
        <h2>Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Payment</th>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.email}>
                <td>{booking.date}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.mobile}</td>
                <td>{booking.source}</td>
                <td>{booking.destination}</td>
                <td>{booking.payment}</td>
                <td>{booking.flightNumber}</td>
                <td>{booking.airline}</td>
                <td>{booking.departTime}</td>
                <td>{booking.arrivalTime}</td> 
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm("Are you sure to cancel this booking?"))
                        deleteBooking(booking.flightNumber, booking.email);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
