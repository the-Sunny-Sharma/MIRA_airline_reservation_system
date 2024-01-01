import AdminNav from "./AdminNav";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminHome.css";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token !== 'Admin authenticated successfully.')
    {
        alert("Access Denied")
        nav("/");}
  });


  const [dashboardData, setDashboardData] = useState({
    totalBookings: 1250,
    availableFlights: 87,
    revenue: 185000000,
    bookingTrends: [
      { month: "January", bookings: 150 },
      { month: "February", bookings: 180 },
      { month: "March", bookings: 210 },
      { month: "April", bookings: 190 },
      { month: "May", bookings: 230 },
      { month: "June", bookings: 200 },
      { month: "July", bookings: 220 },
      { month: "August", bookings: 250 },
      { month: "September", bookings: 270 },
      { month: "October", bookings: 260 },
      { month: "November", bookings: 240 },
      { month: "December", bookings: 230 },
    ],
    systemStatus: "Operational",
    upcomingFlights: [
      {
        flightNumber: "AI101",
        departure: "2023-12-30T10:00:00Z",
        destination: "Delhi",
        arrival: "2023-12-30T12:00:00Z",
        status: "On Time",
      },
      {
        flightNumber: "AI202",
        departure: "2023-12-31T12:00:00Z",
        destination: "Mumbai",
        arrival: "2023-12-31T14:00:00Z",
        status: "Delayed",
      },
      {
        flightNumber: "AI303",
        departure: "2024-01-05T08:30:00Z",
        destination: "Kolkata",
        arrival: "2024-01-05T10:30:00Z",
        status: "On Time",
      },
      {
        flightNumber: "AI404",
        departure: "2024-01-10T11:45:00Z",
        destination: "Bengaluru",
        arrival: "2024-01-10T13:45:00Z",
        status: "Delayed",
      },
      {
        flightNumber: "AI505",
        departure: "2024-01-15T09:15:00Z",
        destination: "Goa",
        arrival: "2024-01-15T11:15:00Z",
        status: "On Time",
      },
      {
        flightNumber: "AI606",
        departure: "2024-01-20T13:30:00Z",
        destination: "Chennai",
        arrival: "2024-01-20T15:30:00Z",
        status: "On Time",
      },
      {
        flightNumber: "AI707",
        departure: "2024-01-25T07:45:00Z",
        destination: "Hyderabad",
        arrival: "2024-01-25T09:45:00Z",
        status: "On Time",
      },
      {
        flightNumber: "AI808",
        departure: "2024-01-30T14:20:00Z",
        destination: "Ahmedabad",
        arrival: "2024-01-30T16:20:00Z",
        status: "Delayed",
      },
    ],
    notifications: [
      "Flight AI303 is delayed by 1 hour.",
      "New booking received for AI404.",
      "Special discount available on flights to Goa.",
      "Flight AI505 is canceled due to weather conditions.",
      "Reminder: Check-in opens 24 hours before departure.",
      "Upcoming system maintenance on January 5th.",
      "Last-minute seat sale for selected flights.",
    ],
  });

  useEffect(() => {
    axios
      .get("/api/dashboard") 
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <>
      <AdminNav />
      <div className="dashboard-container">
        {/* Summary Cards */}
        <div className="summary-cards">
          <div>Total Bookings: {dashboardData.totalBookings}</div>
          <div>Available Flights: {dashboardData.availableFlights}</div>
          <div>Revenue: ₹{dashboardData.revenue}</div>
        </div>

        {/* Charts/Graphs */}
        <div className="charts">
        </div>

        {/* System Status */}
        <div className="system-status">
          <p>System Status: {dashboardData.systemStatus}</p>
        </div>

        {/* Notification Panel */}
        <div className="notification-panel">
          <ul>
            <div className="notification-area">
              <div className="notification-marquee">
                {dashboardData.notifications.map((notification, index) => (
                  <span key={index} className="notification-message">
                    {notification}
                  </span>
                ))}
              </div>
            </div>
          </ul>
        </div>

        {/* Booking/Flight Schedule */}
        <div className="flight-schedule">
          <table>
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.upcomingFlights.map((flight, index) => (
                <tr key={index}>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.departure}</td>
                  <td>{flight.arrival}</td>
                  <td
                    className={
                      flight.status === "On Time" ? "on-time" : "delayed"
                    }
                  >
                    {flight.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
