import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/Book.css";
import axios from "axios";

export default function Book() {
  const nav = useNavigate();
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (!storedName) {
      alert("Please Sign in first");
      nav("/signup");
    }
  });

  const [airline, setAirline] = useState("");
  const hAirline = (event) => {
    setAirline(event.target.value);
  };

  const [source, setSource] = useState("");
  const hSource = (event) => {
    setSource(event.target.value);
  };

  const [destination, setDestination] = useState("");
  const hDestination = (event) => {
    setDestination(event.target.value);
  };

  const [departDate, setDepartDate] = useState("");
  const hDepartDate = (event) => {
    setDepartDate(event.target.value);
  };

  const [flightClassValue, setFlightClassValue] = useState("");
  const hFlightClassValue = (event) => {
    setFlightClassValue(event.target.value);
  };

  const [adultCount, setAdultCount] = useState("");
  const hAdultCount = (event) => {
    setAdultCount(event.target.value);
  };

  const [childCount, setChildCount] = useState("");
  const hChildCount = (event) => {
    setChildCount(event.target.value);
  };

  const airlines = ["All", "Indigo", "Vistara", "Akasa", "Deccan", "SpiceJet"];
  const flightClass = ["Economy", "Business"];
  const locations = [
    "AMD",
    "BBI",
    "BLR",
    "BOM",
    "CCU",
    "CJB",
    "COK",
    "DEL",
    "GAU",
    "GOI",
    "HYD",
    "IXC",
    "IXM",
    "JAI",
    "MAA",
    "PNQ",
    "RAJ",
    "TRV",
    "VTZ",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      airline,
      source,
      destination,
      departDate,
      flightClassValue,
      adultCount,
      childCount
    );
    localStorage.setItem("adult", adultCount);
    localStorage.setItem("child", childCount);
    axios
      .get(
        // `http://localhost:9000/admin/getTicket?airline=${airline}&source=${source}&destination=${destination}&departDate=${departDate}&flightClassValue=${flightClassValue}&adultCount=${adultCount}&childCount=${childCount}`
        `http://localhost:9000/admin/getTicket?airline=${airline}&source=${source}&destination=${destination}&departDate=${departDate}`
      )
      .then((response) => {
        console.log(response.data);
        nav("/flights", { state: { flightsData: response.data } }); // Use navigate to move to the flights page with data
      })
      .catch((error) => {
        console.error("Error fetching matching results:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="booking-container">
        <h2 className="book-head">Book Your Flight</h2>
        <form onSubmit={handleSubmit} className="book-form">
          <label>
            Airline Company:
            <select name="airline" value={airline} onChange={hAirline}>
              <option value="">Select an airline</option>
              {airlines.map((airline, index) => (
                <option key={index} value={airline}>
                  {airline}
                </option>
              ))}
            </select>
          </label>
          <label>
            Source:
            <select name="source" value={source} onChange={hSource}>
              <option value="">Select the Source</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </label>
          <label>
            Destination:
            <select
              name="destination"
              value={destination}
              onChange={hDestination}
            >
              <option value="">Select the Destination</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </label>
          <label>
            Departuring Date:
            <input
              type="date"
              name="departDate"
              value={departDate}
              onChange={hDepartDate}
              required
            />
          </label>
          <label>
            Class :
            <select
              name="flightClass"
              value={flightClassValue}
              onChange={hFlightClassValue}
            >
              <option value="">Select a class</option>
              {flightClass.map((flightClassU, index) => (
                <option key={index} value={flightClassU}>
                  {flightClassU}
                </option>
              ))}
            </select>
          </label>
          <label>
            Adult
            <input
              type="number"
              name="adultCount"
              value={adultCount}
              onChange={hAdultCount}
            />
          </label>
          <label>
            Child
            <input
              type="number"
              name="childCount"
              value={childCount}
              onChange={hChildCount}
            />
          </label>

          <button type="submit">Search Flight</button>
        </form>
      </div>
    </>
  );
}
