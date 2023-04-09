import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authUser } from "./API";
import EditAccount from "./EditAccount";
import Profile from "./Profile";

const AccountSettings = ({
  users,
  userReviews,
  setUserReviews,
  setEditUser,
  update,
  setUpdate,
}) => {
  function handleChooseEdit(e) {
    // setEditUser(e.target.users);
    setUpdate(true);
    console.log(e.target.users, "HANDLE EDIT");
  }

  async function handleUpdateAdmin(e) {
    e.preventDefault();
  }

  return (
    <div>
      <>
        {update && userReviews.id == editId ? (
          <EditAccount users={users} />
        ) : null}
      </>
      <div></div>
      <Link to={"/editaccount"}>
        {" "}
        <button className="admin-buttons" id={users} onClick={handleChooseEdit}>
          Update
        </button>
      </Link>
      <div></div>
    </div>
  );
};
export default AccountSettings;
