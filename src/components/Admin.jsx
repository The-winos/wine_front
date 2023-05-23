//same as profile but add admin functions to receive user reports, edit posts, edit users, edit badges?
import React from "react";
import { useEffect, useState } from "react";
import { getAllUsers, getUserById, updateUser } from "./API";

const Admin = ({ user }) => {
  const [allUsers, setAllUser] = useState([]);
  const [userButton, setUserButton] = useState(false);
  const [updateTheUser, setUpdateTheUser] = useState(false);
  const [updatingUser, setUpdatingUser] = useState({});
const [username, setUsername] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [birthday, setBirthday] = useState("");
const [state, setState] = useState("");
const [bio, setBio] = useState("");
const [role, setRole] = useState("");
const [password, setPassword] = useState(updatingUser.password || "");
const [newPassword, setNewPassword] = useState("");
const [passwordVisible, setPasswordVisible] = useState(false);
const [update, setUpdate] = useState(true);
const [formattedBirthday, setFormattedBirthday] = useState("");
const[avatar, setAvatar]=useState("")


  useEffect(() => {
    async function fetchAllUsers() {
      const allTheUsers = await getAllUsers();
      console.log(allTheUsers);
      setAllUser(allTheUsers);
    }
    fetchAllUsers();
  }, []);

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
  }, [birthday]);

  async function handleUserClick(userId) {
    setUpdateTheUser(true);
    const userToUpdate = await getUserById(userId);
    setUsername(userToUpdate.username)
    setName(userToUpdate.name)
    setBirthday(userToUpdate.birthday)
    setRole(userToUpdate.role)
    setEmail(userToUpdate.email)
    setState(userToUpdate.state)
    if(userToUpdate.bio){
    setState(userToUpdate.bio)}
    setAvatar(userToUpdate.avatar)
    setUpdatingUser(userToUpdate);
  }

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
        username: username !== '' ? username : updatingUser.username,
        name: name !== '' ? name : updatingUser.name,
        state: state !== '' ? state : updatingUser.state,
        role: role !== '' ? role : updatingUser.role,
        email: email !== '' ? email : updatingUser.email,
        birthday: formattedBirthday !== '' ? formattedBirthday : updatingUser.birthday
      });
console.log(username, "is it getting username?")
      const updateInfo = await updateUser(
        user.id,
        username,
        password,
        name,
        state,
        avatar,
        role,
        email,
        bio,
        formattedBirthday,
        user.follower_count,
        user.following_count
      );
    } catch (error) {
      console.error(error);
      setUpdate(true);
    }
  }


  return (
    <div id="admin">
      <h2 className="d-flex justify-content-center ">
        Welcome to the Admin Portal
      </h2>
      <>
      <form onSubmit={handleSubmit} className="admin-form">
        {updateTheUser ? (
          <>
            <h3 className="d-flex justify-content-center">
              You are updating {updatingUser.username}
            </h3>

            <div className="row">
              <div className="col">
                <h5>{updatingUser.username}</h5>
                <h6>Update Avatar</h6>
                <img
          src={updatingUser.avatar}
          alt="avatar image"
          className="img-fluid"
          style={{
            height: "100px",
            width: "100px",
            objectFit: "contain",
            objectPosition: "center center",
          }}
        />
                {/* <input
                  placeholder="update avatar"
                  className="avatar"
                  type="text"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                /> */}
              </div>
              <div className="col">
                <h5>{updatingUser.name}</h5>
                <h6>Update Name</h6>
                <input
                  placeholder="Enter updated name"
                  className="first-name"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className="col">
                <h5>{updatingUser.role}</h5>
                <h6>Update Level</h6>
                <select
                  placeholder="role"
                  className="role"
                  type="text"
                  value={role}
                  onChange={(event) => {
                    setRole(event.target.value);
                  }}
                >
                  <option value=""></option>
                  <option value="user">User</option>
                  <option value="merchant">Merchant</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col">

                <h6>Update Birthday</h6>

                <input
                  placeholder={formattedBirthday}
                  className="first-name"
                  type="text"
                  value={birthday}
                  onChange={(event) => {
                    setBirthday(event.target.value);
                  }}
                />
              </div>
              <div className="col">

                <h6>Update Email</h6>

                <input
                  placeholder={updatingUser.email}
                  className="email"
                  type="text"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="col">
                {console.log(formattedBirthday)}
                <h6>State {updatingUser.state}</h6>
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
              </div>
            </div>

            <h6 id="text-fields">Password:</h6>
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
        {userButton ? (
          <>
            <button
              onClick={() => {
                setUserButton(false);
                setUpdateTheUser(false);
              }}
              className="btn btn-primary pb-2"
            >
              Close Users
            </button>
            {allUsers && allUsers.length ? (
              <>
                <div className="text-center py-2">
                  <span className="badge bg-danger mx-2 rounded-circle pr-3">
                    &nbsp;
                  </span>
                  Admin
                  <span className="badge bg-primary mx-2 rounded-circle">
                    &nbsp;
                  </span>
                  Merchant
                  <span className="badge bg-secondary mx-2 rounded-circle">
                    &nbsp;
                  </span>
                  User
                </div>

                {allUsers
                  .sort((a, b) => a.username.localeCompare(b.username))
                  .map((user) => {
                    return (
                      <div key={`userlist-${user.id}`}>
                        <h5
                          style={{
                            color:
                              user.role === "admin"
                                ? "red"
                                : user.role === "merchant"
                                ? "blue"
                                : "black",
                            cursor: "pointer",
                          }}
                          onClick={() => handleUserClick(user.id)}
                        >
                          {user.username}
                        </h5>
                      </div>
                    );
                  })}
              </>
            ) : (
              <h2>No users found</h2>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setUserButton(true);
              }}
              className="btn btn-primary pb-2"
            >
              Open Users
            </button>
          </>
        )}
      </>
    </div>
  );
};

export default Admin;
