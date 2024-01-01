import React, { useState, useEffect } from "react";
import "../styles/Checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const { state } = location;
  const [flightsData, setFlightsData] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (!storedName) {
      alert("Please Sign in first");
      nav("/signup");
    } else {
      getFlightData();
    }
  });
  const getFlightData = () => {
    if (state && state.flightsData) {
      setFlightsData(state.flightsData);
    }
  };

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const hardcodedCardDetails = {
    number: "1234567856781234",
    name: "Sunny Sharma",
    expiry: "12/25",
    cvv: "123",
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

  const handlePaymentVerification = (e) => {
    e.preventDefault();
    if (
      cardNumber === hardcodedCardDetails.number &&
      cardName === hardcodedCardDetails.name &&
      cardExpiry === hardcodedCardDetails.expiry &&
      cardCVV === hardcodedCardDetails.cvv
    ) {
      const currentDatex = new Date(); // Get the current date and time
      const curretDateString = currentDatex.toLocaleString();
      const email = localStorage.getItem("email");
      // Simulate successful payment verification
      axios
        .get(`http://localhost:9000/getUserInfo?email=${email}`)
        .then((response) => {
          // console.log(response.data);
          const bookingData = {
            name: response.data.name,
            email: response.data.email,
            mobile: response.data.mobile,
            flightNumber: flightsData.flightNumber,
            airline: flightsData.airline,
            source: flightsData.source,
            destination: flightsData.destination,
            arrivalTime: flightsData.arrivalTime,
            departTime: flightsData.departTime,
            payment: flightsData.economySeatPrice,
            currentDate: curretDateString,
          };
          // console.log(bookingData);
          let url = "http://localhost:9000/addBookingDetails";
          axios
            .post(url, bookingData)
            .then((res) => {
              console.log("RESPONSE:" + res);
              alert("Payment verified! Thank you for your purchase.");
              nav("/ticket", { state: { bookingData: bookingData } });
            })
            .catch((err) => {
              console.log("Issue : " + err);
            });
        })
        .catch((error) => {
          alert(
            "Error fetching your personal details \ntry logging in and try again."
          );
          console.log(error);
        });
    } else {
      setErrorMessage("Invalid card details. Please check and try again.");
    }
  };

  return (
    <div className="checkout-main-wrapper">
      {flightsData && (
        <div className="flight-details">
          <p className="pay-sum descp">Payment Summary</p>
          <p className="iata-code">{flightsData.source}</p>
          <p className="timing">
            {formatDate(flightsData.departTime)}{" "}
            <span className="at-small">AT</span>{" "}
            <span>{formatTime(flightsData.departTime)}</span>
          </p>
          <p className="iata-code">{flightsData.destination}</p>
          <p className="timing">
            {formatDate(flightsData.arrivalTime)}{" "}
            <span className="at-small">AT</span>{" "}
            <span>{formatTime(flightsData.arrivalTime)}</span>
          </p>
          <div className="price-tag">
            <p className="pay-sum descp">Total Price</p>
            <p className="money">Rs. {flightsData.economySeatPrice}</p>
            <p className="descp">Price include taxes and all airline costs</p>
          </div>
        </div>
      )}
      <div className="checkout-detail">
        <h3 className="check-head">SYN Checkout</h3>
        <p className="pay-sum descp">Payment Method</p>
        <form
          onSubmit={handlePaymentVerification}
          style={{ width: "300px", margin: "auto" }}
        >
          <label className="check-label">
            Card Number :
            <input
              className="check-input"
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              style={{ margin: "5px", padding: "8px" }}
            />
          </label>
          <br />
          <label className="check-label">
            Cardholder Name :
            <input
              className="check-input"
              type="text"
              placeholder="Cardholder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              style={{ margin: "5px", padding: "8px" }}
            />
          </label>
          <br />
          <label className="check-label">
            Expiry Date :
            <input
              className="check-input"
              type="text"
              placeholder="Expiry (MM/YY)"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              style={{ margin: "5px", padding: "8px" }}
            />
          </label>
          <br />
          <label className="check-label">
            CVV :
            <input
              className="check-input"
              type="text"
              placeholder="CVV"
              value={cardCVV}
              onChange={(e) => setCardCVV(e.target.value)}
              style={{ margin: "5px", padding: "8px" }}
            />
          </label>
          <br />
          <button
            className="pay-btn pay-div"
            type="submit"
            style={{
              color: "white",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </form>
        {errorMessage && (
          <p className="errmsg" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
