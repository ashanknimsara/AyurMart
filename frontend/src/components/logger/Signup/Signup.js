import { useState } from "react";
import "./signup.css";
import logo from "../../../assets/images/log.png";
import { Link } from "react-router-dom";
import Alert from "../../alert/Alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:5000/auth/sign/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      Alert("success", "Registration is successful!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500); 
    } else {
      Alert("fail", "Registration failed.");
    }
  }

  return (
    <div className="login__container">
      <div className="login__left">
        <div className="login__left__container">
          <h1 className="login__title">sign up</h1>
          <form action="" onSubmit={register}>
            <div className="log__conditions">
              <label className="login__label">Username</label>
              <input
                type="text"
                placeholder="Jhon"
                className="login__input__combiner"
                required
                value={username}
                onChange={(ev) => {
                  setUsername(ev.target.value);
                }}
              />
            </div>
            <div className="log__conditions">
              <label className="login__label">Email</label>
              <input
                type="email"
                placeholder="Example@gmail.com"
                className="login__input__combiner"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className="log__conditions">
              <label className="login__label">Password</label>
              <input
                type="password"
                placeholder="*****"
                className="login__input__combiner"
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            <div className="log__conditions">
              <label className="login__label">Confirm Password</label>
              <input
                type="password"
                placeholder="*****"
                className="login__input__combiner"
              />
            </div>
            <button className="log__btn">sign up</button>
          </form>
          <span className="log__span">
            Already have an account?
            <Link to="/login">
              <span
                style={{
                  color: "#0C6E68",
                  padding: "0px 2px",
                  cursor: "pointer",
                }}
              >
                Login
              </span>
            </Link>
          </span>
        </div>
      </div>
      <div className="login__right">
        <div className="login__right__container">
          <div className="log__imager">
            <img src={logo} alt="log__image" className="log__img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
