import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "./API";

const AccountSettings = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [state, setState] = useState(user.state);
  const [avatar, setAvatar] = useState(user.avatar);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [bio, setBio] = useState(user.bio);
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [update, setUpdate] = useState(true);
  const [formattedBirthday, setFormattedBirthday] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      name === user.name &&
      state === user.state &&
      avatar === user.avatar &&
      email === user.email &&
      formattedBirthday === user.birthday && // Use formattedBirthday instead of birthday
      bio === user.bio &&
      password === user.password
    ) {
      // no changes made, do not update user
      return;
    }

    try {
      const updateInfo = await updateUser(
        user.id,
        user.username,
        password,
        name,
        state,
        user.role,
        email,
        formattedBirthday, // Use formattedBirthday instead of birthday
        user.follower_count,
        user.following_count
      );
      console.log(user, "this is user");
      console.log(updateInfo, "update user");
    } catch (error) {
      console.error(error);
      setUpdate(true);
    }
  }

  useEffect(() => {
    const parseDate = (dateString) => {
      if (!dateString) {
        return null;
      }
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
      return date;
    };

    const parsedBirthday = parseDate(birthday);
    const formattedDate = parsedBirthday
      ? parsedBirthday.toISOString().split("T")[0]
      : "";
    setFormattedBirthday(formattedDate);
  }, [birthday]);

  return (
    <div>
      <div>
        <img
          src={user.avatar}
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

      <form onSubmit={handleSubmit} className="admin-form">
        {update ? (
          <>
            <h6 id="text-fields">Name:</h6>
            <input
              placeholder={user.name}
              className="first-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <h6 id="text-fields">Birthday:</h6>
            <input
              placeholder={user.birthday}
              className="first-name"
              type="text"
              value={formattedBirthday}
              onChange={(event) => {
                setFormattedBirthday(event.target.value);
              }}
            />
            {console.log(user.birthday)}

            <h6 id="text-fields">Password:</h6>
            <input
              placeholder={user.token}
              className="first-name"
              type="text"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />
            <div className="container">
              <h6 id="text-fields">New Password:</h6>
              <div className="row mb-3">
                <div className="col-md-4">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                <div className="col-md-4">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary col-md-12"
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

            <h6 id="text-fields">Location:</h6>
            <div>{user.state}</div>
            <select
              placeholder="location"
              className="location"
              type="text"
              value={state}
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
            <div></div>
            <h6>My Bio:</h6>
            <textarea
              placeholder="bio"
              className="bio"
              type="text"
              onChange={(event) => {
                setBio(event.target.value);
              }}
              value={bio}
            />
            <div></div>
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
        <button id="admin-cancel-edit" onClick={() => {}}>
          Cancel Edit
        </button>
      </Link>
    </div>
  );
};
export default AccountSettings;
