import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewSellers.css";

const ViewSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      const response = await axios.get("http://localhost:5000/auth/sellers");
      setSellers(response.data);
    };
    fetchSellers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/auth/sellers/${id}`);
      console.log(response.data);
      setSellers(sellers.filter((seller) => seller._id !== id && seller.username.toLowerCase().includes(searchTerm.toLowerCase())));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredSellers = sellers.filter((seller) => seller.username.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="view-sellers-container">
      <h1>All Sellers</h1>
      <input type="text" className="search" placeholder="Search sellers..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
      <table className="seller-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSellers.map((seller) => (
            <tr key={seller._id}>
              <td>{seller.username}</td>
              <td>{seller.email}</td>
              <td>
                <button onClick={() => handleDelete(seller._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSellers;
