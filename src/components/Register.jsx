import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./API/index";

const Register = ({ user, setLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [year_born, setYear_born] = useState("");
  const [error, setError] = useState({});
  const [token, setToken] = useState({});

  async function handleRegister(event) {
    event.preventDefault();
    const token = await registerUser(
      username,
      password,
      name,
      state,
      "user",
      email,
      year_born,
      0,
      0
    );
    console.log(token, "Hello");
    setToken(token);
    if (token.error) {
      const message = token.message;
      setError(message);
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
      navigate("/profile");
    }
  }

  return (
    <div className="register-container">
      <div className="bg-light">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4 bg-white m-auto">
              <h3 className="text-center pt-3">Sign up</h3>
              <p className="text-center text muted lead">
                It's free and only takes a minute. Discover your community of
                wine lovers!
              </p>
              {/* <form action="#">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  ></input>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                    ></input>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Password"
                    ></input>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa fa-lock"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Confirm Password"
                      ></input>
                    </div>
                    <div className="d-grid">
                      <button type="button" className="btn btn-success">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleRegister}>
        <input
          className="register-line"
          type="text"
          name="username"
          placeholder="username *"
          required
          value={username}
          onChange={function (event) {
            setUsername(event.target.value);
          }}
        />
        <br />
        <input
          className="register-line"
          type="text"
          name="name"
          placeholder="name *"
          required
          value={name}
          onChange={function (event) {
            setName(event.target.value);
          }}
        />
        <br />
        <input
          className="register-line"
          type="text"
          name="email"
          placeholder="email *"
          required
          value={email}
          onChange={function (event) {
            setEmail(event.target.value);
          }}
        />
        <br />
        <input
          className="register-line"
          type="text"
          name="year born"
          placeholder="year born *"
          required
          value={year_born}
          onChange={function (event) {
            setYear_born(event.target.value);
          }}
        />
        <br />
        <input
          className="register-line"
          type="text"
          name="state"
          placeholder="state *"
          required
          value={state}
          onChange={function (event) {
            setState(event.target.value);
          }}
        />
        <br />
        <input
          className="register-line"
          type="password"
          name="password"
          placeholder="password *"
          required
          value={password}
          onChange={function (event) {
            setPassword(event.target.value);
          }}
        />

        <button className="buttons" type="submit">
          Register
        </button>
      </form>
      <br />
      <h3>Already have an account?</h3>
      <Link to="/login" className="link">
        Login
      </Link>
      {token.error ? (
        <div>
          <h4>{`${token.message}`}</h4>
        </div>
      ) : null}
    </div>
  );
};

export default Register;
