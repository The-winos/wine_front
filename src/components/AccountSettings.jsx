import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { updateUser, updateUserPassword, getUserById } from "./API";

import OptionsStates from "./OptionsStates";

const AccountSettings = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [state, setState] = useState(user.state || "");
  const [avatar, setAvatar] = useState(user.avatar);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(
    user.birthday ? new Date(user.birthday) : null
  );
  const [bio, setBio] = useState(user.bio);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const parseDate = (dateString) => {
      if (!dateString) {
        return null;
      }
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
      return date;
    };
    const parsedBirthday = parseDate(user.birthday);
    setBirthday(parsedBirthday);
  }, [user.birthday, setBirthday]);

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const initialUser = await getUserById(user.id);
  //       setUsername(initialUser.username);
  //       setName(initialUser.name);
  //       setState(initialUser.state || "");
  //       setAvatar(initialUser.avatar);
  //       setEmail(initialUser.email);
  //       setBirthday(
  //         initialUser.birthday ? new Date(initialUser.birthday) : null
  //       );
  //       setBio(initialUser.bio);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchUser();
  // }, [user.id]); // Add user.id as a dependency

  const handleLocationChange = (selectedState) => {
    setState(selectedState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      username === user.username &&
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

    if (oldPassword !== "" && oldPassword !== user.password) {
      toast.error("Old password verification failed");
      return;
    }

    try {
      const hashedOldPassword = await updateUserPassword(user.id, oldPassword);
      await updateUser(user.id, {
        username: username || user.username,
        name: name || user.name,
        state: state || user.state,
        avatar: avatar || user.avatar,
        email: email || user.email,
        bio: bio || null,
        birthday: birthday || user.birthday,
        oldPassword: hashedOldPassword,
        newPassword: newPassword || null,
      });

      setUsername("");
      setOldPassword("");
      setNewPassword("");
      setName("");
      setState("");
      setAvatar("");
      setEmail("");
      setBio("");
      setBirthday("");
      setConfirmPassword("");
      toast.success("User updated");
    } catch (error) {
      console.error(error);
      toast.error("Error updating user. Please try again.");
    }
  };

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

      <form onSubmit={handleSubmit} className="accountSettings-form">
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
      <Link to={"/profile"}>
        <div className="mt-3"></div>
        <button id="admin-cancel-edit" onClick={handleSubmit}>
          Back to Profile
        </button>
      </Link>
    </div>
  );
};

export default AccountSettings;
