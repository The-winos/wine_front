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

              <form action="#">
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
                </div>
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

                <div class="input-group mb-3">
                  <label class="input-group-text" for="inputGroupSelect01">
                    Date of Birth
                  </label>
                  <select class="form-select" id="inputGroupSelect01">
                    <option selected>Choose...</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>{" "}
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
