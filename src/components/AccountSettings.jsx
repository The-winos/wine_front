import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "./API";

const AccountSettings = ({ user }) => {
  const [username, setUsername] = useState(user.username || "");
  const [state, setState] = useState(user.state || "");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [email, setEmail] = useState(user.email || "");
  const [birthday, setBirthday] = useState(user.birthday || "");
  const [bio, setBio] = useState(user.bio || "");
  const [password, setPassword] = useState(user.password || "");
  const [update, setUpdate] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      username === user.username &&
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
      const response = await updateUser(
        username,
        password,
        state,
        email,
        birthday,
        0,
        0
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      setUpdate(true);
    }
  }

  return (
    <div>
      <div>
        <img
          src={user.avatar}
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
      {console.log(user, "this is user")}
      <form onSubmit={handleSubmit} className="admin-form">
        {update ? (
          <>
            <h6 id="text-fields">Username:</h6>
            <input
              placeholder={user.username}
              className="first-name"
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <h6 id="text-fields">Password:</h6>
            <input
              placeholder={user.password}
              className="first-name"
              type="text"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <h6 id="text-fields">Location:</h6>
            <div>{user.state}</div>
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
        ) : null}
      </form>

      <Link to={"/profile"}>
        <button id="admin-cancel-edit" onClick={() => {}}>
          Cancel Edit
        </button>
      </Link>
    </div>
  );
};
export default AccountSettings;
