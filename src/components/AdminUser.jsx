import React from "react";
import { useEffect, useState } from "react";
import { getUserById, updateUser, updateAdminUserPassword, getAllUsers, deleteItem, getSaved, getFollowingById } from "./API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import OptionsStates from "./OptionsStates";
import OptionAvatars from "./OptionAvatars";
import { getReviewByUser } from "./API";
import { getFavorites } from "./API";
import { getFollowersById } from "./API";
import "react-toastify/dist/ReactToastify.css";


const AdminUser = ({user, userButton, updateTheUser, setUpdateTheUser }) => {
  const [allUsers, setAllUser] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [updatingUser, setUpdatingUser] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [state, setState] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    async function fetchAllUsers() {
      const allTheUsers = await getAllUsers();
      setAllUser(allTheUsers);
    }
    fetchAllUsers();
  }, []);

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

    const formattedDate = birthday
      ? birthday.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "";
    // setFormattedBirthday(formattedDate); // Remove this line
  }, [birthday]);

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
        state: state !== "" ? state : updatingUser.state,
        role: role !== "" ? role : updatingUser.role,
        email: email !== "" ? email : updatingUser.email,
        bio: bio !== "" ? bio : updatingUser.bio || null,
        birthday: birthday !== "" ? birthday : updatingUser.birthday
      });

      // Password update logic
      if (password !== "") {
        try {
          const hashedPassword = await updateAdminUserPassword(
            updatingUser.id,
            password
          );
          const updateInfo = await updateUser(
            username,
            hashedPassword,
            name,
            state,
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
          username,
          password,
          name,
          state,
          avatar,
          role,
          email,
          bio,
          birthday,
          updatingUser.follower_count,
          updatingUser.following_count
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
      const selectedOption = parseInt(window.prompt(`${message}\n\n${options.map((option, index) => `${index + 1}. ${option.label}`).join("\n")}`));

      if (optionIndexes.includes(selectedOption)) {
        resolve(options[selectedOption - 1].value);
      } else {
        resolve(null);
      }
    });
  }


  async function handleDelete(type, id) {
    try {
      if (user.username !== updatingUser.username) {
        const confirmDeletion = await showConfirmation(`Are you sure you want to delete user ${updatingUser.username}`);
        if (!confirmDeletion) {
          return;
        }

        if (confirmDeletion) {
          const reviewAction = await showReviewAction("Choose an action:", [
            { label: "Delete Reviews", value: "Delete Reviews" },
            { label: "Reassign Reviews to Deleted User", value: "Reassign Reviews to Deleted User" },
            { label: "Cancel", value: "Cancel" },
          ]);

          if (reviewAction === "Delete Reviews") {
            const reviews = await getReviewByUser(id);
            await Promise.all(reviews.map((review) => deleteItem("reviews", review.id)));
          } else if (reviewAction === "Cancel") {
            return;
          }
        }

      const favorites= await getFavorites(id)
      if(favorites.length){
      await Promise.all(favorites.map((favorite)=>{
        deleteItem("favorites", favorite.id)
      }))}

      const saved= await getSaved(id)
      if(saved.length){
      await Promise.all(saved.map((save)=>{
        deleteItem("saved", save.id)
      }))}

      const followers= await getFollowersById(id)
      console.log(followers, "followers")
      if(followers.length){
        await Promise.all(followers.map((follow)=>{
          deleteItem("followers/user", follow.id)

        }))
      }

      const followings= await getFollowingById(id)
      console.log(followings, "following")
      if(followings.length){
        await Promise.all(followings.map((follow)=>{
          deleteItem("followers/follower", follow.id)
        }))
      }

      // Make API call to delete the user
      const result = await deleteItem(type, id);
      console.log(result);
      setUpdateTheUser(false);
      toast.success(`${updatingUser.username} deleted`);}
      else{
        toast.error(`${user.username} you cannot delete yourself.`);
      }
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
                  value={state}
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
            {console.log(updatingUser.username, updatingUser.id)}
            <button
        type="button"
        className="btn btn-danger ml-2"
        onClick={() => handleDelete('users', updatingUser.id)}
      >
        Delete
      </button>
          </form>
        </>
      ) : null}
      {userButton ? (
        <>
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
  .filter((user) => user.username !== "Deleted User") // Exclude "Deleted User"
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
       null
      )}
      <ToastContainer />
    </>
  );
};

export default AdminUser;
