//same as profile but add admin functions to receive user reports, edit posts, edit users, edit badges?
import React from "react";
import { useEffect, useState } from "react";
import { getAllUsers, getUserById } from "./API";

const Admin = ({ user }) => {
  const [allUsers, setAllUser] = useState([]);
  const [userButton, setUserButton] = useState(false);
  const [updateUser, setUpdateUser]= useState(false);
  const [updatingUser, setUpdatingUser]=useState({})
  const [name, setName]=useState(updatingUser.name)
  const[birthday, setBirthday]=useState(updatingUser.birthday)
  const[state, setState]= useState(updatingUser.state)
  const [bio, setBio] = useState(updatingUser.bio);
  const [password, setPassword] = useState(updatingUser.password);
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [update, setUpdate] = useState(true);
  const [formattedBirthday, setFormattedBirthday] = useState("");


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


  async function handleUserClick (userId){
    setUpdateUser(true)
    const userToUpdate=await getUserById(userId)
    setUpdatingUser(userToUpdate)
}

async function handleSubmit(event) {
  event.preventDefault();
  if (
    name === user.name &&
    state === user.state &&
    avatar === user.avatar &&
    email === user.email &&
    birthday === user.birthday &&
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
      <>
      {updateUser ? (
        <>
        <h3>You are updating {updatingUser.username}</h3>

            <h3>{updatingUser.name}</h3>
            <h6>Update Name</h6>
            <input
              placeholder="Enter your name"
              className="first-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <div></div>
            <h3>Birthday {formattedBirthday}</h3>
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
            {console.log(formattedBirthday)}

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
      ): null}
        {userButton ? (
          <>
            <button
              onClick={() => {
                setUserButton(false);
                setUpdateUser(false)
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
  })
}

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
