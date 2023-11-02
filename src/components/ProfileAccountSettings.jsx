import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { updateUser, updateUserPassword } from "./API";

import OptionsStates from "./OptionsStates";

const ProfileAccountSettings = ({
  user,
  setProfileOverview,
  setProfileReview,
  setProfileAccountSettings,
}) => {
  const [name, setName] = useState(user.name);
  const [state, setState] = useState(user.state);
  const [avatar, setAvatar] = useState(user.avatar);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(new Date(user.birthday));
  const [bio, setBio] = useState(user.bio);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleLocationChange = (selectedState) => {
    setState(selectedState);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      name === user.name &&
      state === user.state &&
      avatar === user.avatar &&
      email === user.email &&
      birthday === user.birthday &&
      bio === user.bio &&
      newPassword === ""
    ) {
      return;
    }
    // console.log("this is user", user);
    // name !== "" ? name : user.name,
    //   state !== "" ? state : user.state,
    //   email !== "" ? email : user.email,
    //   birthday !== "" ? birthday : user.birthday,
    //   bio !== "" ? bio : user.bio;

    try {
      if (newPassword !== "") {
        const isOldPasswordValid = await updateUserPassword(
          user.id,
          oldPassword,
          newPassword
        );

        if (!isOldPasswordValid) {
          toast.error("Old password verification failed");
          return;
        }
        const updateUserInfo = await updateUser(
          user.username,
          undefined,
          name,
          state,
          avatar,
          user.role,
          email,
          bio,
          birthday,
          user.follower_count,
          user.following_count,
          user.join_date
        );
      } else {
        console.log("This is name", name);
        const updateUserInfo = await updateUser(
          user.username,
          undefined,
          name,
          state,
          avatar,
          user.role,
          email,
          bio,
          birthday,
          user.follower_count,
          user.following_count,
          user.join_date
        );

        setName(name);
      }

      setConfirmPassword("");
      setFormSubmitted(true);
      toast.success("User updated");
    } catch (error) {
      console.error(error);
      toast.error("Error updating user. Please try again.");
    }
  }

  useEffect(() => {
    console.log("Updating bio in local storage:", bio);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        name,
        state,
        avatar,
        email,
        birthday,
        bio,
        newPassword,
      })
    );
  }, [name, state, avatar, email, birthday, bio, newPassword]);

  return (
    <div id="accountSettings">
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

        <form onSubmit={handleSubmit} className="accountSettings-form">
          <h3>{formSubmitted ? name : user.name}</h3>
          <h6>Update Name</h6>
          <div>
            <input
              placeholder="Enter name"
              className="first-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <h6>Update Email</h6>
          <div>
            {" "}
            <input
              placeholder="Enter Email"
              className="update-email"
              type="text"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <h6>Update Birthday</h6>
          <DatePicker
            selected={birthday}
            onChange={(date) => setBirthday(date)}
            placeholderText="Select a date"
            value={birthday}
            dateFormat="MM/dd/yyyy"
            isClearable="custom-datepicker"
          />
          <h6>Update Password:</h6>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="oldPassword">Old Password</label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    id="oldPassword"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? (
                        <i className="fa fa-eye-slash"></i>
                      ) : (
                        <i className="fa fa-eye"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    id="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <h6>Location: {user.state}</h6>
          <h6>Update location:</h6>
          <select
            placeholder="location"
            className="location"
            type="text"
            value={state}
            onChange={(event) => {
              setState(event.target.value);
            }}
          >
            <OptionsStates onChange={handleLocationChange} />
          </select>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="mt-3"></div>
              <h6 className="row justify-content-center">My Bio:</h6>
              <textarea
                placeholder="bio"
                className="form-control border-0 p-0 form-control-lg textarea-bio"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setBio(event.target.value);
                }}
                value={bio}
              />
            </div>
          </div>
          <div className="mt-3"></div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
        {/* </div> */}
        <div className="navigation-buttons">
          <Link to={"/profile"}>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setProfileAccountSettings(false);
                setProfileReview(false);
                setProfileOverview(true);
              }}
            >
              Close
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileAccountSettings;
