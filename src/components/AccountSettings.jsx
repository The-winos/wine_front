import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TextareaAutosize from "react-textarea-autosize";
// import "react-textarea-autosize/dist/react-textarea-autosize.css";

import { updateUser, updateUserPassword } from "./API";

import OptionsStates from "./OptionsStates";

const AccountSettings = ({ user }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState(user.name);
  const [state, setState] = useState(user.state);
  const [avatar, setAvatar] = useState(user.avatar);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(
    user.birthday ? new Date(user.birthday) : null
  );
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState(user.password);
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [update, setUpdate] = useState(true);
  const [formattedBirthday, setFormattedBirthday] = useState("");

  async function handleUserClick(userId) {
    setUpdateTheUser(true);
    const userToUpdate = await getUserById(userId);
    setUsername(userToUpdate.username);
    setName(userToUpdate.name);
    setBirthday(userToUpdate.birthday ? new Date(userToUpdate.birthday) : null);
    setRole(userToUpdate.role);
    setEmail(userToUpdate.email);
    setState(userToUpdate.state);
    if (userToUpdate.bio) {
      setBio(userToUpdate.bio);
    } else {
      setBio("");
    }
    setAvatar(userToUpdate.avatar);
    setUpdatingUser(userToUpdate);
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
      ? parsedBirthday.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "";
    setFormattedBirthday(formattedDate);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      username === updatingUser.username &&
      name === updatingUser.name &&
      state === updatingUser.state &&
      avatar === updatingUser.avatar &&
      email === updatingUser.email &&
      birthday === updatingUser.birthday &&
      bio === updatingUser.bio &&
      password === updatingUser.password
    ) {
      return;
    }

    try {
      setUpdatingUser({
        ...updatingUser,
        username: username !== "" ? username : updatingUser.username,
        name: name !== "" ? name : updatingUser.name,
        state: state !== "" ? states : updatingUser.state,
        role: role !== "" ? role : updatingUser.role,
        email: email !== "" ? email : updatingUser.email,
        bio: bio !== "" ? bio : updatingUser.bio || null,
        birthday:
          formattedBirthday !== "" ? formattedBirthday : updatingUser.birthday,
      });

      // Password update logic
      if (password != "") {
        try {
          const hashedPassword = await updateUserPassword(
            updatingUser.id,
            password
          );
          const updateInfo = await updateUser(
            user.id,
            username,
            hashedPassword,
            name,
            states,
            avatar,
            role,
            email,
            bio,
            birthday,
            updatingUser.follower_count,
            updatingUser.following_count
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        const updateInfo = await updateUser(
          user.id,
          username,
          password,
          name,
          states,
          avatar,
          role,
          email,
          bio,
          birthday,
          updatingUser.follower_count,
          updatingUser.following_count
        );
        setUsername("");
        setPassword("");
        setName("");
        setState("");
        setAvatar("");
        setRole("");
        setEmail("");
        setBio("");
        setBirthday("");
      }

      setUpdateTheUser(false);
      toast.success("User updated");
    } catch (error) {
      console.error(error);
    }
  }

  function showConfirmation(message) {
    return new Promise((resolve, reject) => {
      const confirmed = window.confirm(message);
      if (confirmed) {
        resolve(true);
      } else {
        return;
      }
    });
  }

  // Function to show a dialog with multiple options
  function showReviewAction(message, options) {
    return new Promise((resolve) => {
      const optionIndexes = options.map((option, index) => index + 1);
      const selectedOption = parseInt(
        window.prompt(
          `${message}\n\n${options
            .map((option, index) => `${index + 1}. ${option.label}`)
            .join("\n")}`
        )
      );

      if (optionIndexes.includes(selectedOption)) {
        resolve(options[selectedOption - 1].value);
      } else {
        resolve(null);
      }
    });
  }

  return (
    <div className="container">
      {" "}
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
      <>
        {update ? (
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
              <OptionsStates />
            </select>
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="mt-3"></div>
                <h6 className="row justify-content-center">My Bio:</h6>
                <TextareaAutosize
                  placeholder="bio"
                  className="form-control border-0 p-0 form-control-lg textarea-bio"
                  minRows={3}
                  maxRows={50}
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
        ) : null}
        <>
          <Link to={"/profile"}>
            <div className="mt-3"></div>
            <button id="admin-cancel-edit" onClick={() => {}}>
              Back to Profile
            </button>
          </Link>
        </>
      </>
    </div>
  );
};
export default AccountSettings;
