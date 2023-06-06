import React from "react";
import { useEffect, useState } from "react";
import { getUserById, updateUser, updateAdminUserPassword } from "./API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import OptionsStates from "./OptionsStates";
import OptionAvatars from "./OptionAvatars";

const AdminUser = ({ allUsers, user }) => {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formattedBirthday, setFormattedBirthday] = useState("");
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [userButton, setUserButton] = useState(false);
  const [updateTheUser, setUpdateTheUser] = useState(false);
  const [updatingUser, setUpdatingUser] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [states, setState] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

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
    }
    else{setBio("")}
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
      states === updatingUser.state &&
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
        states: states !== "" ? states : updatingUser.state,
        role: role !== "" ? role : updatingUser.role,
        email: email !== "" ? email : updatingUser.email,
        bio: bio !== "" ? bio : updatingUser.bio || null,
        birthday:
          formattedBirthday !== "" ? formattedBirthday : updatingUser.birthday,
      });

      // Password update logic
      if (password != "") {
        try {
          const hashedPassword = await updateAdminUserPassword(
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
            user.follower_count,
            user.following_count
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
          user.follower_count,
          user.following_count
        );
        setUsername("")
        setPassword("")
        setName("")
        setState("")
        setAvatar("")
        setRole("")
        setEmail("")
        setBio("")
        setBirthday("")

      }

      setUpdateTheUser(false);
      toast.success("User updated");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {updateTheUser ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="admin-form border p-2 m-3 mb-4"
          >
            <h3 className="d-flex justify-content-center pb-3">
              You are updating {updatingUser.username}
            </h3>

            <div className="row">
              <div className="col">
                <h6>Update Avatar</h6>
                <img
                  src={`/images/${updatingUser.avatar}`}
                  alt="avatar image"
                  className="img-fluid"
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "contain",
                    objectPosition: "center center",
                    cursor: "pointer",
                  }}
                  onClick={() => setChangeAvatar(true)}
                />
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
              {changeAvatar && (
                <div className="d-flex justify-content-around">
                  <h6>Choose Avatar</h6>
                  <br />
                  <OptionAvatars avatar={avatar} setAvatar={setAvatar}/>
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
            <div className="row">
              <div className="col">
                <h6>Update Birthday</h6>
                <DatePicker
                  selected={birthday}
                  onChange={(date) => setBirthday(date)}
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  isClearable
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
                <h6>State {updatingUser.state}</h6>
                <select
                  placeholder="location"
                  className="location"
                  type="text"
                  value={states}
                  onChange={(event) => {
                    setState(event.target.value);
                  }}
                >
                  <OptionsStates/>
                </select>
              </div>
            </div>
            <>
              <h6 id="text-fields">Password:</h6>
            </>
            <div className="container-fluid">
              <h6 id="text-fields">New Password:</h6>
              <div className="row mb-3">
                <div className="col-sm-1">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                <div className="col-md-5">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control password"
                    placeholder="Update Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="col-md-1">
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

            <div className="col-md-6 p-3">
              <h6>User's Bio:</h6>
              <textarea
                placeholder="bio"
                className="bio form-control"
                style={{ height: "100px" }}
                onChange={(event) => {
                  setBio(event.target.value);
                }}
                value={bio}
              />
            </div>

            <br />
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </>
      ) : null}
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
          <div className="d-flex justify-content-center pb-2">
            <button
              onClick={() => {
                setUserButton(true);
              }}
              className="btn btn-primary"
            >
              Open Users
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AdminUser;
