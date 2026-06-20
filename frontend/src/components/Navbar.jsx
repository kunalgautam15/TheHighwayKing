import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg.jpg";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="The Highway King" />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu & Order</Link></li>
        <li><Link to="/party-booking">Party Booking</Link></li>
        <li><Link to="/table-booking">Table Booking</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;