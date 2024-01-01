import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetFare from './GetFare';
import Book from './user/Book';
import Signup from './user/Signup';
import AdminHome from './admin/AdminHome';
import ManageFlights from './admin/ManageFlights';
import ReportAnalytics from './admin/ReportsAnalytics';
import Settings from './admin/Settings';
import ManageBookings from './admin/ManageBookings';
import ManageUsers from './admin/ManageUsers';
import FlightList from './user/FlightList';
import Checkout from './user/Checkout';
import Ticket from './user/Ticket';

function App() {
  return (
    <>
    <BrowserRouter >
      <Routes>
        {/* Common Pages */}
        <Route exact path='/' element= {<GetFare />}/>
        {/* <Route path='/signin' element= {<Signin />}/> */}

        {/* User Pages */}
        <Route path='/flight-booking' element= {<Book />}/>
        <Route path='/signup' element= {<Signup />}/>
        <Route path='/flights' element={<FlightList />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/ticket' element={<Ticket />} />

        {/* Admin Pages */}
        <Route path='/admin/Home' element={<AdminHome />} />
        <Route path='/admin/manage-flights' element={<ManageFlights />} />
        <Route path='/admin/manage-bookings' element={<ManageBookings />} />
        <Route path='/admin/manage-users' element={<ManageUsers/>} />
        <Route path='/admin/reports-analytics' element={<ReportAnalytics />} />
        <Route path='/admin/settings' element={<Settings />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
