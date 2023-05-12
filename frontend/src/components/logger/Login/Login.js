import { useState } from "react";
import "./login.css";
import logo from "../../../assets/images/log.png";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../alert/Alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      // response.json().then((userInfo) => {
      // setUserInfo(userInfo);
      setRedirect(true);
      // }
    } else {
      Alert("fail", "OOPS! Try again");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="login__container">
      <div className="login__left">
        <div className="login__left__container">
          <h1 className="login__title">login</h1>
          <form action="" onSubmit={login}>
            <div className="log__conditions">
              <label className="login__label">username</label>
              <input
                type="input"
                placeholder="Jhon smith"
                className="login__input__combiner"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
              />
            </div>
            <div className="log__conditions">
              <label className="login__label">Password</label>
              <input
                type="password"
                placeholder="*****"
                className="login__input__combiner"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            <button className="log__btn">login</button>
          </form>
          <span className="log__span">
            Have not an Account?
            <Link to="/signup">
              <span
                style={{
                  color: "#0C6E68",
                  padding: "0px 2px",
                  cursor: "pointer",
                }}
              >
                Sign Up
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
