import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { updateUser, updateUserPassword } from "./API";

import OptionsStates from "./OptionsStates";
import OptionAvatars from "./OptionAvatars";
import ProfaneWords from "./ProfaneWords"

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

  const [bio, setBio] = useState(user.bio);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);

  const handleLocationChange = (selectedState) => {
    setState(selectedState);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const profaneWords = ProfaneWords;

    if (
      name === user.name &&
      state === user.state &&
      avatar === user.avatar &&
      email === user.email &&

      bio === user.bio &&
      newPassword === ""
    ) {
      return;
    }

    try {
      const containsProfaneWords = profaneWords.some((word) => {
        return (
          name.toLowerCase().includes(word) ||
          email.toLowerCase().includes(word) ||
          bio.toLowerCase().includes(word)
        );
      });

      if (containsProfaneWords) {
        toast.error(
          "Your information contains inappropriate language. Please edit your information."
        );
        return;
      }
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
          user.birthday,
          user.follower_count,
          user.following_count,
          user.join_date
        );
      } else {

        const updateUserInfo = await updateUser(
          user.username,
          undefined,
          name,
          state,
          avatar,
          user.role,
          email,
          bio,
          user.birthday,
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

  return (
    <div id="accountSettings">
      <div className="container">

          <div className="col-lg-12">
            <div className="ProfileAvatar">
              <img
                src={`/images/${avatar}`}
                alt="avatar image"
                className="img-fluid"
                style={{
                  height: "200px",
                  width: "200px",
                  paddingTop:"10px",
                  objectFit: "contain",
                  objectPosition: "center center",
                  cursor: "pointer",
                }}
                onClick={() => setChangeAvatar(true)}
              />
              <div className="change-avatar-text">
                Change My Avatar
              </div>
            </div>
            {changeAvatar && (
              <div className="avatar-grid">
                <h6>Choose Avatar</h6>
                <OptionAvatars avatar={avatar} setAvatar={setAvatar} user={user} />
                <button
                  onClick={() => {
                    setChangeAvatar(false);
                  }}
                  variant="outline-secondary"
                  size="sm"
                >
                  Close
                </button>
              </div>
            )}
          </div>
          <div className="col-lg-12" style={{paddingLeft:"50px"}}>
            <form onSubmit={handleSubmit} className="accountSettings-form">
              <h3>{formSubmitted ? name : user.name}</h3>
              <div className="row mb-3">
                <div className="col-md-4" >
                <div className="change-profile-text">
                Name
              </div>
                  <input
                    placeholder="Enter name"
                    className="first-name form-control"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    style={{maxWidth:"300px"}}
                  />
                </div>
                <div className="col-md-4">
                <div className="change-profile-text">
                Email
              </div>
                  <input
                    placeholder="Enter Email"
                    className="update-email form-control"
                    type="text"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    style={{maxWidth:"300px"}}
                  />
                </div> <div className="col-md-4">
              <div className="change-profile-text">
                Update State
              </div>
                <select
                  placeholder="location"
                  className="location form-select"
                  type="text"
                  value={state}
                  onChange={(event) => {
                    setState(event.target.value);
                  }}
                  style={{maxWidth:"200px"}}
                >
                  <OptionsStates onChange={handleLocationChange} />
                </select>
              </div>
              </div>

<div className="col-md-12">
              <div className="row mb-3">
                <div className="change-profile-text">
                Change Password:
              </div>
                <div className="col-md-4">

                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    id="oldPassword"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                    style={{maxWidth:"300px"}}
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    id="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    style={{maxWidth:"300px"}}
                  />
                </div>
                <div className="col-md-4">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  style={{maxWidth:"300px"}}
                />
              </div>
              </div>
              </div>

              <div className="mb-3">
  <div className="change-profile-text">
    Update Bio
  </div>
  <textarea
    placeholder="bio"
    className="form-control textarea-bio"
    style={{ width: "80%", height: "150px", padding: "8px" }}
    onChange={(event) => {
      setBio(event.target.value);
    }}
    value={bio}
  />
</div>

              <button type="submit" className="btn btn-primary mb-3">
                Save Changes
              </button>
            </form>
          </div>
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
      <ToastContainer />
    </div>
  );
};

export default ProfileAccountSettings;
