import IndigoLogo from '../assets/indigo.png';
import VistaraLogo from '../assets/vistara.png';
import SpiceJetLogo from '../assets/spicejet.png';
import AkasaLogo from '../assets/akasa.png';
import AirDeccanLogo from '../assets/air-deccan.png';
import { useNavigate } from 'react-router-dom';

export default function FlightRow({ flight }) {
  const navigate = useNavigate();
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

  const formatDuration = (durationString) => {
    const [hours, minutes] = durationString.split(':');
    const formattedDuration =
      `${parseInt(hours, 10)} hr ${parseInt(minutes, 10)} min`;
    return formattedDuration;
  };
  const getAirlineLogo = (airline) => {
    switch (airline) {
        case 'Indigo':
          return IndigoLogo;
        case 'Vistara':
          return VistaraLogo;
        case 'SpiceJet':
          return SpiceJetLogo;
        case 'Akasa':
          return AkasaLogo;
        case 'AirDeccan':
          return AirDeccanLogo;
      // Add more cases for other airlines as needed
      default:
        return ''; // Default image if no matching airline is found
    }
  };

  const handleBook = (event) => {
    event.preventDefault();
    console.log(flight);
  

    navigate('/checkout'
    , { state: { flightsData: flight } }
    );
  }

  return (
    <div className="flight-card">
      <div className="airline-icon">
        <img
          // src="https://images.ixigo.com/img/common-resources/airline-new/6E.png"
          src={getAirlineLogo(flight.airline)}
          alt={`${flight.airline} Logo`}
          />
        <br />
        <p>{flight.airline}</p>
        <p className="flight-number">{flight.flightNumber}</p>
      </div>
      <div className="flight-info">
        <div className="departure-source spacing">
          <p>{flight.source}</p>
          <h3>{formatDate(flight.departTime)}</h3>
          <p>{formatTime(flight.departTime)}</p>
        </div>
        <div className="">
        <p>{formatDuration(flight.duration)}</p>
        <hr />
      </div>
        <div className="arrival-destination spacing">
          <p>{flight.destination}</p>
          <h3>{formatDate(flight.arrivalTime)}</h3>
          <p>{formatTime(flight.arrivalTime)}</p>
        </div>
        <div className="spacing price">
          <p className='price'>₹ {flight.economySeatPrice }</p>
        </div>
      </div>
      <div className="booking-options">
        <button className="book-button" onClick={handleBook}>Book Now</button>
      </div>
    </div>
  );
}
