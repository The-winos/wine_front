import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authUser, loginUser } from "./API";

const Login = ({ setUser, setLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const { token, user, message } = await loginUser(username, password);
    console.log(token, "this is token");
    const login = await authUser(token);
    console.log(user, token, "this is user and token");

    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    setUsername("");
    setPassword("");
    setUser(user, login);

    if (token) {
      setLoggedIn(true);
      navigate("/profile");
    } else {
      setErrorMessage(message);
      localStorage.removeItem("token");
      setLoggedIn(false);
    }
  }

  return (
    <div className="register-container">
      <div className="bg-light">
        <div className="register-container">
          <div className="row mt-15">
            <div className="col-lg-4 bg-white m-auto">
              <h3 className="text-center pt-3">Log in</h3>

              <form action="#" onSubmit={handleLogin}>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    <i
                      className={`fa ${
                        passwordVisible ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                <div className="text-center mb-3">
                  <button type="submit" className="btn btn-primary w-100">
                    Log in
                  </button>
                </div>

                <div className="text-center">
                  Don't have an account? <Link to="/register">Sign up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
