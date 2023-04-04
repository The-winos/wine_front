import React, { useState, useEffect } from "react";

const EditAccount = () => {
  const [name, setName] = useState({});
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [location, setLocation] = useState({});
  const [bio, setBio] = useState("");

  async function handleUpdateAdmin(e) {
    e.preventDefault();
  }

  return (
    <div>
      {users}
      <form className="admin-form">
        <div id="text-fields">Account Settings</div>
        <input
          placeholder="name"
          className="first-name"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <input
          placeholder="name"
          className="last-name"
          type="text"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        ></input>

        <div id="text-fields">Location</div>
        <select
          placeholder="location"
          className="location"
          type="text"
          value="location"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          required
        >
          <option>select</option>
          <option>child</option>
          <option>teen</option>
          <option>adult</option>
        </select>

        <div id="bio-text-field">
          Summary
          <textarea
            placeholder="bio"
            className="bio"
            type="text"
            onChange={(event) => {
              setBio(event.target.value);
            }}
          ></textarea>
        </div>
        <button id="admin-submit" onClick={handleUpdateAdmin} type="submit">
          Submit
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
