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
  const [token, setToken] = useState("");

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
      navigate("/login");
    }
  }

  const form = document.querySelector(".bg-white");
  form.style.border = "3px solid #800020";

  form.style.borderRadius = "20px";
  form.style.boxShadow = "0 5px 10px rgba(0,0,0,0.2)";
  form.style.margin = "20px";
  form.style.padding = "20px";

  return (
    <div className="register-container">
      <div className="bg-light">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4 bg-white m-auto">
              <h3 className="text-center pt-3">Sign up</h3>
              <p className="text-center text muted lead">
                It's free and only takes a minute.{" "}
                <div>Discover your community of wine lovers! &#127863;</div>
              </p>

              <form action="#" onSubmit={handleRegister}>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    required
                    value={name}
                    onChange={function (event) {
                      setName(event.target.value);
                    }}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    required
                  />
                </div>
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
                    onChange={function (event) {
                      setUsername(event.target.value);
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
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={function (event) {
                      setPassword(event.target.value);
                    }}
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="togglePassword"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="toggleConfirmPassword"
                  >
                    <i class="fa fa-eye"></i>
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
                    value={year_born}
                    onChange={function (event) {
                      setYear_born(event.target.value);
                    }}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-map-marker"></i>
                  </span>
                  <select className="form-select" id="state-select">
                    <option value="">Select State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>

                <div className="d-grid">
                  <button type="button" className="btn btn-success">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
