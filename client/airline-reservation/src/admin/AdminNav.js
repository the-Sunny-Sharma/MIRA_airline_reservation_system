import { Link, useLocation } from "react-router-dom";
import "./AdminNav.css";
import { useNavigate } from "react-router-dom";

export default function AdminNav() {
  const location = useLocation();
  const nav = useNavigate();

  const adminLogout =  (event) => {
    event.preventDefault();
    let text = "Are you sure you want to logout?"

      // eslint-disable-next-line no-restricted-globals
    if(confirm(text) === true){
        localStorage.clear();
        nav("/");
    }
    else {
        return;
    }
  };
  
  return (
    <nav>
      <ul className="flex flex-wrap justify-center list-none">
        <li className="mr-6">
          <Link
            to="/admin/Home"
            className={
              location.pathname === "/admin/Home" ? "admin-a active" : "admin-a"
            }
          >
            Dashboard
          </Link>
        </li>
        <li className="mr-6">
          <Link
            to="/admin/manage-flights"
            className={
              location.pathname === "/admin/manage-flights"
                ? "admin-a active"
                : "admin-a"
            }
          >
            Manage Flights
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/admin/manage-bookings" className={
              location.pathname === "/admin/manage-bookings" ? "admin-a active" : "admin-a"
            }>
            Manage Bookings
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/admin/manage-users" className={
              location.pathname === "/admin/manage-users" ? "admin-a active" : "admin-a"
            }>
            Manage Users
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/admin/reports-analytics" className={
              location.pathname === "/admin/reports-analytics" ? "admin-a active" : "admin-a"
            }>
            Reports & Analytics
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/admin/settings" className={
              location.pathname === "/admin/settings" ? "admin-a active" : "admin-a"
            }>
            Settings
          </Link>
        </li>
        <li>
          <Link onClick = {adminLogout} className={
              location.pathname === "/admin/logout" ? "admin-a active" : "admin-a"
            }>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
