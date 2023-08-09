import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./API/index";
import OptionsStates from "./OptionsStates";

const Register = ({ user = null, setLoggedIn = () => {} }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();

    if (password !== confirmPasswordValue) {
      setError("Passwords do not match");
      return;
    }

    const response = await registerUser(
      username,
      password,
      state,
      "character_1.png",
      "user",
      email,
      null,
      birthday,
      0,
      0,
      new Date(),
    );


    if (response.error) {
      setError(response.message);
    } else {
      localStorage.setItem("token", response.token);
      setToken(response.token);
      navigate("/login");
    }
  }

  return (
    <div className="register-container">
      <div className="bg-light">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4 bg-white m-auto">
              <h3 className="text-center pt-3">Sign up</h3>
              <div>
                <span className="text-center text muted lead">
                  It's free and only takes a minute.{" "}
                  <div>Discover your community of wine lovers! &#127863;</div>
                </span>
              </div>

              <form action="#" onSubmit={handleRegister}>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username (all lowercase)"
                    required
                    value={username}
                    onChange={function (event) {
                      setUsername(event.target.value.toLowerCase());
                    }}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={function (event) {
                      setEmail(event.target.value);
                    }}
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
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    required
                    value={confirmPasswordValue}
                    onChange={(event) => {
                      setConfirmPasswordValue(event.target.value);
                      setError("");
                    }}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    <i
                      className={`fa ${
                        confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-calendar"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="DD-MM-YYYY"
                    required
                    value={birthday}
                    onChange={function (event) {
                      setBirthday(event.target.value);
                    }}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-map-marker"></i>
                  </span>
                  <select className="form-select" id="state-select">
                   <OptionsStates/>
                  </select>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onSubmit={handleRegister}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-8 col-md-6 col-lg-4">
            <div>
              <h3 className="row justify-content-center">
                Already have an account?
              </h3>
              <span>
                {" "}
                <a href="/login" className="link row justify-content-center">
                  Login
                </a>
              </span>
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
