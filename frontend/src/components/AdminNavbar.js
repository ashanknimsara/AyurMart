import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../assets/styles/AdminNavbar.css';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <h1 className="nav-bar-title">Admin Dashboard</h1>
      <Link to="/admin" className="nav-bar-link">
        <FontAwesomeIcon icon={faUserCircle} className="nav-bar-link-icon" />
        Admin Home
      </Link>
    </nav>
  );
};

export default NavBar;
