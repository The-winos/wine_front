import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TextareaAutosize from "react-textarea-autosize";
// import "react-textarea-autosize/dist/react-textarea-autosize.css";

import { updateUser } from "./API";

import OptionsStates from "./OptionsStates";

const AccountSettings = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [state, setState] = useState(user.state);
  const [avatar, setAvatar] = useState(user.avatar);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(
    user.birthday ? new Date(user.birthday) : null
  );
  const [bio, setBio] = useState(user.bio);
  const [password, setPassword] = useState(user.password);
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [update, setUpdate] = useState(true);
  const [formattedBirthday, setFormattedBirthday] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if birthday is selected
    const formattedBirthday = birthday ? birthday.toISOString() : null;
    if (
      name === user.name &&
      state === user.state &&
      avatar === user.avatar &&
      email === user.email &&
      bio === user.bio &&
      formattedBirthday === user.birthday &&
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
        role,
        email,
        bio,
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
    const parsedBirthday = parseDate(birthday);
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
              value={name}
              onChange={(event) => {
                setName(event.target.value);
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
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
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
            <h6>State {user.state}</h6>
            <select
              placeholder="location"
              className="location"
              type="text"
              value={state}
              onChange={(event) => {
                setState(event.target.value);
              }}
            >
             <OptionsStates/>
            </select>
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="mt-3"></div>
                <h6 className="row justify-content-center">My Bio:</h6>
                <TextareaAutosize
                  placeholder="bio"
                  className="form-control border-0 p-0 form-control-lg textarea-bio"
                  minRows={3}
                  style={{ width: "100%" }}
                  onChange={(event) => {
                    setBio(event.target.value);
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
