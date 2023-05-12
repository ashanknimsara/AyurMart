import { useState, useEffect } from "react";
import "./editprofile.css";
import MainNav from "../../MainNav";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("http://localhost:5000/auth/profile", {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
      } else {
        window.location.href = "/login";
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/auth/profile", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.status === 200) {
      window.location.href = "/profile";
    }
  };

  const handleDelete = async () => {
    const response = await fetch("http://localhost:5000/auth/profile", {
      method: "DELETE",
      credentials: "include",
    });
    if (response.status === 200) {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <MainNav />
      <div className="edit-profile-container">
        <h1>Edit Profile</h1>
        <form className="edit-profile-form" onSubmit={handleUpdate}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Update Profile</button>
        </form>
        <button className="delete-button" onClick={handleDelete}>
          Delete Profile
        </button>
      </div>
    </>
  );
};

export default EditProfile;
