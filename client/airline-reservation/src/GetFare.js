import Navbar from "./components/Navbar";
import "./styles/GetFare.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GetFare() {
  const nav = useNavigate();
  const [inputType, setInputType] = useState("text");
  const [inputTypeRet, setInputTypeRet] = useState("text");
  const classPass = ["Economy", "Business"];

  const handleFocus = () => {
    setInputType("date");
  };
  const handleBlur = () => {
    setInputType("text");
  };
  const handleFocusRet = () => {
    setInputTypeRet("date");
  };
  const handleBlurRet = () => {
    setInputTypeRet("text");
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selected, setSelected] = useState(classPass[0]);

  const hDepartDate = (event) => {
    setDepartDate(event.target.value);
  };

  const hReturDate = (event) => {
    setReturnDate(event.target.value);
  };

  const [filteredOptions, setFilteredOptions] = useState([]);

  const options = [
    {
      name: "Indira Gandhi International Airport",
      shortcut: "DEL",
      location: "Delhi",
    },
    {
      name: "Chhatrapati Shivaji Maharaj International Airport",
      shortcut: "BOM",
      location: "Mumbai",
    },
    {
      name: "Kempegowda International Airport",
      shortcut: "BLR",
      location: "Bengaluru",
    },
    {
      name: "Rajiv Gandhi International Airport",
      shortcut: "HYD",
      location: "Hyderabad",
    },
    {
      name: "Chennai International Airport",
      shortcut: "MAA",
      location: "Chennai",
    },
    {
      name: "Netaji Subhas Chandra Bose International Airport",
      shortcut: "CCU",
      location: "Kolkata",
    },
    {
      name: "Cochin International Airport",
      shortcut: "COK",
      location: "Kochi",
    },
    { name: "Goa International Airport", shortcut: "GOI", location: "Goa" },
    {
      name: "Sardar Vallabhbhai Patel International Airport",
      shortcut: "AMD",
      location: "Ahmedabad",
    },
    { name: "Pune Airport", shortcut: "PNQ", location: "Pune" },
    {
      name: "Jaipur International Airport",
      shortcut: "JAI",
      location: "Jaipur",
    },
    {
      name: "Visakhapatnam International Airport",
      shortcut: "VTZ",
      location: "Visakhapatnam",
    },
    {
      name: "Trivandrum International Airport",
      shortcut: "TRV",
      location: "Thiruvananthapuram",
    },
    {
      name: "Guwahati International Airport",
      shortcut: "GAU",
      location: "Guwahati",
    },
    {
      name: "Biju Patnaik International Airport",
      shortcut: "BBI",
      location: "Bhubaneswar",
    },
    {
      name: "Coimbatore International Airport",
      shortcut: "CJB",
      location: "Coimbatore",
    },
    { name: "Rajkot Airport", shortcut: "RAJ", location: "Rajkot" },
    { name: "Madurai Airport", shortcut: "IXM", location: "Madurai" },
    { name: "Chandigarh Airport", shortcut: "IXC", location: "Chandigarh" },
  ];

  const handleSourceChange = (event) => {
    const inputValue = event.target.value;
    setSource(inputValue);
    const filtered = options.filter(
      (option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.shortcut.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleDestinationChange = (event) => {
    const inputValue = event.target.value;
    setDestination(inputValue);

    const filtered = options.filter(
      (option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.shortcut.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const getFarePrice = (event) => {
    event.preventDefault();

    // Check if the entered source and destination are in the list of options
    const isValidSource = options.some(
      (option) =>
        option.name.toLowerCase() === source.toLowerCase() ||
        option.shortcut.toLowerCase() === source.toLowerCase()
    );

    const isValidDestination = options.some(
      (option) =>
        option.name.toLowerCase() === destination.toLowerCase() ||
        option.shortcut.toLowerCase() === destination.toLowerCase()
    );

    if (!isValidSource || !isValidDestination) {
      alert(
        "Please enter a valid source and destination from the provided list."
      );
      return; // Prevent further execution if the input is invalid
    }
    console.log(source, destination, departDate, returnDate, selected);

    // Sending source data to the backend
    axios
      .get(
        `http://localhost:9000/getFare?source=${source}&destination=${destination}&departDate=${departDate}`
      )
      .then((response) => {
        console.log(response.data);
        setFilteredOptions(response.data); // Update the state with fetched data
        nav("/flights", { state: { flightsData: response.data } }); // Use navigate to move to the flights page with data
      })
      .catch((error) => {
        console.error("Error fetching matching results:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="wrapper ">
        <div className="world-map">
          <div className="center-div">
            <h2 className="home-slogan">Wings of Convenience:</h2>
            <h2 className="home-slogan">Book Flights Hassle-Free!</h2>
          </div>
          <div className="details-home">
            <form onSubmit={getFarePrice}>
                <input
                  type="text"
                  placeholder="From where?"
                  className="input-home input-text"
                  onChange={handleSourceChange}
                  value={source}
                  list="sourceList"
                  required
                />
                <datalist id="sourceList">
                  {filteredOptions.map((option, index) => (
                    <option key={index} value={option.shortcut}>
                      {option.name}
                    </option>
                  ))}
                </datalist>

                <input
                  type="text"
                  placeholder="Where to?"
                  className="input-home input-text"
                  onChange={handleDestinationChange}
                  value={destination}
                  list="destinationList"
                  required
                />
                <datalist id="destinationList">
                  {filteredOptions.map((option, index) => (
                    <option key={index} value={option.shortcut}>
                      {option.name}
                    </option>
                  ))}
                </datalist>

                <input
                  type={inputType}
                  placeholder="Depart"
                  className="input-home input-date"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={hDepartDate}
                  value={departDate}
                  min={today}
                  required
                />
                <input
                  type={inputTypeRet}
                  placeholder="Return"
                  className="input-home input-date"
                  onFocus={handleFocusRet}
                  onBlur={handleBlurRet}
                  onChange={hReturDate}
                  value={returnDate}
                  min={departDate}
                />
                <select
                  className="input-class input-home"
                  value={classPass}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  {classPass.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
              <input
                type="Submit"
                value="Get Fare"
                className="input-home input-submit"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
