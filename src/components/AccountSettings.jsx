import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "./API";

const AccountSettings = ({ user }) => {
  const [update, setUpdate] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    async function fetchUserInfo() {
      if (userInfo) {
        console.log(userInfo, "this is user info");
        const userBlock = await updateUser(user.id);
      }
    }
    fetchUserInfo();
  }, [userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = {
        name,
        lastName,
        username,
        location,
        bio,
      };

      const response = await updateUser(user.id, updatedUser);
      setUpdate(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="admin-form">
        {update == true ? (
          <>
            <h6 id="text-fields">Name:</h6>
            <input
              placeholder={user.name}
              className="first-name"
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name}
            />
            <h6 id="text-fields">Location:</h6>
            <select
              placeholder="location"
              className="location"
              type="text"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
              required
            >
              <option value="">Select State</option>
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

            <button type="submit" className="buttons">
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
