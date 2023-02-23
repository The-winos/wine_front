import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authUser, loginUser } from "./API/index";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const { token, user, message } = await loginUser(username, password);
    const userCart = await authUser(token);
    console.log(user, token);

    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    setUsername("");
    setPassword("");
    setUser(user, userCart);

    if (token) {
      setLoggedIn(true);
      navigate("/");
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="login-line"
          type="text"
          name="username"
          placeholder="username *"
          required
          value={username}
          onChange={function (event) {
            setUsername(event.target.value);
          }}
        />
        <input
          className="login-line"
          type="password"
          name="password"
          placeholder="password *"
          required
          onChange={function (event) {
            setPassword(event.target.value);
          }}
        />
        <button className="buttons" type="submit">
          Login
        </button>
      </form>
      <br />
      <h3>Create Account</h3>
      <Link to="/register" className="link">
        Register
      </Link>
    </div>
  );
};

export default Login;
