import { useState, useEffect } from "react";
import "./profile.css";
import logo from "../../../assets/images/log.png";
import plogo from "../../../assets/images/plogo.png";
import { Link } from "react-router-dom";
import MainNav from "../../MainNav";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the user's profile information from the server when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("http://localhost:5000/auth/Profile", {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
      } else {
        // Redirect the user to the login page if they are not logged in
        window.location.href = "/login";
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <><MainNav />
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="profile-header">
            <img src={plogo} alt="logo" className="profile-logo" />
            <div className="profile-header-text">
              <h1>{username}'s Profile</h1>
              <Link to="/edit-profile" className="profile-edit-link">Edit Profile</Link>
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-info-left">
              <h2>Username:</h2>
              <p>{username}</p>
              <h2>Email:</h2>
              <p>{email}</p>
            </div>
            <div className="profile-info-right">
              <img src={logo} alt="logo" className="profile-info-logo" />
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Profile;
