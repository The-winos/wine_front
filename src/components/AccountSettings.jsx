import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authUser } from "./API";
import EditAccount from "./EditAccount";

const AccountSettings = ({ users }) => {
  const [update, setUpdate] = useState(false);
  function handleChooseEdit(e) {
    setEditUser(e.target.users);
    setUpdate(true);
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
      <div>
        <button
          id="admin-cancel-edit"
          onClick={() => {
            setUpdate(false);
          }}
        >
          Cancel Edit
        </button>
      </div>
    </div>
  );
};
export default AccountSettings;
