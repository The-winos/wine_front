import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateUser } from "./API";

const AccountSettings = ({ user }) => {
  //replace states with useRef
  const [name, setName] = useRef(user.name);
  const [state, setState] = useRef(user.state);
  const [avatar, setAvatar] = useRef(user.avatar);
  const [email, setEmail] = useRef(user.email);
  const [birthday, setBirthday] = useRef(
    user.birthday ? new Date(user.birthday) : null
  );
  const [bio, setBio] = useRef(user.bio);
  const [password, setPassword] = useRef(user.password);
  const [newPassword, setNewPassword] = useRef("");
  const [passwordVisible, setPasswordVisible] = useRef(false);
  const [update, setUpdate] = useState(true);
  const [formattedBirthday, setFormattedBirthday] = useRef("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if birthday is selected
    const formattedBirthday = birthdayRef.current
      ? birthday.current.toISOString()
      : null;

    if (
      nameRef.current === user.name &&
      stateRef.current === user.state &&
      avatarRef.current === user.avatar &&
      emailRef.current === user.email &&
      bioRef.current === user.bio &&
      formattedBirthday === user.birthday &&
      bioRef.current === user.bio &&
      passwordRef.current === user.password
    ) {
      // no changes made, do not update user
      return;
    }

    try {
      const updateInfo = await updateUser(
        user.id,
        user.username,
        passwordRef.current,
        nameRef.current,
        stateRef.current,
        role,
        emailRef.current,
        bioRef.current,
        formattedBirthday,
        user.follower_count,
        user.following_count
      );
      // Rest of your code...
    } catch (error) {
      console.error(error);
      setUpdate(true);
    }
  };

  useEffect(() => {
    const parseDate = (dateString) => {
      if (!dateString) {
        return null;
      }
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
      return date;
    };

    const parsedBirthday = parseDate(birthday.current);
    const formattedDate = parsedBirthday
      ? parsedBirthday.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "";
    setFormattedBirthday(formattedDate);
  }, []);

  return (
    <div className="container">
      <div>
        <img
          src={`/images/${user.avatar}`}
          alt="avatar image"
          className="img-fluid"
          style={{
            height: "300px",
            width: "300px",
            objectFit: "contain",
            objectPosition: "center center",
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="account-admin-form">
        {update ? (
          <>
            <h3>{user.name}</h3>
            <h6>Update Name</h6>
            <input
              placeholder="Enter name"
              className="first-name"
              type="text"
              value={name.current}
              onChange={(event) => {
                setName(name.current);
              }}
            />
            <div></div>
            <h6>Update Birthday</h6>
            <DatePicker
              selected={birthday}
              onChange={(date) => setBirthday(date)}
              placeholderText="Select a date"
              dateFormat="MM/dd/yyyy"
              isClearable
            />

            <h6 id="text-fields">Update Password:</h6>
            <div className="col-md-11">
              <div className="form-group">
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control col"
                    id="newPassword"
                    placeholder="Password"
                    value={password.current}
                    onChange={(event) => setNewPassword(password.current)}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      <i
                        className={`fa ${
                          passwordVisible ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <h6>Location: {user.state}</h6>
            <select
              placeholder="location"
              className="location"
              type="text"
              value={state.current}
              onChange={(event) => {
                setState(event.target.value);
              }}
            >
              <option value=""> </option>
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
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="mt-3"></div>
                <h6 className="row justify-content-center">My Bio:</h6>
                <textarea
                  placeholder="bio"
                  className="form-control border-0 p-0"
                  style={{
                    height: "auto",
                    resize: "none",
                    overflow: "hidden",
                    background: "transparent",
                  }}
                  onChange={(event) => {
                    setBio(bio.current);
                  }}
                  value={bio}
                />
              </div>
            </div>
            <div className="mt-3"></div>
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={handleSubmit}
            >
              Save Changes
            </button>
          </>
        ) : null}
      </form>

      <Link to={"/profile"}>
        <div className="mt-3"></div>
        <button id="admin-cancel-edit" onClick={() => {}}>
          Back to Profile
        </button>
      </Link>
    </div>
  );
};
export default AccountSettings;
