import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import "./ManageFlights.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageFlights() {
  const nav = useNavigate();
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "Admin authenticated successfully.") {
      alert("Access Denied");
      nav("/");
    } else {
      fetchFlightDetails();
    }
  }, [nav]); 

  const fetchFlightDetails = () => {
    let url = "http://localhost:9000/admin/getFlightDetails";
    axios
      .get(url)
      .then((res) => setFlightData(res.data))
      .catch((err) => alert("Issue: " + err));
  };

  const [flightNumber, setFlightNumber] = useState("");
  const [airline, setAirline] = useState("");
  const [departTime, setDepartTime] = useState("");
  const [source, setSource] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [destination, setDestination] = useState("");
  const [economySeatPrice, setESP] = useState("");
  const [businessSeatPrice, setBSP] = useState("");
  const [availableSeats, setAvailSeats] = useState("");

  const hFlightNo = (event) => {
    setFlightNumber(event.target.value);
  };
  const hAirline = (event) => {
    setAirline(event.target.value);
  };

  const [flightDuration, setFlightDuration] = useState("");

  const hDepartTime = (event) => {
    const { value } = event.target;
    setDepartTime(value);
    calculateFlightDuration(value, arrivalTime);
  };

  const hSource = (event) => {
    setSource(event.target.value);
  };

  const hArrivalTime = (event) => {
    const { value } = event.target;
    setArrivalTime(value);
    calculateFlightDuration(departTime, value);
  };

  const hDestination = (event) => {
    setDestination(event.target.value);
  };

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");


  const calculateFlightDuration = (departure, arrival) => {
    const departureTime = new Date(departure);
    const arrivalTime = new Date(arrival);

    if (!isNaN(departureTime) && !isNaN(arrivalTime)) {
      const duration = Math.abs(arrivalTime - departureTime) / (60 * 1000); // Difference in minutes
      const hours = Math.floor(duration / 60);
      const minutes = Math.floor(duration % 60);
      setHours(hours.toString());
      setMinutes(minutes.toString());
      setFlightDuration(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`
      );
    }
  };

  const hEconomySeatPrice = (event) => {
    setESP(event.target.value);
  };

  const hBusinessSeatPrice = (event) => {
    setBSP(event.target.value);
  };

  const hAvailableSeats = (event) => {
    setAvailSeats(event.target.value);
  };

  const airlines = ["Indigo", "Vistara", "Akasa", "Deccan", "SpiceJet"];
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let FlightDetail = {
      flightNumber,
      airline,
      departTime,
      source,
      arrivalTime,
      destination,
      flightDuration,
      economySeatPrice,
      businessSeatPrice,
      availableSeats,
    };
    try{
      const response = await axios.post('http://localhost:9000/admin/addFlight', FlightDetail)
      .then((res) => {
        alert("Flight details added successfully!");
        setFlightNumber("");
        setAirline("");
        setDepartTime("");
        setSource("");
        setArrivalTime("");
        setDestination("");
        setFlightDuration("");
        setESP("");
        setBSP("");
        setAvailSeats("");
        axios.get('http://localhost:9000/admin/getFlightDetails')
        .then((res) => {
          setFlightData(res.data);
        })
        .catch((err) => {
          console.log('Error fetching flight data:', err);
        });
      });
      // .catch((err) => alert("Issue: " + err));
      console.log('Server response:', response.data);
    }
    catch(error){
      console.error('Error:', error);
    }
  };

  const deleteFlight = (flightNumber) => {
    let url = "http://localhost:9000/admin/rmFlight";
    let d = { data: { flightNumber } };
    axios
      .delete(url, d)
      .then((res) => {
        alert(`Flight ${flightNumber} Deleted!`);
        // window.location.reload();
        axios.get('http://localhost:9000/admin/getFlightDetails')
        .then((res) => {
          setFlightData(res.data);
        })
        .catch((err) => {
          console.log('Error fetching flight data:', err);
        });
      })
      .catch((err) => alert("Issue: " + err));
  };

  return (
    <>
      <AdminNav />
      <div className="manage-flights-container">
        <h2>Manage Flights</h2>
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Airline Company</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Duration</th>
              <th>Economy Price</th>
              <th>Business Price</th>
              <th>Availabe Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flightData.map((flight) => (
              <tr key={flight.flightNumber}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.departTime}</td>
                <td>{flight.arrivalTime}</td>
                <td>{flight.source}</td>
                <td>{flight.destination}</td>
                <td>{flight.duration}</td>
                <td>{flight.economySeatPrice}</td>
                <td>{flight.businessSeatPrice}</td>
                <td>{flight.availableSeats}</td>
                <td>
                  <button
                    onClick={() => {
                      if (
                        window.confirm("Are you sure to delete the flight?")
                      )
                        deleteFlight(flight.flightNumber);
                    }}
                  >
                    Delete
                  </button>
                  <button>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <hr />
        <br />
        <br />
        {/* Add form to add new flights */}
        <div className="flight-form-container">
          <h2>Add New Flight</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Flight Number:
              <input
                type="text"
                name="flightNumber"
                value={flightNumber}
                onChange={hFlightNo}
              />
            </label>
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
              Departure Time:
              <input
                type="datetime-local"
                name="departure"
                value={departTime}
                onChange={hDepartTime}
                required
              />
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
              Arrival Time:
              <input
                type="datetime-local"
                name="arrival"
                value={arrivalTime}
                onChange={hArrivalTime}
                required
              />
            </label>
            <label>
              Flight Duration:
              <div className="duration-inputs">
                <input
                  type="text"
                  name="duration"
                  placeholder="Flight Duration"
                  value={flightDuration}
                  readOnly
                />
              </div>
            </label>
            <label>
              Availabe Seats:
              <input
                type="number"
                name="avaibleseats"
                value={availableSeats}
                onChange={hAvailableSeats}
              />
            </label>
            <label>
              Economy Class Price:
              <input
                type="number"
                name="ecoprice"
                value={economySeatPrice}
                onChange={hEconomySeatPrice}
              />
            </label>
            <label>
              Business Class Price:
              <input
                type="number"
                name="busiprice"
                value={businessSeatPrice}
                onChange={hBusinessSeatPrice}
              />
            </label>
            <button type="submit">Add Flight</button>
          </form>
        </div>
      </div>
    </>
  );
}
