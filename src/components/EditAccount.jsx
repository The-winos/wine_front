import React, { useEffect, useState } from "react";
import { updateUser } from "./API";

const EditAccount = ({ user }) => {
  const [name, setName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [username, setUserName] = useState(user.username || "");
  const [location, setLocation] = useState(user.location || "");
  const [bio, setBio] = useState(user.bio || "");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await updateUser(user.id);
        setUpdate(userInfo);
        console.log(user, "this is user");
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, [user]);

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
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
      <form onSubmit={handleSubmit} className="admin-form">
        <div id="text-fields">Account Settings</div>

        <input
          placeholder="name"
          className="first-name"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
        />
        <input
          placeholder="last name"
          className="last-name"
          type="text"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          value={lastName}
        />

        <div id="text-fields">Location</div>
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
        </select>

        <input
          placeholder="username"
          className="username"
          type="text"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          value={username}
        />
        <input
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
      </form>
      <button
        id="admin-cancel-edit"
        onClick={() => {
          setUpdate(false);
        }}
      >
        Cancel Edit
      </button>
    </div>
  );
};

export default EditAccount;
