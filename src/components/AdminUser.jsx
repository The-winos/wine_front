import React from "react";
import { useEffect, useState } from "react";
import {
  getUserById,
  updateUser,
  updateAdminUserPassword,
  getAllUsers,
  deleteItem,
  getSaved,
  getFollowingById,
  getAllReviews,
} from "./API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import OptionsStates from "./OptionsStates";
import OptionAvatars from "./OptionAvatars";
import { getReviewByUser } from "./API";
import { getFavorites } from "./API";
import { getFollowersById } from "./API";
import "react-toastify/dist/ReactToastify.css";
import { UNSAFE_DataRouterContext } from "react-router-dom";
import { handleSearch } from "./SearchBar";

const AdminUser = ({
  user,
  userButton,
  updateTheUser,
  setUpdateTheUser,
  allWine,
}) => {
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
  const [allReviews, setAllReviews] = useState([]);
  const [searchUsername, setSearchUsername]= useState("");
  const [filteredUsers, setFilteredUsers]=useState([]);
  const [dateJoined, setDateJoined]=useState(null)
  const [sortColumn, setSortColumn] = useState("join_date");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    async function fetchAllReview() {
      const allTheRev = await getAllReviews();

      setAllReviews(allTheRev);
    }
    fetchAllReview();
  }, []);

  useEffect(() => {
    async function fetchAllUsers() {
      const allTheUsers = await getAllUsers();
      setAllUser(allTheUsers);
      setFilteredUsers(allTheUsers)
    }
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const filterUsers = async () => {
      const filteredResults = await Promise.all(
        allUsers.map(async (use) => {
          if (use.username.toLowerCase().includes(searchUsername.toLowerCase())) {
            return use;
          }
        })
      );
      setFilteredUsers(filteredResults.filter((use) => use !== undefined));
    };
    filterUsers();
  }, [searchUsername]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked, toggle the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set it as the new sorting column and default to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedUsers = filteredUsers.slice().sort((a, b) => {
    // Perform sorting based on sortColumn and sortDirection
    switch (sortColumn) {
      case "username":
      case "name":
      case "state":
        return sortDirection === "asc" ? a[sortColumn].localeCompare(b[sortColumn]) : b[sortColumn].localeCompare(a[sortColumn]);
      case "join_date":
        return sortDirection === "asc" ? new Date(a.join_date) - new Date(b.join_date) : new Date(b.join_date) - new Date(a.join_date);
      case "reviews":
      case "wines_entered":
        return sortDirection === "asc" ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn];
      default:
        return 0; // No sorting applied
    }
  });


  function calculateReviews(userId) {
    const userReviews = allReviews.filter(
      (review) => review.user_id === userId
    );
    return userReviews.length;
  }

  function calculateWinesEntered(userId) {
    const userWines = allWine.filter((wine) => wine.author_id === userId);
    return userWines.length;
  }

  async function handleUserClick(userId) {
    setUpdateTheUser(true);
    const userToUpdate = await getUserById(userId);
    setUsername(userToUpdate.username);
    setName(userToUpdate.name);
    setBirthday(userToUpdate.birthday ? new Date(userToUpdate.birthday) : null);
    setDateJoined(userToUpdate.join_date ? new Date(userToUpdate.join_date) : null);
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
      password === ""
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
        birthday: birthday !== "" ? birthday : updatingUser.birthday,
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
            updatingUser.following_count,
            updatingUser.join_date
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        const updateInfo = await updateUser(
          username,
          undefined,
          name,
          state,
          avatar,
          role,
          email,
          bio,
          birthday,
          updatingUser.follower_count,
          updatingUser.following_count,
          updatingUser.join_date
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

  async function handleDelete(type, id) {
    try {
      if (user.username !== updatingUser.username) {
        const confirmDeletion = await showConfirmation(
          `Are you sure you want to delete user ${updatingUser.username}`
        );
        if (!confirmDeletion) {
          return;
        }

        if (confirmDeletion) {
          const reviewAction = await showReviewAction("Choose an action:", [
            { label: "Delete Reviews", value: "Delete Reviews" },
            {
              label: "Reassign Reviews to Deleted User",
              value: "Reassign Reviews to Deleted User",
            },
            { label: "Cancel", value: "Cancel" },
          ]);

          if (reviewAction === "Delete Reviews") {
            const reviews = await getReviewByUser(id);
            await Promise.all(
              reviews.map((review) => deleteItem("reviews", review.id))
            );
          } else if (reviewAction === "Cancel") {
            return;
          }
        }

        const favorites = await getFavorites(id);
        if (favorites.length) {
          await Promise.all(
            favorites.map((favorite) => {
              deleteItem("favorites", favorite.id);
            })
          );
        }

        const saved = await getSaved(id);
        if (saved.length) {
          await Promise.all(
            saved.map((save) => {
              deleteItem("saved", save.id);
            })
          );
        }

        const followers = await getFollowersById(id);

        if (followers.length) {
          await Promise.all(
            followers.map((follow) => {
              deleteItem("followers/user", follow.id);
            })
          );
        }

        const followings = await getFollowingById(id);

        if (followings.length) {
          await Promise.all(
            followings.map((follow) => {
              deleteItem("followers/follower", follow.id);
            })
          );
        }

        // Make API call to delete the user
        const result = await deleteItem(type, id);

        setUpdateTheUser(false);
        toast.success(`${updatingUser.username} deleted`);
      } else {
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
            <h3 className="d-flex justify-content-center pb-1">
              You are updating {updatingUser.username}

            </h3>
            <h4 className="d-flex justify-content-center pb-3">

              joined on {new Date(updatingUser.join_date).toLocaleDateString()}
            </h4>

            <div className="row">
              <div className="col">
                <h6>Update Avatar</h6>
                <img
                  src={`/images/${avatar}`}
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
                <div className="avatar-grid">
                  <h6>Choose Avatar</h6>
                  <br />
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
                  <OptionsStates />
                </select>
              </div>
            </div>
            <></>
            <div className="container-fluid">
              <h6 id="text-fields">New Password:</h6>
              <div className="row mb-3">
                <div className="col-sm-1">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
                <div className="col-md-4">
                  <input
                    type="password"
                    className="password form-control"
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="col-sm-1">
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

            <button
              type="button"
              className="btn btn-danger ml-2"
              onClick={() => handleDelete("users", updatingUser.id)}
            >
              Delete
            </button>
          </form>
        </>
      ) : null}
      {userButton ? (
        <>
          {filteredUsers && filteredUsers.length ? (
            <>
              <div className="text-center py-2 pt-4">
                <div>
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
                <div className="pt-2">
                  <label htmlFor="type-filter">   Username: </label>
            <input
              type="text"
              id="type-filter"
              name="search-user"
              value={searchUsername}
              onChange={(event) => {
                handleSearch(event, setSearchUsername);
              }}
            />
            </div>
              </div>
              <p colSpan="6" style={{ textAlign: "center" }}>{allUsers.length-1} Total Users</p>
              <table className="table m-4">

                <thead>
                  <tr>
                    <th style={{cursor: "pointer"}} onClick={() => handleSort("username")}>Username</th>
                    <th style={{cursor: "pointer"}} onClick={() => handleSort("name")} >Name</th>
                    <th style={{cursor: "pointer"}} onClick={() => handleSort("state")} >State</th>
                    <th style={{cursor: "pointer"}} onClick={() => handleSort("join_date")}>Date Joined</th>
                    <th style={{cursor: "pointer"}} onClick={() => handleSort("reviews")}>Reviews</th>
                    <th style={{cursor: "pointer"}} onClick={() => handleSort("wines_entered")}>Wines Entered</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers
  .filter((user) => user.username !== "Deleted User")
  .map((user) => (
                      <tr key={`userlist-${user.id}`}>
                        <td
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
                          title="Click to edit"
                        >
                          {user.username}
                        </td>
                        <td>{user.name}</td>
                        <td>{user.state}</td>
                        <td>
                          {new Date(user.join_date).toLocaleDateString("en-US")}
                        </td>
                        <td>{calculateReviews(user.id)}</td>
                        <td>{calculateWinesEntered(user.id)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          ) : null}
        </>
      ) : null}
      <ToastContainer />
    </>
  );
};

export default AdminUser;
