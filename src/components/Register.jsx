import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./API/index";
import OptionsStates from "./OptionsStates";
import PasswordChecklist from "./PasswordChecklist";
import ProfaneWords from "./ProfaneWords"
import { ToastContainer, toast } from "react-toastify";

const Register = ({ user = null, setLoggedIn = () => {} }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);

  const isValidBirthday = (birthday) => {
    // Check if the birthday matches the "DD-MM-YYYY" format
    const datePattern = /^\d{2}[/-]\d{2}[/-]\d{4}$/;
    if (!datePattern.test(birthday)) {
      return false; // Invalid format
    }

    // Extract day, month, and year from the input string
    const [day, month, year] = birthday.split("/").map(Number);

    // Create a Date object from the input
    const userBirthday = new Date(year, month - 1, day); // Note: Months are 0-indexed in JavaScript (0 = January, 1 = February, ...)
    const currentDate = new Date();

    // Check if the user is at least 21 years old
    const ageInMilliseconds = currentDate - userBirthday;
    const yearsInMilliseconds = 1000 * 60 * 60 * 24 * 365.25; // Approximate number of milliseconds in a year
    const ageInYears = ageInMilliseconds / yearsInMilliseconds;

    return ageInYears >= 21;
  };

  const checkPasswordRequirements = (password) => {
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasDigit(/\d/.test(password));
    setIsLengthValid(password.length >= 8);
  };

  async function handleRegister(event) {
    event.preventDefault();
    const profaneWords = ProfaneWords;

    if (password !== confirmPasswordValue) {
      if (setError) {
        setError("Passwords do not match");
      }
      return;
    }

    if (!isLengthValid || !hasUpperCase || !hasLowerCase || !hasDigit) {
      if (setError) {
        setError("Password does not meet requirements.");
      }
      return;
    }

    const formattedBirthday = (() => {
      const [month, day, year] = birthday.split(/[-/]/);
      return `${year}-${month}-${day}`;
    })();

    if (!isValidBirthday(birthday)) {
      setError("Invalid birthday format or age.");
      console.log(formattedBirthday, "formbday")
      return;
    }

    const formattedCurrentDate = (() => {
      const date = new Date(); // Replace this with your date object

      // Get the year, month, and day from the date
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
      const day = String(date.getDate()).padStart(2, "0");

      // Format the date as "YYYY-MM-DD"
      return `${year}-${month}-${day}`;


    })();



    try {
      const containsProfaneWords = profaneWords.some((word) => {
        return (
          username.toLowerCase().includes(word) ||
          name.toLowerCase().includes(word) ||
          email.toLowerCase().includes(word)
        );
      });

      if (containsProfaneWords) {
        toast.error(
          "Your name, username and email cannot have inappropriate language. Please update to remove. "
        );
        return;
      }
      const response = await registerUser(
        username,
        password,
        name,
        state,
        "character_1.png",
        "user",
        email,
        "",
        formattedBirthday,
        0,
        0,
        formattedCurrentDate
      );



      if (response.error) {
        setError(response.message);
      } else {
        localStorage.setItem("token", response.token);
        setToken(response.token);
        navigate("/login");
      }
    } catch (error) {
      console.error("error in handleRegister", error);
    }
  }

  return (
    <div className="register-container mt-1 pb-5">
      <div className="bg-light">
        <div className="container">
          <div className="row">
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
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name (all lowercase)"
                    required
                    value={name}
                    onChange={function (event) {
                      setName(event.target.value.toLowerCase());
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
                    onChange={(event) => {
                      setPassword(event.target.value);
                      checkPasswordRequirements(event.target.value);
                    }}
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
                <PasswordChecklist
                  hasUpperCase={hasUpperCase}
                  hasLowerCase={hasLowerCase}
                  hasDigit={hasDigit}
                  isLengthValid={isLengthValid}
                />
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
                    placeholder="MM/DD/YYYY"
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
                  <select
                    className="form-select"
                    id="state-select"
                    onChange={function (event) {
                      setState(event.target.value);
                    }}
                  >
                    <OptionsStates />
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
              {error && (
              <div className="alert alert-danger custom-alert" role="alert">
                {error}
              </div>
            )}
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

          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
