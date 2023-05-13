import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import AdminNavbar from '../AdminNavbar.js'

const AdminDashboard = () => {
  return (
    <>
    <AdminNavbar/>
    <div className="admin-home-container">
      <h1 className="admin-home-title">Welcome to the Admin Dashboard</h1>
      <p className="admin-home-instructions">Please select an option below:</p>
      <Link to="/viewSellers" className="admin-home-button">Seller Management</Link>
      <button className="admin-home-button">Product Management</button>
      {/* <button className="admin-home-button">Option 1</button>
      <button className="admin-home-button">Option 2</button> */}
    </div>
    </>
  );
};

export default AdminDashboard;
