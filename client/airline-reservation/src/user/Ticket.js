import "../styles/Ticket.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Ticket = () => {
  const location = useLocation();
  const { state } = location;
  const nav = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  const getBookingData = () => {
    if (state && state.bookingData) {
      setBookingData(state.bookingData);
    }
  };
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (!storedName) {
      alert("Please Sign in first");
      nav("/signup");
    } else {
      getBookingData();
    }
    // console.log(bookingData)
  }, [state, nav]);
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(
      dateTime
    );
    return formattedDate;
  };


  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const departTime = bookingData?.departTime ? new Date(bookingData.departTime) : null;
  const boardsTime = departTime ? new Date(departTime.getTime() - 30 * 60000) : null;
  return (
    <div className="container">
      <div className="ticket basic">
        <p>Admit One</p>
      </div>
      {bookingData ? (
        <div className="ticket airline">
          <div className="top">
            <h1>boarding pass</h1>
            <div className="big">
              <p className="from">{bookingData.source}</p>
              <p className="to">
                <i className="fas fa-arrow-right"></i> {bookingData.destination}
              </p>
            </div>
            <div className="top--side">
              <i className="fas fa-plane"></i>
              <p>{bookingData.airline}</p>
              <p>Airlines</p>
            </div>
          </div>
          <div className="bottom">
            <div className="column">
              <div className="row row-1">
                <p>
                  <span>Flight</span>
                  {bookingData.flightNumber}
                </p>
                <p className="row--right">
                  <span>Gate</span>B3
                </p>
              </div>
              <div className="row row-2">
                <p>
                <span>Boards</span> {boardsTime ? formatTime(boardsTime) : ''}
                </p>
                <p className="row--center">
                  <span>Departs</span>
                  {formatTime(bookingData.departTime)}
                </p>
                <p className="row--right">
                  <span>Arrives</span>
                  {formatTime(bookingData.arrivalTime)}
                </p>
              </div>
              <div className="row row-3">
                <p>
                  <span>Passenger</span>
                  {bookingData.name}
                </p>
                <p className="row--center">
                  <span>Seat</span>11E
                </p>
                <p className="row--right">
                  <span>Group</span>3
                </p>
              </div>
            </div>
            <div className="bar--code"></div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="info">
        <p>Thank you</p>
      </div>
      <button onClick={handlePrint}>Print Ticket</button>
    </div>
  );
};

export default Ticket;
